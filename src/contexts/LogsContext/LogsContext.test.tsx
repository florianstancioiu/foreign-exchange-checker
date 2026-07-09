import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { LogsContextProvider } from "./LogsContext";
import LogsTestConsumer from "./LogsTestConsumer";
import { useLocalStorage } from "usehooks-ts";
import { fireEvent } from "@testing-library/react";
import { getTodaysStringDate } from "../../helpers/dates";

vi.mock("usehooks-ts", () => ({
  useLocalStorage: vi.fn(),
}));
const mockedUseLocalStorage = vi.mocked(useLocalStorage);

const logItemId = `USD-EUR-${getTodaysStringDate()}-100-90`;
const logItem = {
  id: logItemId,
  baseValue: "100",
  quoteValue: 90,
  date: new Date().toString(),
  base: "USD",
  quote: "EUR",
};

describe("LogsContext", async () => {
  test("no logs", () => {
    const setLogs = vi.fn();
    const removeLogs = vi.fn();

    mockedUseLocalStorage.mockReturnValue([[], setLogs, removeLogs]);

    render(
      <LogsContextProvider>
        <LogsTestConsumer />
      </LogsContextProvider>,
    );

    const logsCount = screen.getByTestId("logs_count");

    expect(logsCount).toHaveTextContent("0");
  });

  test("provides logs from localStorage", () => {
    const setLogs = vi.fn();
    const removeLogs = vi.fn();

    mockedUseLocalStorage.mockReturnValue([[logItem], setLogs, removeLogs]);

    render(
      <LogsContextProvider>
        <LogsTestConsumer />
      </LogsContextProvider>,
    );

    const logsCount = screen.getByTestId("logs_count");

    expect(logsCount).toHaveTextContent("1");
  });

  test("adds a log", () => {
    const setLogs = vi.fn();
    const removeLogs = vi.fn();

    mockedUseLocalStorage.mockReturnValue([[], setLogs, removeLogs]);

    render(
      <LogsContextProvider>
        <LogsTestConsumer />
      </LogsContextProvider>,
    );

    const toggleBtn = screen.getByTestId("logs_toggle");

    fireEvent.click(toggleBtn);

    const updater = setLogs.mock.calls[0][0];

    expect(setLogs).toHaveBeenCalledOnce();

    const { date: _, ...logItemWithoutDate } = logItem;

    expect(updater([])).toMatchObject([logItemWithoutDate]);
  });

  test("removes a log", () => {
    const setLogs = vi.fn();
    const removeLogs = vi.fn();

    mockedUseLocalStorage.mockReturnValue([[logItem], setLogs, removeLogs]);

    render(
      <LogsContextProvider>
        <LogsTestConsumer />
      </LogsContextProvider>,
    );

    const toggleBtn = screen.getByTestId("logs_toggle");

    fireEvent.click(toggleBtn);

    const updater = setLogs.mock.calls[0][0];

    expect(setLogs).toHaveBeenCalledOnce();
    expect(updater([logItem])).toEqual([]);
  });

  test("clears all logs", () => {
    const setLogs = vi.fn();
    const removeLogs = vi.fn();

    mockedUseLocalStorage.mockReturnValue([[logItem], setLogs, removeLogs]);

    render(
      <LogsContextProvider>
        <LogsTestConsumer />
      </LogsContextProvider>,
    );

    const clearAllBtn = screen.getByTestId("logs_clear_all");

    fireEvent.click(clearAllBtn);

    expect(setLogs).toHaveBeenCalledOnce();
    expect(setLogs).toHaveBeenCalledWith([]);
  });

  test("remove a log", () => {
    const setLogs = vi.fn();
    const removeLogs = vi.fn();

    mockedUseLocalStorage.mockReturnValue([
      [{ ...logItem, id: "test-id" }],
      setLogs,
      removeLogs,
    ]);

    render(
      <LogsContextProvider>
        <LogsTestConsumer />
      </LogsContextProvider>,
    );

    const removeLogBtn = screen.getByTestId("logs_remove");

    fireEvent.click(removeLogBtn);

    const updater = setLogs.mock.calls[0][0];

    expect(setLogs).toHaveBeenCalledOnce();
    expect(updater([{ logItem, id: "test-id" }])).toEqual([]);
  });

  test("isLogged", () => {
    const setLogs = vi.fn();
    const removeLogs = vi.fn();

    mockedUseLocalStorage.mockReturnValue([
      [{ ...logItem, id: "test-id" }],
      setLogs,
      removeLogs,
    ]);

    render(
      <LogsContextProvider>
        <LogsTestConsumer />
      </LogsContextProvider>,
    );

    const isLogged = screen.getByTestId("logs_is_logged");

    expect(isLogged).toHaveTextContent("yes");
  });
});

import { MemoryRouter, Routes, Route } from "react-router";
import { render, screen, fireEvent } from "@testing-library/react";
import { RateContextProvider } from "./RateContext";
import RateTestConsumer from "./RateTestConsumer";
import useRateRequest from "../../hooks/useRateRequest";
import { type UseQueryResult } from "@tanstack/react-query";
import { type Rate } from "../../types/rate";

vi.mock("../../hooks/useRateRequest", () => ({
  default: vi.fn(),
}));

describe("RateContext", async () => {
  const mockedUseRateRequest = vi.mocked(useRateRequest);

  test("renders component", () => {
    mockedUseRateRequest.mockReturnValue({
      isPending: false,
      error: null,
      data: [],
    } as unknown as UseQueryResult<Rate[], Error>);

    render(
      <MemoryRouter initialEntries={["/?base=USD&quote=EUR&send=10"]}>
        <Routes>
          <Route
            path="/"
            element={
              <RateContextProvider>
                <RateTestConsumer />
              </RateContextProvider>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    const rateBase = screen.getByTestId("rate_base");
    const rateQuote = screen.getByTestId("rate_quote");
    const rateSendValue = screen.getByTestId("rate_send_value");
    const rateReceiveValue = screen.getByTestId("rate_receive_value");

    expect(rateBase).toHaveTextContent("USD");
    expect(rateQuote).toHaveTextContent("EUR");
    expect(rateSendValue).toHaveTextContent("0");
    expect(rateReceiveValue).toHaveTextContent("0");
  });

  test("reads existing URL params", () => {
    mockedUseRateRequest.mockReturnValue({
      isPending: false,
      error: null,
      data: [],
    } as unknown as UseQueryResult<Rate[], Error>);

    render(
      <MemoryRouter initialEntries={["/?base=GBP&quote=JPY&send=25"]}>
        <Routes>
          <Route
            path="/"
            element={
              <RateContextProvider>
                <RateTestConsumer />
              </RateContextProvider>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    const rateBase = screen.getByTestId("rate_base");
    const rateQuote = screen.getByTestId("rate_quote");
    const rateSendValue = screen.getByTestId("rate_send_value");
    const rateReceiveValue = screen.getByTestId("rate_receive_value");

    expect(rateBase).toHaveTextContent("GBP");
    expect(rateQuote).toHaveTextContent("JPY");
    expect(rateSendValue).toHaveTextContent("25");
    expect(rateReceiveValue).toHaveTextContent("25");
  });

  test("calculates receiveValue", () => {
    mockedUseRateRequest.mockReturnValue({
      isPending: false,
      error: null,
      data: [
        {
          rate: 10,
        },
      ],
    } as unknown as UseQueryResult<Rate[], Error>);

    render(
      <MemoryRouter initialEntries={["/?base=GBP&quote=JPY&send=25"]}>
        <Routes>
          <Route
            path="/"
            element={
              <RateContextProvider>
                <RateTestConsumer />
              </RateContextProvider>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    const rateReceiveValue = screen.getByTestId("rate_receive_value");

    expect(rateReceiveValue).toHaveTextContent("250");
  });

  test("calculates receiveValue on pending request", () => {
    mockedUseRateRequest.mockReturnValue({
      isPending: true,
      error: null,
      data: [
        {
          rate: 10,
        },
      ],
    } as unknown as UseQueryResult<Rate[], Error>);

    render(
      <MemoryRouter initialEntries={["/?base=GBP&quote=JPY&send=25"]}>
        <Routes>
          <Route
            path="/"
            element={
              <RateContextProvider>
                <RateTestConsumer />
              </RateContextProvider>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    const rateReceiveValue = screen.getByTestId("rate_receive_value");

    expect(rateReceiveValue).toHaveTextContent("0");
  });

  test("calculates receiveValue on invalid send value", () => {
    mockedUseRateRequest.mockReturnValue({
      isPending: true,
      error: null,
      data: [
        {
          rate: 10,
        },
      ],
    } as unknown as UseQueryResult<Rate[], Error>);

    render(
      <MemoryRouter initialEntries={["/?base=GBP&quote=JPY&send=helloWorld"]}>
        <Routes>
          <Route
            path="/"
            element={
              <RateContextProvider>
                <RateTestConsumer />
              </RateContextProvider>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    const rateReceiveValue = screen.getByTestId("rate_receive_value");

    expect(rateReceiveValue).toHaveTextContent("0");
  });

  test("sets base", () => {
    mockedUseRateRequest.mockReturnValue({
      isPending: true,
      error: null,
      data: [
        {
          rate: 10,
        },
      ],
    } as unknown as UseQueryResult<Rate[], Error>);

    render(
      <MemoryRouter initialEntries={["/?base=GBP&quote=JPY&send=helloWorld"]}>
        <Routes>
          <Route
            path="/"
            element={
              <RateContextProvider>
                <RateTestConsumer />
              </RateContextProvider>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    const rateBase = screen.getByTestId("rate_base");
    const baseBtn = screen.getByTestId("base_btn");

    fireEvent.click(baseBtn);

    expect(rateBase).toHaveTextContent("RON");
  });

  test("sets quote", () => {
    mockedUseRateRequest.mockReturnValue({
      isPending: true,
      error: null,
      data: [
        {
          rate: 10,
        },
      ],
    } as unknown as UseQueryResult<Rate[], Error>);

    render(
      <MemoryRouter initialEntries={["/?base=GBP&quote=JPY&send=helloWorld"]}>
        <Routes>
          <Route
            path="/"
            element={
              <RateContextProvider>
                <RateTestConsumer />
              </RateContextProvider>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    const rateQuote = screen.getByTestId("rate_quote");
    const quoteBtn = screen.getByTestId("quote_btn");

    fireEvent.click(quoteBtn);

    expect(rateQuote).toHaveTextContent("CAD");
  });

  test("sets sendValue", () => {
    mockedUseRateRequest.mockReturnValue({
      isPending: true,
      error: null,
      data: [
        {
          rate: 10,
        },
      ],
    } as unknown as UseQueryResult<Rate[], Error>);

    render(
      <MemoryRouter initialEntries={["/?base=GBP&quote=JPY&send=helloWorld"]}>
        <Routes>
          <Route
            path="/"
            element={
              <RateContextProvider>
                <RateTestConsumer />
              </RateContextProvider>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    const rateSendValue = screen.getByTestId("rate_send_value");
    const sendBtn = screen.getByTestId("send_btn");

    fireEvent.click(sendBtn);

    expect(rateSendValue).toHaveTextContent("9999");
  });

  test("sets sendValue", () => {
    mockedUseRateRequest.mockReturnValue({
      isPending: true,
      error: null,
      data: [
        {
          rate: 10,
        },
      ],
    } as unknown as UseQueryResult<Rate[], Error>);

    render(
      <MemoryRouter initialEntries={["/?base=GBP&quote=JPY&send=helloWorld"]}>
        <Routes>
          <Route
            path="/"
            element={
              <RateContextProvider>
                <RateTestConsumer />
              </RateContextProvider>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    const rateBase = screen.getByTestId("rate_base");
    const rateQuote = screen.getByTestId("rate_quote");
    const exchangeBtn = screen.getByTestId("exchange_btn");

    fireEvent.click(exchangeBtn);

    expect(rateBase).toHaveTextContent("JPY");
    expect(rateQuote).toHaveTextContent("GBP");
  });

  test("loads currencies", () => {
    mockedUseRateRequest.mockReturnValue({
      isPending: true,
      error: null,
      data: [
        {
          rate: 10,
        },
      ],
    } as unknown as UseQueryResult<Rate[], Error>);

    render(
      <MemoryRouter initialEntries={["/?base=GBP&quote=JPY&send=helloWorld"]}>
        <Routes>
          <Route
            path="/"
            element={
              <RateContextProvider>
                <RateTestConsumer />
              </RateContextProvider>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    const rateBase = screen.getByTestId("rate_base");
    const rateQuote = screen.getByTestId("rate_quote");
    const loadCurrenciesBtn = screen.getByTestId("load_btn");

    fireEvent.click(loadCurrenciesBtn);

    expect(rateBase).toHaveTextContent("AUD");
    expect(rateQuote).toHaveTextContent("CAD");
  });
});

import { render, screen } from "@testing-library/react";
import RateConverter from "./RateConverter";
import AppWithProviders from "../../tests/AppWithProviders";
import { mockRatesQuery } from "../../tests/queries/rates";
import { mockCurrenciesQuery } from "../../tests/queries/currencies";

describe("<RateConverter />", () => {
  beforeEach(async () => {
    mockRatesQuery();
    mockCurrenciesQuery();
  });

  test("component render", async () => {
    const setCurrency = vi.fn();
    render(
      <AppWithProviders>
        <RateConverter
          title="Send"
          value={1000}
          currency="RON"
          setCurrency={setCurrency}
        />
      </AppWithProviders>,
    );

    const title = screen.getByTestId("rate_converter_title");
    const isReceive = screen.queryByTestId("rate_converter_is_receive");
    const isSend = screen.queryByTestId("rate_converter_is_send");

    expect(title).toHaveTextContent("Send");
    expect(isReceive).not.toBeInTheDocument();
    expect(isSend).toBeInTheDocument();
  });

  test("is receive state", async () => {
    const setCurrency = vi.fn();
    render(
      <AppWithProviders>
        <RateConverter
          isReceive={true}
          title="Receive"
          value={1000}
          currency="RON"
          setCurrency={setCurrency}
        />
      </AppWithProviders>,
    );

    const isReceive = screen.queryByTestId("rate_converter_is_receive");
    const isSend = screen.queryByTestId("rate_converter_is_send");

    expect(isReceive).toBeInTheDocument();
    expect(isSend).not.toBeInTheDocument();
  });
});

import { render, screen, waitFor } from "@testing-library/react";
import LiveMarkets from "./LiveMarkets";
import AppWithProviders from "../../tests/AppWithProviders";
import { mockContexts } from "../../tests/mockContexts";
import { mockRatesQuery } from "../../tests/queries/rates";
import { mockLiveMarketsQuery } from "../../tests/queries/liveMarkets";
import nock from "nock";

// Mock react-smart-ticker cuz otherwise it will throw errors
vi.mock("react-smart-ticker", () => ({
  SmartTicker: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("<LiveMarkets />", () => {
  beforeEach(async () => {
    mockContexts();
    mockRatesQuery();
    mockLiveMarketsQuery();
  });

  test("component render", async () => {
    render(
      <AppWithProviders>
        <LiveMarkets />
      </AppWithProviders>,
    );

    await waitFor(() => expect(nock.isDone()).toBe(true));

    const allMarketItems = screen.queryAllByTestId("market_item");
    const emptyMarketItem = screen.queryByTestId("empty_market_item");

    expect(allMarketItems.length).toEqual(11);
    expect(emptyMarketItem).not.toBeInTheDocument();
  });
});

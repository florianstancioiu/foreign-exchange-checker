import { render, screen } from "@testing-library/react";
import MarketItem from "./MarketItem";

describe("<MarketItem />", () => {
  test("component render", async () => {
    render(
      <MarketItem
        baseCurrency="RON"
        quoteCurrency="MDL"
        rate={1.5}
        rateDiff={0.1}
        rateDiffPercentage={0.1}
      />,
    );

    const baseQuoteCurrency = screen.getByTestId(
      "market_item_base_quote_currency",
    );
    const rate = screen.getByTestId("market_item_rate");
    const rateDiffPercentage = screen.getByTestId(
      "market_item_rate_diff_percentage",
    );

    expect(baseQuoteCurrency).toHaveTextContent("RON/MDL");
    expect(rate).toHaveTextContent("1.5");
    expect(rateDiffPercentage).toHaveTextContent("0.1%");
  });
});

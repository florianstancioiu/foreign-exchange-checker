import { render, screen } from "@testing-library/react";
import CompareItem from "./CompareItem";
import AppWithProviders from "../../../tests/AppWithProviders";
import nock from "nock";
import baseCurrencyToQuoteCurrency from "../../../tests/data/baseCurrencyToQuoteCurrency";

describe("<CompareItem />", () => {
  beforeEach(async () => {
    nock("https://api.frankfurter.dev/v2/rates")
      .get("?base=USD&quotes=EUR")
      .reply(200, baseCurrencyToQuoteCurrency);
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  test("component render", async () => {
    render(
      <AppWithProviders>
        <CompareItem
          currency="ron"
          currencyTitle="Romanian Leu"
          value={1}
          subValue={1}
        />
      </AppWithProviders>,
    );

    const currency = await screen.getByTestId("compare_item_currency");
    const currencyTitle = await screen.getByTestId(
      "compare_item_currency_title",
    );
    const value = await screen.getByTestId("compare_item_value");
    const subValue = await screen.getByTestId("compare_item_sub_value");
    const favoriteBtn = await screen.getByTestId("compare_item_favorite_btn");

    expect(currency).toHaveTextContent("ron");
    expect(currencyTitle).toHaveTextContent("Romanian Leu");
    expect(value).toHaveTextContent("1");
    expect(subValue).toHaveTextContent("1");
    expect(favoriteBtn).not.toHaveClass("border-lime-500 text-lime-500");
  });

  test("favorite component render", async () => {
    render(
      <AppWithProviders>
        <CompareItem
          currency="ron"
          currencyTitle="Romanian Leu"
          value={1}
          subValue={1}
          isFavorite
        />
      </AppWithProviders>,
    );

    const favoriteBtn = await screen.getByTestId("compare_item_favorite_btn");

    expect(favoriteBtn).toHaveClass("border-lime-500 text-lime-500");
  });
});

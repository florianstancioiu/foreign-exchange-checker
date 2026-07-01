import { render, screen } from "@testing-library/react";
import FavoriteItem from "./FavoriteItem";
import nock from "nock";
import AppWithProviders from "../../../tests/AppWithProviders";
import baseCurrencyToQuoteCurrency from "../../../tests/data/baseCurrencyToQuoteCurrency";

describe("<FavoriteItem />", () => {
  beforeEach(async () => {
    nock("https://api.frankfurter.dev/v2/rates")
      .get("?base=USD&quotes=EUR")
      .reply(200, baseCurrencyToQuoteCurrency);
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  const firstCurrency = "USD";
  const secondCurrency = "EUR";

  test("component render", async () => {
    render(
      <AppWithProviders>
        <FavoriteItem
          firstCurrency={firstCurrency}
          secondCurrency={secondCurrency}
        />
      </AppWithProviders>,
    );

    const loadCurrenciesBtn = await screen.getByTestId(
      "favorite_item_load_currencies_button",
    );

    expect(loadCurrenciesBtn).toHaveTextContent(firstCurrency);
    expect(loadCurrenciesBtn).toHaveTextContent(secondCurrency);
  });
});

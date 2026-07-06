import { render, screen } from "@testing-library/react";
import FavoriteItem from "./FavoriteItem";
import AppWithProviders from "../../../tests/AppWithProviders";
import { mockRatesQuery } from "../../../tests/queries/rates";
import { mockContexts } from "../../../tests/mockContexts";

describe("<FavoriteItem />", () => {
  beforeEach(async () => {
    mockRatesQuery();
    mockContexts();
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

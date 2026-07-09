import { render, screen } from "@testing-library/react";
import FavoriteItem from "./FavoriteItem";
import AppWithProviders from "../../../tests/AppWithProviders";
import { mockRatesQuery } from "../../../tests/queries/rates";

describe("<FavoriteItem />", () => {
  beforeEach(async () => {
    mockRatesQuery();
  });

  const base = "USD";
  const quote = "EUR";

  test("component render", async () => {
    render(
      <AppWithProviders>
        <FavoriteItem base={base} quote={quote} />
      </AppWithProviders>,
    );

    const loadCurrenciesBtn = await screen.getByTestId(
      "favorite_item_load_currencies_button",
    );

    expect(loadCurrenciesBtn).toHaveTextContent(base);
    expect(loadCurrenciesBtn).toHaveTextContent(quote);
  });
});

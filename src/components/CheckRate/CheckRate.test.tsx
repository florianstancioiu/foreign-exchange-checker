/*
import { render, screen } from "@testing-library/react";
import CheckRate from "./CheckRate";
import AppWithProviders from "../../tests/AppWithProviders";
import nock from "nock";
import baseCurrencyToQuoteCurrency from "../../tests/data/baseCurrencyToQuoteCurrency";
import * as favoritesContext from "../../contexts/FavoritesContext";

vi.mock(import("../../contexts/FavoritesContext"));

describe("<CheckRate />", () => {
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
    const mockUseFavoritesContext = {
      favorites: [],
      toggleFavorite: vi.fn(),
      isFavorited: vi.fn(),
    };

    vi.spyOn(favoritesContext, "useFavoritesContext").mockResolvedValue(
      mockUseFavoritesContext,
    );

    render(
      <AppWithProviders>
        <CheckRate />
      </AppWithProviders>,
    );

    const isFavoritedBtn = await screen.getByTestId(
      "check_rate_is_favorited_btn",
    );
    const isNotFavoritedBtn = await screen.queryByTestId(
      "check_rate_is_not_favorited_btn",
    );
    
    
    expect(isFavoritedBtn).toBeInTheDocument();
    expect(isNotFavoritedBtn).not.toBeInTheDocument();

    expect(mockUseFavoritesContext.isFavorited).toHaveBeenCalledTimes(2);
  });
});


*/

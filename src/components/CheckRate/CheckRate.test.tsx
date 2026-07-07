import { render, screen } from "@testing-library/react";
import CheckRate from "./CheckRate";
import AppWithProviders from "../../tests/AppWithProviders";
import { mockContexts } from "../../tests/mockContexts";
import { mockRatesQuery } from "../../tests/queries/rates";
import { createFavoritesContext } from "../../tests/mocks/favoritesContext";
import { useFavoritesContext } from "../../hooks/useFavoritesContext";

describe("<CheckRate />", () => {
  beforeEach(async () => {
    mockContexts();
    mockRatesQuery();
  });

  test("component render", async () => {
    render(
      <AppWithProviders>
        <CheckRate />
      </AppWithProviders>,
    );

    const isFavoritedBtn = await screen.queryByTestId(
      "check_rate_is_favorited_btn",
    );
    const isNotFavoritedBtn = await screen.queryByTestId(
      "check_rate_is_not_favorited_btn",
    );

    expect(isFavoritedBtn).toBeInTheDocument();
    expect(isNotFavoritedBtn).not.toBeInTheDocument();
  });

  test("component render with a non favorite", async () => {
    vi.mocked(useFavoritesContext).mockReturnValue(
      createFavoritesContext({
        isFavorited: vi.fn(() => false),
      }),
    );

    render(
      <AppWithProviders>
        <CheckRate />
      </AppWithProviders>,
    );

    const isFavoritedBtn = await screen.queryByTestId(
      "check_rate_is_favorited_btn",
    );
    const isNotFavoritedBtn = await screen.queryByTestId(
      "check_rate_is_not_favorited_btn",
    );

    expect(isFavoritedBtn).not.toBeInTheDocument();
    expect(isNotFavoritedBtn).toBeInTheDocument();
  });
});

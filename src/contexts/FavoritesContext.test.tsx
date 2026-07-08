import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { FavoritesContextProvider } from "./FavoritesContext";
import FavoritesTestConsumer from "./FavoritesTestConsumer";
import { useFavoritesContext } from "../hooks/useFavoritesContext";

vi.mock("../hooks/useFavoritesContext", () => ({
  useFavoritesContext: vi.fn(),
}));

const mockedUseFavoritesContext = vi.mocked(useFavoritesContext);

describe("FavoritesContext", async () => {
  beforeEach(() => {
    mockedUseFavoritesContext.mockReturnValue({
      favorites: [],
      isFavorited: vi.fn(() => false),
      toggleFavorite: vi.fn(),
    });
  });

  test("no favorites", () => {
    render(
      <FavoritesContextProvider>
        <FavoritesTestConsumer />
      </FavoritesContextProvider>,
    );

    expect(screen.getByTestId("favorites-count")).toHaveTextContent("0");
    expect(screen.getByTestId("is-favorited")).toHaveTextContent("false");
  });

  test("is favorited", () => {
    mockedUseFavoritesContext.mockReturnValue({
      favorites: [
        {
          id: "USD-EUR",
          base: "USD",
          quote: "EUR",
        },
      ],
      isFavorited: vi.fn(() => true),
      toggleFavorite: vi.fn(),
    });

    render(
      <FavoritesContextProvider>
        <FavoritesTestConsumer />
      </FavoritesContextProvider>,
    );

    expect(screen.getByTestId("favorites-count")).toHaveTextContent("1");
    expect(screen.getByTestId("is-favorited")).toHaveTextContent("true");
  });
});

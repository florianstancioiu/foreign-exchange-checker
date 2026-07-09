import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { FavoritesContextProvider } from "./FavoritesContext";
import FavoritesTestConsumer from "./FavoritesTestConsumer";
import { useLocalStorage } from "usehooks-ts";
import { fireEvent } from "@testing-library/react";

vi.mock("usehooks-ts", () => ({
  useLocalStorage: vi.fn(),
}));
const mockedUseLocalStorage = vi.mocked(useLocalStorage);

describe("FavoritesContext", async () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("no favorites", () => {
    const setFavorites = vi.fn();
    const removeFavorites = vi.fn();

    mockedUseLocalStorage.mockReturnValue([[], setFavorites, removeFavorites]);

    render(
      <FavoritesContextProvider>
        <FavoritesTestConsumer />
      </FavoritesContextProvider>,
    );

    const favoritesCount = screen.getByTestId("favorites_count");
    const isFavorited = screen.getByTestId("is_favorited");

    expect(favoritesCount).toHaveTextContent("0");
    expect(isFavorited).toHaveTextContent("false");
  });

  test("is favorited", () => {
    const setFavorites = vi.fn();
    const removeFavorites = vi.fn();

    mockedUseLocalStorage.mockReturnValue([
      [
        {
          id: "USD-EUR",
          base: "USD",
          quote: "EUR",
        },
      ],
      setFavorites,
      removeFavorites,
    ]);

    render(
      <FavoritesContextProvider>
        <FavoritesTestConsumer />
      </FavoritesContextProvider>,
    );

    const favoritesCount = screen.getByTestId("favorites_count");
    const isFavorited = screen.getByTestId("is_favorited");

    expect(favoritesCount).toHaveTextContent("1");
    expect(isFavorited).toHaveTextContent("true");
  });

  test("adds a favorite", () => {
    const setFavorites = vi.fn();
    const removeFavorites = vi.fn();

    mockedUseLocalStorage.mockReturnValue([[], setFavorites, removeFavorites]);

    render(
      <FavoritesContextProvider>
        <FavoritesTestConsumer />
      </FavoritesContextProvider>,
    );

    const toggleFavoriteBtn = screen.getByTestId("toggle_favorite_btn");

    fireEvent.click(toggleFavoriteBtn);

    const updater = setFavorites.mock.calls[0][0];

    expect(setFavorites).toHaveBeenCalledOnce();
    expect(updater([])).toEqual([
      {
        id: "USD-EUR",
        base: "USD",
        quote: "EUR",
      },
    ]);
  });

  test("removes an existing favorite", () => {
    const setFavorites = vi.fn();
    const removeFavorites = vi.fn();

    mockedUseLocalStorage.mockReturnValue([
      [
        {
          id: "USD-EUR",
          base: "USD",
          quote: "EUR",
        },
      ],
      setFavorites,
      removeFavorites,
    ]);

    render(
      <FavoritesContextProvider>
        <FavoritesTestConsumer />
      </FavoritesContextProvider>,
    );

    const toggleFavoriteBtn = screen.getByTestId("toggle_favorite_btn");

    fireEvent.click(toggleFavoriteBtn);

    const updater = setFavorites.mock.calls[0][0];

    expect(setFavorites).toHaveBeenCalledOnce();
    expect(
      updater([
        {
          id: "USD-EUR",
          base: "USD",
          quote: "EUR",
        },
      ]),
    ).toEqual([]);
  });

  test("adds a favorite when favorites are undefined", () => {
    const setFavorites = vi.fn();
    const removeFavorites = vi.fn();

    mockedUseLocalStorage.mockReturnValue([
      undefined,
      setFavorites,
      removeFavorites,
    ]);

    render(
      <FavoritesContextProvider>
        <FavoritesTestConsumer />
      </FavoritesContextProvider>,
    );

    const toggleFavoriteBtn = screen.getByTestId("toggle_favorite_btn");

    fireEvent.click(toggleFavoriteBtn);

    const updater = setFavorites.mock.calls[0][0];

    expect(setFavorites).toHaveBeenCalledOnce();
    expect(updater(undefined)).toEqual([
      {
        id: "USD-EUR",
        base: "USD",
        quote: "EUR",
      },
    ]);
  });
});

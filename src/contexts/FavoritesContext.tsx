import { use, createContext, type ReactNode } from "react";
import { useLocalStorage } from "usehooks-ts";

type FavoriteLSItem = {
  id: string;
  base: string;
  quote: string;
};

export type FavoritesState = {
  favorites: FavoriteLSItem[] | undefined;
  toggleFavorite: (base: string, quote: string) => void;
  isFavorited: (base: string, quote: string) => boolean;
};

const FavoritesContext = createContext<FavoritesState | null>(null);

export type FavoritesContextProps = {
  children: ReactNode;
};

export const FavoritesContextProvider = ({
  children,
}: FavoritesContextProps) => {
  const [favorites, setFavorites] = useLocalStorage<
    FavoriteLSItem[] | undefined
  >("favorites:v1", []);

  const toggleFavorite = (base: string, quote: string) => {
    const upperBase = base.toUpperCase();
    const upperQuote = quote.toUpperCase();
    const id = `${upperBase}-${upperQuote}`;

    setFavorites((favs) => {
      if (favs?.find((item) => item.id === id)) {
        return favs.filter((favItem) => favItem.id !== id);
      }

      if (favs === undefined) {
        return [
          {
            id,
            base: upperBase,
            quote: upperQuote,
          },
        ];
      }

      favs?.push({
        id,
        base: upperBase,
        quote: upperQuote,
      });

      return favs;
    });
  };

  const isFavorited = (base: string, quote: string) => {
    if (favorites === undefined) {
      return false;
    }

    return (
      favorites.findIndex(
        (item) => item.id === `${base.toUpperCase()}-${quote.toUpperCase()}`,
      ) >= 0
    );
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorited,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = () => {
  const context = use(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavoritesContext must be used within <FavoritesContextProvider />",
    );
  }

  return context;
};

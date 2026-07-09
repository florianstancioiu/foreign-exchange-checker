import { createContext, type ReactNode } from "react";
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

export const FavoritesContext = createContext<FavoritesState | null>(null);

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
    const id = `${base}-${quote}`;

    setFavorites((favs) => {
      if (favs?.find((item) => item.id === id)) {
        return favs.filter((favItem) => favItem.id !== id);
      }

      if (favs === undefined) {
        return [
          {
            id,
            base,
            quote,
          },
        ];
      }

      return [
        ...favs,
        {
          id,
          base,
          quote,
        },
      ];
    });
  };

  const isFavorited = (base: string, quote: string) => {
    if (favorites === undefined) {
      return false;
    }

    return favorites.findIndex((item) => item.id === `${base}-${quote}`) >= 0;
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

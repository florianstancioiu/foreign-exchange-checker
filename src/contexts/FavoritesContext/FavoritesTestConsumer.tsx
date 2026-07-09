import { useFavoritesContext } from "../../hooks/useFavoritesContext";

const FavoritesTestConsumer = () => {
  const { favorites, isFavorited, toggleFavorite } = useFavoritesContext();

  return (
    <>
      <p data-testid="favorites_count">{favorites?.length ?? 0}</p>
      <p data-testid="is_favorited">{isFavorited("USD", "EUR").toString()}</p>
      <button
        onClick={() => toggleFavorite("USD", "EUR")}
        data-testid="toggle_favorite_btn"
      >
        Toggle
      </button>
    </>
  );
};

export default FavoritesTestConsumer;

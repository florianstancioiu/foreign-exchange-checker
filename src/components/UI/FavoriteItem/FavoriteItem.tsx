import ArrowRightSvg from "../../../images/icon-arrow-right.svg?react";
import StarFilledSvg from "../../../images/icon-star-filled.svg?react";
import { useFavoritesContext } from "../../../contexts/FavoritesContext";
import { useRateContext } from "../../../contexts/RateContext";

export type FavoriteItemProps = {
  firstCurrency: string;
  secondCurrency: string;
};

const FavoriteItem = ({ firstCurrency, secondCurrency }: FavoriteItemProps) => {
  const { toggleFavorite } = useFavoritesContext();
  const { loadCurrencies } = useRateContext();

  return (
    <section className="border border-neutral-500 rounded-[10px] bg-neutral-600 p-3 flex gap-x-2.5 justify-between items-center md:px-4 hover:border-neutral-300">
      <button
        type="button"
        onClick={() => loadCurrencies(firstCurrency, secondCurrency)}
        data-testid="favorite_item_load_currencies_button"
        className="flex items-center gap-2.5 text-sm font-normal leading-[120%] tracking-[1px] text-neutral-50 uppercase cursor-pointer"
      >
        <span>{firstCurrency}</span>
        <ArrowRightSvg />
        <span>{secondCurrency}</span>
      </button>
      <div className="flex justify-between items-center gap-x-2.5 md:gap-x-5">
        <button
          type="button"
          onClick={() => toggleFavorite(firstCurrency, secondCurrency)}
          className="size-8 border border-lime-500 text-lime-500 rounded-[10px] grid place-content-center cursor-pointer focus-visible:outline-lime-500 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:rounded-lg hover:bg-neutral-500"
          data-testid="favorite_item_toggle_favorite_button"
        >
          <StarFilledSvg />
        </button>
      </div>
    </section>
  );
};

export default FavoriteItem;

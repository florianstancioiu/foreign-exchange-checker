import ArrowRightSvg from "../../../images/icon-arrow-right.svg?react";
import StarFilledSvg from "../../../images/icon-star-filled.svg?react";
import { useFavoritesContext } from "../../../hooks/useFavoritesContext";
import { useRateContext } from "../../../hooks/useRateContext";

export type FavoriteItemProps = {
  base: string;
  quote: string;
};

const FavoriteItem = ({ base, quote }: FavoriteItemProps) => {
  const { toggleFavorite } = useFavoritesContext();
  const { loadCurrencies } = useRateContext();

  return (
    <li className="border border-neutral-500 rounded-[10px] bg-neutral-600 light:bg-blue-200 light:border-blue-300 p-3 flex gap-x-2.5 justify-between items-center md:px-4 hover:border-neutral-300 light:hover:border-blue-400">
      <button
        type="button"
        onClick={() => loadCurrencies(base, quote)}
        data-testid="favorite_item_load_currencies_button"
        aria-label={`Load ${base} and ${quote} in Check the Rate`}
        className="flex items-center gap-2.5 text-sm font-normal leading-[120%] tracking-[1px] text-neutral-50 uppercase cursor-pointer light:text-neutral-900 focus-visible:outline-lime-500 light:focus-visible:outline-blue-500 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:rounded-lg"
      >
        <span>{base}</span>
        <ArrowRightSvg className="light:text-neutral-900" />
        <span>{quote}</span>
      </button>
      <div className="flex justify-between items-center gap-x-2.5 md:gap-x-5">
        <button
          type="button"
          onClick={() => toggleFavorite(base, quote)}
          className="size-8 border border-lime-500 text-lime-500 light:bg-blue-500 light:border-blue-600 rounded-[10px] grid place-content-center cursor-pointer focus-visible:outline-lime-500 light:focus-visible:outline-blue-500 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:rounded-lg hover:bg-neutral-500"
          data-testid="favorite_item_toggle_favorite_button"
          aria-label="Toggle favorite"
        >
          <StarFilledSvg />
        </button>
      </div>
    </li>
  );
};

export default FavoriteItem;

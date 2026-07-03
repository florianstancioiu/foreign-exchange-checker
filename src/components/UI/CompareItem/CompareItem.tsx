import StarSvg from "../../../images/icon-star.svg?react";
import StarFilledSvg from "../../../images/icon-star-filled.svg?react";
import { useFavoritesContext } from "../../../contexts/FavoritesContext";
import { useRateContext } from "../../../contexts/RateContext";

export type CompareItemProps = {
  currency: string;
  currencyTitle: string;
  value: number;
  subValue: number;
  isFavorite?: boolean;
};

const CompareItem = ({
  currency,
  currencyTitle,
  value,
  subValue,
  isFavorite,
}: CompareItemProps) => {
  const { firstCurrency } = useRateContext();
  const { toggleFavorite } = useFavoritesContext();

  return (
    <section className="border border-neutral-500 rounded-[10px] bg-neutral-600 p-3 flex gap-x-2.5 justify-between items-center md:py-3 md:px-4 hover:border-neutral-300 light:bg-blue-100 light:border-blue-200">
      <div className="flex items-center gap-2.5 md:gap-5">
        <img
          src={`/foreign-exchange-checker/images/svg-flags/${currency.substring(0, 2).toUpperCase()}.svg`}
          alt={`${currencyTitle} flag`}
          className="size-6 rounded-full"
        />
        <div>
          <p
            data-testid="compare_item_currency"
            className="text-sm font-normal leading-[120%] tracking-[1px] text-neutral-50 mb-1.5 uppercase light:text-neutral-900"
          >
            {currency}
          </p>
          <p
            data-testid="compare_item_currency_title"
            className="text-xs font-normal leading-[120%] tracking-[0.5px] text-neutral-200 light:text-neutral-700"
          >
            {currencyTitle}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center gap-x-2.5 md:gap-5">
        <div className="text-right">
          <p
            data-testid="compare_item_value"
            className="text-base font-normal leading-[120%] tracking-[1px] text-neutral-50 mb-1.5 light:text-neutral-900"
          >
            {value.toFixed(2)}
          </p>
          <p
            data-testid="compare_item_sub_value"
            className="text-[10px] font-normal leading-[100%] text-neutral-200 light:text-neutral-700"
          >
            @ {subValue.toFixed(4)}
          </p>
        </div>
        {isFavorite ? (
          <button
            type="button"
            data-testid="compare_item_favorite_btn"
            onClick={() => toggleFavorite(firstCurrency, currency)}
            aria-label={`Unfavorite the ${firstCurrency} - ${currency} pair`}
            className="light:bg-blue-500 light:border-blue-600 light:hover:text-neutral-50 size-8 border border-lime-500 text-lime-500 rounded-[10px] grid place-content-center cursor-pointer focus-visible:outline-lime-500 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:rounded-lg hover:bg-neutral-500"
          >
            <StarFilledSvg />
          </button>
        ) : (
          <button
            type="button"
            data-testid="compare_item_favorite_btn"
            onClick={() => toggleFavorite(firstCurrency, currency)}
            aria-label={`Favorite the ${firstCurrency} - ${currency} pair`}
            className="size-8 border border-neutral-500 light:hover:text-neutral-50  rounded-[10px] grid place-content-center cursor-pointer focus-visible:outline-lime-500 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:rounded-lg hover:bg-neutral-500"
          >
            <StarSvg />
          </button>
        )}
      </div>
    </section>
  );
};

export default CompareItem;

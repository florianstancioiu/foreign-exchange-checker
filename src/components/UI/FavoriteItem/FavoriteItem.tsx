import ArrowRightSvg from "../../../images/icon-arrow-right.svg?react";
import StarFilledSvg from "../../../images/icon-star-filled.svg?react";
// import ChevronDownSvg from "../../../images/icon-chevron-down.svg?react";
import { useFavoritesContext } from "../../../contexts/FavoritesContext";
import { useRateContext } from "../../../contexts/RateContext";

export type FavoriteItemProps = {
  firstCurrency: string;
  secondCurrency: string;
  value: number;
  percentageValue: number;
};

const FavoriteItem = ({ firstCurrency, secondCurrency }: FavoriteItemProps) => {
  const { toggleFavorite } = useFavoritesContext();
  const { loadCurrencies } = useRateContext();

  return (
    <section className="border border-neutral-500 rounded-[10px] bg-neutral-600 p-3 flex gap-x-2.5 justify-between items-center md:px-4 hover:border-neutral-300">
      <button
        type="button"
        onClick={() => loadCurrencies(firstCurrency, secondCurrency)}
        className="flex items-center gap-2.5 text-sm font-normal leading-[120%] tracking-[1px] text-neutral-50 uppercase cursor-pointer"
      >
        <span>{firstCurrency}</span>
        <ArrowRightSvg />
        <span>{secondCurrency}</span>
      </button>
      <div className="flex justify-between items-center gap-x-2.5 md:gap-x-5">
        {/* 
        <div className="text-right">
          <p className="text-base font-normal leading-[120%] tracking-[1px] text-neutral-50 mb-1.5">
            {value}
          </p>
          <p
            className={`${percentageValue > 0 ? "text-green-500" : "text-red-500"} text-[10px] font-normal leading-[100%] flex gap-x-1.5 items-center`}
          >
            <ChevronDownSvg
              className={`${percentageValue > 0 ? "rotate-180" : ""} size-4`}
            />
            <span>{percentageValue}</span>
          </p>
        </div>
        */}

        <button
          type="button"
          onClick={() => toggleFavorite(firstCurrency, secondCurrency)}
          className="size-8 border border-lime-500 text-lime-500 rounded-[10px] grid place-content-center cursor-pointer focus-visible:outline-lime-500 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:rounded-lg hover:bg-neutral-500"
        >
          <StarFilledSvg />
        </button>
      </div>
    </section>
  );
};

export default FavoriteItem;

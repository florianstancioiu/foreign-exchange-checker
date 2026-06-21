import StarSvg from "../../../images/icon-star.svg?react";
import StarFilledSvg from "../../../images/icon-star-filled.svg?react";

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
  return (
    <section className="border border-neutral-500 rounded-[10px] bg-neutral-600 p-3 flex gap-x-2.5 justify-between items-center md:py-3 md:px-4">
      <div className="flex items-center gap-2.5 md:gap-5">
        <img
          src={`/foreign-exchange-checker/images/svg-flags/${currency.substring(0, 2).toUpperCase()}.svg`}
          alt={`${currencyTitle} flag`}
          className="size-6 rounded-full"
        />
        <div>
          <p className="text-sm font-normal leading-[120%] tracking-[1px] text-neutral-50 mb-1.5 uppercase">
            {currency}
          </p>
          <p className="text-xs font-normal leading-[120%] tracking-[0.5px] text-neutral-200">
            {currencyTitle}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center gap-x-2.5 md:gap-5">
        <div className="text-right">
          <p className="text-base font-normal leading-[120%] tracking-[1px] text-neutral-50 mb-1.5">
            {value}
          </p>
          <p className="text-[10px] font-normal leading-[100%] text-neutral-200">
            @ {subValue}
          </p>
        </div>
        {isFavorite ? (
          <button
            type="button"
            className="size-8 border border-lime-500 text-lime-500 rounded-[10px] grid place-content-center cursor-pointer focus-visible:outline-lime-500 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:rounded-lg"
          >
            <StarFilledSvg />
          </button>
        ) : (
          <button
            type="button"
            className="size-8 border border-neutral-500 rounded-[10px] grid place-content-center cursor-pointer focus-visible:outline-lime-500 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:rounded-lg"
          >
            <StarSvg />
          </button>
        )}
      </div>
    </section>
  );
};

export default CompareItem;

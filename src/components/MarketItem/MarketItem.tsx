import ChevronDownSvg from "../../images/icon-chevron-down.svg?react";

export type MarketItemProps = {
  baseCurrency: string;
  quoteCurrency: string;
  rate: number;
  rateDiff: number;
  rateDiffPercentage: string;
};

const MarketItem = ({
  baseCurrency,
  quoteCurrency,
  rate,
  rateDiff,
  rateDiffPercentage,
}: MarketItemProps) => {
  return (
    <div className="flex items-center gap-x-2 px-5 py-2 bg-neutral-700 border-r border-neutral-500 md:py-3 select-none light:bg-neutral-400 light:border-neutral-300">
      <p className="text-neutral-200 light:text-neutral-100">
        {baseCurrency}/{quoteCurrency}
      </p>
      <p className="text-neutral-50">{rate}</p>
      <p
        className={`${rateDiff > 0 ? "text-green-500 light:text-green-400" : "text-red-500 light:text-red-400"} flex gap-x-1 items-center`}
      >
        <ChevronDownSvg
          fill="currentColor"
          className={`${rateDiff > 0 ? "text-green-500 rotate-180 light:text-green-400" : "text-red-500 light:text-red-400"}`}
        />
        {rateDiffPercentage}%
      </p>
    </div>
  );
};

export default MarketItem;

import ChevronDownSvg from "../../images/icon-chevron-down.svg?react";

export type MarketItemProps = {
  baseCurrency: string;
  quoteCurrency: string;
  rate: number;
  rateDiff: number;
  rateDiffPercentage: string | number;
};

const MarketItem = ({
  baseCurrency,
  quoteCurrency,
  rate,
  rateDiff,
  rateDiffPercentage,
}: MarketItemProps) => {
  return (
    <div
      className="flex items-center gap-x-2 px-5 py-2 bg-neutral-700 border-r border-neutral-500 md:py-3 select-none light:bg-blue-100 light:border-neutral-100"
      data-testid="market_item"
    >
      <p
        className="text-neutral-200 light:text-neutral-800 light:font-bold"
        data-testid="market_item_base_quote_currency"
      >
        {baseCurrency}/{quoteCurrency}
      </p>
      <p
        className="text-neutral-50 light:text-neutral-700"
        data-testid="market_item_rate"
      >
        {rate}
      </p>
      <p
        className={`${rateDiff > 0 ? "text-green-500 light:text-green-700" : "text-red-500 light:text-red-700"} flex gap-x-1 items-center`}
        data-testid="market_item_rate_diff_percentage"
      >
        <ChevronDownSvg
          fill="currentColor"
          className={`${rateDiff > 0 ? "text-green-500 rotate-180 light:text-green-700" : "text-red-500 light:text-red-700"}`}
        />
        {rateDiffPercentage}%
      </p>
    </div>
  );
};

export default MarketItem;

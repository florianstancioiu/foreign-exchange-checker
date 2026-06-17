import ChevronDownSvg from "../../images/icon-chevron-down.svg?react";

export type MarketItemProps = {
  firstCurrency: string;
  secondCurrency: string;
  value: number;
  procentageValue: number;
};

const MarketItem = ({
  firstCurrency,
  secondCurrency,
  value,
  procentageValue,
}: MarketItemProps) => {
  return (
    <div className="flex items-center gap-x-2 px-5 py-2 bg-neutral-700 border-r border-neutral-500 md:py-3">
      <p className="text-neutral-200">
        {firstCurrency}/{secondCurrency}
      </p>
      <p className="text-neutral-50">{value}</p>
      <p
        className={`${procentageValue > 0 ? "text-green-500" : "text-red-500"} flex gap-x-1 items-center`}
      >
        <ChevronDownSvg
          fill="currentColor"
          className={`${procentageValue > 0 ? "text-green-500 rotate-180" : "text-red-500"}`}
        />
        {procentageValue}%
      </p>
    </div>
  );
};

export default MarketItem;

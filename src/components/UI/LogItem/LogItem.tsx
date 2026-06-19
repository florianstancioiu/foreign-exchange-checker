import ArrowRightSvg from "../../../images/icon-arrow-right.svg?react";
import DeleteSvg from "../../../images/icon-delete.svg?react";

export type LogItemProps = {
  dateRange: string;
  firstCurrency: string;
  secondCurrency: string;
  firstValue: number;
  secondValue: number;
};

const LogItem = ({
  dateRange,
  firstCurrency,
  secondCurrency,
  firstValue,
  secondValue,
}: LogItemProps) => {
  return (
    <section className="border border-neutral-500 rounded-[10px] bg-neutral-600 p-3 flex gap-x-2.5 justify-between items-center">
      <div className="flex flex-col gap-y-1 md:flex-row md:gap-x-4">
        <p className="text-neutral-200 text-sm font-normal leading-[120%] tracking-[1px] md:min-w-16">
          {dateRange}
        </p>
        <div className="flex items-center gap-2.5 text-sm font-normal leading-[120%] tracking-[1px] text-neutral-50 uppercase">
          <span>{firstCurrency}</span>
          <ArrowRightSvg />
          <span>{secondCurrency}</span>
        </div>
      </div>
      <div className="flex justify-between items-center gap-x-2.5 md:gap-x-4">
        <div className="md:flex md:gap-x-5">
          <p className="text-base text-right font-normal leading-[120%] tracking-[1px] text-neutral-100">
            {(Math.round(firstValue * 100) / 100).toFixed(2)}
          </p>
          <p className="text-lime-500 text-right text-base font-normal leading-[120%] tracking-[1px]">
            {(Math.round(secondValue * 100) / 100).toFixed(2)}
          </p>
        </div>
        <div className="size-8 border border-neutral-500 rounded-[10px] grid place-content-center cursor-pointer">
          <DeleteSvg className="text-neutral-50" />
        </div>
      </div>
    </section>
  );
};

export default LogItem;

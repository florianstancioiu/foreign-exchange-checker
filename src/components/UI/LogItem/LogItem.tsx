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
      <div className="flex flex-col gap-y-1">
        <p className="text-neutral-200 text-sm font-normal leading-[120%] tracking-[1px]">
          {dateRange}
        </p>
        <div className="flex items-center gap-2.5 text-sm font-normal leading-[120%] tracking-[1px] text-neutral-50 uppercase">
          <span>{firstCurrency}</span>
          <ArrowRightSvg />
          <span>{secondCurrency}</span>
        </div>
      </div>
      <div className="flex justify-between items-center gap-x-2.5">
        <div>
          <p className="text-base text-right font-normal leading-[120%] tracking-[1px] text-neutral-100 mb-1.5">
            {firstValue}
          </p>
          <p className="text-lime-500 text-right text-base font-normal leading-[120%] tracking-[1px] flex gap-x-1.5 items-center">
            {secondValue}
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

import ArrowRightSvg from "../../../images/icon-arrow-right.svg?react";
import DeleteSvg from "../../../images/icon-delete.svg?react";
import { useLogsContext } from "../../../contexts/LogsContext";

export type LogItemProps = {
  id: string;
  dateRange: string;
  base: string;
  quote: string;
  firstValue: number;
  secondValue: number;
};

const LogItem = ({
  id,
  dateRange,
  base,
  quote,
  firstValue,
  secondValue,
}: LogItemProps) => {
  const { removeLog } = useLogsContext();

  return (
    <section className="border border-neutral-500 rounded-[10px] bg-neutral-600 p-3 flex gap-x-2.5 justify-between items-center hover:border-neutral-300">
      <div className="flex flex-col gap-y-1 md:flex-row md:gap-x-4">
        <p className="text-neutral-200 text-sm font-normal leading-[120%] tracking-[1px] md:min-w-16">
          {dateRange}
        </p>
        <div className="flex items-center gap-2.5 text-sm font-normal leading-[120%] tracking-[1px] text-neutral-50 uppercase">
          <span>{base}</span>
          <ArrowRightSvg />
          <span>{quote}</span>
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
        <button
          type="button"
          onClick={() => removeLog(id)}
          className="size-8 border border-neutral-500 rounded-[10px] grid place-content-center cursor-pointer focus-visible:outline-lime-500 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:rounded-lg hover:bg-neutral-500"
        >
          <DeleteSvg className="text-neutral-50" />
        </button>
      </div>
    </section>
  );
};

export default LogItem;

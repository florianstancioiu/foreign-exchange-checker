import ArrowRightSvg from "../../../images/icon-arrow-right.svg?react";
import DeleteSvg from "../../../images/icon-delete.svg?react";
import { useLogsContext } from "../../../hooks/useLogsContext";
import toFixed from "../../../helpers/toFixed";

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
    <section className="border border-neutral-500 rounded-[10px] bg-neutral-600 light:bg-blue-200 light:border-blue-300 p-3 flex gap-x-2.5 justify-between items-center hover:border-neutral-300 light:hover:border-blue-400">
      <div className="flex flex-col gap-y-1 md:flex-row md:gap-x-4">
        <p
          className="text-neutral-200 text-sm font-normal leading-[120%] tracking-[1px] md:min-w-16 light:text-neutral-700"
          data-testid="log_item_daterange"
        >
          {dateRange}
        </p>
        <div
          className="flex items-center gap-2.5 text-sm font-normal leading-[120%] tracking-[1px] text-neutral-50 uppercase light:text-neutral-900"
          data-testid="log_item_base_quote"
        >
          <span>{base}</span>
          <ArrowRightSvg />
          <span>{quote}</span>
        </div>
      </div>
      <div className="flex justify-between items-center gap-x-2.5 md:gap-x-4">
        <div className="md:flex md:gap-x-5">
          <p
            className="text-base text-right font-normal leading-[120%] tracking-[1px] text-neutral-100 light:text-neutral-700"
            data-testid="log_item_first_value"
          >
            {toFixed(Math.round(firstValue * 100) / 100, 2)}
          </p>
          <p
            className="text-lime-500 text-right text-base font-normal leading-[120%] tracking-[1px] light:text-lime-600"
            data-testid="log_item_second_value"
          >
            {toFixed(Math.round(secondValue * 100) / 100, 2)}
          </p>
        </div>
        <button
          type="button"
          onClick={() => removeLog(id)}
          aria-label="Remove log item"
          className="size-8 border border-neutral-500 light:bg-red-500 light:border-red-600 rounded-[10px] grid place-content-center cursor-pointer focus-visible:outline-lime-500 light:focus-visible:outline-blue-500 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:rounded-lg hover:bg-neutral-500"
        >
          <DeleteSvg className="text-neutral-50" />
        </button>
      </div>
    </section>
  );
};

export default LogItem;

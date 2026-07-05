export type Range = {
  id: number;
  title: string;
  value: number;
};

export type DateRangeProps = {
  ranges: Range[];
  active: number;
  onChangeActive: (rangeValue: number) => void;
};

const DateRange = ({ ranges, active, onChangeActive }: DateRangeProps) => {
  return (
    <section className="inline-flex items-center bg-neutral-700 rounded-lg mb-4 text-neutral-200 xl:mb-0 light:bg-blue-100 light:text-neutral-900">
      {ranges.map((range) => (
        <button
          type="button"
          key={range.id}
          onClick={() => onChangeActive(range.value)}
          data-testid="date_range_button"
          className={`${range.value === active ? "bg-neutral-500 text-neutral-50 light:bg-blue-300 light:text-neutral-500" : ""} px-3 sm:px-4 py-3 rounded-lg cursor-pointer hover:bg-neutral-500 hover:text-neutral-50 light:hover:text-neutral-500 light:hover:bg-blue-300 focus-visible:outline-lime-500 light:focus-visible:outline-blue-900 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:rounded-lg`}
        >
          {range.title}
        </button>
      ))}
    </section>
  );
};

export default DateRange;

export type Range = {
  id: number;
  isActive?: boolean;
  title: string;
  value: number;
};

export type DateRangeProps = {
  ranges: Range[];
};

const DateRange = ({ ranges }: DateRangeProps) => {
  return (
    <section className="inline-flex items-center bg-neutral-700 rounded-lg mb-4 text-neutral-200 xl:mb-0">
      {ranges.map((range) => (
        <button
          type="button"
          key={range.id}
          className={`${range.isActive === true ? "bg-neutral-500 text-neutral-50" : ""} px-3 sm:px-4 py-3 rounded-lg cursor-pointer hover:bg-neutral-500 hover:text-neutral-50 focus-visible:outline-lime-500 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:rounded-lg`}
        >
          {range.title}
        </button>
      ))}
    </section>
  );
};

export default DateRange;

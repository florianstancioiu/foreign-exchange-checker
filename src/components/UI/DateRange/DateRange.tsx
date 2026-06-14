export type Range = {
  id: number;
  isActive?: boolean;
  title: string;
};

export type DateRangeProps = {
  ranges: Range[];
};

const DateRange = ({ ranges }: DateRangeProps) => {
  return (
    <section className="inline-flex items-center bg-neutral-700 rounded-lg mb-4">
      {ranges.map((range) => (
        <div
          key={range.id}
          className={`${range.isActive === true ? "bg-neutral-500" : ""} px-4 py-3 rounded-lg cursor-pointer hover:bg-neutral-500`}
        >
          {range.title}
        </div>
      ))}
    </section>
  );
};

export default DateRange;

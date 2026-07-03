import { type ReactNode } from "react";

export type StatsItemProps = {
  title: string;
  value: number | ReactNode;
};

const StatsItem = ({ title, value }: StatsItemProps) => {
  return (
    <section className="py-3 px-5 rounded-2xl border border-neutral-600 bg-neutral-700 md:inline-block md:mr-5 md:min-w-35 xl:mr-0 light:bg-blue-100 light:border-blue-200">
      <p
        className="mb-4 text-neutral-50 opacity-70 text-sm font-normal leading-[120%] tracking-[1px] uppercase light:text-neutral-900"
        data-testid="stats_item_title"
      >
        {title}
      </p>
      <div
        className="text-neutral-50 text-xl font-normal leading-[120%] tracking-[-0.5px] h-6 overflow-hidden light:text-neutral-900"
        data-testid="stats_item_value"
      >
        {value}
      </div>
    </section>
  );
};

export default StatsItem;

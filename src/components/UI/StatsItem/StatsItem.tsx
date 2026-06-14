import { type ReactNode } from "react";

export type StatsItemProps = {
  title: string;
  value: number | ReactNode;
};

const StatsItem = ({ title, value }: StatsItemProps) => {
  return (
    <section className="py-3 px-5 rounded-2xl border border-neutral-600 bg-neutral-700">
      <p className="mb-4 text-neutral-50 opacity-70 text-sm font-normal leading-[120%] tracking-[1px] uppercase">
        {title}
      </p>
      <div className="text-neutral-50 text-xl font-normal leading-[120%] tracking-[-0.5px]">
        {value}
      </div>
    </section>
  );
};

export default StatsItem;

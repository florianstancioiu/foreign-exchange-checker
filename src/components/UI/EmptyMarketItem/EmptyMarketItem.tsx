import { twMerge } from "tailwind-merge";

export type EmptyMarketItemProps = {
  title: string;
  className?: string;
};

const EmptyMarketItem = ({ title, className }: EmptyMarketItemProps) => {
  return (
    <div
      className={twMerge(
        `flex items-center gap-x-2 px-5 py-2 bg-neutral-700 border-r border-neutral-500 md:py-3 select-none text-neutral-50 light:bg-neutral-50 light:border-neutral-100 light:text-neutral-900`,
        className,
      )}
      data-testid="empty_market_item"
    >
      {title}
    </div>
  );
};

export default EmptyMarketItem;

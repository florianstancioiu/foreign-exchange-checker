import LinkWithQuery from "../LinkWithQuery/LinkWithQuery";
import { twMerge } from "tailwind-merge";

export type TabValue = {
  id: number;
  title: string;
  url: string;
  isActive?: boolean;
  suffix?: number;
};

export type TabsProps = {
  values: TabValue[];
  className?: string;
};

const Tabs = ({ values, className }: TabsProps) => {
  return (
    <div className={twMerge("pb-5", className)} data-testid="tabs">
      {values.map((val) => (
        <LinkWithQuery
          key={val.id}
          className={`${val.isActive ? "border-lime-500" : "border-neutral-600"} uppercase text-base border-b-2 py-2.5 px-4 focus-visible:outline-lime-500 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:rounded-lg`}
          to={val.url}
          data-testid="tabs_link"
        >
          <span className="">{val.title}</span>
          {val.suffix !== undefined ? (
            <span className="rounded-full size-5 inline-grid place-content-center bg-lime-800 text-lime-500 text-[10px] font-normal leading-[100%] ml-2 relative -top-0.5">
              {val.suffix}
            </span>
          ) : (
            <></>
          )}
        </LinkWithQuery>
      ))}
    </div>
  );
};

export default Tabs;

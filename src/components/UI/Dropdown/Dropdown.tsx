import ChevronDownSvg from "../../../images/icon-chevron-down.svg?react";
import { Link } from "react-router";
import { useId } from "react";

export type DropdownValue = {
  id: number;
  title: string;
  url: string;
  isActive?: boolean;
  suffix?: number;
};

export type DropdownProps = {
  values: DropdownValue[];
  className?: string;
};

const Dropdown = ({ values, className }: DropdownProps) => {
  const dropdownContentId = useId();
  const activeValue = values.find((val) => val.isActive) || values[0];

  return (
    <div className={className !== undefined ? className : ""}>
      <button
        type="button"
        popoverTarget={dropdownContentId}
        className="dropdown-anchor px-3 rounded-lg border border-neutral-400 bg-neutral-700 flex justify-between items-center h-10 cursor-pointer w-full"
      >
        <p className="text-base font-normal leading-[120%] tracking-[1px] flex items-center gap-x-2">
          <span className="uppercase">{activeValue.title} </span>
          {activeValue.suffix !== undefined ? (
            <span className="rounded-full size-5 inline-grid place-content-center bg-lime-800 text-lime-500 text-[10px] font-normal leading-[100%]">
              {activeValue.suffix}
            </span>
          ) : (
            <></>
          )}
        </p>
        <ChevronDownSvg />
      </button>
      <div
        popover=""
        id={dropdownContentId}
        className="dropdown-content absolute bg-neutral-700 rounded-[10px] p-2"
      >
        {values.map((val) => (
          <Link
            className="w-full p-2.5 flex justify-between"
            key={val.id}
            to={val.url}
          >
            <span className="text-base font-normal leading-[120% text-neutral-50 tracking-[1px] uppercase">
              {val.title}
            </span>
            {val.suffix !== undefined ? (
              <span className="rounded-full size-5 inline-grid place-content-center bg-lime-800 text-lime-500 text-[10px] font-normal leading-[100%]">
                {val.suffix}
              </span>
            ) : (
              <></>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;

import ChevronDownSvg from "../../../images/icon-chevron-down.svg?react";
import { type ReactNode } from "react";

export type DropdownValue = {
  id: number;
  isActive?: boolean;
  content: ReactNode;
};

export type DropdownProps = {
  values: DropdownValue[];
};

const Dropdown = ({ values }: DropdownProps) => {
  const activeValue = values.find((val) => val.isActive) || values[0];

  return (
    <div>
      <button
        type="button"
        className="px-3 rounded-lg border border-neutral-400 bg-neutral-700 flex justify-between items-center h-10 cursor-pointer w-full"
      >
        {activeValue.content}
        <ChevronDownSvg />
      </button>
      <div className="hidden">
        {values.map((val) => (
          <div key={val.id}>{val.content}</div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;

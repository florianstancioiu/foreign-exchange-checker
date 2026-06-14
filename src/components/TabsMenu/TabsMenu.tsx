import { type ReactNode } from "react";
import Dropdown from "../UI/Dropdown/Dropdown";

export type TabsMenuProps = {
  variant: "history" | "compare" | "favorites" | "log";
  pillInfo?: number;
  children: ReactNode;
};

const TabsMenu = ({ variant, pillInfo, children }: TabsMenuProps) => {
  const dropdownValues = [
    {
      id: 1,
      isActive: true,
      content: (
        <p className="text-base font-normal leading-[120%] tracking-[1px]">
          History
        </p>
      ),
    },
    {
      id: 2,
      content: (
        <p className="text-base font-normal leading-[120%] tracking-[1px]">
          Compare
        </p>
      ),
    },
    {
      id: 3,
      content: (
        <p className="text-base font-normal leading-[120%] tracking-[1px]">
          Favorites
        </p>
      ),
    },
    {
      id: 4,
      content: (
        <p className="text-base font-normal leading-[120%] tracking-[1px]">
          Log
        </p>
      ),
    },
  ];

  return (
    <div className="px-4">
      <Dropdown values={dropdownValues} />
      <div className="mt-4">{children}</div>
    </div>
  );
};

export default TabsMenu;

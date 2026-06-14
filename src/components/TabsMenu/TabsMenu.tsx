import { type ReactNode } from "react";
import Dropdown from "../UI/Dropdown/Dropdown";

export type TabsMenuProps = {
  variant: "history" | "compare" | "favorites" | "log";
  children: ReactNode;
};

const TabsMenu = ({ variant, children }: TabsMenuProps) => {
  const dropdownValues = [
    {
      id: 1,
      isActive: true,
      title: "history",
      content: (
        <p className="text-base font-normal leading-[120%] tracking-[1px]">
          History
        </p>
      ),
    },
    {
      id: 2,
      title: "compare",
      content: (
        <p className="text-base font-normal leading-[120%] tracking-[1px]">
          Compare
        </p>
      ),
    },
    {
      id: 3,
      title: "favorites",
      content: (
        <p className="text-base font-normal leading-[120%] tracking-[1px]">
          Favorites
        </p>
      ),
    },
    {
      id: 4,
      title: "log",
      content: (
        <p className="text-base font-normal leading-[120%] tracking-[1px]">
          Log
        </p>
      ),
    },
  ];

  const actualDropdownValues = dropdownValues.map((val) => ({
    ...val,
    isActive: val.title === variant,
  }));

  return (
    <div className="px-4">
      <Dropdown values={actualDropdownValues} />
      <div className="mt-4">{children}</div>
    </div>
  );
};

export default TabsMenu;

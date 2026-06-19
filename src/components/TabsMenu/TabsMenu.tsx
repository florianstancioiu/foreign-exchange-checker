import { type ReactNode } from "react";
import Dropdown from "../UI/Dropdown/Dropdown";
import Tabs from "../UI/Tabs/Tabs";

export type TabsMenuProps = {
  variant: "history" | "compare" | "favorites" | "log";
  children: ReactNode;
};

const dropdownValues = [
  {
    id: 1,
    isActive: true,
    url: "/",
    title: "history",
  },
  {
    id: 2,
    url: "/compare",
    title: "compare",
  },
  {
    id: 3,
    url: "/favorites",
    title: "favorites",
    suffix: 10,
  },
  {
    id: 4,
    url: "/log",
    title: "log",
    suffix: 8,
  },
];

const TabsMenu = ({ variant, children }: TabsMenuProps) => {
  const actualDropdownValues = dropdownValues.map((val) => ({
    ...val,
    isActive: val.title === variant,
  }));

  return (
    <div className="px-4 md:px-6">
      <Dropdown values={actualDropdownValues} className="md:hidden" />
      <Tabs values={actualDropdownValues} className="hidden md:block" />
      <div className="mt-4">{children}</div>
    </div>
  );
};

export default TabsMenu;

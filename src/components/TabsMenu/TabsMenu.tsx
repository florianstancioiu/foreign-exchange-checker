import { type ReactNode } from "react";
import Dropdown from "../UI/Dropdown/Dropdown";
import Tabs from "../UI/Tabs/Tabs";
import { useFavoritesContext } from "../../hooks/useFavoritesContext";
import { useLogsContext } from "../../hooks/useLogsContext";
import tabs from "../../helpers/tabs";

export type TabsMenuProps = {
  variant: "history" | "compare" | "favorites" | "log";
  children: ReactNode;
};

const TabsMenu = ({ variant, children }: TabsMenuProps) => {
  const { favorites } = useFavoritesContext();
  const { logs } = useLogsContext();

  const actualTabs = tabs.map((val) => {
    const numberOfFavorites = favorites !== undefined ? favorites.length : 0;
    const numberOfLogs = logs !== undefined ? logs.length : 0;

    return {
      ...val,
      isActive: val.title === variant,
      suffix:
        val.title === "favorites"
          ? numberOfFavorites
          : val.title === "log"
            ? numberOfLogs
            : undefined,
    };
  });

  return (
    <div className="px-4 md:px-6 xl:px-8">
      <Dropdown values={actualTabs} className="md:hidden" />
      <Tabs values={actualTabs} className="hidden md:block" />
      <div className="mt-4">{children}</div>
    </div>
  );
};

export default TabsMenu;

import TabsMenu from "../components/TabsMenu/TabsMenu";
import DetailsContainer from "../components/UI/DetailsContainer/DetailsContainer";
import CompareItem from "../components/UI/CompareItem/CompareItem";

import BritishPoundFlag from "../images/flags/gb.webp";

const headerContent = (
  <div className="flex justify-between items-start mb-4">
    <div className="uppercase">
      <p className="text-sm font-normal leading-[120%] tracking-[1px] text-neutral-200 mb-2.5">
        Multi-Currency
      </p>
      <p className="text-xs font-normal leading-[120%] tracking-[0.5px] text-neutral-50 opacity-70">
        8 pairs
      </p>
    </div>
    <p className="text-base font-medium leading-[120%] tracking-[1px] text-neutral-50">
      1,000 from USD
    </p>
  </div>
);

const compareItems = [
  {
    id: 1,
    icon: BritishPoundFlag,
    currency: "gbp",
    currencyTitle: "British Pound",
    value: 736.65,
    subValue: 0.7366,
    isFavorite: true,
  },
  {
    id: 2,
    icon: BritishPoundFlag,
    currency: "jpy",
    currencyTitle: "Japanes Yen",
    value: 736.65,
    subValue: 0.7366,
  },
  {
    id: 3,
    icon: BritishPoundFlag,
    currency: "chf",
    currencyTitle: "Swiss Franc",
    value: 736.65,
    subValue: 0.7366,
    isFavorite: true,
  },
  {
    id: 4,
    icon: BritishPoundFlag,
    currency: "cad",
    currencyTitle: "Canadian Dollar",
    value: 736.65,
    subValue: 0.7366,
    isFavorite: true,
  },
  {
    id: 5,
    icon: BritishPoundFlag,
    currency: "aud",
    currencyTitle: "Australian Dollar",
    value: 736.65,
    subValue: 0.7366,
  },
  {
    id: 6,
    icon: BritishPoundFlag,
    currency: "inr",
    currencyTitle: "Indian Rupee",
    value: 736.65,
    subValue: 0.7366,
  },
  {
    id: 7,
    icon: BritishPoundFlag,
    currency: "cny",
    currencyTitle: "Chinese Yuan",
    value: 736.65,
    subValue: 0.7366,
    isFavorite: true,
  },
];

const Compare = () => {
  return (
    <TabsMenu variant="compare">
      <DetailsContainer headerContent={headerContent}>
        {compareItems.map((item) => (
          <CompareItem
            key={item.id}
            icon={item.icon}
            currency={item.currency}
            currencyTitle={item.currencyTitle}
            value={item.value}
            subValue={item.subValue}
            isFavorite={item.isFavorite}
          />
        ))}
      </DetailsContainer>
    </TabsMenu>
  );
};

export default Compare;

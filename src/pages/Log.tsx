import TabsMenu from "../components/TabsMenu/TabsMenu";
import DetailsContainer from "../components/UI/DetailsContainer/DetailsContainer";
import LogItem from "../components/UI/LogItem/LogItem";
import Button from "../components/UI/Button/Button";

const headerContent = (
  <div className="flex justify-between items-end md:items-center">
    <div className="flex flex-col justify-between items-start gap-y-2.5">
      <p className="uppercase text-base font-medium leading-[120%] tracking-[1px] text-neutral-50">
        Conversion Log
      </p>
      <p className="uppercase text-sm font-normal leading-[120%] tracking-[1px] text-neutral-200 md:hidden">
        8 Logged
      </p>
    </div>
    <div className="md:flex md:items-center md:gap-x-4">
      <p className="uppercase text-sm font-normal leading-[120%] tracking-[1px] text-neutral-200 hidden md:block">
        8 Logged
      </p>
      <Button className="text-neutral-200">Clear All</Button>
    </div>
  </div>
);

const logItems = [
  {
    id: 1,
    dateRange: "20M",
    firstCurrency: "usd",
    secondCurrency: "eur",
    firstValue: 1000.0,
    secondValue: 853.02,
  },
  {
    id: 2,
    dateRange: "34M",
    firstCurrency: "gbp",
    secondCurrency: "eur",
    firstValue: 500.0,
    secondValue: 92490,
  },
  {
    id: 3,
    dateRange: "50M",
    firstCurrency: "usd",
    secondCurrency: "jpy",
    firstValue: 250.0,
    secondValue: 339.38,
  },
  {
    id: 4,
    dateRange: "1H",
    firstCurrency: "usd",
    secondCurrency: "bdt",
    firstValue: 1500.0,
    secondValue: 1104.95,
  },
  {
    id: 5,
    dateRange: "2H",
    firstCurrency: "euro",
    secondCurrency: "gbd",
    firstValue: 50000.0,
    secondValue: 406.77,
  },
  {
    id: 6,
    dateRange: "4H",
    firstCurrency: "aud",
    secondCurrency: "nzd",
    firstValue: 100.0,
    secondValue: 11127.43,
  },
  {
    id: 7,
    dateRange: "13 May",
    firstCurrency: "gbp",
    secondCurrency: "eur",
    firstValue: 2000,
    secondValue: 1441.6,
  },
  {
    id: 8,
    dateRange: "11 May",
    firstCurrency: "chf",
    secondCurrency: "usd",
    firstValue: 750.0,
    secondValue: 824.36,
  },
];

const Log = () => {
  return (
    <TabsMenu variant="log">
      <DetailsContainer headerContent={headerContent}>
        {logItems.map((item) => (
          <LogItem
            key={item.id}
            dateRange={item.dateRange}
            firstCurrency={item.firstCurrency}
            secondCurrency={item.secondCurrency}
            firstValue={item.firstValue}
            secondValue={item.secondValue}
          />
        ))}
      </DetailsContainer>
    </TabsMenu>
  );
};

export default Log;

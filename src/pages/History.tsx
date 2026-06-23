import TabsMenu from "../components/TabsMenu/TabsMenu";
import StatsItem from "../components/UI/StatsItem/StatsItem";
import ChevronDownSvg from "../images/icon-chevron-down.svg?react";
import DateRange from "../components/UI/DateRange/DateRange";
import LineChart from "../components/UI/LineChart/LineChart";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getPreviousDate } from "../helpers/dates";
import { type Rate } from "../types/rate";
import { getRateStats } from "../helpers/rates";

const History = () => {
  const [activeDateRange, setActiveDateRange] = useState(30);
  const fromDate = getPreviousDate(activeDateRange);
  const baseCurrency = "RON";
  const quoteCurrency = "EUR";

  const { isPending, error, data } = useQuery({
    queryKey: [`historyChartData-${fromDate}-${baseCurrency}-${quoteCurrency}`],
    queryFn: async () => {
      const response = await fetch(
        `https://api.frankfurter.dev/v2/rates?base=${baseCurrency}&quotes=${quoteCurrency}&from=${fromDate}`,
      );

      return await response.json();
    },
  });

  if (isPending) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>There was an error fetching the data</p>;
  }

  const onChangeActiveHandler = (dateRangeValue: number) => {
    setActiveDateRange(dateRangeValue);
  };

  const { fromRate, lastRate, change, changePercentage } = getRateStats(
    data,
    fromDate,
  );

  const changeStatValue = (
    <>
      {change > 0 ? (
        <p className="text-green-500">+{change.toFixed(4)}</p>
      ) : (
        <p className="text-red-500">{change.toFixed(4)}</p>
      )}
    </>
  );

  const changePercentageStatValue = (
    <>
      {change > 0 ? (
        <p className="text-green-500 flex items-center">
          <ChevronDownSvg className="rotate-180 size-6" />
          <span>+{changePercentage}%</span>
        </p>
      ) : (
        <p className="text-red-500 flex items-center">
          <ChevronDownSvg className="size-6" />
          <span>{changePercentage}%</span>
        </p>
      )}
    </>
  );

  return (
    <TabsMenu variant="history">
      <div className="xl:flex xl:justify-between xl:items-center xl:mb-5">
        <div className="grid grid-cols-2 gap-2.5 mb-4 md:block xl:grid xl:grid-cols-4 xl:gap-x-4 xl:mb-0">
          <StatsItem title="Open" value={fromRate} />
          <StatsItem title="Last" value={lastRate} />
          <StatsItem title="Change" value={changeStatValue} />
          <StatsItem title="% Change" value={changePercentageStatValue} />
        </div>
        <DateRange
          ranges={[
            { id: 1, title: "1D", value: 1 },
            { id: 2, title: "1W", value: 7 },
            { id: 3, title: "1M", value: 30 },
            { id: 4, title: "3M", value: 90 },
            { id: 5, title: "1Y", value: 365 },
            { id: 6, title: "5Y", value: 1825 },
          ]}
          active={activeDateRange}
          onChangeActive={onChangeActiveHandler}
        />
      </div>
      <LineChart
        data={data.map((item: Rate) => item.rate)}
        labels={data.map((item: Rate) => item.date)}
        title={`${baseCurrency}/${quoteCurrency}`}
        rate={0.853}
        baseCurrency={baseCurrency}
        quoteCurrency={quoteCurrency}
      />
    </TabsMenu>
  );
};

export default History;

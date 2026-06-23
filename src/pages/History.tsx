import TabsMenu from "../components/TabsMenu/TabsMenu";
import StatsItem from "../components/UI/StatsItem/StatsItem";
import ChevronDownSvg from "../images/icon-chevron-down.svg?react";
import DateRange from "../components/UI/DateRange/DateRange";
import LineChart from "../components/UI/LineChart/LineChart";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getPreviousDate } from "../helpers/dates";
import { type Rate } from "../types/rate";

const baseCurrency = "RON";
const quoteCurrency = "EUR";

const History = () => {
  const [activeDateRange, _setActiveDateRange] = useState(30);

  const { isPending, error, data } = useQuery({
    queryKey: ["historyChartData"],
    queryFn: async () => {
      const response = await fetch(
        `https://api.frankfurter.dev/v2/rates?base=${baseCurrency}&quotes=${quoteCurrency}&from=${getPreviousDate(activeDateRange)}`,
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

  console.log("data", data);

  return (
    <TabsMenu variant="history">
      <div className="xl:flex xl:justify-between xl:items-center xl:mb-5">
        <div className="grid grid-cols-2 gap-2.5 mb-4 md:block xl:grid xl:grid-cols-4 xl:gap-x-4 xl:mb-0">
          <StatsItem title="Open" value={0.8516} />
          <StatsItem title="Last" value={0.853} />
          <StatsItem
            title="Change"
            value={<p className="text-green-500">+0.0014</p>}
          />
          <StatsItem
            title="% Change"
            value={
              <p className="text-green-500 flex items-center">
                <ChevronDownSvg className="rotate-180 size-6" />
                <span>+0.16%</span>
              </p>
            }
          />
        </div>
        <DateRange
          ranges={[
            { id: 1, title: "1D", value: 1 },
            { id: 2, title: "1W", value: 7 },
            { id: 3, title: "1M", value: 30, isActive: true },
            { id: 4, title: "3M", value: 90 },
            { id: 5, title: "1Y", value: 365 },
            { id: 6, title: "5Y", value: 1825 },
          ]}
        />
      </div>
      <LineChart
        data={data.map((item: Rate) => item.rate)}
        labels={data.map((item: Rate) => item.date)}
        title="RON/EUR"
        rate={0.853}
        baseCurrency="RON"
        quoteCurrency="EUR"
      />
    </TabsMenu>
  );
};

export default History;

import TabsMenu from "../components/TabsMenu/TabsMenu";
import StatsItem from "../components/UI/StatsItem/StatsItem";
import ChevronDownSvg from "../images/icon-chevron-down.svg?react";
import DateRange from "../components/UI/DateRange/DateRange";
import LineChart from "../components/UI/LineChart/LineChart";

const History = () => {
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
            { id: 1, title: "1D" },
            { id: 2, title: "1W" },
            { id: 3, title: "1M", isActive: true },
            { id: 4, title: "3M" },
            { id: 5, title: "1Y" },
            { id: 6, title: "5Y" },
          ]}
        />
      </div>
      <LineChart />
    </TabsMenu>
  );
};

export default History;

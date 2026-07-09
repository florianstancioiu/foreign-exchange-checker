import TabsMenu from "../../components/TabsMenu/TabsMenu";
import StatsItem from "../../components/UI/StatsItem/StatsItem";
import ChevronDownSvg from "../../images/icon-chevron-down.svg?react";
import DateRange from "../../components/UI/DateRange/DateRange";
import LineChart from "../../components/UI/LineChart/LineChart";
import { useState } from "react";
import { getPreviousDate } from "../../helpers/dates";
import { type Rate } from "../../types/rate";
import { getRateStats } from "../../helpers/rates";
import EmptyPage from "../../components/UI/EmptyPage/EmptyPage";
import { useRateContext } from "../../hooks/useRateContext";
import ranges from "../../helpers/ranges";
import toFixed from "../../helpers/toFixed";
import useRateRequest from "../../hooks/useRateRequest";

const History = () => {
  const { base, quote, data: rateData } = useRateContext();

  const [activeDateRange, setActiveDateRange] = useState(30);
  const fromDate = getPreviousDate(activeDateRange);

  const {
    isPending,
    error,
    data: historyChartData,
  } = useRateRequest(
    "historyChart",
    [fromDate, base, quote],
    `base=${base}&quotes=${quote}&from=${fromDate}`,
  );

  let data: Rate[] = [];
  if (Array.isArray(historyChartData)) {
    data = historyChartData;
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
        <p className="text-green-500 light:text-green-800">
          +{toFixed(change, 4)}
        </p>
      ) : change === 0 ? (
        <p>{toFixed(change, 4)}</p>
      ) : (
        <p className="text-red-500 light:text-red-800">{toFixed(change, 4)}</p>
      )}
    </>
  );

  const changePercentageStatValue = (
    <>
      {change > 0 ? (
        <p className="text-green-500 light:text-green-800 flex items-center">
          <ChevronDownSvg className="rotate-180 size-6" />
          <span>+{toFixed(changePercentage, 2)}%</span>
        </p>
      ) : change === 0 ? (
        <p className="flex items-center">
          <span>{toFixed(changePercentage, 2)}%</span>
        </p>
      ) : (
        <p className="text-red-500 light:text-red-800 flex items-center">
          <ChevronDownSvg className="size-6" />
          <span>{toFixed(changePercentage, 2)}%</span>
        </p>
      )}
    </>
  );

  return (
    <TabsMenu variant="history">
      {!isPending && !error && (
        <>
          <div className="xl:flex xl:justify-between xl:items-center xl:mb-5">
            <ul className="grid grid-cols-2 gap-2.5 mb-4 md:block xl:grid xl:grid-cols-4 xl:gap-x-4 xl:mb-0">
              <StatsItem title="Open" value={toFixed(fromRate, 4)} />
              <StatsItem title="Last" value={toFixed(lastRate, 4)} />
              <StatsItem title="Change" value={changeStatValue} />
              <StatsItem title="% Change" value={changePercentageStatValue} />
            </ul>
            <DateRange
              ranges={ranges}
              active={activeDateRange}
              onChangeActive={onChangeActiveHandler}
            />
          </div>
          <LineChart
            data={data.map((item) => item.rate)}
            labels={data.map((item) => item.date)}
            title={`${base}/${quote}`}
            rate={
              Array.isArray(rateData) && rateData.length > 0
                ? rateData[0].rate
                : 0
            }
            base={base}
            quote={quote}
          />
        </>
      )}
      {isPending && (
        <EmptyPage
          title="Loading chart data"
          content={
            <div className="light:text-neutral-900">
              <p>
                We are currently loading the rate history for {base}/{quote}.
              </p>
              <p>This usually clears up in a minute.</p>
            </div>
          }
        />
      )}
      {error && (
        <EmptyPage
          title="There was an error loading the chart data"
          content={
            <div className="text-red-500">
              <p>
                We couldn't load the rate history for {base}/{quote} right now.
              </p>
              <p>Check back later</p>
            </div>
          }
        />
      )}
    </TabsMenu>
  );
};

export default History;

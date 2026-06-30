import TabsMenu from "../../components/TabsMenu/TabsMenu";
import DetailsContainer from "../../components/UI/DetailsContainer/DetailsContainer";
import LogItem from "../../components/UI/LogItem/LogItem";
import { useLogsContext } from "../../contexts/LogsContext";
import EmptyPage from "../../components/UI/EmptyPage/EmptyPage";
import { getConversionLogDate } from "../../helpers/dates";
import LogHeaderContent from "./LogHeaderContent";

const Log = () => {
  const { logs } = useLogsContext();

  return (
    <TabsMenu variant="log">
      <DetailsContainer
        headerContent={
          <LogHeaderContent
            logged={typeof logs !== "undefined" ? logs.length : 0}
          />
        }
      >
        {typeof logs !== "undefined" &&
          logs.map((item) => (
            <LogItem
              key={item.id}
              id={item.id}
              dateRange={getConversionLogDate(item.date)}
              base={item.base}
              quote={item.quote}
              firstValue={
                typeof item.firstCurrency === "string"
                  ? parseFloat(item.firstCurrency)
                  : item.firstCurrency
              }
              secondValue={item.secondCurrency}
            />
          ))}
        {(typeof logs === "undefined" || logs.length === 0) && (
          <EmptyPage
            title="No conversions logged yet"
            content={
              <>
                <p>
                  Every conversion is recorded here automatically when you tap
                  LOG CONVERSION.
                </p>
                <p>Your log is private to this session and this browser.</p>
              </>
            }
          />
        )}
      </DetailsContainer>
    </TabsMenu>
  );
};

export default Log;

import TabsMenu from "../components/TabsMenu/TabsMenu";
import DetailsContainer from "../components/UI/DetailsContainer/DetailsContainer";
import LogItem from "../components/UI/LogItem/LogItem";
import Button from "../components/UI/Button/Button";
import { useLogsContext } from "../contexts/LogsContext";
import { getStringDate } from "../helpers/dates";
import EmptyPage from "../components/UI/EmptyPage/EmptyPage";

type LogHeaderContent = {
  logged: number;
};

const LogHeaderContent = ({ logged }: LogHeaderContent) => {
  const { clearAll } = useLogsContext();

  return (
    <div className="flex justify-between items-end md:items-center">
      <div className="flex flex-col justify-between items-start gap-y-2.5">
        <p className="uppercase text-base font-medium leading-[120%] tracking-[1px] text-neutral-50">
          Conversion<span className="hidden sm:inline"> Log</span>
        </p>
        <p className="uppercase text-sm font-normal leading-[120%] tracking-[1px] text-neutral-200 md:hidden">
          {logged} Logged
        </p>
      </div>
      <div className="md:flex md:items-center md:gap-x-4">
        <p className="uppercase text-sm font-normal leading-[120%] tracking-[1px] text-neutral-200 hidden md:block">
          {logged} Logged
        </p>
        <Button onClick={() => clearAll()} className="text-neutral-200">
          Clear All
        </Button>
      </div>
    </div>
  );
};

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
              dateRange={getStringDate(new Date())}
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

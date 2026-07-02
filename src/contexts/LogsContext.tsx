import { createContext, type ReactNode, useContext } from "react";
import { useLocalStorage } from "usehooks-ts";
import { getTodaysStringDate } from "../helpers/dates";

type LogItem = {
  id: string;
  firstCurrency: number | string;
  secondCurrency: number;
  date: Date;
  base: string;
  quote: string;
};

export type LogsState = {
  logs: LogItem[] | undefined;
  toggleLog: (
    base: string,
    quote: string,
    firstCurrency: number | string,
    secondCurrency: number,
  ) => void;
  isLogged: (id: string) => boolean;
  getLogId: (
    base: string,
    quote: string,
    sendValue: number | string,
    receiveValue: number,
  ) => string;
  clearAll: () => void;
  removeLog: (id: string) => void;
};

const LogsContext = createContext<LogsState | null>(null);

const getLogId = (
  base: string,
  quote: string,
  sendValue: number | string,
  receiveValue: number,
) => {
  return `${base}-${quote}-${getTodaysStringDate()}-${sendValue}-${receiveValue}`;
};

export type LogsContextProps = {
  children: ReactNode;
};

export const LogsContextProvider = ({ children }: LogsContextProps) => {
  const [logs, setLogs] = useLocalStorage<LogItem[] | undefined>("logs:v1", []);

  const toggleLog = (
    base: string,
    quote: string,
    firstCurrency: number | string,
    secondCurrency: number,
  ) => {
    const id = getLogId(base, quote, firstCurrency, secondCurrency);

    setLogs((logItems) => {
      if (logItems?.find((item) => item.id === id)) {
        return logItems.filter((itm) => itm.id !== id);
      }

      if (logItems === undefined) {
        return [
          {
            id,
            firstCurrency,
            secondCurrency,
            date: new Date(),
            base,
            quote,
          },
        ];
      }

      return [
        ...logItems,
        {
          id,
          firstCurrency,
          secondCurrency,
          date: new Date(),
          base,
          quote,
        },
      ];
    });
  };

  const clearAll = () => {
    setLogs([]);
  };

  const removeLog = (id: string) =>
    setLogs((logItems) => logItems?.filter((item) => item.id !== id));

  const isLogged = (id: string) => {
    if (logs === undefined) {
      return false;
    }

    return logs.findIndex((item) => item.id === id) >= 0;
  };

  return (
    <LogsContext.Provider
      value={{
        logs,
        toggleLog,
        isLogged,
        clearAll,
        removeLog,
        getLogId,
      }}
    >
      {children}
    </LogsContext.Provider>
  );
};

export const useLogsContext = () => {
  const context = useContext(LogsContext);

  if (!context) {
    throw new Error(
      "useLogsContext must be used within <LogsContextProvider />",
    );
  }

  return context;
};

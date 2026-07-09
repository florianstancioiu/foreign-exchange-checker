import { useContext } from "react";
import { LogsContext } from "../contexts/LogsContext/LogsContext";

export const useLogsContext = () => {
  const context = useContext(LogsContext);

  if (!context) {
    throw new Error(
      "useLogsContext must be used within <LogsContextProvider />",
    );
  }

  return context;
};

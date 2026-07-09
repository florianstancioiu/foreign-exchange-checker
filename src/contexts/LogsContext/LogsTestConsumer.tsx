import { useLogsContext } from "../../hooks/useLogsContext";

const LogsTestConsumer = () => {
  const { toggleLog, clearAll, removeLog, logs, isLogged } = useLogsContext();

  return (
    <>
      <span data-testid="logs_count">{logs?.length ?? 0}</span>
      <span data-testid="logs_is_logged">
        {isLogged("test-id") ? "yes" : "no"}
      </span>
      <button
        data-testid="logs_toggle"
        onClick={() => toggleLog("USD", "EUR", "100", 90)}
      />
      <button data-testid="logs_clear_all" onClick={clearAll} />
      <button data-testid="logs_remove" onClick={() => removeLog("test-id")} />
    </>
  );
};

export default LogsTestConsumer;

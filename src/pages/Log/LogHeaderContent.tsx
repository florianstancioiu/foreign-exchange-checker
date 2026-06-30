import { useLogsContext } from "../../contexts/LogsContext";
import Button from "../../components/UI/Button/Button";

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

export default LogHeaderContent;

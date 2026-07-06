import type { ChangeEvent } from "react";
import CurrencyPicker from "../UI/CurrencyPicker/CurrencyPicker";
import toFixed from "../../helpers/toFixed";

export type RateConverterProps = {
  isReceive?: boolean;
  title: string;
  value: number | string;
  currency: string;
  setCurrency: (iso: string) => void;
  setSendValue?: (value: number | string) => void;
};

const RateConverter = ({
  isReceive = false,
  title,
  value,
  currency,
  setCurrency,
  setSendValue,
}: RateConverterProps) => {
  const onChangeSendValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const positiveFloatRegex = /^[0-9]*(?:\.[0-9]*)?$/;

    if (setSendValue && positiveFloatRegex.test(event.target.value)) {
      setSendValue(event.target.value);
    }
  };

  return (
    <div className="p-4 rounded-2xl border border-neutral-500 bg-neutral-600 w-full md:p-5 light:bg-blue-200 light:border-neutral-100">
      <p className="uppercase text-sm text-neutral-100 mb-5 leading-[120%] tracking-[1px] light:text-neutral-900">
        {title}
      </p>
      <div className="flex justify-between items-center">
        {isReceive ? (
          <p
            className={`${isReceive ? "text-lime-500 light:text-lime-600" : ""} text-3xl font-semibold leading-[100%] tracking-[-0.5px]`}
          >
            {typeof value === "number" && isFinite(value)
              ? toFixed(value, 2)
              : typeof value === "string" && value.trim() === ""
                ? value
                : "Error"}
          </p>
        ) : (
          <input
            aria-label="Enter the amount you want to send"
            type="text"
            value={value}
            onChange={onChangeSendValueHandler}
            className="text-3xl font-semibold leading-[100%] tracking-[-0.5px] max-w-30 sm:max-w-40 focus-visible:outline-lime-500 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:rounded-lg light:focus-visible:outline-blue-500"
          />
        )}
        <CurrencyPicker activeISO={currency} setActiveIso={setCurrency} />
      </div>
    </div>
  );
};

export default RateConverter;

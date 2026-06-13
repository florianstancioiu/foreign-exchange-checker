import CurrencyPicker from "../UI/CurrencyPicker/CurrencyPicker";
import { type CurrencyPickerProps } from "../UI/CurrencyPicker/CurrencyPicker";

export type RateConverterProps = {
  isReceive?: boolean;
  title: string;
  value: number;
  currency: CurrencyPickerProps["currency"];
};

const RateConverter = ({
  isReceive = false,
  title,
  value,
  currency,
}: RateConverterProps) => {
  return (
    <div className="p-4 rounded-2xl border border-neutral-500 bg-neutral-600 w-full">
      <p className="uppercase text-sm text-neutral-100 mb-5 leading-[120%] tracking-[1px]">
        {title}
      </p>
      <div className="flex justify-between items-center">
        <p
          className={`${isReceive ? "text-lime-500" : ""} text-3xl font-semibold leading-[100%] tracking-[-0.5px]`}
        >
          {value}
        </p>
        <CurrencyPicker currency={currency} />
      </div>
    </div>
  );
};

export default RateConverter;

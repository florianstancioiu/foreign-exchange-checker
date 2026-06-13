import USFlag from "../../../images/flags/us.webp";
import EuFlag from "../../../images/flags/eu.webp";
import ChevronIcon from "../../../images/icon-chevron-down.svg?react";

export type CurrencyPickerProps = {
  currency: "usd" | "euro";
};

const CurrencyPicker = ({ currency }: CurrencyPickerProps) => {
  let content = <></>;

  switch (currency) {
    case "usd":
      content = (
        <>
          <img src={USFlag} alt="" className="size-5 rounded-full" />
          <p className="uppercase text-sm font-normal leading-[120%] tracking-[1px]">
            usd
          </p>
          <ChevronIcon className="size-3" />
        </>
      );
      break;
    case "euro":
      content = (
        <>
          <img src={EuFlag} alt="" className="size-5 rounded-full" />

          <p className="uppercase text-sm font-normal leading-[120%] tracking-[1px]">
            Eur
          </p>
          <ChevronIcon className="size-3" />
        </>
      );
      break;
  }

  return (
    <div className="p-2.5 rounded-lg border border-neutral-400 bg-neutral-500 flex gap-x-2 items-center cursor-pointer">
      {content}
    </div>
  );
};

export default CurrencyPicker;

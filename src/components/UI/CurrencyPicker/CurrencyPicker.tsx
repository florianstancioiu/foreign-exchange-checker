import USFlag from "../../../images/flags/us.webp";
import EuFlag from "../../../images/flags/eu.webp";
import ChevronIcon from "../../../images/icon-chevron-down.svg?react";
import SearchSvg from "../../../images/icon-search.svg?react";
import { useId } from "react";
import CurrencyPickerSection from "../CurrencyPickerSection/CurrencyPickerSection";

export type CurrencyPickerProps = {
  currency: "usd" | "euro";
};

const popularCurrencies = [
  {
    id: 1,
    flag: null,
    currency: "usd",
    currencyTitle: "Us Dollar",
  },
  {
    id: 2,
    flag: null,
    currency: "ron",
    currencyTitle: "Leu",
    isActive: true,
  },
  {
    id: 3,
    flag: null,
    currency: "Eur",
    currencyTitle: "Euro",
  },
];

const CurrencyPicker = ({ currency }: CurrencyPickerProps) => {
  const currencyPickerId = useId();

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
    <div>
      <button
        type="button"
        popoverTarget={currencyPickerId}
        className="p-2.5 rounded-lg border border-neutral-400 bg-neutral-500 flex gap-x-2 items-center cursor-pointer focus-visible:outline-lime-500 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:rounded-lg"
      >
        {content}
      </button>
      <div
        popover=""
        id={currencyPickerId}
        className="currency-picker-content rounded-lg border border-neutral-400 bg-neutral-600 max-w-78 w-full p-2 h-112 overflow-y-scroll text-neutral-200"
      >
        <div className="relative">
          <SearchSvg className="absolute top-2.5 left-3.5 select-none" />
          <input
            type="text"
            aria-label="Search currencies"
            className="text-neutral-50 mb-2.5 border border-neutral-400 bg-neutral-600 shadow-search-input p-3 placeholder:text-neutral-200 w-full text-xs font-normal leading-[120%] tracking-[0.5px] rounded-lg pl-9 focus-visible:outline-lime-500 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:rounded-lg"
            placeholder="Search currencies..."
          />
        </div>
        <CurrencyPickerSection
          title="Popular"
          titleValue={3}
          data={popularCurrencies}
        />
        <CurrencyPickerSection
          title="Other Currencies"
          titleValue={52}
          data={popularCurrencies}
        />
      </div>
    </div>
  );
};

export default CurrencyPicker;

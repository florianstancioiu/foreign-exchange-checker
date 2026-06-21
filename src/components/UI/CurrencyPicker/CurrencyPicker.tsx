import ChevronIcon from "../../../images/icon-chevron-down.svg?react";
import SearchSvg from "../../../images/icon-search.svg?react";
import { useId } from "react";
import CurrencyPickerSection from "../CurrencyPickerSection/CurrencyPickerSection";
import { useQuery } from "@tanstack/react-query";
import { numberOfUnavailableCurrencies } from "../../../helpers/unavailableCurrencies";
import { type CurrencyPickerItemProps } from "../CurrencyPickerItem/CurrencyPickerItem";

type Currency = CurrencyPickerItemProps & {
  id: number;
};

export type CurrencyPickerProps = {
  activeISO?: string;
};

const popularCurrencies: Currency[] = [
  {
    id: 1,
    iso_code: "usd",
    name: "Us Dollar",
  },
  {
    id: 2,
    iso_code: "Eur",
    name: "Euro",
  },
  {
    id: 3,
    iso_code: "ron",
    name: "Leu",
    isActive: true,
  },
];

const CurrencyPicker = ({ activeISO = "Eur" }: CurrencyPickerProps) => {
  const currencyPickerId = useId();

  const { isPending, error, data } = useQuery({
    queryKey: ["currenciesData"],
    queryFn: async () => {
      const response = await fetch("https://api.frankfurter.dev/v2/currencies");
      return await response.json();
    },
  });

  if (isPending) {
    return <h1>Loading</h1>;
  }

  if (error) {
    return <h1>There was an error fetching the data</h1>;
  }

  const activeCurrency = data.find(
    (currency: Currency) =>
      currency.iso_code.toUpperCase() === activeISO.toUpperCase(),
  );

  console.log("activeCurrency", activeCurrency);

  return (
    <div>
      {activeCurrency && (
        <button
          type="button"
          popoverTarget={currencyPickerId}
          className="p-2.5 rounded-lg border border-neutral-400 bg-neutral-500 flex gap-x-2 items-center cursor-pointer focus-visible:outline-lime-500 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:rounded-lg"
        >
          <img
            src={`/foreign-exchange-checker/images/svg-flags/${activeCurrency.iso_code.toUpperCase().substring(0, 2)}.svg`}
            alt={`${activeCurrency.name} flag`}
            className="size-5 rounded-full"
          />
          <p className="uppercase text-sm font-normal leading-[120%] tracking-[1px]">
            {activeCurrency.name}
          </p>
          <ChevronIcon className="size-3" />
        </button>
      )}
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
          titleValue={data.length - numberOfUnavailableCurrencies}
          data={data}
        />
      </div>
    </div>
  );
};

export default CurrencyPicker;

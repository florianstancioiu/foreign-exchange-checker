import ChevronIcon from "../../../images/icon-chevron-down.svg?react";
import SearchSvg from "../../../images/icon-search.svg?react";
import { useId, useState, useRef } from "react";
import CurrencyPickerSection from "../CurrencyPickerSection/CurrencyPickerSection";
import { useQuery } from "@tanstack/react-query";
import unavailableCurrencies from "../../../helpers/unavailableCurrencies";
import { type CurrencyPickerItemProps } from "../CurrencyPickerItem/CurrencyPickerItem";
import { type ChangeEvent } from "react";

type Currency = CurrencyPickerItemProps & {
  id: number;
};

export type CurrencyPickerProps = {
  activeISO?: string;
  setActiveIso: (iso: string) => void;
};

const popularCurrencies: Currency[] = [
  {
    id: 1,
    iso_code: "USD",
    name: "Us Dollar",
  },
  {
    id: 2,
    iso_code: "EUR",
    name: "Euro",
  },
  {
    id: 3,
    iso_code: "RON",
    name: "Leu",
    isActive: true,
  },
];

const CurrencyPicker = ({
  activeISO = "EUR",
  setActiveIso,
}: CurrencyPickerProps) => {
  const currencyPickerId = useId();
  const [searchKeyword, setSearchKeyword] = useState("");
  const popoverRef = useRef<null | HTMLDivElement>(null);

  const { isPending, error, data } = useQuery({
    queryKey: ["currencies"],
    queryFn: async () => {
      const response = await fetch("https://api.frankfurter.dev/v2/currencies");

      return await response.json();
    },
  });

  const dataArray = !Array.isArray(data) ? [] : data;

  const onChangeSearchKeywordHandler = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchKeyword(event.target.value);
  };

  const activeCurrency = dataArray?.find(
    (currency: Currency) => currency.iso_code === activeISO,
  );

  const searchedData = dataArray
    ?.filter((item: Currency) => {
      if (unavailableCurrencies.includes(item.iso_code)) {
        return false;
      }

      return true;
    })
    .filter((item: Currency) => {
      const lowerCaseSearchKeyword = searchKeyword.trim().toLowerCase();

      return (
        item.name.toLowerCase().includes(lowerCaseSearchKeyword) ||
        item.iso_code.toLowerCase().includes(lowerCaseSearchKeyword)
      );
    });

  const actualData = dataArray?.filter((item: Currency) => {
    if (unavailableCurrencies.includes(item.iso_code)) {
      return false;
    }

    return true;
  });

  const onSetActiveIsoHandler = (iso: string) => {
    setActiveIso(iso);

    if (popoverRef.current) {
      popoverRef.current.hidePopover();
    }
  };

  return (
    <div>
      {activeCurrency && (
        <button
          type="button"
          popoverTarget={currencyPickerId}
          title={activeCurrency.name}
          data-testid="currency_picker_active_button"
          className="p-2.5 rounded-lg border border-neutral-400 bg-neutral-500 light:bg-blue-200 light:border-blue-300 flex gap-x-2 items-center cursor-pointer focus-visible:outline-lime-500 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:rounded-lg"
        >
          <img
            src={`/foreign-exchange-checker/images/svg-flags/${activeCurrency.iso_code.toUpperCase().substring(0, 2)}.svg`}
            alt={`${activeCurrency.name} flag`}
            data-testid="currency_picker_active_currency_flag"
            className="size-5 rounded-full"
          />
          <p
            className="uppercase text-sm font-normal leading-[120%] tracking-[1px]"
            data-testid="currency_picker_active_iso_code"
            title={activeCurrency.name}
          >
            {activeCurrency.iso_code}
          </p>
          <ChevronIcon className="size-3" />
        </button>
      )}
      {isPending && (
        <button
          type="button"
          data-testid="currency_picker_is_loading_button"
          className="p-2.5 rounded-lg border border-neutral-400 bg-neutral-500 flex gap-x-2 items-center focus-visible:outline-lime-500 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:rounded-lg cursor-not-allowed"
        >
          <p className="uppercase text-sm font-normal leading-[120%] tracking-[1px]">
            Loading...
          </p>
        </button>
      )}
      {error && (
        <button
          type="button"
          data-testid="currency_picker_error_button"
          className="p-2.5 rounded-lg border border-neutral-400 bg-neutral-500 flex gap-x-2 items-center focus-visible:outline-lime-500 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:rounded-lg cursor-not-allowed"
        >
          <p className="text-red-500 uppercase text-sm font-normal leading-[120%] tracking-[1px]">
            Error loading data
          </p>
        </button>
      )}
      <div
        popover=""
        id={currencyPickerId}
        ref={popoverRef}
        className="currency-picker-content rounded-lg border border-neutral-400 bg-neutral-600 max-w-78 w-full p-2 h-112 overflow-y-scroll text-neutral-200 scrollbar-thin scrollbar-thumb-neutral-500"
      >
        <div className="relative">
          <SearchSvg className="absolute top-2.5 left-3.5 select-none" />
          <input
            type="text"
            aria-label="Search currencies"
            value={searchKeyword}
            onChange={onChangeSearchKeywordHandler}
            data-testid="currency_picker_search_input"
            className="text-neutral-50 mb-2.5 border border-neutral-400 bg-neutral-600 shadow-search-input p-3 placeholder:text-neutral-200 w-full text-xs font-normal leading-[120%] tracking-[0.5px] rounded-lg pl-9 focus-visible:outline-lime-500 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:rounded-lg"
            placeholder="Search currencies..."
          />
        </div>
        {searchKeyword.trim().length === 0 && typeof data !== "undefined" ? (
          <>
            <CurrencyPickerSection
              title="Popular"
              titleValue={3}
              data={popularCurrencies}
              activeIso={activeISO}
              onClickItem={onSetActiveIsoHandler}
            />
            <CurrencyPickerSection
              title="Other Currencies"
              titleValue={actualData.length}
              data={actualData}
              activeIso={activeISO}
              onClickItem={onSetActiveIsoHandler}
            />
          </>
        ) : (
          <CurrencyPickerSection
            title={`"${searchKeyword}" results`}
            titleValue={searchedData?.length}
            data={searchedData ?? []}
            activeIso={activeISO}
            onClickItem={onSetActiveIsoHandler}
          />
        )}
      </div>
    </div>
  );
};

export default CurrencyPicker;

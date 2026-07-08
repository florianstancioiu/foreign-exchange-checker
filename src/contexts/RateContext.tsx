import { createContext, type ReactNode } from "react";
import { type Rate } from "../types/rate";
import { useSearchParams } from "react-router";
import useRateRequest from "../hooks/useRateRequest";

export type RateState = {
  firstCurrency: string;
  secondCurrency: string;
  sendValue: number | string;
  setSendValue: (value: number | string) => void;
  isPending: boolean;
  error: Error | null;
  data: Rate[];
  receiveValue: number;
  setFirstCurrencyHandler: (iso: string) => void;
  setSecondCurrencyHandler: (iso: string) => void;
  onExchangeBtnClickHandler: () => void;
  loadCurrencies: (firstCurrency: string, secondCurrency: string) => void;
};

export const RateContext = createContext<RateState | null>(null);

const initialCurrencies = {
  firstCurrency: "USD",
  secondCurrency: "EUR",
};

export type RateContextProps = {
  children: ReactNode;
};

export const RateContextProvider = ({ children }: RateContextProps) => {
  const [searchParams, setSearchParams] = useSearchParams({
    base: initialCurrencies.firstCurrency,
    quote: initialCurrencies.secondCurrency,
    send: "0",
  });

  const firstCurrency =
    searchParams.get("base") ?? initialCurrencies.firstCurrency;
  const secondCurrency =
    searchParams.get("quote") ?? initialCurrencies.secondCurrency;
  const sendValue = searchParams.get("send") ?? "0";
  let receiveValue = 0;

  const {
    isPending,
    error,
    data: baseToQuoteData,
  } = useRateRequest(
    "baseToQuoteCurrency",
    [firstCurrency, secondCurrency],
    `base=${firstCurrency}&quotes=${secondCurrency}`,
  );

  let data: Rate[] = [];
  if (Array.isArray(baseToQuoteData)) {
    data = baseToQuoteData;
  }

  if (!isPending && !error) {
    let sendFloat = parseFloat(sendValue);
    sendFloat = Number.isFinite(sendFloat) ? sendFloat : 0;

    if (data.length === 0) {
      receiveValue = sendFloat;
    } else {
      receiveValue = data[0].rate * sendFloat;
    }
  }

  const setFirstCurrencyHandler = (iso: string) =>
    setSearchParams((params) => {
      params.set("base", iso);

      return params;
    });
  const setSecondCurrencyHandler = (iso: string) =>
    setSearchParams((params) => {
      params.set("quote", iso);

      return params;
    });

  const setSendValue = (val: number | string) =>
    setSearchParams((params) => {
      params.set("send", `${val}`);

      return params;
    });

  const onExchangeBtnClickHandler = () => {
    setSearchParams((params) => {
      const initialFirstCurrency = searchParams.get("base");

      params.set(
        "base",
        params.get("quote") ?? initialCurrencies.secondCurrency,
      );
      params.set(
        "quote",
        initialFirstCurrency ?? initialCurrencies.firstCurrency,
      );

      return params;
    });
  };

  const loadCurrencies = (firstCurrency: string, secondCurrency: string) =>
    setSearchParams((params) => {
      params.set("base", firstCurrency);
      params.set("quote", secondCurrency);

      return params;
    });

  return (
    <RateContext.Provider
      value={{
        firstCurrency,
        secondCurrency,
        sendValue,
        setSendValue,
        isPending,
        error,
        data,
        receiveValue,
        setFirstCurrencyHandler,
        setSecondCurrencyHandler,
        onExchangeBtnClickHandler,
        loadCurrencies,
      }}
    >
      {children}
    </RateContext.Provider>
  );
};

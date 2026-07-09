import { createContext, type ReactNode } from "react";
import { type Rate } from "../types/rate";
import { useSearchParams } from "react-router";
import useRateRequest from "../hooks/useRateRequest";

export type RateState = {
  base: string;
  quote: string;
  sendValue: number | string;
  setSendValue: (value: number | string) => void;
  isPending: boolean;
  error: Error | null;
  data: Rate[];
  receiveValue: number;
  setBaseHandler: (iso: string) => void;
  setQuoteHandler: (iso: string) => void;
  onExchangeBtnClickHandler: () => void;
  loadCurrencies: (base: string, quote: string) => void;
};

export const RateContext = createContext<RateState | null>(null);

const initialCurrencies = {
  base: "USD",
  quote: "EUR",
};

export type RateContextProps = {
  children: ReactNode;
};

export const RateContextProvider = ({ children }: RateContextProps) => {
  const [searchParams, setSearchParams] = useSearchParams({
    base: initialCurrencies.base,
    quote: initialCurrencies.quote,
    send: "0",
  });

  const base = searchParams.get("base") ?? initialCurrencies.base;
  const quote = searchParams.get("quote") ?? initialCurrencies.quote;
  const sendValue = searchParams.get("send") ?? "0";
  let receiveValue = 0;

  const {
    isPending,
    error,
    data: baseToQuoteData,
  } = useRateRequest(
    "baseToQuoteCurrency",
    [base, quote],
    `base=${base}&quotes=${quote}`,
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

  const setBaseHandler = (iso: string) =>
    setSearchParams((params) => {
      params.set("base", iso);

      return params;
    });
  const setQuoteHandler = (iso: string) =>
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

      params.set("base", params.get("quote") ?? initialCurrencies.quote);
      params.set("quote", initialFirstCurrency ?? initialCurrencies.base);

      return params;
    });
  };

  const loadCurrencies = (base: string, quote: string) =>
    setSearchParams((params) => {
      params.set("base", base);
      params.set("quote", quote);

      return params;
    });

  return (
    <RateContext.Provider
      value={{
        base,
        quote,
        sendValue,
        setSendValue,
        isPending,
        error,
        data,
        receiveValue,
        setBaseHandler,
        setQuoteHandler,
        onExchangeBtnClickHandler,
        loadCurrencies,
      }}
    >
      {children}
    </RateContext.Provider>
  );
};

import { createContext, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Rate } from "../types/rate";
import { useSearchParams } from "react-router";

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
  } = useQuery<Rate[]>({
    queryKey: ["baseToQuoteCurrency", firstCurrency, secondCurrency],
    staleTime: 5000,
    queryFn: async () => {
      const response = await fetch(
        `https://api.frankfurter.dev/v2/rates?base=${firstCurrency}&quotes=${secondCurrency}`,
      );

      if (!response.ok) {
        throw new Error("There was an error with baseToQuoteCurrency query");
      }

      return await response.json();
    },
  });

  const data = Array.isArray(baseToQuoteData) ? baseToQuoteData : [];

  if (!isPending && !error && data.length >= 0) {
    if (data.length === 0) {
      receiveValue = Number.isFinite(parseFloat(sendValue))
        ? parseFloat(sendValue)
        : 0;
    } else {
      receiveValue = data[0].rate * parseFloat(searchParams.get("send") ?? "0");
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

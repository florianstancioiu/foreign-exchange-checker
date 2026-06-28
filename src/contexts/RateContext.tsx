import { use, createContext, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Rate } from "../types/rate";
import { useSearchParams } from "react-router";

export type RateState = {
  firstCurrency: string;
  secondCurrency: string;
  sendValue: number;
  setSendValue: (value: number) => void;
  isPending: boolean;
  error: Error | null;
  data: Rate[];
  receiveValue: number;
  setFirstCurrencyHandler: (iso: string) => void;
  setSecondCurrencyHandler: (iso: string) => void;
  onExchangeBtnClickHandler: () => void;
};

const RateContext = createContext<RateState | null>(null);

const initialCurrencies = {
  firstCurrency: "USD",
  secondCurrency: "EUR",
};

export type RateContextProps = {
  children: ReactNode;
};

export const RateContextProvider = ({ children }: RateContextProps) => {
  const [searchParams, setSearchParams] = useSearchParams({
    firstCurrency: initialCurrencies.firstCurrency,
    secondCurrency: initialCurrencies.secondCurrency,
    sendValue: "0",
  });

  const firstCurrency =
    searchParams.get("firstCurrency") ?? initialCurrencies.firstCurrency;
  const secondCurrency =
    searchParams.get("secondCurrency") ?? initialCurrencies.secondCurrency;
  const sendValue = parseFloat(searchParams.get("sendValue") ?? "0");
  let receiveValue = 0;

  const { isPending, error, data } = useQuery({
    queryKey: [
      `baseCurrencyToQuoteCurrency-${firstCurrency}-${secondCurrency}`,
    ],
    queryFn: async () => {
      const response = await fetch(
        `https://api.frankfurter.dev/v2/rates?base=${firstCurrency?.toUpperCase()}&quotes=${secondCurrency?.toUpperCase()}`,
      );

      return await response.json();
    },
  });

  if (!isPending && !error && data.length > 0) {
    receiveValue =
      data[0].rate * parseFloat(searchParams.get("sendValue") ?? "0");
  }

  const setFirstCurrencyHandler = (iso: string) =>
    setSearchParams((params) => {
      params.set("firstCurrency", iso);

      return params;
    });
  const setSecondCurrencyHandler = (iso: string) =>
    setSearchParams((params) => {
      params.set("secondCurrency", iso);

      return params;
    });

  const setSendValue = (val: number) =>
    setSearchParams((params) => {
      params.set("sendValue", `${val}`);

      return params;
    });

  const onExchangeBtnClickHandler = () => {
    setSearchParams((params) => {
      const initialFirstCurrency = searchParams.get("firstCurrency");

      params.set(
        "firstCurrency",
        params.get("secondCurrency") ?? initialCurrencies.secondCurrency,
      );
      params.set(
        "secondCurrency",
        initialFirstCurrency ?? initialCurrencies.firstCurrency,
      );

      return params;
    });
  };

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
      }}
    >
      {children}
    </RateContext.Provider>
  );
};

export const useRateContext = () => {
  const context = use(RateContext);

  if (!context) {
    throw new Error(
      "useRateContext must be used within <RateContextProvider />",
    );
  }

  return context;
};

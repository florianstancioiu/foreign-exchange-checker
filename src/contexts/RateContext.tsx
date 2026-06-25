import { useContext, createContext, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Rate } from "../types/rate";

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

export type RateContextProps = {
  children: ReactNode;
};

export const RateContextProvider = ({ children }: RateContextProps) => {
  const [firstCurrency, setFirstCurrency] = useState("USD");
  const [secondCurrency, setSecondCurrency] = useState("EUR");
  const [sendValue, setSendValue] = useState(0);

  const { isPending, error, data } = useQuery({
    queryKey: [
      `baseCurrencyToQuoteCurrency-${firstCurrency}-${secondCurrency}`,
    ],
    queryFn: async () => {
      const response = await fetch(
        `https://api.frankfurter.dev/v2/rates?base=${firstCurrency.toUpperCase()}&quotes=${secondCurrency.toUpperCase()}`,
      );

      return await response.json();
    },
  });

  const receiveValue =
    !isPending && !error && data.length === 1 ? data[0].rate * sendValue : 0;

  const setFirstCurrencyHandler = (iso: string) => setFirstCurrency(iso);
  const setSecondCurrencyHandler = (iso: string) => setSecondCurrency(iso);

  const onExchangeBtnClickHandler = () => {
    const initialCurrency = firstCurrency;

    setFirstCurrency(secondCurrency);
    setSecondCurrency(initialCurrency);
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
  const context = useContext(RateContext);

  if (!context) {
    throw new Error(
      "useRateContext must be used within <RateContextProvider />",
    );
  }

  return context;
};

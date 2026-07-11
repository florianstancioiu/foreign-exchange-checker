import { useContext } from "react";
import { RateContext } from "../contexts/RateContext/RateContext";

export const useRateContext = () => {
  const context = useContext(RateContext);

  if (!context) {
    throw new Error(
      "useRateContext must be used within <RateContextProvider />",
    );
  }

  return context;
};

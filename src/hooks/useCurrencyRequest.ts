import { useQuery } from "@tanstack/react-query";
import { type Currency } from "../types/currency";

const useCurrencyRequest = () => {
  return useQuery<Currency[]>({
    queryKey: ["currencies"],
    staleTime: 1000 * 60 * 10,
    queryFn: async () => {
      const response = await fetch("https://api.frankfurter.dev/v2/currencies");

      if (!response.ok) {
        throw new Error("There was an error with currencies query");
      }

      const json = await response.json();

      return Array.isArray(json) ? json : [];
    },
  });
};

export default useCurrencyRequest;

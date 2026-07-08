import { useQuery } from "@tanstack/react-query";
import { type Rate } from "../types/rate";

const useRateRequest = (key: string, keyVars: string[], queryVars: string) => {
  return useQuery<Rate[]>({
    queryKey: [key, ...keyVars],
    staleTime: 1000 * 60,
    queryFn: async () => {
      const response = await fetch(
        `https://api.frankfurter.dev/v2/rates?${queryVars}`,
      );

      if (!response.ok) {
        throw new Error(`There was an error with ${key} query`);
      }

      const json = await response.json();

      return Array.isArray(json) ? json : [];
    },
  });
};

export default useRateRequest;

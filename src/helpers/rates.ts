import { type Rate } from "../types/rate";

export const getRateStats = (rates: Rate[] | undefined, fromDate: string) => {
  if (rates === undefined) {
    return {
      fromRate: 0,
      lastRate: 0,
      change: 0,
      changePercentage: 0,
    };
  }

  const fromRate = rates.find((rate) => rate.date === fromDate)?.rate ?? 0;
  const lastRate = rates[rates.length - 1].rate ?? 0;
  const change = lastRate - fromRate;
  const changePercentage = ((change / fromRate) * 100).toFixed(2);

  return {
    fromRate: fromRate.toFixed(4),
    lastRate: lastRate.toFixed(4),
    change,
    changePercentage,
  };
};

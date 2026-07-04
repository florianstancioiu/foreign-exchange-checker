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
  const lastRate = rates.length !== 0 ? rates[rates.length - 1].rate : 0;
  const change = lastRate - fromRate;
  let changePercentage = fromRate === 0 ? 0 : (change / fromRate) * 100;

  if (fromRate === lastRate) {
    changePercentage = 0;
  }

  return {
    fromRate,
    lastRate,
    change,
    changePercentage,
  };
};

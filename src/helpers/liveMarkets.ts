import { getYesterday } from "./dates";
import { type Rate } from "../types/rate";

const getRateDiffPercentage = (todaysRate: number, rateDiff: number) => {
  if (todaysRate === 0) {
    return "0.00";
  }

  return ((rateDiff / todaysRate) * 100).toFixed(2);
};

export const getLiveMarkets = (ratesData?: Rate[]) => {
  if (typeof ratesData === "undefined") {
    return [];
  }

  const yesterday = getYesterday();
  const todaysData = ratesData.filter((rate) => rate.date !== yesterday);
  const yesterdayData = ratesData.filter((rate) => rate.date === yesterday);

  const liveMarkets = [];

  for (let i = 0; i < todaysData.length; i++) {
    for (let j = 0; j < yesterdayData.length; j++) {
      const market = todaysData[i];
      const yesterdayMarket = yesterdayData[j];

      if (market.quote === yesterdayMarket.quote) {
        const rateDiff = market.rate - yesterdayMarket.rate;

        liveMarkets.push({
          ...market,
          rateDiff,
          rateDiffPercentage: getRateDiffPercentage(market.rate, rateDiff),
        });

        break;
      }
    }
  }

  return liveMarkets;
};

export const liveMarketsCurrencies = [
  "EUR",
  "USD",
  "GBP",
  "JPY",
  "MDL",
  "CNY",
  "CHF",
  "AUD",
  "CAD",
  "HKD",
  "SGD",
];

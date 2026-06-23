import { getYesterday } from "./dates";

export type Rate = {
  base: string;
  date: string;
  quote: string;
  rate: number;
};

export const getRateDiffPercentage = (todaysRate: number, rateDiff: number) => {
  return ((rateDiff / todaysRate) * 100).toFixed(2);
};

export const getLiveMarkets = (ratesData: Rate[]) => {
  const yesterday = getYesterday();
  const todaysData = ratesData.filter((rate) => rate.date !== yesterday);
  const yesterdayData = ratesData.filter((rate) => rate.date === yesterday);

  const liveMarkets = [];

  for (let i = 0; i < todaysData.length; i++) {
    for (let j = 0; j < yesterdayData.length; i++) {
      const market = todaysData[i];
      const yesterdayMarket = yesterdayData[i];

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

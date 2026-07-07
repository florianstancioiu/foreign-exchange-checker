import MarketItem from "../MarketItem/MarketItem";
import { SmartTicker } from "react-smart-ticker";
import { useQuery } from "@tanstack/react-query";
import { getYesterday } from "../../helpers/dates";
import { getLiveMarkets } from "../../helpers/liveMarkets";
import EmptyMarketItem from "../UI/EmptyMarketItem/EmptyMarketItem";
import { liveMarketsCurrencies } from "../../helpers/liveMarkets";
import { type Rate } from "../../types/rate";

const baseCurrency = "RON";

const LiveMarkets = () => {
  const { isPending, error, data } = useQuery<Rate[]>({
    queryKey: ["liveMarkets", getYesterday()],
    staleTime: 1000 * 60,
    queryFn: async () => {
      const response = await fetch(
        `https://api.frankfurter.dev/v2/rates?base=${baseCurrency}&quotes=${liveMarketsCurrencies.join(",")}&from=${getYesterday()}`,
      );

      if (!response.ok) {
        throw new Error("There was an error with liveMarkets query");
      }

      const json = await response.json();

      return Array.isArray(json) ? json : [];
    },
  });

  const liveMarketsData = getLiveMarkets(data);

  return (
    <section data-testid="live_markets">
      <div className="inline-flex items-center absolute top-14 w-full md:top-16">
        <div className="bg-lime-500 px-3 py-2 inline-flex gap-x-2 items-center md:px-5 md:py-3 min-w-34.5 md:min-w-38">
          <span className="size-2.5 bg-neutral-900 rounded-full light:bg-neutral-900"></span>
          <p className="text-neutral-900">Live Markets</p>
        </div>
        <SmartTicker pauseOnHover smart={false} iterations="infinite" autoFill>
          {!isPending &&
            !error &&
            liveMarketsData.map((market) => (
              <MarketItem
                key={`${market.base}/${market.quote}`}
                baseCurrency={market.base}
                quoteCurrency={market.quote}
                rate={market.rate}
                rateDiff={market.rateDiff}
                rateDiffPercentage={market.rateDiffPercentage}
              />
            ))}
          {isPending && <EmptyMarketItem title="Loading the currencies..." />}
          {error && (
            <EmptyMarketItem
              title="There was an error loading the currencies..."
              className="text-red-500"
            />
          )}
        </SmartTicker>
      </div>
    </section>
  );
};

export default LiveMarkets;

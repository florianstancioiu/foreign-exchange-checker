import MarketItem from "../MarketItem/MarketItem";
import { SmartTickerDraggable } from "react-smart-ticker";

const liveMarkets = [
  {
    id: 1,
    firstCurrency: "USD",
    secondCurrency: "JPY",
    value: 157.91,
    procentageValue: 0.04,
  },
  {
    id: 2,
    firstCurrency: "GBP",
    secondCurrency: "USD",
    value: 1.3575,
    procentageValue: -0.22,
  },
  {
    id: 3,
    firstCurrency: "USD",
    secondCurrency: "JPY",
    value: 157.91,
    procentageValue: 0.04,
  },

  {
    id: 4,
    firstCurrency: "GBP",
    secondCurrency: "USD",
    value: 1.3575,
    procentageValue: -0.22,
  },
  {
    id: 5,
    firstCurrency: "USD",
    secondCurrency: "JPY",
    value: 157.91,
    procentageValue: 0.04,
  },
  {
    id: 6,
    firstCurrency: "GBP",
    secondCurrency: "USD",
    value: 1.3575,
    procentageValue: -0.22,
  },
  {
    id: 7,
    firstCurrency: "USD",
    secondCurrency: "JPY",
    value: 157.91,
    procentageValue: 0.04,
  },
  {
    id: 8,
    firstCurrency: "GBP",
    secondCurrency: "USD",
    value: 1.3575,
    procentageValue: -0.22,
  },
  {
    id: 9,
    firstCurrency: "GBP",
    secondCurrency: "USD",
    value: 1.3575,
    procentageValue: -0.22,
  },
  {
    id: 10,
    firstCurrency: "USD",
    secondCurrency: "JPY",
    value: 157.91,
    procentageValue: 0.04,
  },
  {
    id: 11,
    firstCurrency: "GBP",
    secondCurrency: "USD",
    value: 1.3575,
    procentageValue: -0.22,
  },
];

const LiveMarkets = () => {
  return (
    <section>
      <div className="inline-flex items-center absolute top-14 w-full md:top-16">
        <div className="bg-lime-500 px-3 py-2 inline-flex gap-x-2 items-center md:px-5 md:py-3 min-w-34.5">
          <span className="size-2.5 bg-neutral-900 rounded-full "></span>
          <p className="text-neutral-900">Live Markets</p>
        </div>
        <SmartTickerDraggable
          isText={false}
          pauseOnHover
          smart={false}
          iterations="infinite"
        >
          {liveMarkets.map((market) => (
            <MarketItem
              key={market.id}
              firstCurrency={market.firstCurrency}
              secondCurrency={market.secondCurrency}
              value={market.value}
              procentageValue={market.procentageValue}
            />
          ))}
        </SmartTickerDraggable>
      </div>
    </section>
  );
};

export default LiveMarkets;

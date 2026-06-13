import MarketItem from "../MarketItem/MarketItem";

const LiveMarkets = () => {
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
  ];

  return (
    <section className="overflow-hidden">
      <div className="inline-flex items-center absolute top-14 w-9000">
        <div className="bg-lime-500 px-3 py-2 inline-flex gap-x-2 items-center">
          <span className="size-2.5 bg-neutral-900 rounded-full "></span>
          <p className="text-neutral-900">Live Markets</p>
        </div>
        {liveMarkets.map((market) => (
          <MarketItem
            key={market.id}
            firstCurrency={market.firstCurrency}
            secondCurrency={market.secondCurrency}
            value={market.value}
            procentageValue={market.procentageValue}
          />
        ))}
      </div>
    </section>
  );
};

export default LiveMarkets;

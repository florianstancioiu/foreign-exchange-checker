import Button from "../UI/Button/Button";
import RateConverter from "../RateConverter/RateConverter";
import ExchangeSvg from "../../images/icon-exchange.svg?react";
import FavoritedSvg from "../../images/icon-star-filled.svg?react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const CheckRate = () => {
  const [firstCurrency, setFirstCurrency] = useState("RON");
  const [secondCurrency, setSecondCurrency] = useState("EUR");

  const { isPending, error, data } = useQuery({
    queryKey: [
      `baseCurrencyToQuoteCurrency-${firstCurrency}-${secondCurrency}`,
    ],
    queryFn: async () => {
      const response = await fetch(
        `https://api.frankfurter.dev/v2/rates?base=${firstCurrency.toUpperCase()}&quotes=${secondCurrency.toUpperCase()}`,
      );

      return await response.json();
    },
  });

  const setFirstCurrencyHandler = (iso: string) => setFirstCurrency(iso);
  const setSecondCurrencyHandler = (iso: string) => setSecondCurrency(iso);

  const onExchangeBtnClickHandler = () => {
    const initialCurrency = firstCurrency;

    setFirstCurrency(secondCurrency);
    setSecondCurrency(initialCurrency);
  };

  return (
    <section className="px-4 mb-10 md:px-6 xl:px-8">
      <h1 className="uppercase text-xl font-normal leading-6 tracking-[-0.5px] mb-4">
        Check the rate
      </h1>
      <div className="shadow-check-rate">
        <div className="p-4 bg-neutral-700 rounded-[20px] rounded-br-none rounded-bl-none border-b border-dashed border-neutral-500 md:p-5">
          <div className="flex flex-col justify-center items-center gap-y-4 md:flex-row md:gap-x-6">
            <RateConverter
              title="Send"
              value={1000}
              currency={firstCurrency}
              setCurrency={setFirstCurrencyHandler}
            />
            <Button
              onClick={onExchangeBtnClickHandler}
              className="size-12 grid place-content-center"
            >
              <ExchangeSvg />
            </Button>
            <RateConverter
              title="Receive"
              value={1000}
              currency={secondCurrency}
              setCurrency={setSecondCurrencyHandler}
              isReceive
            />
          </div>
        </div>
        <div className="p-4 bg-neutral-700 rounded-[20px] rounded-tr-none rounded-tl-none md:flex md:justify-between md:items-center">
          <p className="uppercase text-center font-normal leading-[100%] text-[10px] mb-4 md:mb-0 md:text-xs">
            {isPending ? "Loading conversion" : ""}
            {error ? "There was an error retrieving the conversion" : ""}
            {!isPending && !error
              ? `1 ${firstCurrency} = ${data.length === 1 ? data[0].rate.toFixed(4) : 1} ${secondCurrency}`
              : ""}
          </p>
          <div className="flex gap-x-2 items-center justify-center md:gap-x-3">
            <Button className="flex gap-x-2 px-3 py-2 items-center bg-lime-500 border border-lime-500 text-neutral-900 text-xs">
              <FavoritedSvg />
              <p className="uppercase">Favorited</p>
            </Button>
            <Button className="bg-neutral-700 border border-lime-500 px-2 sm:px-3 py-2 text-neutral-50">
              Log Conversion
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckRate;

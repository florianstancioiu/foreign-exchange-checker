import Button from "../UI/Button/Button";
import RateConverter from "../RateConverter/RateConverter";
import ExchangeSvg from "../../images/icon-exchange.svg?react";
import FavoriteSvg from "../../images/icon-star.svg?react";
import FavoritedSvg from "../../images/icon-star-filled.svg?react";
import { useRateContext } from "../../contexts/RateContext";
import { useFavoritesContext } from "../../contexts/FavoritesContext";
import { useLogsContext } from "../../contexts/LogsContext";

const CheckRate = () => {
  const {
    sendValue,
    firstCurrency,
    setFirstCurrencyHandler,
    setSendValue,
    onExchangeBtnClickHandler,
    receiveValue,
    secondCurrency,
    setSecondCurrencyHandler,
    isPending,
    error,
    data,
  } = useRateContext();

  const { isFavorited, toggleFavorite } = useFavoritesContext();
  const { isLogged, toggleLog, getLogId } = useLogsContext();
  const logConversionBtnId = getLogId(
    firstCurrency,
    secondCurrency,
    sendValue,
    receiveValue,
  );

  return (
    <section className="px-4 mb-10 md:px-6 xl:px-8">
      <h1 className="uppercase text-xl font-normal leading-6 tracking-[-0.5px] mb-4">
        Check the rate
      </h1>
      <div className="shadow-check-rate light:shadow-none">
        <div className="p-4 bg-neutral-700 rounded-[20px] rounded-br-none rounded-bl-none border-b border-dashed border-neutral-500 md:p-5 light:bg-neutral-50 light:border-blue-500">
          <div className="flex flex-col justify-center items-center gap-y-4 md:flex-row md:gap-x-6">
            <RateConverter
              title="Send"
              value={sendValue}
              currency={firstCurrency}
              setCurrency={setFirstCurrencyHandler}
              setSendValue={setSendValue}
            />
            <Button
              onClick={onExchangeBtnClickHandler}
              className="size-12 grid place-content-center light:focus-visible:outline-blue-500"
              ariaLabel="Swap currencies"
            >
              <ExchangeSvg />
            </Button>
            <RateConverter
              title="Receive"
              value={receiveValue}
              currency={secondCurrency}
              setCurrency={setSecondCurrencyHandler}
              isReceive
            />
          </div>
        </div>
        <div className="p-4 bg-neutral-700 rounded-[20px] rounded-tr-none rounded-tl-none md:flex md:justify-between md:items-center light:bg-neutral-50">
          <p className="uppercase text-center font-normal leading-[100%] text-[10px] mb-4 md:mb-0 md:text-xs">
            {isPending ? "Loading conversion" : ""}
            {error ? "There was an error retrieving the conversion" : ""}
            {!isPending && !error
              ? `1 ${firstCurrency} = ${data.length === 1 ? data[0].rate.toFixed(4) : 1} ${secondCurrency}`
              : ""}
          </p>
          <div className="flex gap-x-2 items-center justify-center md:gap-x-3">
            {isFavorited(firstCurrency, secondCurrency) && (
              <Button
                onClick={() => toggleFavorite(firstCurrency, secondCurrency)}
                className="flex gap-x-2 px-3 py-2 items-center bg-lime-500 border border-lime-500 text-neutral-900 text-xs hover:bg-lime-500 light:focus-visible:outline-blue-500  light:text-neutral-900 light:bg-lime-500"
              >
                <FavoritedSvg />
                <p className="uppercase">Favorited</p>
              </Button>
            )}
            {!isFavorited(firstCurrency, secondCurrency) && (
              <Button
                onClick={() => toggleFavorite(firstCurrency, secondCurrency)}
                className="flex gap-x-2 px-3 py-2 items-center text-xs hover:bg-lime-500 hover:text-neutral-900 light:text-neutral-50 light:focus-visible:outline-blue-500"
              >
                <FavoriteSvg />
                <p className="uppercase">Favorite</p>
              </Button>
            )}
            {isLogged(logConversionBtnId) && (
              <Button
                onClick={() =>
                  toggleLog(
                    firstCurrency,
                    secondCurrency,
                    sendValue,
                    receiveValue,
                  )
                }
                className="bg-neutral-700 border border-lime-500 px-2 sm:px-3 py-2 text-neutral-50 hover:bg-lime-800 light:focus-visible:outline-blue-500"
              >
                Logged Conversion
              </Button>
            )}
            {!isLogged(logConversionBtnId) && (
              <Button
                onClick={() =>
                  toggleLog(
                    firstCurrency,
                    secondCurrency,
                    sendValue,
                    receiveValue,
                  )
                }
                className="bg-neutral-700 border px-2 sm:px-3 py-2 text-neutral-50 hover:bg-lime-800 light:focus-visible:outline-blue-500"
              >
                Log Conversion
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckRate;

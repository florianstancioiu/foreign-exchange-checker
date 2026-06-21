import Button from "../UI/Button/Button";
import RateConverter from "../RateConverter/RateConverter";
import ExchangeSvg from "../../images/icon-exchange.svg?react";
import FavoritedSvg from "../../images/icon-star-filled.svg?react";

const CheckRate = () => {
  return (
    <section className="px-4 mb-10 md:px-6 xl:px-8">
      <h1 className="uppercase text-xl font-normal leading-6 tracking-[-0.5px] mb-4">
        Check the rate
      </h1>
      <div className="shadow-check-rate">
        <div className="p-4 bg-neutral-700 rounded-[20px] rounded-br-none rounded-bl-none border-b border-dashed border-neutral-500 md:p-5">
          <div className="flex flex-col justify-center items-center gap-y-4 md:flex-row md:gap-x-6">
            <RateConverter title="Send" value={1000} currency="usd" />
            <Button className="size-12 grid place-content-center">
              <ExchangeSvg />
            </Button>
            <RateConverter
              title="Receive"
              value={1000}
              currency="euro"
              isReceive
            />
          </div>
        </div>
        <div className="p-4 bg-neutral-700 rounded-[20px] rounded-tr-none rounded-tl-none md:flex md:justify-between md:items-center">
          <p className="uppercase text-center font-normal leading-[100%] text-[10px] mb-4 md:mb-0 md:text-xs">
            1 USD = 0.8530 EUR
          </p>
          <div className="flex gap-x-2 items-center justify-center md:gap-x-3">
            <Button className="flex gap-x-2 px-3 py-2 items-center bg-lime-500 border border-lime-500 text-neutral-900 text-xs">
              <FavoritedSvg />
              <p className="uppercase">Favorited</p>
            </Button>
            <Button className="bg-neutral-700 border border-lime-500 px-3 py-2 text-neutral-50">
              Log Conversion
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckRate;

import { Link } from "react-router";
import LiveMarkets from "../LiveMarkets/LiveMarkets";
import LogoSvg from "../../images/logo.svg?react";
import { liveMarketsCurrencies } from "../../helpers/liveMarkets";

const Header = () => {
  return (
    <header className="relative overflow-hidden w-full h-24 text-xs mb-10 md:h-26.5 md:mb-12 xl:mb-0">
      <div className="flex justify-between p-4 items-center md:py-5 md:px-6">
        <Link
          to="/"
          className="border border-transparent focus-visible:outline-lime-500 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:rounded-lg"
          aria-label="Navigate to homepage"
        >
          <LogoSvg className="w-28 md:w-auto" />
        </Link>
        <div className="flex gap-x-1 uppercase text-neutral-200 md:text-sm md:font-normal md:leading-[120%] md:tracking-[1px]">
          <p>{liveMarketsCurrencies.length} Currencies</p>
          <div className="hidden sm:flex sm:gap-x-1">
            <span> · </span>
            <p>EOD</p>
            <span> · </span>
            <p>ECB Data</p>
          </div>
        </div>
      </div>
      <LiveMarkets />
    </header>
  );
};

export default Header;

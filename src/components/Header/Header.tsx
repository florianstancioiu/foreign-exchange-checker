import LiveMarkets from "../LiveMarkets/LiveMarkets";
import LogoSvg from "../../images/logo.svg?react";

const Header = () => {
  return (
    <header className="relative overflow-hidden w-full h-25 text-xs mb-10 md:h-26.5 md:mb-12">
      <div className="flex justify-between p-4 items-center md:py-5 md:px-6">
        <LogoSvg />
        <div className="flex gap-x-1 uppercase text-neutral-200 md:text-sm md:font-normal md:leading-[120%] md:tracking-[1px]">
          <p>55 Currencies</p>
          <span> · </span>
          <p>EOD</p>
          <span> · </span>
          <p>ECB Data</p>
        </div>
      </div>
      <LiveMarkets />
    </header>
  );
};

export default Header;

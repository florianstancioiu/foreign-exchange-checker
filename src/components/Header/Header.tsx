import LiveMarkets from "../LiveMarkets/LiveMarkets";
import LogoSvg from "../../images/logo.svg?react";

const Header = () => {
  return (
    <header className="relative overflow-hidden w-full h-60 text-xs">
      <div className="flex justify-between p-4 items-center">
        <LogoSvg />
        <div className="flex gap-x-1 uppercase text-neutral-200">
          <p>55 Currencies</p>
          <span></span>
          <p>EOD</p>
          <span></span>
          <p>ECB Data</p>
        </div>
      </div>
      <LiveMarkets />
    </header>
  );
};

export default Header;

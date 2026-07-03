import LinkWithQuery from "../UI/LinkWithQuery/LinkWithQuery";
import LiveMarkets from "../LiveMarkets/LiveMarkets";
import LogoSvg from "../../images/logo.svg?react";
import LogoLightSvg from "../../images/logo-light.svg?react";
import { liveMarketsCurrencies } from "../../helpers/liveMarkets";
import SunSvg from "../../images/sun.svg?react";
import MoonSvg from "../../images/moon.svg?react";
import { useLocalStorage } from "usehooks-ts";
import Button from "../UI/Button/Button";
import { useEffect } from "react";

const Header = () => {
  const [lightMode, setLightMode] = useLocalStorage<boolean>(
    "lightMode:v1",
    false,
  );

  useEffect(() => {
    const htmlElement = document.documentElement;

    if (lightMode === true) {
      htmlElement.setAttribute("data-theme", "light");
    } else {
      htmlElement.removeAttribute("data-theme");
    }
  }, [lightMode]);

  const toggleLightMode = () => setLightMode((val) => !val);

  return (
    <header className="relative overflow-hidden w-full h-24 text-xs mb-10 md:h-26.5 md:mb-12 xl:mb-0">
      <div className="flex justify-between p-4 items-center md:py-5 md:px-6">
        <LinkWithQuery
          to="/"
          className="border border-transparent focus-visible:outline-lime-500 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:rounded-lg"
          aria-label="Navigate to homepage"
        >
          {!lightMode && <LogoSvg className="w-28 md:w-auto" />}
          {lightMode && (
            <LogoLightSvg className="w-28 md:w-auto text-neutral-500" />
          )}
        </LinkWithQuery>
        <div className="flex gap-x-1 uppercase text-neutral-200 md:text-sm md:font-normal md:leading-[120%] md:tracking-[1px] items-center light:text-neutral-900">
          <p>{liveMarketsCurrencies.length} Currencies</p>
          <div className="hidden sm:flex sm:gap-x-1">
            <span> · </span>
            <p>EOD</p>
            <span> · </span>
            <p>ECB Data</p>
          </div>
          <Button onClick={toggleLightMode} className="p-2 ml-2">
            {!lightMode && <SunSvg className="size-5" />}
            {lightMode && <MoonSvg className="size-5 text-white" />}
          </Button>
        </div>
      </div>
      <LiveMarkets />
    </header>
  );
};

export default Header;

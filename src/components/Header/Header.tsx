import LinkWithQuery from "../UI/LinkWithQuery/LinkWithQuery";
import LiveMarkets from "../LiveMarkets/LiveMarkets";
import LogoSvg from "../../images/logo.svg?react";
import LogoLightSvg from "../../images/logo-light.svg?react";
import { liveMarketsCurrencies } from "../../helpers/liveMarkets";
import SunSvg from "../../images/sun.svg?react";
import MoonSvg from "../../images/moon.svg?react";
import Button from "../UI/Button/Button";
import useLightMode from "../../hooks/useLightMode";

const Header = () => {
  const { lightMode, toggleLightMode } = useLightMode();

  return (
    <header className="relative overflow-hidden w-full h-24 text-xs mb-10 md:h-26.5 md:mb-12 xl:mb-0">
      <div className="flex justify-between p-4 items-center md:py-5 md:px-6">
        <LinkWithQuery
          to="/"
          className="border border-transparent focus-visible:outline-lime-500 light:focus-visible:outline-blue-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:rounded-lg"
          aria-label="Navigate to homepage"
        >
          {!lightMode && (
            <LogoSvg
              className="w-28 md:w-auto"
              data-testid="header_dark_mode_logo"
            />
          )}
          {lightMode && (
            <LogoLightSvg
              className="w-28 md:w-auto text-neutral-500"
              data-testid="header_light_mode_logo"
            />
          )}
        </LinkWithQuery>
        <div className="flex gap-x-1 uppercase text-neutral-200 md:text-sm md:font-normal md:leading-[120%] md:tracking-[1px] items-center light:text-neutral-900 light:font-semibold">
          <p data-testid="header_ticker_currencies">
            {liveMarketsCurrencies.length} Currencies
          </p>
          <div className="hidden sm:flex sm:gap-x-1">
            <span> · </span>
            <p>EOD</p>
            <span> · </span>
            <p>ECB Data</p>
          </div>
          <Button
            onClick={toggleLightMode}
            className="p-2 ml-2 light:bg-blue-400 light:border-blue-400 light:hover:bg-neutral-900 group light:focus-visible:outline-blue-200"
            aria-label="Toggle light mode"
            data-testid="header_toggle_light_mode_btn"
          >
            {!lightMode && (
              <SunSvg
                className="size-4 text-neutral-50"
                data-testid="header_dark_mode_sun_svg"
              />
            )}
            {lightMode && (
              <MoonSvg
                className="size-4 text-neutral-900 light:group-hover:text-neutral-50"
                data-testid="header_light_mode_moon_svg"
              />
            )}
          </Button>
        </div>
      </div>
      <LiveMarkets />
    </header>
  );
};

export default Header;

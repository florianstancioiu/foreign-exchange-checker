import { render, screen } from "@testing-library/react";
import Header from "./Header";
import AppWithProviders from "../../tests/AppWithProviders";
import { mockContexts } from "../../tests/mockContexts";
import { mockRatesQuery } from "../../tests/queries/rates";
import { mockLiveMarketsQuery } from "../../tests/queries/liveMarkets";
import useLightMode from "../../hooks/useLightMode";
import { liveMarketsCurrencies } from "../../helpers/liveMarkets";

// Mock useLightMode hook
vi.mock("../../hooks/useLightMode", () => ({
  default: vi.fn(() => ({
    lightMode: false,
    setLightMode: vi.fn(),
    toggleLightMode: vi.fn(),
  })),
}));

// Mock react-smart-ticker cuz otherwise it will throw errors
vi.mock("react-smart-ticker", () => ({
  SmartTicker: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("<Header />", () => {
  const mockLightModeHook = () => {
    vi.mocked(useLightMode).mockReturnValue({
      lightMode: false,
      setLightMode: vi.fn(),
      toggleLightMode: vi.fn(),
    });
  };

  beforeEach(async () => {
    mockContexts();
    mockRatesQuery();
    mockLiveMarketsQuery();
    mockLightModeHook();
  });

  test("component render", async () => {
    render(
      <AppWithProviders>
        <Header />
      </AppWithProviders>,
    );

    const darkModeLogo = screen.queryByTestId("header_dark_mode_logo");
    const lightModeLogo = screen.queryByTestId("header_light_mode_logo");

    const currenciesParagraph = screen.queryByTestId(
      "header_ticker_currencies",
    );

    const darkModeSunSvg = screen.queryByTestId("header_dark_mode_sun_svg");
    const lightModeMoonSvg = screen.queryByTestId("header_light_mode_moon_svg");

    expect(darkModeLogo).toBeInTheDocument();
    expect(lightModeLogo).not.toBeInTheDocument();
    expect(currenciesParagraph).toHaveTextContent(
      `${liveMarketsCurrencies.length} Currencies`,
    );
    expect(darkModeSunSvg).toBeInTheDocument();
    expect(lightModeMoonSvg).not.toBeInTheDocument();
  });

  test("light mode", async () => {
    vi.mocked(useLightMode).mockReturnValue({
      lightMode: true,
      setLightMode: vi.fn(),
      toggleLightMode: vi.fn(),
    });

    render(
      <AppWithProviders>
        <Header />
      </AppWithProviders>,
    );

    const darkModeLogo = screen.queryByTestId("header_dark_mode_logo");
    const lightModeLogo = screen.queryByTestId("header_light_mode_logo");

    const darkModeSunSvg = screen.queryByTestId("header_dark_mode_sun_svg");
    const lightModeMoonSvg = screen.queryByTestId("header_light_mode_moon_svg");

    expect(darkModeLogo).not.toBeInTheDocument();
    expect(lightModeLogo).toBeInTheDocument();
    expect(darkModeSunSvg).not.toBeInTheDocument();
    expect(lightModeMoonSvg).toBeInTheDocument();
  });
});

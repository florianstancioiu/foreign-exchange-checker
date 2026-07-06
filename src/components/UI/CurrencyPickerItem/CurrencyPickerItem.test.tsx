import { render, screen } from "@testing-library/react";
import CurrencyPickerItem from "./CurrencyPickerItem";
import AppWithProviders from "../../../tests/AppWithProviders";
import userEvent from "@testing-library/user-event";
import { mockRatesQuery } from "../../../tests/queries/rates";
import { mockCurrenciesQuery } from "../../../tests/queries/currencies";

describe("<CurrencyPickerItem />", () => {
  beforeEach(async () => {
    mockRatesQuery();
    mockCurrenciesQuery();
  });

  test("component render", async () => {
    const isoCode = "RON";
    const name = "Romanian Leu";

    render(
      <AppWithProviders>
        <CurrencyPickerItem iso_code={isoCode} name={name} />
      </AppWithProviders>,
    );

    const flag = await screen.getByTestId("currency_picker_item_flag");
    const flagString = flag.getAttribute("src");
    const iso = await screen.getByTestId("currency_picker_item_iso");
    const itemName = await screen.getByTestId("currency_picker_item_name");
    const activeSvg = await screen.queryByTestId("currency_picker_active_svg");

    expect(flagString).toEqual(
      "/foreign-exchange-checker/images/svg-flags/RO.svg",
    );
    expect(iso).toHaveTextContent(isoCode);
    expect(itemName).toHaveTextContent(name);
    expect(activeSvg).not.toBeInTheDocument();
  });

  test("component render with activeISO = MDL", async () => {
    const isoCode = "MDL";
    const name = "Moldovan Leu";

    render(
      <AppWithProviders>
        <CurrencyPickerItem iso_code={isoCode} name={name} isActive />
      </AppWithProviders>,
    );

    const flag = await screen.getByTestId("currency_picker_item_flag");
    const flagString = flag.getAttribute("src");
    const iso = await screen.getByTestId("currency_picker_item_iso");
    const itemName = await screen.getByTestId("currency_picker_item_name");
    const activeSvg = await screen.queryByTestId("currency_picker_active_svg");

    expect(flagString).toEqual(
      "/foreign-exchange-checker/images/svg-flags/MD.svg",
    );
    expect(iso).toHaveTextContent(isoCode);
    expect(itemName).toHaveTextContent(name);
    expect(activeSvg).toBeInTheDocument();
  });

  test("onClick prop", async () => {
    const isoCode = "MDL";
    const name = "Moldovan Leu";
    const onClick = vitest.fn();

    render(
      <AppWithProviders>
        <CurrencyPickerItem
          iso_code={isoCode}
          name={name}
          isActive
          onClick={onClick}
        />
      </AppWithProviders>,
    );

    const currencyPickerItem = await screen.getByTestId("currency_picker_item");

    await userEvent.click(currencyPickerItem);

    expect(onClick).toHaveBeenCalledOnce();
    expect(onClick).toHaveBeenCalledWith(isoCode);
  });
});

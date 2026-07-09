import { render, screen, waitFor } from "@testing-library/react";
import CurrencyPicker from "./CurrencyPicker";
import AppWithProviders from "../../../tests/AppWithProviders";
import nock from "nock";
import { mockRatesQuery } from "../../../tests/queries/rates";
import { mockCurrenciesQuery } from "../../../tests/queries/currencies";

describe("<CurrencyPicker />", () => {
  beforeEach(async () => {
    mockRatesQuery();
  });

  test("component render", async () => {
    mockCurrenciesQuery();

    const setActiveIso = vitest.fn();

    render(
      <AppWithProviders>
        <CurrencyPicker setActiveIso={setActiveIso} />
      </AppWithProviders>,
    );

    await waitFor(() => expect(nock.isDone()).toBe(true));

    const activeButton = await screen.getByTestId(
      "currency_picker_active_button",
    );
    const activeFlag = await screen.getByTestId(
      "currency_picker_active_currency_flag",
    );
    const activeFlagSrc = activeFlag.getAttribute("src");
    const activeIsoCode = await screen.getByTestId(
      "currency_picker_active_iso_code",
    );
    const searchInput = await screen.getByTestId(
      "currency_picker_search_input",
    );

    expect(activeButton).toBeInTheDocument();
    expect(activeFlagSrc).toEqual(
      "/foreign-exchange-checker/images/svg-flags/EU.svg",
    );
    expect(activeIsoCode).toHaveTextContent("EUR");
    expect(searchInput).toHaveValue("");
  });
});

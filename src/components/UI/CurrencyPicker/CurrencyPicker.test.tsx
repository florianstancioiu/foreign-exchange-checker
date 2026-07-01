import { render, screen, waitFor } from "@testing-library/react";
import CurrencyPicker from "./CurrencyPicker";
import nock from "nock";
import AppWithProviders from "../../../tests/AppWithProviders";
import currencies from "../../../tests/data/currencies";
import baseCurrencyToQuoteCurrency from "../../../tests/data/baseCurrencyToQuoteCurrency";

describe("<CurrencyPicker />", () => {
  beforeEach(async () => {
    nock("https://api.frankfurter.dev/v2/rates")
      .get("?base=USD&quotes=EUR")
      .reply(200, baseCurrencyToQuoteCurrency);
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  test("component render", async () => {
    nock("https://api.frankfurter.dev/")
      .get("/v2/currencies")
      .reply(200, currencies);

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

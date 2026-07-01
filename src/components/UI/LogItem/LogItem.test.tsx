import { render, screen } from "@testing-library/react";
import LogItem from "./LogItem";
import nock from "nock";
import AppWithProviders from "../../../tests/AppWithProviders";
import baseCurrencyToQuoteCurrency from "../../../tests/data/baseCurrencyToQuoteCurrency";

describe("<LogItem />", () => {
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
    const dateRange = "July 1st";
    const base = "EUR";
    const quote = "RON";
    const firstValue = 1;
    const secondValue = 2;

    render(
      <AppWithProviders>
        <LogItem
          id="a-log-item-id"
          dateRange={dateRange}
          base={base}
          quote={quote}
          firstValue={firstValue}
          secondValue={secondValue}
        />
      </AppWithProviders>,
    );

    const liDaterange = await screen.getByTestId("log_item_daterange");
    const liBaseQuote = await screen.getByTestId("log_item_base_quote");
    const liFirstValue = await screen.getByTestId("log_item_first_value");
    const liSecondValue = await screen.getByTestId("log_item_second_value");

    expect(liDaterange).toHaveTextContent(dateRange);
    expect(liBaseQuote).toHaveTextContent(base);
    expect(liBaseQuote).toHaveTextContent(quote);
    expect(liFirstValue).toHaveTextContent(`${firstValue}`);
    expect(liSecondValue).toHaveTextContent(`${secondValue}`);
  });
});

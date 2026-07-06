import { render, screen } from "@testing-library/react";
import LogItem from "./LogItem";
import { mockContexts } from "../../../tests/mockContexts";
import AppWithProviders from "../../../tests/AppWithProviders";
import { mockRatesQuery } from "../../../tests/queries/rates";

describe("<LogItem />", () => {
  beforeEach(async () => {
    mockContexts();
    mockRatesQuery();
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

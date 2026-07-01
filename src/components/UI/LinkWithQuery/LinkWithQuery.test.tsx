import { render, screen } from "@testing-library/react";
import LinkWithQuery from "./LinkWithQuery";
import nock from "nock";
import AppWithProviders from "../../../tests/AppWithProviders";
import baseCurrencyToQuoteCurrency from "../../../tests/data/baseCurrencyToQuoteCurrency";

describe("<LinkWithQuery />", () => {
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
    const to = "/history";
    const lwqContent = "Go to history page";

    render(
      <AppWithProviders>
        <LinkWithQuery to={to}>{lwqContent}</LinkWithQuery>
      </AppWithProviders>,
    );

    const linkWithQuery = await screen.getByTestId("link_with_query");
    const linkWithQueryHref = linkWithQuery.getAttribute("href");

    expect(linkWithQuery).toHaveTextContent(lwqContent);
    expect(linkWithQueryHref).toContain(to);
  });
});

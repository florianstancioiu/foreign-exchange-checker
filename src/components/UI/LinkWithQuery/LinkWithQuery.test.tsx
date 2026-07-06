import { render, screen } from "@testing-library/react";
import LinkWithQuery from "./LinkWithQuery";
import AppWithProviders from "../../../tests/AppWithProviders";
import { mockRatesQuery } from "../../../tests/queries/rates";

describe("<LinkWithQuery />", () => {
  beforeEach(async () => {
    mockRatesQuery();
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

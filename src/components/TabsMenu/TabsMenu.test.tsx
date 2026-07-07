import { render, screen } from "@testing-library/react";
import TabsMenu from "./TabsMenu";
import AppWithProviders from "../../tests/AppWithProviders";
import { mockContexts } from "../../tests/mockContexts";
import { mockRatesQuery } from "../../tests/queries/rates";
import { mockCurrenciesQuery } from "../../tests/queries/currencies";

describe("<RateConverter />", () => {
  beforeEach(async () => {
    mockContexts();
    mockRatesQuery();
    mockCurrenciesQuery();
  });

  test("component render", async () => {
    render(
      <AppWithProviders>
        <TabsMenu variant="favorites">
          <p>Content</p>
        </TabsMenu>
      </AppWithProviders>,
    );

    const tabsMenu = screen.getByTestId("tabs_menu");
    const tabsMenuChildren = screen.getByTestId("tabs_menu_children");

    expect(tabsMenu).toBeInTheDocument();
    expect(tabsMenuChildren).toHaveTextContent("Content");
  });
});

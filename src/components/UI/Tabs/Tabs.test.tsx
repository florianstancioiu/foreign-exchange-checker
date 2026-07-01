import { render, screen } from "@testing-library/react";
import Tabs from "./Tabs";
import tabs from "../../../helpers/tabs";
import AppWithProviders from "../../../tests/AppWithProviders";

describe("<Tabs />", () => {
  test("component render", async () => {
    render(
      <AppWithProviders>
        <Tabs values={tabs} className="w-full bg-red-500" />
      </AppWithProviders>,
    );

    const tabsElement = await screen.getByTestId("tabs");
    const tabsElementClasses = tabsElement.getAttribute("class");
    const links = await screen.getAllByTestId("tabs_link");

    expect(tabsElementClasses).toContain("w-full bg-red-500");
    expect(links.length).toEqual(4);
  });
});

import { render, screen } from "@testing-library/react";
import Dropdown from "./Dropdown";
import tabs from "../../../helpers/tabs";
import AppWithProviders from "../../../tests/AppWithProviders";

describe("<Dropdown />", () => {
  test("component render", async () => {
    render(
      <AppWithProviders>
        <Dropdown values={tabs} className="w-full" />
      </AppWithProviders>,
    );

    const dropdown = await screen.getByTestId("dropdown");
    const dropdownClasses = dropdown.getAttribute("class");
    const activeBtn = await screen.getByTestId("dropdown_active_button");
    const links = await screen.getAllByTestId("dropdown_link");

    expect(dropdownClasses).toContain("w-full");
    expect(activeBtn).toHaveTextContent(tabs[0].title);
    expect(links.length).toEqual(4);
  });
});

import { render, screen } from "@testing-library/react";
import StatsItem from "./StatsItem";

describe("<StatsItem />", () => {
  test("component render", async () => {
    const title = "Open";
    const value = 0.858;

    render(<StatsItem title={title} value={value} />);

    const siTitle = await screen.getByTestId("stats_item_title");
    const siValue = await screen.getByTestId("stats_item_value");

    expect(siTitle).toHaveTextContent(title);
    expect(siValue).toHaveTextContent(`${value}`);
  });
});

import { render, screen } from "@testing-library/react";
import DateRange from "./DateRange";
import userEvent from "@testing-library/user-event";
import ranges from "../../../helpers/ranges";

describe("<DateRange />", () => {
  test("component render", async () => {
    const active = 1;
    const onChangeActive = vitest.fn();

    render(
      <DateRange
        ranges={ranges}
        active={active}
        onChangeActive={onChangeActive}
      />,
    );

    const rangeButtons = await screen.getAllByTestId("date_range_button");
    const activeButton = rangeButtons[0];
    const activeButtonClasses = activeButton.getAttribute("class");

    expect(rangeButtons.length).toEqual(6);
    expect(activeButtonClasses).toContain("bg-neutral-500 text-neutral-50");
  });

  test("onChangeActive", async () => {
    const active = 1;
    const onChangeActive = vitest.fn();

    render(
      <DateRange
        ranges={ranges}
        active={active}
        onChangeActive={onChangeActive}
      />,
    );

    const rangeButtons = await screen.getAllByTestId("date_range_button");
    const lastRangeButtonIndex = ranges.length - 1;
    const lastRangeButton = rangeButtons[lastRangeButtonIndex];

    await userEvent.click(lastRangeButton);

    expect(onChangeActive).toHaveBeenCalledOnce();
    expect(onChangeActive).toHaveBeenCalledWith(
      ranges[lastRangeButtonIndex].value,
    );
  });
});

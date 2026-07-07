import { render, screen } from "@testing-library/react";
import CurrencyPickerSection from "./CurrencyPickerSection";
import currencies from "../../../tests/data/currencies";
import userEvent from "@testing-library/user-event";
import { mockRatesQuery } from "../../../tests/queries/rates";

describe("<CurrencyPickerSection />", () => {
  beforeEach(async () => {
    mockRatesQuery();
  });

  test("component render", async () => {
    const title = "Available currencies";
    const onClickItem = vitest.fn();

    render(
      <CurrencyPickerSection
        title={title}
        titleValue={currencies.length}
        data={currencies}
        onClickItem={onClickItem}
      />,
    );

    const sectionTitle = await screen.getByTestId(
      "currency_picker_section_title",
    );
    const sectionTitleValue = await screen.getByTestId(
      "currency_picker_section_title_value",
    );
    const currencyPickerItems = await screen.getAllByTestId(
      "currency_picker_item",
    );

    expect(sectionTitle).toHaveTextContent(title);
    expect(sectionTitleValue).toHaveTextContent(`${currencies.length}`);
    expect(currencyPickerItems.length).toEqual(165);
  });

  test("onClickItem", async () => {
    const title = "Available currencies";
    const onClickItem = vitest.fn();
    const albanianLek = currencies[2];

    render(
      <CurrencyPickerSection
        title={title}
        titleValue={currencies.length}
        data={currencies}
        onClickItem={onClickItem}
      />,
    );

    const currencyPickerItems = await screen.getAllByTestId(
      "currency_picker_item",
    );
    const thirdCurrencyPickerItem = currencyPickerItems[2];

    await userEvent.click(thirdCurrencyPickerItem);

    expect(onClickItem).toHaveBeenCalledOnce();
    expect(onClickItem).toHaveBeenCalledWith(albanianLek.iso_code);
  });
});

import { render, screen } from "@testing-library/react";
import EmptyMarketItem from "./EmptyMarketItem";

describe("<EmptyMarketItem />", () => {
  const title = "Hello World!";

  test("component render", async () => {
    render(<EmptyMarketItem title={title} />);

    const emptyMarketItem = await screen.getByTestId("empty_market_item");

    expect(emptyMarketItem).toHaveTextContent(title);
  });

  test("inject classes", async () => {
    const className = "bg-neutral-500 text-lime-500";

    render(<EmptyMarketItem title={title} className={className} />);

    const emptyMarketItem = await screen.getByTestId("empty_market_item");
    const emptyMarketItemClasses = emptyMarketItem.getAttribute("class");

    expect(emptyMarketItemClasses).toContain(className);
  });
});

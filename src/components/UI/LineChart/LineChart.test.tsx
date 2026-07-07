import { render, screen } from "@testing-library/react";
import LineChart from "./LineChart";

// Create a mock for <Line /> component so it won't throw errors
vi.mock("react-chartjs-2", () => ({
  Line: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("<LineChart />", () => {
  test("component render", async () => {
    render(
      <LineChart
        data={[]}
        labels={[]}
        title="RON/EUR"
        baseCurrency="RON"
        quoteCurrency="EUR"
        rate={0.8748}
      />,
    );

    const baseQuoteCurrencies = await screen.getByTestId(
      "line_chart_base_quote_currencies",
    );
    const rate = await screen.getByTestId("line_chart_rate");

    expect(baseQuoteCurrencies).toHaveTextContent("RON/EUR");
    expect(rate).toHaveTextContent("0.8748");
  });
});

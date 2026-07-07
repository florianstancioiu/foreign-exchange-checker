import { render, screen } from "@testing-library/react";
import CheckRate from "./CheckRate";
import AppWithProviders from "../../tests/AppWithProviders";
import { mockContexts } from "../../tests/mockContexts";
import { mockRatesQuery } from "../../tests/queries/rates";
import { createFavoritesContext } from "../../tests/mocks/favoritesContext";
import { useFavoritesContext } from "../../hooks/useFavoritesContext";
import { useLogsContext } from "../../hooks/useLogsContext";
import { createLogsContext } from "../../tests/mocks/logsContext";
import { useRateContext } from "../../hooks/useRateContext";
import { createRateContext } from "../../tests/mocks/rateContext";

describe("<CheckRate />", () => {
  beforeEach(async () => {
    mockContexts();
    mockRatesQuery();
  });

  test("component render", async () => {
    render(
      <AppWithProviders>
        <CheckRate />
      </AppWithProviders>,
    );

    const isFavoritedBtn = await screen.queryByTestId(
      "check_rate_is_favorited_btn",
    );
    const isNotFavoritedBtn = await screen.queryByTestId(
      "check_rate_is_not_favorited_btn",
    );

    expect(isFavoritedBtn).toBeInTheDocument();
    expect(isNotFavoritedBtn).not.toBeInTheDocument();
  });

  test("with a not favorited btn", async () => {
    vi.mocked(useFavoritesContext).mockReturnValue(
      createFavoritesContext({
        isFavorited: vi.fn(() => false),
      }),
    );

    render(
      <AppWithProviders>
        <CheckRate />
      </AppWithProviders>,
    );

    const isFavoritedBtn = await screen.queryByTestId(
      "check_rate_is_favorited_btn",
    );
    const isNotFavoritedBtn = await screen.queryByTestId(
      "check_rate_is_not_favorited_btn",
    );

    expect(isFavoritedBtn).not.toBeInTheDocument();
    expect(isNotFavoritedBtn).toBeInTheDocument();
  });

  test("with a logged btn", async () => {
    vi.mocked(useLogsContext).mockReturnValue(
      createLogsContext({
        isLogged: vi.fn(() => true),
      }),
    );

    render(
      <AppWithProviders>
        <CheckRate />
      </AppWithProviders>,
    );

    const isLoggedBtn = await screen.queryByTestId("check_rate_is_logged_btn");
    const isNotLoggedBtn = await screen.queryByTestId(
      "check_rate_is_not_logged_btn",
    );

    expect(isLoggedBtn).toBeInTheDocument();
    expect(isNotLoggedBtn).not.toBeInTheDocument();
  });

  test("with a not logged btn", async () => {
    render(
      <AppWithProviders>
        <CheckRate />
      </AppWithProviders>,
    );

    const isLoggedBtn = await screen.queryByTestId("check_rate_is_logged_btn");
    const isNotLoggedBtn = await screen.queryByTestId(
      "check_rate_is_not_logged_btn",
    );

    expect(isLoggedBtn).not.toBeInTheDocument();
    expect(isNotLoggedBtn).toBeInTheDocument();
  });

  test("isPending rate conversion", async () => {
    vi.mocked(useRateContext).mockReturnValue(
      createRateContext({
        isPending: true,
        data: [
          {
            rate: 0.8749,
          },
        ],
      }),
    );

    render(
      <AppWithProviders>
        <CheckRate />
      </AppWithProviders>,
    );

    const rateConversion = await screen.queryByTestId("check_rate_conversion");

    expect(rateConversion).toHaveTextContent("Loading conversion");
  });

  test("error rate conversion", async () => {
    vi.mocked(useRateContext).mockReturnValue(
      createRateContext({
        isPending: false,
        error: new Error("General purpose error"),
        data: [
          {
            rate: 0.8749,
          },
        ],
      }),
    );

    render(
      <AppWithProviders>
        <CheckRate />
      </AppWithProviders>,
    );

    const rateConversion = await screen.queryByTestId("check_rate_conversion");

    expect(rateConversion).toHaveTextContent(
      "There was an error retrieving the conversion",
    );
  });

  test("error rate conversion", async () => {
    vi.mocked(useRateContext).mockReturnValue(
      createRateContext({
        firstCurrency: "USD",
        secondCurrency: "EUR",
        data: [
          {
            rate: 0.8749,
          },
        ],
      }),
    );

    render(
      <AppWithProviders>
        <CheckRate />
      </AppWithProviders>,
    );

    const rateConversion = await screen.queryByTestId("check_rate_conversion");

    expect(rateConversion).toHaveTextContent("1 USD = 0.8749 EUR");
  });
});

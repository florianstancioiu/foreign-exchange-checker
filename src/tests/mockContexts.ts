import { vi } from "vitest";
import { useRateContext } from "../hooks/useRateContext";
import { useFavoritesContext } from "../hooks/useFavoritesContext";
import { useLogsContext } from "../hooks/useLogsContext";

import { createRateContext } from "./mocks/rateContext";
import { createFavoritesContext } from "./mocks/favoritesContext";
import { createLogsContext } from "./mocks/logsContext";

export function mockContexts() {
  vi.mocked(useRateContext).mockReturnValue(createRateContext());

  vi.mocked(useFavoritesContext).mockReturnValue(createFavoritesContext());

  vi.mocked(useLogsContext).mockReturnValue(createLogsContext());
}

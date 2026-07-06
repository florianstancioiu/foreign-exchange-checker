import { vi } from "vitest";
import "@testing-library/jest-dom";
import nock from "nock";

vi.mock("./src/hooks/useRateContext", () => ({
  useRateContext: vi.fn(),
}));

vi.mock("./src/hooks/useFavoritesContext", () => ({
  useFavoritesContext: vi.fn(),
}));

vi.mock("./src/hooks/useLogsContext", () => ({
  useLogsContext: vi.fn(),
}));

// make sure no fetch request is being made
// that doesn't mean that the useQuery will not be triggered, it will be
// it means that fetch won't trigger
nock.disableNetConnect();

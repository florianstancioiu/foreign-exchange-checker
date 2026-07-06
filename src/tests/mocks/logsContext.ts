import { vi } from "vitest";

export const createLogsContext = (overrides = {}) => ({
  isLogged: vi.fn(() => false),
  toggleLog: vi.fn(),
  getLogId: vi.fn(() => "log-id"),
  logs: [],
  clearAll: vi.fn(),
  removeLog: vi.fn(),
  ...overrides,
});

import { vi } from "vitest";

export const createRateContext = (overrides = {}) => ({
  sendValue: 100,
  receiveValue: 92.5,
  base: "USD",
  quote: "EUR",

  setBaseHandler: vi.fn(),
  setQuoteHandler: vi.fn(),
  setSendValue: vi.fn(),
  onExchangeBtnClickHandler: vi.fn(),
  loadCurrencies: vi.fn(),
  isPending: false,
  error: null,
  data: [],

  ...overrides,
});

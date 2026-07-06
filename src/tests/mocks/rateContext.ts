import { vi } from "vitest";

export const createRateContext = (overrides = {}) => ({
  sendValue: 100,
  receiveValue: 92.5,
  firstCurrency: "USD",
  secondCurrency: "EUR",

  setFirstCurrencyHandler: vi.fn(),
  setSecondCurrencyHandler: vi.fn(),
  setSendValue: vi.fn(),
  onExchangeBtnClickHandler: vi.fn(),
  loadCurrencies: vi.fn(),
  isPending: false,
  error: null,
  data: [],

  ...overrides,
});

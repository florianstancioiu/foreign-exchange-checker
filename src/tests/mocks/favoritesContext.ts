import { vi } from "vitest";

export const createFavoritesContext = (overrides = {}) => ({
  favorites: [],
  isFavorited: vi.fn(() => true),
  toggleFavorite: vi.fn(),

  ...overrides,
});

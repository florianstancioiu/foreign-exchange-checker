import { vi } from "vitest";
import useLightMode from "../hooks/useLightMode";

vi.mocked(useLightMode).mockReturnValue({
  lightMode: false,
  setLightMode: vi.fn(),
  toggleLightMode: vi.fn(() => false),
});

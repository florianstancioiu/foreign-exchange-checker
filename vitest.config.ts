import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setupTests.js"],
  },
});

import react from "@vitejs/plugin-react";
import "react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    projects: [
      {
        test: {
          include: ["tests/unit/**/*.{test,spec}.{ts,tsx}", "**/*.unit.{test,spec}.{ts,tsx}"],
          name: "unit",
          environment: "node",
        },
      },
      {
        test: {
          include: ["tests/browser/**/*.{test,spec}.{ts,tsx}", "**/*.browser.{test,spec}.{ts,tsx}"],
          name: "browser",
          browser: {
            enabled: true,
            provider: "playwright",
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
    coverage: {
      provider: "v8",
      reporter: ["json", "html", "json-summary"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["**/*.{test,spec}.{ts,tsx}"],
    },
  },
  resolve: {
    alias: {
      "@": `${__dirname}/src`,
    },
  },
});

// import "vitest-browser-react";

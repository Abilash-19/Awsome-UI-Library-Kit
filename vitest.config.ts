import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "./src"),
      "@/components": path.resolve(process.cwd(), "./src/components"),
      "@/hooks": path.resolve(process.cwd(), "./src/hooks"),
      "@/utils": path.resolve(process.cwd(), "./src/utils"),
      "@/theme": path.resolve(process.cwd(), "./src/theme"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      exclude: [
        "node_modules/",
        "src/test/",
        "**/*.test.{ts,tsx}",
        "**/*.stories.tsx",
        "dist/",
        "*.config.{js,ts}",
      ],
    },
  },
});

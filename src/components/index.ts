export * from "./Button";
export * from "./Input";
export * from "./Modal";
export * from "./Typography";

// ── Theme ──
export { ThemeProvider, useTheme, defaultTheme, darkTheme } from "../theme";
export type { ThemeConfig, ColorScale } from "../theme";

// ── Explicit type re-exports (avoids isolatedModules issues) ──
export type { InputProps } from "./Input";
export type { ButtonProps } from "./Button";
export type { TypographyProps } from "./Typography";

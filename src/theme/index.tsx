// src/theme/index.ts

// Types
export type {
  ThemeConfig,
  ThemeColors,
  ColorScale,
  SemanticColors,
} from "./Types";

// Themes
export { defaultTheme } from "./DefaultTheme";
export { darkTheme } from "./DarkTheme";

// Context & Provider
export { ThemeContext, useTheme } from "./ThemeContext";
export type { ThemeContextValue } from "./ThemeContext";
export { ThemeProvider } from "./ThemeProvider";
export type { ThemeProviderProps } from "./ThemeProvider";

export { deepMerge } from "./utils/DeepMerge";
export { applyCSSVariables } from "./utils/CSSVariablesDeclaration";

// src/theme/index.ts
// Public API — import everything from here, not from individual files.

export type {
  ColorScale,
  BrandPalette,
  SemanticTokens,
  ThemeShape,
  ThemeTypography,
  ThemeConfig,
  ThemeOverride,
  PaletteOverride,
} from "./Types";

export { defaultTheme } from "./DefaultTheme";
export { darkTheme } from "./DarkTheme";
export { themeToVars, applyCSSVars, applyTheme, mergeTheme } from "./utils";
export {
  ThemeProvider,
  useTheme,
  useTokens,
  registerTheme,
} from "./ThemeProvider";

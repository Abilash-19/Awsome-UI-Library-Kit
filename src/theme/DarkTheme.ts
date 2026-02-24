// src/theme/darkTheme.ts
// Dark theme is a clean override — it does NOT spread defaultTheme's tokens.
// Instead it defines its own full token set referencing the same palette.
// This avoids stale light-mode values silently leaking into dark mode.

import type { ThemeConfig } from "./Types";
import { defaultTheme } from "./DefaultTheme";

const { palette, neutral } = defaultTheme;

// Dark-mode neutral overrides — same hue family, just inverted lightness
const darkNeutral: ThemeConfig["neutral"] = {
  50: "#080808",
  100: "#101010",
  200: "#181818",
  300: "#202020",
  400: "#383838",
  500: "#585858",
  600: "#787878",
  700: "#a0a0a0",
  800: "#c8c8c8",
  900: "#f2f2f2",
};

export const darkTheme: ThemeConfig = {
  name: "dark",
  colorMode: "dark",
  palette, // palette scales are the same — only tokens change
  neutral, // keep original neutral for reference if needed

  tokens: {
    // Layout
    background: darkNeutral[50],
    surface: darkNeutral[100],
    surfaceHover: darkNeutral[200],
    elevated: darkNeutral[200],

    // Text
    foreground: darkNeutral[900],
    foregroundMuted: darkNeutral[700],
    foregroundSubtle: darkNeutral[600],
    foregroundInverse: "#0b0f14",

    // Borders
    border: darkNeutral[300],
    borderSubtle: darkNeutral[200],
    borderStrong: darkNeutral[400],

    // Inputs
    input: darkNeutral[200],
    inputHover: darkNeutral[300],
    inputFocus: darkNeutral[100],

    // Focus
    ring: palette.primary[400],
    ringOffset: darkNeutral[100],

    // Accent — lighter shade works better on dark backgrounds
    accent: palette.primary[500],
    accentForeground: "#ffffff",
    accentHover: palette.primary[400],

    // Status — darker surfaces, lighter text for dark mode
    successSurface: palette.success[900],
    successForeground: palette.success[300],
    warningSurface: palette.warning[900],
    warningForeground: palette.warning[300],
    errorSurface: palette.error[900],
    errorForeground: palette.error[300],
    infoSurface: palette.info[900],
    infoForeground: palette.info[300],
  },

  shape: defaultTheme.shape,
  typography: defaultTheme.typography,
};

// src/theme/defaultTheme.ts
// The light theme. Semantic tokens reference palette values by variable — not
// raw hex — so it's always clear WHERE a color comes from.

import type { ThemeConfig } from "./Types";

// ─── Palette (shared between light/dark) ────────────────────────────────────

const palette = {
  primary: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },
  success: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
  },
  warning: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },
  error: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },
  info: {
    50: "#ecfeff",
    100: "#cffafe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63",
  },
} satisfies ThemeConfig["palette"];

const neutral: ThemeConfig["neutral"] = {
  50: "#f9fafb",
  100: "#f3f4f6",
  200: "#e5e7eb",
  300: "#d1d5db",
  400: "#9ca3af",
  500: "#6b7280",
  600: "#4b5563",
  700: "#374151",
  800: "#1f2937",
  900: "#111827",
};

// ─── Light theme ─────────────────────────────────────────────────────────────

export const defaultTheme: ThemeConfig = {
  name: "light",
  colorMode: "light",
  palette,
  neutral,

  tokens: {
    // Layout
    background: neutral[50],
    surface: "#ffffff",
    surfaceHover: neutral[100],
    elevated: "#ffffff",

    // Text
    foreground: neutral[900],
    foregroundMuted: neutral[500],
    foregroundSubtle: neutral[400],
    foregroundInverse: "#ffffff",

    // Borders
    border: neutral[200],
    borderSubtle: neutral[100],
    borderStrong: neutral[300],

    // Inputs
    input: "#ffffff",
    inputHover: neutral[50],
    inputFocus: "#ffffff",

    // Focus
    ring: palette.primary[500],
    ringOffset: "#ffffff",

    // Accent
    accent: palette.primary[600],
    accentForeground: "#ffffff",
    accentHover: palette.primary[700],

    // Status
    successSurface: palette.success[50],
    successForeground: palette.success[700],
    warningSurface: palette.warning[50],
    warningForeground: palette.warning[700],
    errorSurface: palette.error[50],
    errorForeground: palette.error[700],
    infoSurface: palette.info[50],
    infoForeground: palette.info[700],
  },

  shape: {
    radiusSm: "0.25rem",
    radiusMd: "0.375rem",
    radiusLg: "0.5rem",
    radiusFull: "9999px",
  },

  typography: {
    fontFamilySans:
      'Rubik, Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontFamilyMono:
      '"JetBrains Mono", "Fira Code", "Cascadia Code", Menlo, monospace',
  },
};

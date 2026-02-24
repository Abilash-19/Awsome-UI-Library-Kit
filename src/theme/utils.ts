// src/theme/utils.ts
// Two core utilities:
//   1. themeToVars()  — converts a ThemeConfig into a flat CSS custom property map
//   2. mergeTheme()   — safely merges a ThemeOverride onto a base ThemeConfig

import type { ColorScale, ThemeConfig, ThemeOverride } from "./Types";

// ─── CSS Variable Generation ─────────────────────────────────────────────────
// Converts a ThemeConfig into a flat record of CSS custom properties.
// Call this once on mount (or on theme switch) and inject into :root / a class.
//
// Output example:
//   { "--color-background": "#ffffff", "--color-accent": "#2563eb", ... }

type CSSVarMap = Record<string, string>;

export function themeToVars(theme: ThemeConfig): CSSVarMap {
  const vars: CSSVarMap = {};

  // Semantic tokens
  for (const [key, value] of Object.entries(theme.tokens)) {
    vars[`--color-${kebab(key)}`] = value;
  }

  // Neutral scale
  for (const [step, value] of Object.entries(theme.neutral)) {
    vars[`--color-neutral-${step}`] = value;
  }

  // Brand palette
  for (const [scaleName, scale] of Object.entries(theme.palette) as [
    string,
    ColorScale,
  ][]) {
    for (const [step, value] of Object.entries(scale) as [string, string][]) {
      vars[`--color-${scaleName}-${step}`] = value;
    }
  }

  // Shape
  vars["--radius-sm"] = theme.shape.radiusSm;
  vars["--radius-md"] = theme.shape.radiusMd;
  vars["--radius-lg"] = theme.shape.radiusLg;
  vars["--radius-full"] = theme.shape.radiusFull;

  // Typography
  vars["--font-sans"] = theme.typography.fontFamilySans;
  vars["--font-mono"] = theme.typography.fontFamilyMono;

  return vars;
}

// ─── Apply to DOM ────────────────────────────────────────────────────────────
// Applies a CSSVarMap to an element (defaults to :root).
// Call on mount and whenever the theme changes.

export function applyCSSVars(
  vars: CSSVarMap,
  target: HTMLElement = document.documentElement,
): void {
  for (const [property, value] of Object.entries(vars)) {
    target.style.setProperty(property, value);
  }
}

// Convenience: convert a ThemeConfig directly onto an element
export function applyTheme(
  theme: ThemeConfig,
  target: HTMLElement = document.documentElement,
): void {
  const vars = themeToVars(theme);
  applyCSSVars(vars, target);

  // Set data-theme attribute so CSS can scope selectors if needed
  target.setAttribute("data-theme", theme.name);

  // Optionally set color-scheme for browser chrome (scrollbars, inputs, etc.)
  target.style.colorScheme = theme.colorMode;
}

// ─── Theme Override Merging ──────────────────────────────────────────────────
// Safely merges a ThemeOverride onto a base ThemeConfig.
// Guarantees a fully-shaped ThemeConfig is always returned.

export function mergeTheme(
  base: ThemeConfig,
  override: ThemeOverride,
): ThemeConfig {
  // Deep-merge palette scale overrides
  const palette = { ...base.palette };
  if (override.palette) {
    for (const [scaleName, scaleOverride] of Object.entries(override.palette)) {
      const key = scaleName as keyof typeof palette;
      if (scaleOverride) {
        palette[key] = { ...palette[key], ...scaleOverride };
      }
    }
  }

  return {
    name: override.name ?? base.name,
    colorMode: base.colorMode,
    palette,
    neutral: override.neutral
      ? { ...base.neutral, ...override.neutral }
      : base.neutral,
    tokens: override.tokens
      ? { ...base.tokens, ...override.tokens }
      : base.tokens,
    shape: override.shape ? { ...base.shape, ...override.shape } : base.shape,
    typography: override.typography
      ? { ...base.typography, ...override.typography }
      : base.typography,
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** camelCase → kebab-case */
function kebab(str: string): string {
  return str.replace(/([A-Z])/g, (c) => `-${c.toLowerCase()}`);
}

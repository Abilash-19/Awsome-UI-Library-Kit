// src/theme/Types.ts

// ─── Primitive Scales ────────────────────────────────────────────────────────

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

// ─── Brand Palette ───────────────────────────────────────────────────────────
// Raw color scales. No semantics here — just the palette.

export interface BrandPalette {
  primary: ColorScale;
  success: ColorScale;
  warning: ColorScale;
  error: ColorScale;
  info: ColorScale;
}

// ─── Semantic Tokens ─────────────────────────────────────────────────────────
// Semantic tokens reference ROLES, not raw colors.
// Each value should ultimately resolve to a value from BrandPalette or NeutralScale.

export interface SemanticTokens {
  // Layout
  background: string;
  surface: string;
  surfaceHover: string;
  elevated: string;

  // Text
  foreground: string;
  foregroundMuted: string;
  foregroundSubtle: string;
  foregroundInverse: string;

  // Borders
  border: string;
  borderSubtle: string;
  borderStrong: string;

  // Interactive surfaces
  input: string;
  inputHover: string;
  inputFocus: string;

  // Focus / accessibility
  ring: string;
  ringOffset: string;

  // Accent (derived from brand.primary)
  accent: string;
  accentForeground: string;
  accentHover: string;

  // Status surfaces (backgrounds for status banners, badges, etc.)
  successSurface: string;
  successForeground: string;
  warningSurface: string;
  warningForeground: string;
  errorSurface: string;
  errorForeground: string;
  infoSurface: string;
  infoForeground: string;
}

// ─── Theme Spacing & Shape ───────────────────────────────────────────────────

export interface ThemeShape {
  radiusSm: string;
  radiusMd: string;
  radiusLg: string;
  radiusFull: string;
}

export interface ThemeTypography {
  fontFamilySans: string;
  fontFamilyMono: string;
}

// ─── Full Theme Config ───────────────────────────────────────────────────────

export interface ThemeConfig {
  /** Human-readable name used for debugging and storage keys */
  name: string;
  /** Color mode for html class / data-theme attribute */
  colorMode: "light" | "dark";
  /** Raw palette — use only to build semantic tokens */
  palette: BrandPalette;
  neutral: ColorScale;
  /** Semantic tokens — consume these in your components */
  tokens: SemanticTokens;
  shape: ThemeShape;
  typography: ThemeTypography;
}

// ─── Theme Override ───────────────────────────────────────────────────────────
// A safe partial override type. Palette overrides are deep-partial;
// token overrides are also partial — missing keys fall back to the base theme.

export type PaletteOverride = {
  [K in keyof BrandPalette]?: Partial<ColorScale>;
};

export interface ThemeOverride {
  name?: string;
  palette?: PaletteOverride;
  neutral?: Partial<ColorScale>;
  tokens?: Partial<SemanticTokens>;
  shape?: Partial<ThemeShape>;
  typography?: Partial<ThemeTypography>;
}

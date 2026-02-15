// src/theme/types.ts

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
    950: string;
}

export interface SemanticColors {
    background: string;
    foreground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    ring: string;
}

export interface ThemeColors {
    primary: ColorScale;
    secondary: ColorScale;
    success: ColorScale;
    warning: ColorScale;
    error: ColorScale;
    info: ColorScale;
    semantic: SemanticColors;
}

export interface ThemeConfig {
    colors: ThemeColors;
    radius: string;
    fontFamily: string;
}
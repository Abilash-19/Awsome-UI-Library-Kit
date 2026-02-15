// src/theme/utils/applyCSSVariables.ts
import type { ThemeConfig } from '../Types';

/**
 * Apply theme values as CSS variables to the document root
 * @param theme - Theme configuration to apply
 */
export const applyCSSVariables = (theme: ThemeConfig): void => {
    const root = document.documentElement;

    // Apply Primary Colors
    Object.entries(theme.colors.primary).forEach(([key, value]) => {
        root.style.setProperty(`--color-primary-${key}`, value);
    });

    // Apply Secondary Colors
    Object.entries(theme.colors.secondary).forEach(([key, value]) => {
        root.style.setProperty(`--color-secondary-${key}`, value);
    });

    // Apply Success Colors
    Object.entries(theme.colors.success).forEach(([key, value]) => {
        root.style.setProperty(`--color-success-${key}`, value);
    });

    // Apply Warning Colors
    Object.entries(theme.colors.warning).forEach(([key, value]) => {
        root.style.setProperty(`--color-warning-${key}`, value);
    });

    // Apply Error Colors
    Object.entries(theme.colors.error).forEach(([key, value]) => {
        root.style.setProperty(`--color-error-${key}`, value);
    });

    // Apply Info Colors
    Object.entries(theme.colors.info).forEach(([key, value]) => {
        root.style.setProperty(`--color-info-${key}`, value);
    });

    // Apply Semantic Colors
    Object.entries(theme.colors.semantic).forEach(([key, value]) => {
        // Convert camelCase to kebab-case (e.g., mutedForeground -> muted-foreground)
        const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        root.style.setProperty(`--color-${kebabKey}`, value);
    });

    // Apply Border Radius
    root.style.setProperty('--radius', theme.radius);

    // Apply Font Family
    root.style.setProperty('--font-sans', theme.fontFamily);
    root.style.fontFamily = theme.fontFamily;
};
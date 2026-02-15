// src/theme/ThemeProvider.tsx
import { useEffect, useMemo, type ReactNode } from 'react';
import { ThemeContext } from './ThemeContext';
import { defaultTheme } from './DefaultTheme';
import { deepMerge } from './utils/DeepMerge';
import { applyCSSVariables } from './utils/CSSVariablesDeclaration';
import type { ThemeConfig } from './Types';

export interface ThemeProviderProps {
    /**
     * Custom theme configuration to override defaults
     */
    theme?: Partial<ThemeConfig>;
    /**
     * Child components
     */
    children: ReactNode;
}

/**
 * ThemeProvider component
 * Wraps your app to provide theme context and apply CSS variables
 * 
 * @example
 * ```tsx
 * <ThemeProvider theme={customTheme}>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export const ThemeProvider = ({ theme, children }: ThemeProviderProps) => {
    // Merge custom theme with default theme
    const mergedTheme = useMemo(
        () => (theme ? deepMerge(defaultTheme, theme) : defaultTheme),
        [theme]
    );

    // Apply CSS variables whenever theme changes
    useEffect(() => {
        applyCSSVariables(mergedTheme);
    }, [mergedTheme]);

    // Memoize context value to prevent unnecessary re-renders
    const value = useMemo(
        () => ({ theme: mergedTheme }),
        [mergedTheme]
    );

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
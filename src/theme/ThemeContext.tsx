// src/theme/ThemeContext.tsx
import { createContext, useContext } from 'react';
import type { ThemeConfig } from './Types';

export interface ThemeContextValue {
    theme: ThemeConfig;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
    undefined
);

/**
 * Hook to access the current theme
 * @throws Error if used outside ThemeProvider
 * @returns Current theme configuration
 */
export const useTheme = (): ThemeContextValue => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
};
import type { ThemeConfig } from './Types';
import { defaultTheme } from './DefaultTheme';

export const darkTheme: ThemeConfig = {
    ...defaultTheme,
    colors: {
        ...defaultTheme.colors,
        semantic: {
            background: '#020617',
            foreground: '#f8fafc',
            muted: '#1e293b',
            mutedForeground: '#94a3b8',
            border: '#1e293b',
            ring: '#3b82f6',
        },
    },
};
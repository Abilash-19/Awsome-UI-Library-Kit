/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    50: 'var(--color-primary-50)',
                    100: 'var(--color-primary-100)',
                    200: 'var(--color-primary-200)',
                    300: 'var(--color-primary-300)',
                    400: 'var(--color-primary-400)',
                    500: 'var(--color-primary-500)',
                    600: 'var(--color-primary-600)',
                    700: 'var(--color-primary-700)',
                    800: 'var(--color-primary-800)',
                    900: 'var(--color-primary-900)',
                    950: 'var(--color-primary-950)',
                },
                secondary: {
                    50: 'var(--color-secondary-50)',
                    100: 'var(--color-secondary-100)',
                    200: 'var(--color-secondary-200)',
                    300: 'var(--color-secondary-300)',
                    400: 'var(--color-secondary-400)',
                    500: 'var(--color-secondary-500)',
                    600: 'var(--color-secondary-600)',
                    700: 'var(--color-secondary-700)',
                    800: 'var(--color-secondary-800)',
                    900: 'var(--color-secondary-900)',
                    950: 'var(--color-secondary-950)',
                },
                // Semantic colors
                success: {
                    50: 'var(--color-success-50)',
                    100: 'var(--color-success-100)',
                    200: 'var(--color-success-200)',
                    300: 'var(--color-success-300)',
                    400: 'var(--color-success-400)',
                    500: 'var(--color-success-500)',
                    600: 'var(--color-success-600)',
                    700: 'var(--color-success-700)',
                    800: 'var(--color-success-800)',
                    900: 'var(--color-success-900)',
                },
                warning: {
                    50: 'var(--color-warning-50)',
                    100: 'var(--color-warning-100)',
                    200: 'var(--color-warning-200)',
                    300: 'var(--color-warning-300)',
                    400: 'var(--color-warning-400)',
                    500: 'var(--color-warning-500)',
                    600: 'var(--color-warning-600)',
                    700: 'var(--color-warning-700)',
                    800: 'var(--color-warning-800)',
                    900: 'var(--color-warning-900)',
                },
                error: {
                    50: 'var(--color-error-50)',
                    100: 'var(--color-error-100)',
                    200: 'var(--color-error-200)',
                    300: 'var(--color-error-300)',
                    400: 'var(--color-error-400)',
                    500: 'var(--color-error-500)',
                    600: 'var(--color-error-600)',
                    700: 'var(--color-error-700)',
                    800: 'var(--color-error-800)',
                    900: 'var(--color-error-900)',
                },
                info: {
                    50: 'var(--color-info-50)',
                    100: 'var(--color-info-100)',
                    200: 'var(--color-info-200)',
                    300: 'var(--color-info-300)',
                    400: 'var(--color-info-400)',
                    500: 'var(--color-info-500)',
                    600: 'var(--color-info-600)',
                    700: 'var(--color-info-700)',
                    800: 'var(--color-info-800)',
                    900: 'var(--color-info-900)',
                },
                // UI colors
                background: 'var(--color-background)',
                foreground: 'var(--color-foreground)',
                card: {
                    DEFAULT: 'var(--color-card)',
                    foreground: 'var(--color-card-foreground)',
                },
                popover: {
                    DEFAULT: 'var(--color-popover)',
                    foreground: 'var(--color-popover-foreground)',
                },
                muted: {
                    DEFAULT: 'var(--color-muted)',
                    foreground: 'var(--color-muted-foreground)',
                },
                accent: {
                    DEFAULT: 'var(--color-accent)',
                    foreground: 'var(--color-accent-foreground)',
                },
                destructive: {
                    DEFAULT: 'var(--color-destructive)',
                    foreground: 'var(--color-destructive-foreground)',
                },
                border: 'var(--color-border)',
                input: 'var(--color-input)',
                ring: 'var(--color-ring)',
            },
            // Typography
            fontFamily: {
                sans: [
                    'Rubik',
                    'Inter',
                    'ui-sans-serif',
                    'system-ui',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'Segoe UI',
                    'Roboto',
                    'Helvetica Neue',
                    'Arial',
                    'sans-serif',
                ],
                mono: [
                    'JetBrains Mono',
                    'Fira Code',
                    'Consolas',
                    'Monaco',
                    'Courier New',
                    'monospace',
                ],
                display: [
                    'Rubik',
                    'Inter',
                    'Lexend',
                    'ui-sans-serif',
                    'system-ui',
                    'sans-serif',
                ],
            },
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.01em' }],
                sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],
                base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
                lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
                xl: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
                '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.02em' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.02em' }],
                '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
                '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
                '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
                '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
                '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
            },
            fontWeight: {
                thin: '100',
                extralight: '200',
                light: '300',
                normal: '400',
                medium: '500',
                semibold: '600',
                bold: '700',
                extrabold: '800',
                black: '900',
            },
            // Spacing (8px grid system)
            spacing: {
                px: '1px',
                0: '0',
                0.5: '0.125rem', // 2px
                1: '0.25rem',    // 4px
                1.5: '0.375rem', // 6px
                2: '0.5rem',     // 8px
                2.5: '0.625rem', // 10px
                3: '0.75rem',    // 12px
                3.5: '0.875rem', // 14px
                4: '1rem',       // 16px
                5: '1.25rem',    // 20px
                6: '1.5rem',     // 24px
                7: '1.75rem',    // 28px
                8: '2rem',       // 32px
                9: '2.25rem',    // 36px
                10: '2.5rem',    // 40px
                11: '2.75rem',   // 44px
                12: '3rem',      // 48px
                14: '3.5rem',    // 56px
                16: '4rem',      // 64px
                20: '5rem',      // 80px
                24: '6rem',      // 96px
                28: '7rem',      // 112px
                32: '8rem',      // 128px
                36: '9rem',      // 144px
                40: '10rem',     // 160px
                44: '11rem',     // 176px
                48: '12rem',     // 192px
                52: '13rem',     // 208px
                56: '14rem',     // 224px
                60: '15rem',     // 240px
                64: '16rem',     // 256px
                72: '18rem',     // 288px
                80: '20rem',     // 320px
                96: '24rem',     // 384px
            },
            // Border radius
            borderRadius: {
                none: '0',
                sm: '0.25rem',    // 4px
                DEFAULT: '0.375rem', // 6px
                md: '0.5rem',     // 8px
                lg: '0.75rem',    // 12px
                xl: '1rem',       // 16px
                '2xl': '1.5rem',  // 24px
                '3xl': '2rem',    // 32px
                full: '9999px',
            },
            // Box shadows
            boxShadow: {
                sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
                inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
                none: 'none',
            },
            // Animation
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'fade-out': {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' },
                },
                'slide-in-up': {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                'slide-in-down': {
                    '0%': { transform: 'translateY(-10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                'slide-in-left': {
                    '0%': { transform: 'translateX(-10px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                'slide-in-right': {
                    '0%': { transform: 'translateX(10px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                'scale-in': {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
            animation: {
                'fade-in': 'fade-in 0.2s ease-out',
                'fade-out': 'fade-out 0.2s ease-out',
                'slide-in-up': 'slide-in-up 0.3s ease-out',
                'slide-in-down': 'slide-in-down 0.3s ease-out',
                'slide-in-left': 'slide-in-left 0.3s ease-out',
                'slide-in-right': 'slide-in-right 0.3s ease-out',
                'scale-in': 'scale-in 0.2s ease-out',
            },
            // Transitions
            transitionTimingFunction: {
                'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
        },
    },
    plugins: [],
};
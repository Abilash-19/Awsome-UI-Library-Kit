/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: 'var(--color-background)',
                surface: 'var(--color-surface)',
                foreground: 'var(--color-foreground)',
                'foreground-muted': 'var(--color-foreground-muted)',
                border: 'var(--color-border)',
                accent: 'var(--color-accent)',
                ring: 'var(--color-ring)',
            },
            borderRadius: {
                sm: 'var(--radius-sm)',
                md: 'var(--radius-md)',
                lg: 'var(--radius-lg)',
            },
            fontFamily: {
                sans: 'var(--font-sans)',
                mono: 'var(--font-mono)',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
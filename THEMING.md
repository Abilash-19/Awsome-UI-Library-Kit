# Theming Guide

The UI Library is built on Tailwind CSS with CSS variables for flexible theming. This guide will help you customize the library to match your brand.

## Color System

The library uses a CSS variable-based color system with two main color palettes:

### Primary Colors

Used for main actions, links, and focus states.

```css
:root {
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6; /* Main primary color */
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  --color-primary-800: #1e40af;
  --color-primary-900: #1e3a8a;
  --color-primary-950: #172554;
}
```

### Secondary Colors

Used for secondary actions, text, and UI elements.

```css
:root {
  --color-secondary-50: #f8fafc;
  --color-secondary-100: #f1f5f9;
  /* ... */
  --color-secondary-500: #64748b; /* Main secondary color */
  /* ... */
}
```

## Customizing Colors

### Method 1: Override CSS Variables

Create a CSS file in your project:

```css
/* custom-theme.css */
:root {
  /* Custom primary color (e.g., purple) */
  --color-primary-50: #faf5ff;
  --color-primary-100: #f3e8ff;
  --color-primary-200: #e9d5ff;
  --color-primary-300: #d8b4fe;
  --color-primary-400: #c084fc;
  --color-primary-500: #a855f7;
  --color-primary-600: #9333ea;
  --color-primary-700: #7e22ce;
  --color-primary-800: #6b21a8;
  --color-primary-900: #581c87;
  --color-primary-950: #3b0764;
}
```

Import it after the library styles:

```tsx
import "@your-org/ui-library/styles.css";
import "./custom-theme.css";
```

### Method 2: Tailwind Config Extension

If you're using Tailwind in your project, extend the library's theme:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // Your custom primary colors
          500: "#a855f7",
        },
      },
    },
  },
};
```

## Dark Mode

The library includes built-in dark mode support using the `dark` class strategy.

### Enabling Dark Mode

Add the `dark` class to your root HTML element:

```tsx
// Using React state
const [isDark, setIsDark] = useState(false);

useEffect(() => {
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [isDark]);
```

### Dark Mode Colors

Dark mode colors are defined with CSS variables:

```css
.dark {
  --color-background: #0f172a;
  --color-foreground: #f1f5f9;
  --color-border: #334155;
  /* ... */
}
```

### Custom Dark Mode Colors

Override dark mode variables:

```css
.dark {
  --color-background: #1a1a1a;
  --color-foreground: #ffffff;
  --color-primary-500: #bb86fc; /* Different primary color in dark mode */
}
```

## Semantic Colors

The library uses semantic color tokens:

```css
:root {
  --color-background: #ffffff;
  --color-foreground: #0f172a;
  --color-border: #e2e8f0;
  --color-input: #ffffff;
  --color-ring: #3b82f6;
  --color-muted: #f1f5f9;
  --color-muted-foreground: #64748b;
}
```

### Customizing Semantic Colors

```css
:root {
  --color-background: #fafafa;
  --color-foreground: #171717;
  --color-border: #d4d4d4;
}
```

## Component-Specific Styling

### Using className Prop

All components accept a `className` prop for custom styling:

```tsx
<Button className="my-custom-class">Custom Button</Button>
```

### Using Tailwind Utilities

Combine with Tailwind utilities:

```tsx
<Button className="shadow-lg hover:shadow-xl">Enhanced Button</Button>
```

## Tailwind Configuration

If you want to use the library's theme in your own components:

```js
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@your-org/ui-library/dist/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "var(--color-primary-50)",
          100: "var(--color-primary-100)",
          // ... map all shades
        },
      },
    },
  },
};
```

## Typography

The library uses system fonts by default. To customize:

```css
:root {
  font-family:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}
```

## Spacing and Sizing

The library uses Tailwind's default spacing scale. Access via the theme tokens:

```tsx
import { theme } from "@your-org/ui-library";

console.log(theme.spacing.md); // '1rem'
```

## Best Practices

1. **Use CSS Variables**: They're easier to maintain and support runtime theming
2. **Maintain Contrast**: Ensure sufficient contrast for accessibility (WCAG AA: 4.5:1)
3. **Test Dark Mode**: Always test your custom theme in both light and dark modes
4. **Keep Consistency**: Use the same color palette across your application
5. **Semantic Naming**: Use semantic tokens rather than hardcoded colors

## Example: Complete Custom Theme

```css
/* custom-theme.css */
:root {
  /* Brand Colors */
  --color-primary-500: #ff6b6b;
  --color-primary-600: #ee5a52;
  --color-primary-700: #dc4c48;

  --color-secondary-500: #4ecdc4;
  --color-secondary-600: #45b8af;
  --color-secondary-700: #3da39a;

  /* Semantic */
  --color-background: #ffffff;
  --color-foreground: #2d3436;
}

.dark {
  --color-primary-500: #ff8787;
  --color-background: #1e1e1e;
  --color-foreground: #e1e1e1;
}
```

## Need Help?

- Check the [Storybook documentation](https://your-storybook-url.com)
- Open an issue on [GitHub](https://github.com/your-org/ui-library/issues)
- See example implementations in the `/examples` directory

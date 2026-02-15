# UI Library

A production-ready React UI component library built with TypeScript, Tailwind CSS, and Vite. Designed for enterprise applications with accessibility, theming, and full TypeScript support.

[![CI](https://github.com/your-org/ui-library/workflows/CI/badge.svg)](https://github.com/your-org/ui-library/actions)
[![npm version](https://badge.fury.io/js/%40your-org%2Fui-library.svg)](https://www.npmjs.com/package/@your-org/ui-library)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- ✨ **Modern Stack**: Built with React 18+, TypeScript, and Vite
- 🎨 **Tailwind CSS**: Utility-first styling with theme customization
- 🌓 **Dark Mode**: Built-in dark/light theme support
- ♿ **Accessible**: ARIA attributes and keyboard navigation
- 📦 **Tree-shakeable**: Optimized bundle size with ES modules
- 🔒 **Type-safe**: Full TypeScript support with exported types
- 📖 **Storybook**: Interactive component documentation
- ✅ **Tested**: Comprehensive test coverage with Vitest
- 🚀 **CI/CD**: Automated testing and publishing

## Technology Stack & Packages

### Core

- **[React](https://react.dev/)** (`^19.2.0`): The library for web and native user interfaces.
- **[TypeScript](https://www.typescriptlang.org/)** (`~5.7.0`): Strongly typed programming language that builds on JavaScript.

### Build & Styling

- **[Vite](https://vitejs.dev/)** (`^6.0.0`): Next Generation Frontend Tooling.
- **[Tailwind CSS](https://tailwindcss.com/)** (`^3.4.17`): A utility-first CSS framework for rapidly building modern websites.
- **[PostCSS](https://postcss.org/)** (`^8.4.49`): A tool for transforming CSS with JavaScript.
- **[clsx](https://github.com/lukeed/clsx)** (`^2.1.1`) & **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** (`^3.4.0`): Utilities for constructing className strings conditionally and merging Tailwind classes without conflicts.

### Component Development

- **[Storybook](https://storybook.js.org/)** (`^10.2.8`): Frontend workshop for building UI components and pages in isolation.

### Testing

- **[Vitest](https://vitest.dev/)** (`^4.0.18`): Blazing Fast Unit Test Framework.
- **[Testing Library](https://testing-library.com/)**: Simple and complete testing utilities that encourage good testing practices.

### Quality Control

- **[ESLint](https://eslint.org/)** (`^9.39.1`): Statically analyzes your code to quickly find problems.
- **[Prettier](https://prettier.io/)** (`^3.8.1`): An opinionated code formatter.
- **[Husky](https://typicode.github.io/husky/)** (`^9.1.7`): Modern native git hooks made easy.

## Installation

```bash
npm install @your-org/ui-library
```

```bash
yarn add @your-org/ui-library
```

```bash
pnpm add @your-org/ui-library
```

## Quick Start

```tsx
import { Button, Input, Modal } from "@your-org/ui-library";
import "@your-org/ui-library/styles.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>

      <Input label="Email" type="email" placeholder="your.email@example.com" />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Welcome">
        <p>Hello from the modal!</p>
      </Modal>
    </div>
  );
}
```

## Components

### Button

Versatile button component with multiple variants and sizes.

```tsx
import { Button } from "@your-org/ui-library";

<Button variant="primary" size="md">
  Click me
</Button>;
```

**Variants:** `primary`, `secondary`, `outline`, `ghost`, `danger`  
**Sizes:** `sm`, `md`, `lg`

### Input

Form input component with label, error, and helper text support.

```tsx
import { Input } from "@your-org/ui-library";

<Input
  label="Username"
  placeholder="Enter username"
  error="Username is required"
/>;
```

### Modal

Accessible modal dialog with portal rendering and keyboard support.

```tsx
import { Modal } from "@your-org/ui-library";

<Modal isOpen={true} onClose={() => {}} title="Confirmation" size="md">
  <p>Modal content here</p>
</Modal>;
```

## Theming

The library supports custom theming through CSS variables. See [THEMING.md](./THEMING.md) for detailed customization options.

```css
:root {
  --color-primary-500: #your-color;
  --color-secondary-500: #your-color;
}
```

### Dark Mode

Enable dark mode by adding the `dark` class to your root element:

```tsx
<html className="dark">{/* Your app */}</html>
```

## TypeScript

All components are fully typed with exported interfaces:

```tsx
import type { ButtonProps, InputProps, ModalProps } from "@your-org/ui-library";
```

## Development

```bash
# Install dependencies
npm install

# Run Storybook
npm run storybook

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Build library
npm run build

# Lint code
npm run lint

# Type check
npm run typecheck
```

## Documentation

- [Theming Guide](./THEMING.md)
- [Publishing Guide](./PUBLISHING.md)
- [Contributing Guidelines](./CONTRIBUTING.md)
- [Security Policy](./SECURITY.md)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT © [Your Organization](https://github.com/your-org)

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](./CONTRIBUTING.md) before submitting a pull request.

## Support

- 📖 [Documentation](https://your-org.github.io/ui-library)
- 🐛 [Issue Tracker](https://github.com/your-org/ui-library/issues)
- 💬 [Discussions](https://github.com/your-org/ui-library/discussions)

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for release history.

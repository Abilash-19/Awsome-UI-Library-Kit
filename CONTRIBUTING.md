# Contributing to UI Library

Thank you for your interest in contributing! This guide will help you get started.

## Code of Conduct

By participating in this project, you agree to maintain a welcoming and inclusive environment. Be respectful, considerate, and collaborative.

## Ways to Contribute

- 🐛 Report bugs
- 💡 Suggest features
- 📝 Improve documentation
- 🔧 Fix issues
- ✨ Add new components
- ✅ Write tests

## Getting Started

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/your-username/ui-library.git
cd ui-library
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

## Development Workflow

### Running Storybook

```bash
npm run storybook
```

Visit `http://localhost:6006` to see components.

### Running Tests

```bash
# Run tests in watch mode
npm run test:watch

# Run tests once
npm test

# Run with coverage
npm run test:coverage
```

### Linting and Formatting

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

### Type Checking

```bash
npm run typecheck
```

### Building

```bash
npm run build
```

## Adding a New Component

1. **Create component directory**:

   ```
   src/components/YourComponent/
   ├── YourComponent.tsx
   ├── YourComponent.test.tsx
   ├── YourComponent.stories.tsx
   └── index.ts
   ```

2. **Implement the component**:

   ```tsx
   // YourComponent.tsx
   import React, { forwardRef } from "react";
   import { cn } from "@/utils";

   export interface YourComponentProps {
     // Your props
   }

   export const YourComponent = forwardRef<HTMLElement, YourComponentProps>(
     (props, ref) => {
       // Component implementation
     },
   );

   YourComponent.displayName = "YourComponent";
   ```

3. **Write tests**:

   ```tsx
   // YourComponent.test.tsx
   import { describe, it, expect } from "vitest";
   import { render, screen } from "@testing-library/react";
   import { YourComponent } from "./YourComponent";

   describe("YourComponent", () => {
     it("renders correctly", () => {
       render(<YourComponent />);
       expect(screen.getByRole("...")).toBeInTheDocument();
     });
   });
   ```

4. **Create Storybook stories**:

   ```tsx
   // YourComponent.stories.tsx
   import type { Meta, StoryObj } from "@storybook/react";
   import { YourComponent } from "./YourComponent";

   const meta: Meta<typeof YourComponent> = {
     title: "Components/YourComponent",
     component: YourComponent,
     tags: ["autodocs"],
   };

   export default meta;
   type Story = StoryObj<typeof YourComponent>;

   export const Default: Story = {
     args: {},
   };
   ```

5. **Export from index files**:

   ```tsx
   // src/components/YourComponent/index.ts
   export { YourComponent, type YourComponentProps } from "./YourComponent";

   // src/components/index.ts
   export * from "./YourComponent";
   ```

## Component Guidelines

### Required Features

- ✅ TypeScript with exported props interface
- ✅ `forwardRef` for ref forwarding
- ✅ ARIA attributes for accessibility
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Comprehensive tests (>80% coverage)
- ✅ Storybook stories

### Styling Guidelines

- Use Tailwind CSS utilities
- Use `cn()` utility for className merging
- Support `className` prop for customization
- Use CSS variables for theming
- Ensure dark mode compatibility

### Accessibility

- Proper semantic HTML
- ARIA attributes where needed
- Keyboard navigation support
- Focus management
- Screen reader compatibility

## Testing Requirements

### Unit Tests

- Test all variants and sizes
- Test user interactions
- Test accessibility features
- Test edge cases
- Test ref forwarding

### Coverage

Maintain at least **80% coverage**:

```bash
npm run test:coverage
```

## Commit Guidelines

We Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

body (optional)

footer (optional)
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding/updating tests
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Other changes

### Examples

```bash
feat(button): add loading state
fix(input): resolve focus issue on mount
docs(readme): update installation instructions
test(modal): add keyboard navigation tests
```

### Commit Hooks

Pre-commit hooks will:

- Run lint-staged
- Lint your code
- Format your code

Commit-msg hook will:

- Validate commit message format

## Pull Request Process

1. **Update your branch**:

   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Run all checks**:

   ```bash
   npm run lint
   npm run typecheck
   npm test
   npm run build
   ```

3. **Push your changes**:

   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create Pull Request**:
   - Use a clear, descriptive title
   - Reference related issues
   - Describe your changes
   - Add screenshots for UI changes
   - Ensure all CI checks pass

### PR Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Checklist

- [ ] Tests pass
- [ ] Code is linted
- [ ] Types are correct
- [ ] Documentation updated
- [ ] Storybook stories added/updated
```

## Code Review

All submissions require review. We aim to review PRs within:

- **Critical bugs**: 24 hours
- **Regular PRs**: 2-3 days

Reviewers will check:

- Code quality and style
- Test coverage
- Accessibility
- Performance
- Documentation

## Release Process

Maintainers handle releases:

1. Update CHANGELOG.md
2. Bump version (`npm version`)
3. Push tag to GitHub
4. GitHub Actions publishes to npm

## Getting Help

- 💬 [GitHub Discussions](https://github.com/your-org/ui-library/discussions)
- 🐛 [Issue Tracker](https://github.com/your-org/ui-library/issues)
- 📖 [Documentation](https://github.com/your-org/ui-library#readme)

## Recognition

Contributors will be:

- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation (for significant contributions)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to UI Library!** 🎉

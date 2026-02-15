import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render as rtlRender, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';
import { ThemeProvider } from '../../theme';

const render = (ui: React.ReactElement) => {
    return rtlRender(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('Button', () => {
    it('renders with children', () => {
        rtlRender(<Button>Click me</Button>);
        expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('applies primary variant by default', () => {
        render(<Button>Primary</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveClass('bg-[var(--btn-bg)]');
    });

    it('applies secondary variant correctly', () => {
        render(<Button variant="secondary">Secondary</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveClass('bg-[var(--btn-bg)]');
        expect(button).toHaveClass('text-[var(--btn-text)]');
    });

    it('applies outline variant correctly', () => {
        render(<Button variant="outline">Outline</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveClass('border-2');
        expect(button).toHaveClass('border-[var(--btn-border)]');
    });

    it('applies ghost variant correctly', () => {
        render(<Button variant="ghost">Ghost</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveClass('text-[var(--btn-text)]');
    });

    it('applies danger variant correctly', () => {
        render(<Button variant="danger">Danger</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveClass('bg-[var(--btn-bg)]');
    });

    it('applies small size correctly', () => {
        render(<Button size="sm">Small</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveClass('h-8');
    });

    it('applies medium size by default', () => {
        render(<Button>Medium</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveClass('h-10');
    });

    it('applies large size correctly', () => {
        render(<Button size="lg">Large</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveClass('h-11');
    });

    it('handles click events', async () => {
        const handleClick = vi.fn();
        const user = userEvent.setup();

        render(<Button onClick={handleClick}>Click me</Button>);
        await user.click(screen.getByRole('button'));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('disables button when disabled prop is true', () => {
        render(<Button disabled>Disabled</Button>);
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    });

    it('shows loading state', () => {
        render(<Button isLoading>Loading</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('aria-busy', 'true');
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('disables button when loading', () => {
        render(<Button isLoading>Loading</Button>);
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    });

    it('forwards ref correctly', () => {
        const ref = vi.fn();
        render(<Button ref={ref}>Button</Button>);
        expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
        render(<Button className="custom-class">Custom</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveClass('custom-class');
    });
});

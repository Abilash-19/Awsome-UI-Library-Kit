import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render as rtlRender, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';
import { ThemeProvider } from '../../theme';

const render = (ui: React.ReactElement) => {
    return rtlRender(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('Modal', () => {
    let container: HTMLDivElement;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        if (container && container.parentElement) {
            document.body.removeChild(container);
        }
    });

    it('does not render when isOpen is false', () => {
        render(<Modal isOpen={false} onClose={vi.fn()}>Content</Modal>);
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders when isOpen is true', () => {
        render(<Modal isOpen={true} onClose={vi.fn()}>Content</Modal>);
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('renders children content', () => {
        render(
            <Modal isOpen={true} onClose={vi.fn()}>
                <p>Modal content</p>
            </Modal>
        );
        expect(screen.getByText('Modal content')).toBeInTheDocument();
    });

    it('renders title when provided', () => {
        render(
            <Modal isOpen={true} onClose={vi.fn()} title="Modal Title">
                Content
            </Modal>
        );
        expect(screen.getByText('Modal Title')).toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', async () => {
        const handleClose = vi.fn();
        const user = userEvent.setup();

        render(
            <Modal isOpen={true} onClose={handleClose}>
                Content
            </Modal>
        );

        await user.click(screen.getByLabelText('Close modal'));
        expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when Escape key is pressed', async () => {
        const handleClose = vi.fn();
        const user = userEvent.setup();

        render(
            <Modal isOpen={true} onClose={handleClose}>
                Content
            </Modal>
        );

        await user.keyboard('{Escape}');
        expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when backdrop is clicked', async () => {
        const handleClose = vi.fn();
        const user = userEvent.setup();

        render(
            <Modal isOpen={true} onClose={handleClose}>
                Content
            </Modal>
        );

        const backdrop = screen.getByRole('dialog').parentElement;
        if (backdrop) {
            await user.click(backdrop);
            expect(handleClose).toHaveBeenCalledTimes(1);
        }
    });

    it('does not call onClose when modal content is clicked', async () => {
        const handleClose = vi.fn();
        const user = userEvent.setup();

        render(
            <Modal isOpen={true} onClose={handleClose}>
                <div data-testid="modal-content">Content</div>
            </Modal>
        );

        await user.click(screen.getByTestId('modal-content'));
        expect(handleClose).not.toHaveBeenCalled();
    });

    it('hides close button when showCloseButton is false', () => {
        render(
            <Modal isOpen={true} onClose={vi.fn()} showCloseButton={false}>
                Content
            </Modal>
        );
        expect(screen.queryByLabelText('Close modal')).not.toBeInTheDocument();
    });

    it('applies small size correctly', () => {
        render(
            <Modal isOpen={true} onClose={vi.fn()} size="sm">
                Content
            </Modal>
        );
        const modal = screen.getByRole('dialog');
        expect(modal).toHaveClass('max-w-md');
    });

    it('applies medium size by default', () => {
        render(
            <Modal isOpen={true} onClose={vi.fn()}>
                Content
            </Modal>
        );
        const modal = screen.getByRole('dialog');
        expect(modal).toHaveClass('max-w-lg');
    });

    it('applies custom className', () => {
        render(
            <Modal isOpen={true} onClose={vi.fn()} className="custom-modal">
                Content
            </Modal>
        );
        const modal = screen.getByRole('dialog');
        expect(modal).toHaveClass('custom-modal');
    });

    it('has proper ARIA attributes', () => {
        render(
            <Modal isOpen={true} onClose={vi.fn()} title="Accessible Modal">
                Content
            </Modal>
        );
        const modal = screen.getByRole('dialog');
        expect(modal).toHaveAttribute('aria-modal', 'true');
        expect(modal).toHaveAttribute('aria-labelledby', 'modal-title');
    });
});

import { useEffect, useRef, type ReactNode, type FC, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils';
import { useTheme } from '@/theme';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showCloseButton?: boolean;
}

export const Modal: FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    className,
    size = 'md',
    showCloseButton = true,
}) => {
    const { theme } = useTheme();
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';

            // Focus trap - focus the modal when it opens
            modalRef.current?.focus();
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
    };

    const themeStyles: Record<string, string> = {
        '--radius': theme.radius,
        '--modal-bg': theme.colors.semantic.background,
        '--modal-text': theme.colors.semantic.foreground,
        '--modal-title': theme.colors.secondary[900],
        '--modal-ring': theme.colors.primary[500],
    };

    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            style={themeStyles as React.CSSProperties}
        >
            <div
                ref={modalRef}
                className={cn(
                    'relative w-full rounded-[var(--radius)] bg-[var(--modal-bg)] p-6 shadow-xl dark:bg-secondary-800',
                    sizes[size],
                    'animate-in fade-in-0 zoom-in-95 duration-200',
                    className
                )}
                tabIndex={-1}
            >
                {showCloseButton && (
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--modal-ring)] focus:ring-offset-2"
                        aria-label="Close modal"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                        >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>
                )}

                {title && (
                    <h2
                        id="modal-title"
                        className="mb-4 text-xl font-semibold text-[var(--modal-title)] dark:text-secondary-100"
                    >
                        {title}
                    </h2>
                )}

                <div className="text-[var(--modal-text)] dark:text-secondary-300">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};

Modal.displayName = 'Modal';

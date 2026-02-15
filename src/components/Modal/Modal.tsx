// src/components/Modal/Modal.tsx
import { useEffect, useRef, type FC, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils";
import { useTheme } from "@/theme";
import type { ModalProps } from "./Modal.types";
import { MODAL_SIZES } from "./Modal.types";
import { CloseIcon } from "@/assets/Icons/CloseIcon";

/**
 * Modal component with backdrop, keyboard controls, and focus management
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="My Modal">
 *   <p>Modal content here</p>
 * </Modal>
 * ```
 */
export const Modal: FC<ModalProps> = ({
  id,
  isOpen,
  onClose,
  title,
  children,
  className,
  size = "md",
  showCloseButton = true,
  preventBackdropClose = false,
  preventEscapeClose = false,
}) => {
  const { theme } = useTheme();
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle Escape key and body scroll lock
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen && !preventEscapeClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";

      // Focus the modal when it opens
      modalRef.current?.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, preventEscapeClose]);

  // Handle backdrop click
  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && !preventBackdropClose) {
      onClose();
    }
  };

  // Theme CSS variables
  const themeStyles: Record<string, string> = {
    "--radius": theme.radius,
    "--modal-bg": theme.colors.semantic.background,
    "--modal-text": theme.colors.semantic.foreground,
    "--modal-title": theme.colors.semantic.foreground,
    "--modal-ring": theme.colors.primary[500],
    "--modal-close-hover": theme.colors.primary[100],
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
      style={themeStyles as React.CSSProperties}
      aria-hidden={!isOpen}
    >
      <div
        id={id}
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        className={cn(
          "relative w-full rounded-[var(--radius)] bg-[var(--modal-bg)] p-6 shadow-xl dark:bg-secondary-800 modal-content-scroll  ",
          MODAL_SIZES[size],
          "animate-slide-in-up animate-zoom-in-95 duration-200",
          className,
        )}
        tabIndex={-1}
      >
        {/* Close Button */}
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--modal-ring)] focus:ring-offset-2"
            aria-label="Close modal"
            type="button"
          >
            <CloseIcon />
          </button>
        )}

        {/* Title */}
        {title && (
          <h2
            id="modal-title"
            className="mb-4 text-xl font-semibold text-[var(--modal-title)] dark:text-secondary-300"
          >
            {title}
          </h2>
        )}

        {/* Content */}
        <div className="text-[var(--modal-text)] dark:text-secondary-300 ">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

Modal.displayName = "Modal";

export default Modal;

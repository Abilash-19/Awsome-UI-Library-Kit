import { useEffect, useRef, type FC, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils";
import { useTheme } from "@/theme";
import type { ModalProps } from "./Modal.types";
import { MODAL_SIZES } from "./Modal.types";
import { CloseIcon } from "@/assets/Icons/CloseIcon";

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

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen && !preventEscapeClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      modalRef.current?.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, preventEscapeClose]);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && !preventBackdropClose) {
      onClose();
    }
  };

  // FIXED
  const themeStyles = {
    "--radius": theme.shape.radiusMd,
    "--modal-bg": theme.tokens.elevated,
    "--modal-border": theme.tokens.border,
    "--modal-text": theme.tokens.foreground,
    "--modal-title": theme.tokens.foreground,
    "--modal-ring": theme.tokens.ring,
    "--modal-close-hover": theme.tokens.surfaceHover,
  } as React.CSSProperties;

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
      style={themeStyles as React.CSSProperties}
    >
      <div
        id={id}
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        className={cn(
          "relative w-full rounded-[var(--radius)] bg-[var(--modal-bg)] border border-[var(--modal-border)] p-6 shadow-xl modal-content-scroll",
          MODAL_SIZES[size],
          "animate-slide-in-up animate-zoom-in-95 duration-200",
          className,
        )}
        tabIndex={-1}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1 rounded-[var(--radius)] text-[var(--modal-text)] opacity-70 transition-all hover:opacity-100 hover:bg-[var(--modal-close-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--modal-ring)] focus:ring-offset-2"
            aria-label="Close modal"
            type="button"
          >
            <CloseIcon />
          </button>
        )}

        {title && (
          <h2
            id="modal-title"
            className="mb-4 text-xl font-semibold text-[var(--modal-title)]"
          >
            {title}
          </h2>
        )}

        <div className="text-[var(--modal-text)]">{children}</div>
      </div>
    </div>,
    document.body,
  );
};

Modal.displayName = "Modal";

export default Modal;

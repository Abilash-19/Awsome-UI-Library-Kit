// src/components/Modal/Modal.types.ts
import type { ReactNode } from "react";

/**
 * The visual size variants available for the Modal.
 */
export type ModalSize = "sm" | "md" | "lg" | "xl";

/**
 * Props for the Modal component.
 */
export interface ModalProps {
  /** Unique identifier for the modal. */
  id?: string;

  /** Whether the modal is currently open and visible. */
  isOpen: boolean;

  /** Callback function triggered when the modal requests to close (e.g., clicking the backdrop). */
  onClose: () => void;

  /** The title displayed in the modal header. */
  title?: string;

  /** The content to be rendered within the modal body. */
  children: ReactNode;

  /** Custom CSS class for the modal container. */
  className?: string;

  /** The visual width of the modal. @default "md" */
  size?: ModalSize;

  /** Whether to show a close icon in the header. @default true */
  showCloseButton?: boolean;

  /** If true, clicking the backdrop will not trigger onClose. @default false */
  preventBackdropClose?: boolean;

  /** If true, pressing the Escape key will not trigger onClose. @default false */
  preventEscapeClose?: boolean;
}

/**
 * Size to Tailwind class mapping
 */
export const MODAL_SIZES: Record<ModalSize, string> = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

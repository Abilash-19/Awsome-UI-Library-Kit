// src/components/Modal/Modal.types.ts
import type { ReactNode } from "react";

export type ModalSize = "sm" | "md" | "lg" | "xl";

export interface ModalProps {
  /**
   * Optional id for the modal
   */
  id?: string;

  /**
   * Controls whether the modal is visible
   */
  isOpen: boolean;

  /**
   * Callback when the modal should close
   */
  onClose: () => void;

  /**
   * Optional title displayed at the top of the modal
   */
  title?: string;

  /**
   * Modal content
   */
  children: ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Modal size preset
   * @default 'md'
   */
  size?: ModalSize;

  /**
   * Show/hide the close button
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Prevent closing on backdrop click
   * @default false
   */
  preventBackdropClose?: boolean;

  /**
   * Prevent closing on Escape key
   * @default false
   */
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

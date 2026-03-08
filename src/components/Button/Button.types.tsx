import { type ButtonHTMLAttributes, type ReactNode } from "react";

/**
 * The visual variants available for the Button.
 */
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "success"
  | "warning"
  | "info";

/**
 * The size variants available for the Button.
 */
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Props for the Button component.
 * Extends all standard HTML button attributes.
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** The content to be displayed within the button. */
  children?: ReactNode;

  /** The visual variant of the button. @default "primary" */
  variant?: ButtonVariant;
  /** The visual size of the button. @default "md" */
  size?: ButtonSize;

  /** Optional icon to be displayed before the button text. */
  prefixIcon?: ReactNode;
  /** Optional icon to be displayed after the button text. */
  suffixIcon?: ReactNode;

  /** Whether the button is in a loading state. Mutually exclusive with `disabled` but provides visual feedback. */
  isLoading?: boolean;
  /** Whether the button is disabled and non-interactive. */
  disabled?: boolean;

  /** Callback function triggered when the button is clicked. */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /** Accessibility label for the button. Important for icon-only buttons. */
  "aria-label"?: string;
  /** ID of an element that describes this button. */
  "aria-describedby"?: string;
  /** Whether the button is in a pressed state (useful for toggle buttons). */
  "aria-pressed"?: boolean;
}

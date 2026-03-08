import type { InputHTMLAttributes } from "react";

/**
 * Props for the Input component.
 * Extends all standard HTML input attributes.
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Unique identifier for the input element. */
  id?: string;
  /** The label displayed above the input field. */
  label?: string;
  /** Error message to display below the input (puts the input in an error state). */
  error?: string;
  /** Optional supporting text displayed below the input field. */
  helperText?: string;
  /** The visual size of the input. @default "md" */
  inputSize?: "sm" | "md" | "lg";
  /** Icon element to display inside the input on the left side. */
  leftIcon?: React.ReactNode;
  /** Icon element to display inside the input on the right side. */
  rightIcon?: React.ReactNode;
  /** Whether the input is in a loading state. */
  isLoading?: boolean;
}

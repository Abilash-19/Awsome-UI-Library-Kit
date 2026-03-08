import type { InputHTMLAttributes, ReactNode } from "react";

/**
 * Props for the Checkbox component.
 * Extends all standard HTML input attributes while omitting conflicting ones.
 */
export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange"
> {
  /** The primary label displayed next to the checkbox. */
  label?: ReactNode;
  /** Optional detailed description text displayed below the label. */
  description?: ReactNode;
  /** Whether the checkbox should be displayed in an error state. */
  error?: boolean;
  /** Whether the checkbox is in a loading state. */
  loading?: boolean;
  /** The visual size of the checkbox. @default "medium" */
  size?: "small" | "medium" | "large";
  /** Whether the checkbox is in an indeterminate state (neither checked nor unchecked). */
  indeterminate?: boolean;
  /** Callback function triggered when the checked state changes. */
  onChange?: (checked: boolean) => void;
}

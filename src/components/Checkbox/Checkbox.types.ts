import type { InputHTMLAttributes, ReactNode } from "react";

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange"
> {
  /**
   * Label for the checkbox
   */
  label?: ReactNode;
  /**
   * Optional description text below the label
   */
  description?: ReactNode;
  /**
   * If true, the checkbox will be in an error state
   */
  error?: boolean;
  /**
   * Whether the checkbox is in a loading state
   */
  loading?: boolean;
  /**
   * Circular progress size
   */
  size?: "small" | "medium" | "large";
  /**
   * If true, the checkbox will be indeterminate
   */
  indeterminate?: boolean;
  /**
   * Callback when the checked state changes
   */
  onChange?: (checked: boolean) => void;
}

export interface SwitchProps {
  id?: string;

  /** Controlled state */
  checked?: boolean;

  /** Fired when switch changes */
  onChange?: (checked: boolean) => void;

  /** Disable interaction */
  disabled?: boolean;

  /** Required field */
  required?: boolean;

  /** Loading state */
  isLoading?: boolean;

  /** Switch size */
  size?: "small" | "medium" | "large";

  /** Label next to switch */
  label?: React.ReactNode;

  /** description */
  description?: React.ReactNode;

  /** Helper text below */
  helperText?: React.ReactNode;

  /** Error message */
  error?: React.ReactNode;

  /** Name for form submission */
  name?: string;

  /** Custom class */
  className?: string;

  /** Inline style */
  style?: React.CSSProperties;
}

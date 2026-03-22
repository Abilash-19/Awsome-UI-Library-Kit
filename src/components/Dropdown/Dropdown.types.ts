export interface DropdownOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
}

export interface DropdownProps {
  id?: string;

  /** Controlled open state */
  isOpen?: boolean;

  /** Uncontrolled initial state */
  defaultOpen?: boolean;

  /** Loading state */
  isLoading?: boolean;

  /** Loading state */
  size?: "sm" | "md" | "lg";

  /** Open state change handler */
  onChange?: (value: string) => void;

  label?: React.ReactNode;

  required?: boolean;

  /** Open state change handler */
  selectedValue?: string;

  /** Trigger element */
  options: DropdownOption[];

  /** Trigger element */
  error?: string;

  /** Disable dropdown */
  disabled?: boolean;

  /** Offset from trigger */
  offset?: number;

  /** Custom class */
  className?: string;

  /** z-index */
  zIndex?: number;
}

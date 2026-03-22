export interface DropdownOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
  /** Icon element rendered before the label */
  icon?: React.ReactNode;
}

export interface DropdownProps {
  id?: string;

  /** Controlled open state */
  isOpen?: boolean;

  /** Uncontrolled initial state */
  defaultOpen?: boolean;

  /** Loading state */
  isLoading?: boolean;

  /** Size variant */
  size?: "sm" | "md" | "lg";

  /** Value change handler */
  onChange?: (value: string) => void;

  label?: React.ReactNode;

  required?: boolean;

  /** Currently selected value */
  selectedValue?: string;

  /** List of options */
  options: DropdownOption[];

  /** Error message */
  error?: string;

  /** Placeholder text when no option is selected */
  placeholder?: string;

  /** Disable dropdown */
  disabled?: boolean;

  /** Offset from trigger */
  offset?: number;

  /** Custom class */
  className?: string;

  /** z-index */
  zIndex?: number;

  /** Enable search/filter input inside the dropdown */
  searchable?: boolean;

  /** Placeholder for the search input */
  searchPlaceholder?: string;
}

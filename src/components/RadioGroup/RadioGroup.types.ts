/**
 * Represents an individual option within a RadioGroup.
 */
export interface RadioOption {
  /** Unique identifier for the option. */
  id: string;
  /** The content to be displayed for the option label. */
  label: React.ReactNode;
  /** The value associated with this option. */
  value: string;
  /** Whether the individual option is disabled. */
  disabled?: boolean;
  /** Optional detailed description displayed below the label. */
  description?: React.ReactNode;
}

/**
 * Props for the RadioGroup component.
 */
export interface RadioGroupProps {
  /** Unique identifier for the RadioGroup. */
  id?: string;
  /** Array of options to be rendered within the group. */
  options: RadioOption[];
  /** Whether the component is in a loading state. */
  isLoading?: boolean;
  /** The controlled value of the selected radio button. */
  value?: string;
  /** The initial value for an uncontrolled component. */
  defaultValue?: string;
  /** Callback function triggered when the selection changes. */
  onChange?: (value: string) => void;
  /** The name used for grouping the radio inputs (important for native form submission). */
  name?: string;
  /** The label for the entire group. */
  label?: React.ReactNode;
  /** Supporting text displayed below the radio group. */
  helperText?: React.ReactNode;
  /** Error message to display, which also puts the group in an error state. */
  error?: React.ReactNode;
  /** Whether a selection is required. */
  required?: boolean;
  /** The visual size of the component. @default "medium" */
  size?: "small" | "medium" | "large";
  /** The visual variant of the radio buttons. @default "default" */
  variant?: "default" | "card";
  /** The layout direction of the options. @default "vertical" */
  orientation?: "horizontal" | "vertical";
  /** Whether the entire group is disabled. */
  disabled?: boolean;
  /** Custom CSS class for the root fieldset element. */
  className?: string;
  /** Inline styles for the root fieldset element. */
  style?: React.CSSProperties;
}

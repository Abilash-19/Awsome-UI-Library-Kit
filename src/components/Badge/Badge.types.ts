/**
 * Props for the Badge component.
 */
export interface BadgeProps {
  /** The visual variant of the badge. @default "primary" */
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | "outline";

  /** The visual size of the badge. @default "medium" */
  size?: "small" | "medium" | "large";
  /** The content to be displayed within the badge. */
  children: React.ReactNode;
  /** Custom CSS class for the root element. */
  className?: string;
  /** Inline styles for the root element. */
  style?: React.CSSProperties;
  /** Whether the badge is in a loading state. */
  isLoading?: boolean;
}

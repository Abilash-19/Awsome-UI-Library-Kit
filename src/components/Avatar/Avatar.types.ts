/**
 * Props for the Avatar component.
 */
export interface AvatarProps {
  /** Unique identifier for the avatar. */
  id?: string;
  /** The source URL for the avatar image. */
  src?: string;
  /** The alt text for the avatar image. */
  alt?: string;
  /** The name to display or use for initials if no image is provided. */
  displayName?: string;
  /** The visual size of the avatar. @default "medium" */
  size?: "small" | "medium" | "large";
  /** The shape of the avatar. @default "circle" */
  shape?: "circle" | "square";
  /** Custom CSS class for the root element. */
  className?: string;
  /** Inline styles for the root element. */
  style?: React.CSSProperties;
  /** Optional content (like a status indicator) to display as a badge on the avatar. */
  badge?: React.ReactNode;
  /** Callback function triggered when the badge is clicked. */
  onBadgeClick?: () => void;
  /** Whether the avatar is in a loading state. */
  isLoading?: boolean;
}

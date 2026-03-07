export interface AvatarProps {
  id?: string;
  src?: string;
  alt?: string;
  displayName?: string;
  size?: "small" | "medium" | "large";
  shape?: "circle" | "square";
  className?: string;
  style?: React.CSSProperties;
  badge?: React.ReactNode;
  onBadgeClick?: () => void;
  isLoading?: boolean;
}

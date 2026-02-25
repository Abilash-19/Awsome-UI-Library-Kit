export interface BadgeProps {
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

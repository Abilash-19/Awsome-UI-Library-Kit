import { useTheme } from "@/theme";
import type { CSSProperties } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type SkeletonVariant = "rectangular" | "circular" | "text" | "rounded";
type SkeletonAnimation = "pulse" | "wave" | "none";

export interface SkeletonProps {
  variant?: SkeletonVariant;
  animation?: SkeletonAnimation;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: CSSProperties;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function px(v: number | string | undefined): string | undefined {
  if (v === undefined) return undefined;
  return typeof v === "number" ? `${v}px` : v;
}

function variantStyles(variant: SkeletonVariant): CSSProperties {
  switch (variant) {
    case "circular":
      return { borderRadius: "50%" };
    case "rounded":
      return { borderRadius: "12px" };
    case "text":
      return {
        borderRadius: "4px",
        transform: "scale(1, 0.85)",
        transformOrigin: "0 55%",
      };
    default:
      return { borderRadius: "4px" };
  }
}

export function Skeleton({
  variant = "rectangular",
  animation = "wave",
  width,
  height,
  className = "",
  style,
}: SkeletonProps) {
  const { theme } = useTheme();
  const resolvedWidth = px(width);
  const resolvedHeight =
    px(height) ??
    (variant === "text" ? "1em" : variant === "circular" ? px(width) : "100%");

  const animationClass =
    animation === "pulse"
      ? "skeleton-pulse"
      : animation === "wave"
        ? "skeleton-wave"
        : "";

  return (
    <span
      role="status"
      aria-label="Loading…"
      aria-busy="true"
      className={`skeleton-root ${animationClass} ${className}`}
      style={
        {
          width: resolvedWidth,
          height: resolvedHeight,
          "--color-border-subtle": theme.tokens.borderSubtle,
          "--color-border": theme.tokens.border,
          "--radius-sm": theme.shape.radiusSm,
          ...variantStyles(variant),
          ...style,
        } as CSSProperties
      }
    />
  );
}

export default Skeleton;

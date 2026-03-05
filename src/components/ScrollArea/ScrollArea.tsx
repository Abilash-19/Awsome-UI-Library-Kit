import { useTheme } from "@/theme";
import type { ScrollAreaProps, ScrollAreaItemProps } from "./ScrollArea.types";
import { useReveal } from "@/hooks/useReveal";

const ScrollAreaComponent = ({
  id,
  ref,
  children,
  className = "",
  style,
  onScroll,
}: ScrollAreaProps) => {
  const { theme } = useTheme();

  const themeStyles = {
    "--scroll-thumb": theme.tokens.foregroundMuted,
    "--scroll-thumb-hover": theme.tokens.foreground,
    "--scroll-thumb-active": theme.palette.primary[500],
  } as React.CSSProperties;

  return (
    <div
      id={id}
      ref={ref}
      onScroll={onScroll}
      className={`scrollbar overflow-auto ${className}`}
      style={{ ...themeStyles, ...style }}
    >
      {children}
    </div>
  );
};

export const ScrollAreaItem = ({
  children,
  className = "",
  style,
  triggerOnce,
  revealType = "scale",
}: ScrollAreaItemProps) => {
  const { elementRef, isVisible } = useReveal({ triggerOnce });

  const ANIMATION_CLASS_MAP: Record<
    NonNullable<ScrollAreaProps["ScrollAnimation"]>,
    string
  > = {
    up: "reveal-up",
    down: "reveal-down",
    left: "reveal-left",
    right: "reveal-right",
    fade: "fade-in",
    scale: "reveal-scale",
    blur: "reveal-blur",
  };

  return (
    <div
      ref={elementRef}
      className={`${ANIMATION_CLASS_MAP[revealType] || "reveal-scale"} ${isVisible ? "is-visible" : ""} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};
console.log(Object.assign(ScrollAreaComponent, { item: ScrollAreaItem }));

export { ScrollAreaComponent as ScrollArea };
export { ScrollAreaItem as ScrollElement };

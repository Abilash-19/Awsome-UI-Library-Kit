import { forwardRef } from "react";
import { cn } from "@/utils";
import { useTheme } from "@/theme";
import type { BadgeProps } from "./Badge.types";

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { variant = "primary", size = "medium", children, className, style },
    ref,
  ) => {
    const { theme } = useTheme();

    const baseStyles =
      "inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap select-none tracking-wide";
    const variantStyles = {
      primary: "bg-[var(--badge-bg)] text-[var(--badge-text)]",
      secondary: "bg-[var(--badge-bg)] text-[var(--badge-text)]",
      success: "bg-[var(--badge-bg)] text-[var(--badge-text)]",
      danger: "bg-[var(--badge-bg)] text-[var(--badge-text)]",
      warning: "bg-[var(--badge-bg)] text-[var(--badge-text)]",
      info: "bg-[var(--badge-bg)] text-[var(--badge-text)]",
      light: "bg-[var(--badge-bg)] text-[var(--badge-text)]",
      dark: "bg-[var(--badge-bg)] text-[var(--badge-text)]",
    };

    const sizeStyles = {
      small: "h-5 px-1.5 text-[11px] leading-none",
      medium: "h-6 px-2 text-xs leading-none",
      large: "h-7 px-2.5 text-sm leading-none",
    };

    const themeStyles: Record<string, string> = {
      "--badge-bg": theme.palette.primary[100],
      "--badge-text": theme.palette.primary[700],
    };

    switch (variant) {
      case "primary":
        themeStyles["--badge-bg"] = theme.palette.primary[100];
        themeStyles["--badge-text"] = theme.palette.primary[700];
        break;
      case "secondary":
        themeStyles["--badge-bg"] = theme.neutral[100];
        themeStyles["--badge-text"] = theme.neutral[700];
        break;
      case "success":
        themeStyles["--badge-bg"] = theme.palette.success[100];
        themeStyles["--badge-text"] = theme.palette.success[700];
        break;
      case "danger":
        themeStyles["--badge-bg"] = theme.palette.error[100];
        themeStyles["--badge-text"] = theme.palette.error[700];
        break;
      case "warning":
        themeStyles["--badge-bg"] = theme.palette.warning[100];
        themeStyles["--badge-text"] = theme.palette.warning[700];
        break;
      case "info":
        themeStyles["--badge-bg"] = theme.palette.info[100];
        themeStyles["--badge-text"] = theme.palette.info[700];
        break;
      case "light":
        themeStyles["--badge-bg"] = theme.tokens.surface;
        themeStyles["--badge-text"] = theme.tokens.foreground;
        break;
      case "dark":
        themeStyles["--badge-bg"] = theme.tokens.foreground;
        themeStyles["--badge-text"] = theme.tokens.background;
        break;
    }

    return (
      <span
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        style={{ ...themeStyles, ...style } as React.CSSProperties}
      >
        {children}
      </span>
    );
  },
);

Badge.displayName = "Badge";

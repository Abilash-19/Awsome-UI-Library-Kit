// src/components/Button/Button.tsx
import { forwardRef } from "react";
import { cn } from "@/utils";
import { useTheme } from "@/theme";
import { type ButtonProps, type ButtonSize } from "./Button.types";
import { Spinner } from "@/assets/Icons/Spinner";
import { withOpacity } from "@/utils/utils";

const iconSizes: Record<ButtonSize, string> = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      text,
      prefixIcon,
      suffixIcon,
      type = "button",
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      "aria-pressed": ariaPressed,
      onClick,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();

    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary:
        "bg-[var(--btn-bg)] text-white hover:bg-[var(--btn-hover)] active:bg-[var(--btn-active)] focus-visible:ring-[var(--btn-ring)] shadow-sm",
      secondary:
        "bg-[var(--btn-bg)] text-[var(--btn-text)] hover:bg-[var(--btn-hover)] active:bg-[var(--btn-active)] focus-visible:ring-[var(--btn-ring)]",
      outline:
        "border-2 border-[var(--btn-border)] text-[var(--btn-text)] bg-transparent hover:bg-[var(--btn-hover)] active:bg-[var(--btn-active)] focus-visible:ring-[var(--btn-ring)]",
      ghost:
        "text-[var(--btn-text)] hover:bg-[var(--btn-hover)] active:bg-[var(--btn-active)] focus-visible:ring-[var(--btn-ring)]",
      danger:
        "bg-[var(--btn-bg)] text-white hover:bg-[var(--btn-hover)] active:bg-[var(--btn-active)] focus-visible:ring-[var(--btn-ring)] shadow-sm",
    };

    const sizes = {
      sm: "h-8 px-3 text-sm min-w-[4rem]",
      md: "h-10 px-4 text-sm min-w-[5rem]",
      lg: "h-12 px-6 text-base min-w-[6rem]",
    };

    // Adjust padding for icon-only buttons
    const iconOnlyStyles =
      !text && (prefixIcon || suffixIcon)
        ? {
            sm: "h-8 w-8 px-0 min-w-0",
            md: "h-10 w-10 px-0 min-w-0",
            lg: "h-12 w-12 px-0 min-w-0",
          }
        : null;

    // Theme-derived style variables
    const themeStyles: Record<string, string> = {
      "--radius": theme.radius,
      "--btn-bg": theme.colors.primary[600],
      "--btn-hover": theme.colors.primary[700],
      "--btn-active": theme.colors.primary[800],
      "--btn-ring": theme.colors.primary[500],
      "--btn-text": theme.colors.semantic.foreground,
      "--btn-border": theme.colors.primary[600],
    };

    // Apply variant-specific colors
    switch (variant) {
      case "primary":
        themeStyles["--btn-bg"] = theme.colors.primary[600];
        themeStyles["--btn-hover"] = theme.colors.primary[700];
        themeStyles["--btn-active"] = theme.colors.primary[800];
        themeStyles["--btn-ring"] = theme.colors.primary[500];
        break;
      case "secondary":
        themeStyles["--btn-bg"] = theme.colors.secondary[100];
        themeStyles["--btn-hover"] = theme.colors.secondary[200];
        themeStyles["--btn-active"] = theme.colors.secondary[300];
        themeStyles["--btn-text"] = theme.colors.secondary[900];
        themeStyles["--btn-ring"] = theme.colors.secondary[500];
        break;
      case "outline":
        themeStyles["--btn-border"] = theme.colors.primary[600];
        themeStyles["--btn-text"] = theme.colors.primary[600];
        themeStyles["--btn-hover"] = withOpacity(
          theme.colors.primary[600],
          0.1,
        );
        themeStyles["--btn-active"] = withOpacity(
          theme.colors.primary[600],
          0.2,
        );
        themeStyles["--btn-ring"] = theme.colors.primary[500];
        break;
      case "ghost":
        themeStyles["--btn-text"] = theme.colors.semantic.foreground;
        themeStyles["--btn-hover"] = withOpacity(
          theme.colors.semantic.foreground,
          0.08,
        );
        themeStyles["--btn-active"] = withOpacity(
          theme.colors.semantic.foreground,
          0.16,
        );
        themeStyles["--btn-ring"] = theme.colors.primary[500];
        break;
      case "danger":
        themeStyles["--btn-bg"] = theme.colors.error[600];
        themeStyles["--btn-hover"] = theme.colors.error[700];
        themeStyles["--btn-active"] = theme.colors.error[800];
        themeStyles["--btn-ring"] = theme.colors.error[500];
        break;
    }

    // Determine if button needs an accessible label
    const isIconOnly = !text && (prefixIcon || suffixIcon);
    const needsAriaLabel = (isLoading && !text) || (isIconOnly && !ariaLabel);
    const computedAriaLabel =
      ariaLabel || (needsAriaLabel ? "Button" : undefined);

    return (
      <button
        ref={ref}
        type={type}
        style={themeStyles}
        onClick={onClick}
        className={cn(
          baseStyles,
          "rounded-[var(--radius)]",
          variants[variant],
          iconOnlyStyles ? iconOnlyStyles[size] : sizes[size],
          className,
        )}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        aria-disabled={disabled || isLoading}
        aria-label={computedAriaLabel}
        aria-describedby={ariaDescribedBy}
        aria-pressed={ariaPressed}
        aria-live={isLoading ? "polite" : undefined}
        {...props}
      >
        {isLoading ? (
          <>
            <Spinner size={iconSizes[size]} />
            {text && <span>{text}</span>}
          </>
        ) : (
          <>
            {prefixIcon && (
              <span
                className={cn("inline-flex shrink-0", iconSizes[size])}
                aria-hidden="true"
              >
                {prefixIcon}
              </span>
            )}
            {text && <span>{text}</span>}
            {suffixIcon && (
              <span
                className={cn("inline-flex shrink-0", iconSizes[size])}
                aria-hidden="true"
              >
                {suffixIcon}
              </span>
            )}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };

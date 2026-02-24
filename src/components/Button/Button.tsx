import { forwardRef } from "react";
import { cn } from "@/utils";
import { useTheme } from "@/theme";
import { type ButtonProps, type ButtonSize } from "./Button.types";
import { Spinner } from "@/assets/Icons/Spinner";

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
      children,
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
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
    };

    const iconOnlyStyles =
      !children && (prefixIcon || suffixIcon)
        ? {
          sm: "h-8 w-8 px-0 min-w-0",
          md: "h-10 w-10 px-0 min-w-0",
          lg: "h-12 w-12 px-0 min-w-0",
        }
        : null;

    const themeStyles: Record<string, string> = {
      "--radius": theme.shape.radiusMd,
      "--btn-bg": "transparent",
      "--btn-hover": "transparent",
      "--btn-active": "transparent",
      "--btn-text": "#ffffff",
      "--btn-border": "transparent",
      "--btn-ring": theme.tokens.ring,
    };

    switch (variant) {
      case "primary":
        themeStyles["--btn-bg"] = theme.palette.primary[600];
        themeStyles["--btn-hover"] = theme.palette.primary[700];
        themeStyles["--btn-active"] = theme.palette.primary[800];
        themeStyles["--btn-ring"] = theme.palette.primary[500];
        break;

      case "secondary":
        themeStyles["--btn-bg"] = theme.tokens.surface;
        themeStyles["--btn-hover"] = theme.tokens.surfaceHover;
        themeStyles["--btn-active"] = theme.tokens.elevated;
        themeStyles["--btn-text"] = theme.tokens.foreground;
        themeStyles["--btn-ring"] = theme.tokens.ring;
        break;

      case "outline":
        themeStyles["--btn-border"] = theme.tokens.border;
        themeStyles["--btn-text"] = theme.tokens.accent;
        themeStyles["--btn-hover"] = theme.tokens.surfaceHover;
        themeStyles["--btn-active"] = theme.tokens.surfaceHover;
        themeStyles["--btn-ring"] = theme.tokens.ring;
        break;

      case "ghost":
        themeStyles["--btn-text"] = theme.tokens.foreground;
        themeStyles["--btn-hover"] = theme.tokens.surface;
        themeStyles["--btn-active"] = theme.tokens.surfaceHover;
        themeStyles["--btn-ring"] = theme.tokens.ring;
        break;

      case "danger":
        themeStyles["--btn-bg"] = theme.palette.error[600];
        themeStyles["--btn-hover"] = theme.palette.error[700];
        themeStyles["--btn-active"] = theme.palette.error[800];
        themeStyles["--btn-text"] = "#ffffff";
        themeStyles["--btn-ring"] = theme.palette.error[500];
        break;
    }

    const isIconOnly = !children && (prefixIcon || suffixIcon);
    const needsAriaLabel =
      (isLoading && !children) || (isIconOnly && !ariaLabel);
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
            {children && <span>{children}</span>}
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
            {children && <span>{children}</span>}
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

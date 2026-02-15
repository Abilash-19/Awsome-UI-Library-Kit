import { forwardRef } from "react";
import { cn } from "@/utils";
import { useTheme } from "@/theme";
import { type ButtonProps, type ButtonSize } from "./Button.types";

const iconSizes: Record<ButtonSize, string> = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

const Spinner = ({ size }: { size: ButtonSize }) => (
  <svg
    className={cn("animate-spin", iconSizes[size])}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();

    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

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
      lg: "h-11 px-6 text-base",
    };

    // Theme-derived style variables
    const themeStyles: Record<string, string> = {
      "--radius": theme.radius,
      "--btn-bg": "",
      "--btn-hover": "",
      "--btn-active": "",
      "--btn-ring": theme.colors.primary[500],
      "--btn-text": theme.colors.semantic.foreground,
      "--btn-border": theme.colors.semantic.border,
    };

    if (variant === "primary") {
      themeStyles["--btn-bg"] = theme.colors.primary[600];
      themeStyles["--btn-hover"] = theme.colors.primary[700];
      themeStyles["--btn-active"] = theme.colors.primary[800];
      themeStyles["--btn-ring"] = theme.colors.primary[500];
    } else if (variant === "secondary") {
      themeStyles["--btn-bg"] = theme.colors.secondary[200];
      themeStyles["--btn-hover"] = theme.colors.secondary[300];
      themeStyles["--btn-active"] = theme.colors.secondary[400];
      themeStyles["--btn-text"] = theme.colors.secondary[900];
      themeStyles["--btn-ring"] = theme.colors.secondary[500];
    } else if (variant === "outline") {
      themeStyles["--btn-hover"] = theme.colors.semantic.muted;
      themeStyles["--btn-active"] = theme.colors.secondary[200];
      themeStyles["--btn-ring"] = theme.colors.semantic.ring;
    } else if (variant === "ghost") {
      themeStyles["--btn-hover"] = theme.colors.semantic.muted;
      themeStyles["--btn-active"] = theme.colors.secondary[200];
      themeStyles["--btn-ring"] = theme.colors.semantic.ring;
    } else if (variant === "danger") {
      themeStyles["--btn-bg"] = theme.colors.error[600];
      themeStyles["--btn-hover"] = theme.colors.error[700];
      themeStyles["--btn-active"] = theme.colors.error[800];
      themeStyles["--btn-ring"] = theme.colors.error[500];
    }

    return (
      <button
        ref={ref}
        style={themeStyles}
        className={cn(
          baseStyles,
          "rounded-[var(--radius)]",
          variants[variant],
          sizes[size],
          className,
        )}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        aria-disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Spinner size={size} />
            <span className="sr-only">Loading</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };

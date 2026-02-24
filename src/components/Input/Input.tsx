import { forwardRef, useId, type InputHTMLAttributes, useMemo } from "react";
import { cn } from "@/utils";
import { useTheme } from "@/theme";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  inputSize?: "sm" | "md" | "lg";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      inputSize = "md",
      id,
      disabled,
      required,
      leftIcon,
      rightIcon,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const generatedId = useId();
    const inputId = id || generatedId;

    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText ? `${inputId}-helper` : undefined;

    const describedBy = useMemo(() => {
      return [errorId, helperId].filter(Boolean).join(" ") || undefined;
    }, [errorId, helperId]);

    const sizes = {
      sm: "h-9 text-sm",
      md: "h-11 text-sm",
      lg: "h-12 text-base",
    };

    const themeStyles = {
      "--radius": theme.shape.radiusMd,
      "--border": error ? theme.palette.error[500] : theme.tokens.borderStrong,
      "--ring": error ? theme.palette.error[500] : theme.tokens.ring,
      "--bg": theme.tokens.input,
      "--bg-hover": theme.tokens.inputHover,
      "--text": theme.tokens.foreground,
      "--placeholder": theme.tokens.foregroundSubtle,
      "--label": theme.tokens.foreground,
      "--error": theme.palette.error[500],
      "--helper": theme.tokens.foregroundMuted,
    } as React.CSSProperties;

    return (
      <div className="w-full space-y-1.5" style={themeStyles}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[var(--label)]"
          >
            {label}
            {required && <span className="ml-1 text-[var(--error)]">*</span>}
          </label>
        )}

        <div
          className={cn(
            "group relative flex items-center rounded-[var(--radius)] border bg-[var(--bg)] transition-all duration-200",
            "border-[var(--border)]",
            "focus-within:ring-2 focus-within:ring-[var(--ring)] focus-within:ring-offset-2",
            disabled && "opacity-60 cursor-not-allowed",
          )}
        >
          {leftIcon && (
            <span className="pl-3 text-[var(--placeholder)]">{leftIcon}</span>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            required={required}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            className={cn(
              "w-full bg-transparent px-3 py-2 outline-none",
              "text-[var(--text)] placeholder:text-[var(--placeholder)]",
              sizes[inputSize],
              leftIcon && "pl-2",
              rightIcon && "pr-2",
              className,
            )}
            {...props}
          />

          {rightIcon && (
            <span className="pr-3 text-[var(--placeholder)]">{rightIcon}</span>
          )}
        </div>

        {error && (
          <p id={errorId} className="text-sm text-[var(--error)]" role="alert">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={helperId} className="text-sm text-[var(--helper)]">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };

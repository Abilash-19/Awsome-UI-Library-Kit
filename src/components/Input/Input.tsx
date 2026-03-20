import { forwardRef, useId, useMemo } from "react";
import { cn } from "@/utils";
import { useTheme } from "@/theme";
import { Skeleton } from "../Skeleton";
import type { InputProps } from "./Input.types";

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      className,
      label,
      error,
      helperText,
      inputSize = "md",
      disabled,
      required,
      leftIcon,
      rightIcon,
      isLoading,
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
      sm: "h-8 text-xs",
      md: "h-10 text-sm",
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
            aria-label={label}
          >
            {label}
            {required && <span className="ml-1 text-[var(--error)]">*</span>}
          </label>
        )}

        {isLoading ? (
          <Skeleton
            width="100%"
            style={{
              borderRadius: theme.shape.radiusMd,
            }}
            height={
              inputSize === "sm" ? "36px" : inputSize === "md" ? "44px" : "48px"
            }
          />
        ) : (
          <div
            className={cn(
              "group relative flex w-full items-center gap-2 px-3 rounded-[var(--radius)] border bg-[var(--bg)] transition-all duration-200",
              "border-[var(--border)]",
              "focus-within:ring-2 focus-within:ring-[var(--ring)]",
              disabled && "opacity-60 cursor-not-allowed",
            )}
          >
            {leftIcon && (
              <span className="flex shrink-0 items-center text-[var(--placeholder)]">
                {leftIcon}
              </span>
            )}

            <input
              ref={ref}
              id={inputId}
              disabled={disabled}
              required={required}
              aria-invalid={!!error}
              aria-describedby={describedBy}
              className={cn(
                "w-full min-w-0 bg-transparent py-2 outline-none truncate",
                "text-[var(--text)] placeholder:text-[var(--placeholder)]",
                sizes[inputSize],
                className,
              )}
              {...props}
            />

            {rightIcon && (
              <span className="flex shrink-0 items-center text-[var(--placeholder)]">
                {rightIcon}
              </span>
            )}
          </div>
        )}

        {error && (
          <p
            id={errorId}
            className="text-xs font-normal text-[var(--error)]"
            role="alert"
          >
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={helperId} className="text-xs text-[var(--helper)]">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };

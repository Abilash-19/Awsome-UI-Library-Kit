import { forwardRef, useState } from "react";
import type { RadioGroupProps } from "./RadioGroup.types";
import { useTheme } from "@/theme";
import Skeleton from "../Skeleton";
import { Typography } from "../Typography";
import { cn } from "@/utils";
import {
  cardClasses,
  checkedBorderWidths,
  sizeClasses,
  SKELETON_CARD_SIZE_MAP,
  SKELETON_SIZE_MAP,
  touchTargetClasses,
} from "./RadioGroup.constants";

const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  (props, ref) => {
    const {
      id,
      options,
      value: controlledValue,
      defaultValue,
      onChange,
      isLoading,
      name,
      label,
      helperText,
      error,
      required,
      size = "medium",
      variant = "default",
      orientation = "vertical",
      disabled,
      className,
      style,
    } = props;
    const { theme } = useTheme();

    const [internalValue, setInternalValue] = useState(defaultValue);
    const value =
      controlledValue !== undefined ? controlledValue : internalValue;

    const handleChange = (newValue: string, isOptionDisabled?: boolean) => {
      if (disabled || isOptionDisabled) return;
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    const helperTextId = id ? `${id}-helper` : undefined;
    const errorId = id ? `${id}-error` : undefined;
    const describedBy = error ? errorId : helperText ? helperTextId : undefined;

    if (isLoading) {
      return (
        <div
          className={`flex gap-3 ${helperText ? "items-start" : "items-center"} py-2`}
        >
          <Skeleton
            variant="rounded"
            width={
              variant === "card"
                ? SKELETON_CARD_SIZE_MAP[size]?.width
                : SKELETON_SIZE_MAP[size]?.width
            }
            height={
              variant === "card"
                ? SKELETON_CARD_SIZE_MAP[size]?.height
                : SKELETON_SIZE_MAP[size]?.height
            }
          />
          <div className="space-y-2 flex-1">
            <Skeleton variant="text" width="120px" height="1.2em" />
            {helperText && (
              <Skeleton variant="text" width="200px" height="1em" />
            )}
          </div>
        </div>
      );
    }

    const themeStyles = {
      "--primary": theme.palette.primary[500],
      "--primary-muted":
        theme.colorMode === "light"
          ? theme.palette.primary[50]
          : `${theme.palette.primary[900]}44`, // Muted background for card checked state
      "--error": theme.palette.error[500],
      "--ring": theme.tokens.ring,
      "--border-color": error ? theme.palette.error[500] : theme.tokens.border,
      "--bg-color": theme.tokens.surface,
      "--text-color": theme.tokens.foreground,
      "--text-secondary": theme.tokens.foregroundMuted,
    } as React.CSSProperties;

    return (
      <fieldset
        ref={ref}
        className={cn("space-y-2 border-0 m-0 p-0", className)}
        style={{ ...themeStyles, ...style }}
        disabled={disabled}
        id={id}
        aria-describedby={describedBy}
        aria-invalid={!!error || undefined}
      >
        {label && (
          <legend
            className="float-left w-full mb-3 text-sm font-semibold leading-snug"
            style={{ color: "var(--text-color)" }}
          >
            {label}
            {required && (
              <span
                aria-hidden="true"
                className="ml-0.5"
                style={{ color: "var(--error)" }}
              >
                *
              </span>
            )}
            {required && <span className="sr-only">(required)</span>}
          </legend>
        )}

        {label && <div className="clear-both" />}

        <div
          role="radiogroup"
          aria-label={typeof label === "string" ? label : undefined}
          className={cn(
            "flex",
            orientation === "vertical"
              ? "flex-col gap-2"
              : "flex-row flex-wrap gap-x-4 gap-y-2",
          )}
        >
          {options.map((option) => {
            const isOptionDisabled = disabled || option.disabled;
            const isChecked = value === option.value;

            return (
              <label
                key={option.id}
                className={cn(
                  `group relative flex ${option?.description ? "items-start" : "items-center"} gap-3 px-1 py-0 cursor-pointer transition-all duration-200 select-none`,
                  variant === "default" && touchTargetClasses[size],
                  variant === "card" &&
                    cn(
                      "border-2",
                      cardClasses[size],
                      isChecked
                        ? "border-[var(--primary)] bg-[var(--primary-muted)]"
                        : "border-[var(--border-color)] hover:border-[var(--primary)] hover:scale-[1.01]",
                    ),
                  isOptionDisabled &&
                    "opacity-50 cursor-not-allowed pointer-events-none",
                )}
              >
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={isChecked}
                  onChange={() => handleChange(option.value, isOptionDisabled)}
                  disabled={isOptionDisabled}
                  required={required}
                  className="peer sr-only"
                  aria-invalid={!!error}
                  aria-describedby={describedBy}
                />

                <div
                  aria-hidden="true"
                  className={cn(
                    "flex-shrink-0 flex items-center justify-center rounded-full border-2 transition-all duration-150",
                    sizeClasses[size],
                    "border-[var(--border-color)]",
                    !isOptionDisabled && "group-hover:border-[var(--primary)]",
                    isChecked &&
                      cn(
                        "border-[var(--primary)] bg-[var(--primary-muted)]",
                        checkedBorderWidths[size],
                      ),
                    "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--ring)]",
                  )}
                />

                <div className="flex-1 flex flex-col gap-0.5">
                  <span
                    className={cn(
                      "font-medium select-none",
                      size === "small"
                        ? "text-[13px]"
                        : size === "medium"
                          ? "text-[14px]"
                          : "text-[16px]",
                    )}
                    style={{ color: "var(--text-color)", lineHeight: "1.4" }}
                  >
                    {option.label}
                  </span>

                  {option.description && (
                    <p
                      className={cn(
                        "select-none",
                        size === "small"
                          ? "text-[12px]"
                          : size === "medium"
                            ? "text-[13px]"
                            : "text-[14px]",
                      )}
                      style={{
                        color: "var(--text-secondary)",
                        lineHeight: "1.4",
                      }}
                    >
                      {option.description}
                    </p>
                  )}
                </div>
              </label>
            );
          })}
        </div>

        {(error || helperText) && (
          <div
            id={error ? errorId : helperTextId}
            role={error ? "alert" : undefined}
            aria-live={error ? "polite" : undefined}
            className="mt-1.5 flex items-center gap-1"
          >
            <Typography
              variant="caption"
              className="leading-snug"
              style={{
                color: error ? "var(--error)" : "var(--text-secondary)",
              }}
            >
              {error || helperText}
            </Typography>
          </div>
        )}
      </fieldset>
    );
  },
);

RadioGroup.displayName = "RadioGroup";

export default RadioGroup;

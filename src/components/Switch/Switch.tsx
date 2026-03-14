import { forwardRef, useState, useId } from "react";
import type { SwitchProps } from "./Switch.types";
import { useTheme } from "@/theme";
import { cn } from "@/utils/cn";
import {
  labelSizeClasses,
  helperSizeClasses,
  trackSizeClasses,
} from "./Switch.constants";
import Skeleton from "../Skeleton";

const Switch = forwardRef<HTMLButtonElement, SwitchProps>((props, ref) => {
  const {
    id: idProp,
    checked,
    onChange,
    disabled,
    required,
    isLoading,
    size = "medium",
    label,
    helperText,
    description,
    error,
    name,
    className,
    style,
    ...rest
  } = props;

  const { theme } = useTheme();
  const autoId = useId();
  const id = idProp ?? autoId;

  const labelId = label ? `${id}-label` : undefined;
  const descriptionId =
    description || helperText ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  const [checkedState, setCheckedState] = useState(checked ?? false);

  const isControlled = checked !== undefined;

  const handleCheckedChange = (newChecked: boolean) => {
    if (!isControlled) {
      setCheckedState(newChecked);
    }
    onChange?.(newChecked);
  };

  const isCurrentlyChecked = isControlled ? checked : checkedState;
  const currentTrackSize = trackSizeClasses[size];

  const themeStyles = {
    "--switch-primary": theme.palette.primary[500],
    "--switch-primary-hover": theme.palette.primary[600],
    "--switch-track-bg": theme.tokens.border,
    "--switch-track-hover-bg": theme.tokens.borderStrong ?? theme.tokens.border,
    "--switch-thumb-bg": "white",
    "--switch-focus-ring": theme.palette.primary[300],
    "--text-color": theme.tokens.foreground,
    "--text-secondary": theme.tokens.foregroundMuted,
    "--error-color": theme.palette.error[500],
    "--error-focus-ring": theme.palette.error[300],
  } as React.CSSProperties;

  if (isLoading) {
    return (
      <div
        className={cn("switch-container flex flex-col gap-1.5", className)}
        style={{ ...themeStyles, ...style }}
        aria-busy="true"
      >
        <div className="flex items-center gap-2.5">
          <Skeleton
            height={currentTrackSize.height}
            width={currentTrackSize.width}
            style={{ borderRadius: "9999px" }}
          />
          {label && (
            <Skeleton
              height={currentTrackSize.height}
              width={80}
              style={{ borderRadius: "4px" }}
            />
          )}
        </div>
      </div>
    );
  }

  const ariaDescribedBy =
    [errorId, descriptionId].filter(Boolean).join(" ") || undefined;

  return (
    <div
      className={cn("switch-container flex flex-col gap-1", className)}
      style={{ ...themeStyles, ...style }}
    >
      {/* Label + Track row */}
      <div
        className={cn(
          "flex items-center gap-2.5",
          disabled && "opacity-50 cursor-not-allowed",
        )}
      >
        {/* Track / Button */}
        <button
          {...rest}
          id={id}
          ref={ref}
          type="button"
          role="switch"
          name={name}
          aria-checked={isCurrentlyChecked}
          aria-labelledby={labelId}
          aria-describedby={ariaDescribedBy}
          aria-required={required}
          aria-invalid={!!error}
          disabled={disabled}
          className={cn(
            "relative inline-flex items-center p-0 border-0 shrink-0 select-none",
            "outline-none rounded-full",
            "transition-all duration-200 ease-in-out",
            error
              ? "focus-visible:ring-2 focus-visible:ring-[var(--error-focus-ring)] focus-visible:ring-offset-2"
              : "focus-visible:ring-2 focus-visible:ring-[var(--switch-focus-ring)] focus-visible:ring-offset-2",
            isCurrentlyChecked
              ? "bg-[var(--switch-primary)] hover:bg-[var(--switch-primary-hover)]"
              : "bg-[var(--switch-track-bg)] hover:bg-[var(--switch-track-hover-bg)]",
            disabled ? "cursor-not-allowed" : "cursor-pointer",
          )}
          onClick={(e) => {
            e.preventDefault();
            if (!disabled) handleCheckedChange(!isCurrentlyChecked);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft" && isCurrentlyChecked && !disabled) {
              e.preventDefault();
              handleCheckedChange(false);
            }
            if (e.key === "ArrowRight" && !isCurrentlyChecked && !disabled) {
              e.preventDefault();
              handleCheckedChange(true);
            }
          }}
          style={{
            width: currentTrackSize.width,
            height: currentTrackSize.height,
          }}
        >
          {/* Thumb */}
          <span
            aria-hidden="true"
            className={cn(
              "absolute",
              "pointer-events-none rounded-full",
              "bg-[var(--switch-thumb-bg)]",
              "shadow-[0_1px_2px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.15)]",
              "transition-transform duration-200 ease-in-out",
            )}
            style={{
              width: currentTrackSize.thumbSize,
              height: currentTrackSize.thumbSize,
              left: "0px",
              transform: isCurrentlyChecked
                ? `translateX(calc(${currentTrackSize.width} - ${currentTrackSize.thumbSize} - 2px))`
                : "translateX(2px)",
            }}
          />
        </button>

        {/* Label */}
        {label && (
          <label
            id={labelId}
            htmlFor={id}
            className={cn(
              "leading-none tracking-[-0.01em]",
              "text-[var(--text-color)]",
              labelSizeClasses[size],
              disabled ? "cursor-not-allowed" : "cursor-pointer",
            )}
          >
            {label}
            {required && (
              <span
                aria-hidden="true"
                className="ml-0.5 text-[var(--error-color)]"
              >
                *
              </span>
            )}
          </label>
        )}
      </div>

      {(description || helperText || error) && (
        <div
          className={cn(
            "flex flex-col gap-0.5",
            "pl-[calc(var(--switch-indent,0px))]",
          )}
          style={
            {
              "--switch-indent": `calc(${currentTrackSize.width} + 10px)`,
            } as React.CSSProperties
          }
        >
          {error ? (
            <span
              id={errorId}
              role="alert"
              aria-live="polite"
              className={cn(
                "text-[var(--error-color)] tracking-[-0.005em]",
                helperSizeClasses[size],
              )}
            >
              {error}
            </span>
          ) : description || helperText ? (
            <span
              id={descriptionId}
              className={cn(
                "text-[var(--text-secondary)] tracking-[-0.005em]",
                helperSizeClasses[size],
              )}
            >
              {description || helperText}
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
});

Switch.displayName = "Switch";

export default Switch;

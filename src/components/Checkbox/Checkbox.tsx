import { forwardRef, useEffect, useRef, useImperativeHandle } from "react";
import type { CheckboxProps } from "./Checkbox.types";
import { useTheme } from "@/theme";
import Skeleton from "../Skeleton";
import { cn } from "@/utils/cn";
import {
  descriptionSizeClasses,
  iconSizeClasses,
  labelSizeClasses,
  sizeClasses,
  SKELETON_SIZE_MAP,
} from "./Checkbox.constants";
import { CheckIcon } from "@/assets/Icons/CheckIcon";
import { InterminateIcon } from "@/assets/Icons/InterminateIcon";

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked,
      defaultChecked,
      disabled,
      required,
      loading,
      size = "medium",
      className = "",
      style,
      onChange,
      error,
      description,
      label,
      id,
      indeterminate,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const internalRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate ?? false;
      }
    }, [indeterminate]);

    useImperativeHandle(ref, () => internalRef.current!);

    if (loading) {
      return (
        <div
          className={`flex  gap-3 ${description ? "items-start" : "items-center"}  py-2`}
        >
          <Skeleton
            variant="rounded"
            width={SKELETON_SIZE_MAP[size].width}
            height={SKELETON_SIZE_MAP[size].height}
          />
          <div className="space-y-2 flex-1">
            <Skeleton variant="text" width="120px" height="1.2em" />
            {description && (
              <Skeleton variant="text" width="200px" height="1em" />
            )}
          </div>
        </div>
      );
    }

    const themeStyles = {
      "--primary": theme.palette.primary[500],
      "--error": theme.palette.error[500],
      "--ring": theme.tokens.ring,
      "--border-color": error ? theme.palette.error[500] : theme.tokens.border,
      "--bg-color": theme.tokens.surface,
      "--text-color": theme.tokens.foreground,
      "--text-secondary": theme.tokens.foregroundMuted,
    } as React.CSSProperties;

    const describedBy = [description && `${id}-description`]
      .filter(Boolean)
      .join(" ");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.checked);
    };

    return (
      <label
        className={cn(
          "group relative flex items-start gap-2 py-1.5 cursor-pointer",
          disabled && "opacity-60 cursor-not-allowed",
          className,
        )}
        style={{ ...themeStyles, ...style }}
      >
        <input
          {...props}
          ref={internalRef}
          id={id}
          type="checkbox"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          required={required}
          role="checkbox"
          aria-checked={indeterminate ? "mixed" : checked}
          aria-invalid={error || undefined}
          aria-describedby={describedBy || undefined}
          onChange={handleChange}
          className="peer absolute inset-0 w-full h-full opacity-0  cursor-pointer"
        />

        <div
          className={cn(
            "flex items-center justify-center rounded border-2",
            "transition-all duration-100 ease-out",
            "border-[var(--border-color)] bg-[var(--bg-color)]",
            sizeClasses[size],
            "peer-checked:border-[var(--primary)] peer-checked:bg-[var(--primary)]",
            "peer-checked:[&_.check-icon]:opacity-100 peer-checked:[&_.check-icon]:scale-100",
            "peer-indeterminate:border-[var(--primary)] peer-indeterminate:bg-[var(--primary)]",
            "peer-indeterminate:[&_.indeterminate-icon]:opacity-100 peer-indeterminate:[&_.indeterminate-icon]:scale-100",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--ring)] peer-focus-visible:ring-offset-2",
          )}
        >
          {/* Check Icon */}
          <CheckIcon size={iconSizeClasses[size]} />

          {/* Indeterminate Icon */}
          <InterminateIcon size={iconSizeClasses[size]} />
        </div>

        {/* Text Content */}
        {(label || description) && (
          <div className="flex flex-col gap-1">
            {label && (
              <span
                className={cn(
                  "text-[var(--text-color)] select-none",
                  labelSizeClasses[size],
                )}
              >
                {label}
              </span>
            )}

            {description && (
              <p
                id={`${id}-description`}
                className={cn(
                  "text-[var(--text-secondary)] select-none",
                  descriptionSizeClasses[size],
                )}
              >
                {description}
              </p>
            )}
          </div>
        )}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;

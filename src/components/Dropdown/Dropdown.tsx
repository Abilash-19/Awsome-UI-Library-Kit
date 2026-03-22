import {
  forwardRef,
  useCallback,
  useState,
  useId,
  useRef,
  useLayoutEffect,
} from "react";
import type { DropdownProps } from "./Dropdown.types";
import { Skeleton } from "../Skeleton";
import { SKELETON_SIZE_MAP, DROPDOWN_SIZE_MAP } from "./Dropdown.constants";
import { Popover } from "../Popover";
import { useTheme } from "@/theme";
import { cn } from "@/utils";
import { Chevron } from "@/assets/Icons/Chevron";
import { CheckIcon } from "@/assets/Icons/CheckIcon";

const Dropdown = forwardRef<HTMLButtonElement, DropdownProps>((props, ref) => {
  const generatedId = useId();
  const {
    id = generatedId,
    options,
    size = "md",
    isLoading,
    onChange,
    label,
    required = false,
    selectedValue,
    defaultOpen,
    isOpen,
    error,
    disabled,
    offset = 4,
    className,
    zIndex,
  } = props;
  const { theme } = useTheme();
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [triggerWidth, setTriggerWidth] = useState<number | undefined>();
  const isControlled = isOpen !== undefined;
  const open = isControlled ? isOpen : internalOpen;

  useLayoutEffect(() => {
    const updateWidth = () => {
      if (buttonRef.current) {
        setTriggerWidth(buttonRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [open]);

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      if (disabled) return;
      if (!isControlled) setInternalOpen(newOpen);
    },
    [disabled, isControlled],
  );

  const handleSelect = useCallback(
    (newValue: string) => {
      if (disabled) return;
      onChange?.(newValue);
      handleOpenChange(false);
    },
    [disabled, onChange, handleOpenChange],
  );

  if (isLoading) {
    return (
      <Skeleton
        width={SKELETON_SIZE_MAP[size].width}
        height={SKELETON_SIZE_MAP[size].height}
      />
    );
  }

  const selectedOption = options.find((o) => o.value === selectedValue);
  const selectedLabel = selectedOption?.label;

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
    "--elevated": theme.tokens.elevated,
  } as React.CSSProperties;

  const listboxId = `${id}-listbox`;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-[var(--label)]"
          style={themeStyles}
        >
          {label}
          {required && <span className="ml-1 text-[var(--error)]">*</span>}
        </label>
      )}
      <Popover
        placement="bottom-start"
        isOpen={open}
        onOpenChange={handleOpenChange}
        offset={offset}
        zIndex={zIndex || 9999}
        usePortal={false}
        className="!p-0"
        content={
          <div
            id={listboxId}
            className="flex flex-col py-1 outline-none bg-[var(--elevated)] border border-[var(--border)] rounded-[var(--radius)] shadow-lg"
            style={{
              width: triggerWidth ? `${triggerWidth}px` : "100%",
              minWidth: triggerWidth ? `${triggerWidth}px` : "0",
              maxWidth: triggerWidth ? `${triggerWidth}px` : "none",
              maxHeight: "300px",
              overflowY: "auto",
              ...themeStyles,
            }}
            role="listbox"
            aria-label={typeof label === "string" ? label : "Options"}
            aria-activedescendant={
              selectedValue ? `${id}-option-${selectedValue}` : undefined
            }
          >
            {options.map((option) => (
              <button
                key={option.value}
                id={`${id}-option-${option.value}`}
                role="option"
                aria-selected={option.value === selectedValue}
                disabled={option.disabled}
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "px-3 py-2 text-sm text-left transition-colors outline-none flex items-center justify-between",
                  option.value === selectedValue
                    ? "bg-primary-50 text-primary-900 font-medium"
                    : "text-[var(--text)] hover:bg-gray-100",
                  option.disabled && "opacity-50 cursor-not-allowed",
                )}
              >
                <span className="truncate">{option.label}</span>
                {option.value === selectedValue && (
                  <CheckIcon className="w-3.5 h-3.5 text-primary-600 shrink-0 ml-2" />
                )}
              </button>
            ))}
          </div>
        }
      >
        <button
          id={id}
          ref={(node) => {
            // Handle both local ref and forwarded ref
            (buttonRef as any).current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              (ref as any).current = node;
            }
          }}
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          disabled={disabled}
          className={cn(
            "flex items-center justify-between w-full border border-[var(--border)]",
            "focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent",
            "hover:bg-[var(--bg-hover)] rounded-[var(--radius)] transition-all",
            DROPDOWN_SIZE_MAP[size],
            !selectedLabel ? "text-[var(--placeholder)]" : "text-[var(--text)]",
            disabled && "opacity-50 cursor-not-allowed",
            className,
          )}
          style={themeStyles}
        >
          <span className="truncate">{selectedLabel || "Select option"}</span>
          <Chevron
            className={cn(
              "w-4 h-4 text-[var(--placeholder)] transition-transform duration-200",
              open && "rotate-180",
            )}
          />
        </button>
      </Popover>
      {error && typeof error === "string" && (
        <span className="text-xs text-[var(--error)]" style={themeStyles}>
          {error}
        </span>
      )}
    </div>
  );
});

export { Dropdown };

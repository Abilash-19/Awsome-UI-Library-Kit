import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  autoUpdate,
  flip,
  offset as offsetMiddleware,
  size as sizeMiddleware,
  useFloating,
} from "@floating-ui/react";
import type { DropdownProps } from "./Dropdown.types";
import { DROPDOWN_SIZE_MAP, SKELETON_SIZE_MAP } from "./Dropdown.constants";
import { Skeleton } from "../Skeleton";
import { useTheme } from "@/theme";
import { cn } from "@/utils";
import { Chevron } from "@/assets/Icons/Chevron";
import { SearchIcon } from "@/assets/Icons/SearchIcon";
import { Input } from "@/components/Input";

/* ─── Dropdown ─────────────────────────────────────────────────────────────── */

const Dropdown = forwardRef<HTMLButtonElement, DropdownProps>((props, ref) => {
  const uid = useId();
  const {
    id = uid,
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
    placeholder = "Select option",
    searchable = false,
    searchPlaceholder = "Search...",
  } = props;

  const { theme } = useTheme();
  const isDark = theme.colorMode === "dark";

  /* ── state ─────────────────────────────────────────────────────────────── */

  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false);
  const [highlighted, setHighlighted] = useState(-1);
  const [search, setSearch] = useState("");
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const controlled = isOpen !== undefined;
  const open = controlled ? isOpen : internalOpen;

  /* ── filtered options ────────────────────────────────────────────────────── */

  const filtered = useMemo(() => {
    if (!searchable || !search.trim()) return options;
    const q = search.toLowerCase();
    return options.filter((o) => {
      const text = typeof o.label === "string" ? o.label : String(o.label);
      return text.toLowerCase().includes(q);
    });
  }, [options, search, searchable]);

  /* ── floating-ui ───────────────────────────────────────────────────────── */

  const { refs, floatingStyles } = useFloating({
    open,
    placement: "bottom-start",
    middleware: [
      offsetMiddleware(offset),
      flip({ fallbackAxisSideDirection: "start" }),
      sizeMiddleware({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            maxWidth: `${rects.reference.width}px`,
          });
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  /* ── toggle / select ───────────────────────────────────────────────────── */

  const toggle = useCallback(
    (next: boolean) => {
      if (disabled) return;
      if (!controlled) setInternalOpen(next);
      if (next) {
        const idx = options.findIndex((o) => o.value === selectedValue);
        setHighlighted(idx >= 0 ? idx : -1);
        setSearch("");
      } else {
        setHighlighted(-1);
        setSearch("");
      }
    },
    [disabled, controlled, options, selectedValue],
  );

  const select = useCallback(
    (v: string) => {
      if (disabled) return;
      onChange?.(v);
      toggle(false);
      triggerRef.current?.focus();
    },
    [disabled, onChange, toggle],
  );

  /* ── side-effects ──────────────────────────────────────────────────────── */

  // Focus search input when panel opens
  useEffect(() => {
    if (open && searchable) {
      requestAnimationFrame(() => searchRef.current?.focus());
    }
  }, [open, searchable]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: PointerEvent) => {
      const t = e.target as Node;
      if (triggerRef.current?.contains(t) || panelRef.current?.contains(t))
        return;
      toggle(false);
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [open, toggle]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (!open || highlighted < 0 || !panelRef.current) return;
    const items =
      panelRef.current.querySelectorAll<HTMLElement>("button[data-item]");
    items[highlighted]?.scrollIntoView({ block: "nearest" });
  }, [highlighted, open]);

  /* ── keyboard ──────────────────────────────────────────────────────────── */

  const step = useCallback(
    (from: number, dir: 1 | -1) => {
      const list = filtered;
      let i = from;
      for (const _ of list) {
        void _;
        i += dir;
        if (i >= list.length) i = 0;
        if (i < 0) i = list.length - 1;
        if (!list[i]?.disabled) return i;
      }
      return from;
    },
    [filtered],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;
      const list = filtered;
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (!open) {
            toggle(true);
            setHighlighted(
              Math.max(
                list.findIndex((o) => o.value === selectedValue),
                0,
              ),
            );
          } else {
            setHighlighted((p) => step(p, 1));
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (!open) {
            toggle(true);
            setHighlighted(list.length - 1);
          } else {
            setHighlighted((p) => step(p, -1));
          }
          break;
        case "Enter":
          e.preventDefault();
          if (open && highlighted >= 0) {
            const o = list[highlighted];
            if (o && !o.disabled) select(o.value);
          } else if (!open) {
            toggle(true);
          }
          break;
        case " ":
          // Allow space in search input
          if (searchable && open) return;
          e.preventDefault();
          if (open && highlighted >= 0) {
            const o = list[highlighted];
            if (o && !o.disabled) select(o.value);
          } else if (!open) {
            toggle(true);
          }
          break;
        case "Escape":
          if (open) {
            e.preventDefault();
            toggle(false);
            triggerRef.current?.focus();
          }
          break;
        case "Home":
          if (open) {
            e.preventDefault();
            const f = list.findIndex((o) => !o.disabled);
            if (f >= 0) setHighlighted(f);
          }
          break;
        case "End":
          if (open) {
            e.preventDefault();
            const l = [...list].reverse().findIndex((o) => !o.disabled);
            if (l >= 0) setHighlighted(list.length - 1 - l);
          }
          break;
      }
    },
    [
      disabled,
      open,
      filtered,
      selectedValue,
      highlighted,
      toggle,
      select,
      step,
      searchable,
    ],
  );

  /* ── ref merging ───────────────────────────────────────────────────────── */

  const setTrigger = useCallback(
    (n: HTMLButtonElement | null) => {
      triggerRef.current = n;
      refs.setReference(n);
      if (typeof ref === "function") ref(n);
      else if (ref) ref.current = n;
    },
    [ref, refs],
  );

  const setPanel = useCallback(
    (n: HTMLDivElement | null) => {
      panelRef.current = n;
      refs.setFloating(n);
    },
    [refs],
  );

  /* ── loading ───────────────────────────────────────────────────────────── */

  if (isLoading) {
    return (
      <Skeleton
        width={SKELETON_SIZE_MAP[size].width}
        height={SKELETON_SIZE_MAP[size].height}
      />
    );
  }

  /* ── derived ───────────────────────────────────────────────────────────── */

  const chosen = options.find((o) => o.value === selectedValue);
  const listboxId = `${id}-listbox`;

  const vars = {
    "--dd-radius": theme.shape.radiusMd,
    "--dd-radius-lg": theme.shape.radiusLg,
    "--dd-border": error ? theme.palette.error[500] : theme.tokens.borderStrong,
    "--dd-border-subtle": theme.tokens.borderSubtle,
    "--dd-ring": error ? theme.palette.error[500] : theme.tokens.ring,
    "--dd-bg": theme.tokens.input,
    "--dd-bg-hover": theme.tokens.inputHover,
    "--dd-text": theme.tokens.foreground,
    "--dd-placeholder": theme.tokens.foregroundSubtle,
    "--dd-label": theme.tokens.foreground,
    "--dd-error": theme.palette.error[500],
    "--dd-elevated": theme.tokens.elevated,
    "--dd-muted": theme.tokens.foregroundMuted,
    "--dd-accent": theme.tokens.accent,
    "--dd-item-bg": `${theme.tokens.accent}18`,
    "--dd-hover-bg": `${theme.tokens.foreground}0f`,
    "--dd-panel-bg": theme.tokens.elevated,
    "--dd-panel-border": theme.tokens.borderSubtle,
    "--dd-panel-shadow": isDark
      ? `0 8px 32px ${theme.neutral[50]}80`
      : `0 8px 32px ${theme.neutral[400]}14`,
  } as React.CSSProperties;

  /* ── render ────────────────────────────────────────────────────────────── */

  return (
    <div className="flex flex-col gap-1.5 w-full" style={vars}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-[var(--dd-label)]"
        >
          {label}
          {required && <span className="ml-1 text-[var(--dd-error)]">*</span>}
        </label>
      )}

      <div className="relative">
        {/* ── trigger ──────────────────────────────────────────────────── */}
        <button
          id={id}
          ref={setTrigger}
          type="button"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={open ? listboxId : undefined}
          disabled={disabled}
          onClick={() => toggle(!open)}
          onKeyDown={!searchable || !open ? handleKeyDown : undefined}
          className={cn(
            "flex items-center justify-between w-full",
            "border border-[var(--dd-border)] bg-[var(--dd-bg)]",
            "focus:outline-none focus:ring-2 focus:ring-[var(--dd-ring)] focus:border-transparent",
            "hover:bg-[var(--dd-bg-hover)]",
            "rounded-[var(--dd-radius)] transition-all duration-150",
            DROPDOWN_SIZE_MAP[size],
            chosen ? "text-[var(--dd-text)]" : "text-[var(--dd-placeholder)]",
            disabled && "opacity-50 cursor-not-allowed",
            className,
          )}
        >
          <span className="truncate flex items-center gap-2">
            {chosen?.icon && (
              <span className="shrink-0 w-4 h-4 flex items-center justify-center">
                {chosen.icon}
              </span>
            )}
            {chosen?.label || placeholder}
          </span>
          <Chevron
            className={cn(
              "w-4 h-4 text-[var(--dd-placeholder)] shrink-0 ml-2",
              "transition-transform duration-200",
              open && "rotate-180",
            )}
          />
        </button>

        {/* ── panel ────────────────────────────────────────────────────── */}
        {open && (
          <div
            ref={setPanel}
            style={{
              ...floatingStyles,
              zIndex: zIndex || 50,
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            <div
              className={cn(
                "outline-none",
                "bg-[var(--dd-panel-bg)]",
                "border border-[var(--dd-panel-border)]",
                "rounded-[var(--dd-radius)]",
                "shadow-[var(--dd-panel-shadow)]",
                "box-border",
              )}
            >
              {/* ── search input ─────────────────────────────────────── */}
              {searchable && (
                <div className="px-1.5 pt-1.5">
                  <Input
                    ref={searchRef}
                    inputSize="sm"
                    value={search}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSearch(val);
                      const q = val.toLowerCase();
                      const matches = q
                        ? options.filter((o) => {
                            const t =
                              typeof o.label === "string"
                                ? o.label
                                : String(o.label);
                            return t.toLowerCase().includes(q);
                          })
                        : options;
                      setHighlighted(matches.length > 0 ? 0 : -1);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder={searchPlaceholder}
                    leftIcon={<SearchIcon className="w-3.5 h-3.5" />}
                    aria-label="Search options"
                  />
                </div>
              )}

              {/* ── options list ─────────────────────────────────────── */}
              <div
                id={listboxId}
                className="py-1.5 scrollbar"
                style={{
                  maxHeight: 240,
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
              >
                {filtered.length === 0 ? (
                  <div className="px-3 py-4 text-sm text-[var(--dd-muted)] text-center">
                    {searchable && search
                      ? "No results found"
                      : "No options available"}
                  </div>
                ) : (
                  filtered.map((option, i) => {
                    const active = option.value === selectedValue;
                    const lit = i === highlighted;

                    return (
                      <button
                        key={option.value}
                        id={`${id}-option-${option.value}`}
                        type="button"
                        data-item
                        disabled={option.disabled}
                        tabIndex={-1}
                        onClick={() => select(option.value)}
                        onMouseEnter={() => setHighlighted(i)}
                        onMouseLeave={() => setHighlighted(-1)}
                        className={cn(
                          "text-[13px] text-left outline-none",
                          "flex items-center justify-between",
                          "mx-1 px-2 py-1.5 rounded-sm",
                          "transition-colors duration-75",

                          active && [
                            "bg-[var(--dd-item-bg)] backdrop-blur-sm",
                            "text-[var(--dd-accent)]",
                            "font-medium",
                          ],

                          !active && "text-[var(--dd-text)]",

                          lit &&
                            !active &&
                            "bg-[var(--dd-hover-bg)] backdrop-blur-sm",
                          !active &&
                            !option.disabled &&
                            "hover:bg-[var(--dd-hover-bg)] hover:backdrop-blur-sm",

                          option.disabled
                            ? "opacity-40 cursor-not-allowed"
                            : "cursor-pointer",
                        )}
                        style={{ width: "calc(100% - 8px)" }}
                      >
                        <span className="truncate flex items-center gap-2">
                          {option.icon && (
                            <span className="shrink-0 w-4 h-4 flex items-center justify-center">
                              {option.icon}
                            </span>
                          )}
                          {option.label}
                        </span>
                        {active && (
                          <span
                            aria-hidden="true"
                            className="shrink-0 ml-2 w-5 h-5 rounded-full bg-[var(--dd-accent)]/10 flex items-center justify-center"
                          >
                            <span className="w-3.5 h-3.5 rounded-full bg-[var(--dd-accent)]/25 flex items-center justify-center">
                              <span className="w-2 h-2 rounded-full bg-[var(--dd-accent)]" />
                            </span>
                          </span>
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {error && typeof error === "string" && (
        <span className="text-xs text-[var(--dd-error)]" role="alert">
          {error}
        </span>
      )}
    </div>
  );
});

Dropdown.displayName = "Dropdown";

export { Dropdown };

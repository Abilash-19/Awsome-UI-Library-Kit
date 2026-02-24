import React, { forwardRef, useId } from "react";
import { cn } from "@/utils";
import { useTheme } from "@/theme";
import { Chevron } from "@/assets/Icons/Chevron";
import type { AccordionProps } from "./Accordion.types";

const Accordion = forwardRef<HTMLDetailsElement, AccordionProps>(
  (
    {
      id,
      className,
      title,
      subtitle,
      children,
      isDefaultOpen = false,
      isDisabled = false,
      variant = "borderless",
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const generatedId = useId();
    const accordionId = id || generatedId;

    const themeStyles = {
      "--accordion-bg": theme.tokens.surface,
      "--accordion-bg-hover": theme.tokens.surfaceHover,
      "--accordion-border": theme.tokens.borderStrong,
      "--accordion-text": theme.tokens.foreground,
      "--accordion-muted": theme.tokens.foregroundMuted,
      "--accordion-radius": theme.shape.radiusMd,
    } as React.CSSProperties;

    const isBorderless = variant === "borderless";

    return (
      <details
        ref={ref}
        id={accordionId}
        open={isDefaultOpen || undefined}
        aria-disabled={isDisabled || undefined}
        className={cn(
          "group transition-all duration-200",

          !isBorderless &&
            "rounded-[var(--accordion-radius)] border border-[var(--accordion-border)] bg-[var(--accordion-bg)] open:shadow-sm",

          isBorderless &&
            "border-b border-[var(--accordion-border)] last:border-none",

          isDisabled && "pointer-events-none opacity-50",
          className,
        )}
        style={themeStyles}
      >
        <summary
          className={cn(
            "flex cursor-pointer items-center justify-between gap-4",
            "text-left select-none",
            "transition-all duration-200",
            "text-[var(--accordion-text)]",

            !isBorderless && [
              "px-5 py-4",
              "hover:bg-[var(--accordion-bg-hover)] rounded-[var(--accordion-radius)]",
            ],

            isBorderless && [
              "px-0 py-3",
              "hover:bg-[var(--accordion-bg-hover)]/40",
            ],

            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accordion-border)] focus-visible:ring-offset-2",
          )}
        >
          <div className="flex flex-col gap-1 min-w-0">
            {title && (
              <span className="text-sm font-semibold leading-snug">
                {title}
              </span>
            )}
            {subtitle && (
              <span className="text-xs text-[var(--accordion-muted)] leading-snug">
                {subtitle}
              </span>
            )}
          </div>

          <Chevron
            className={cn(
              "text-[var(--accordion-muted)]",
              "transition-transform duration-200 ease-out",
              "group-open:rotate-180",
            )}
          />
        </summary>

        <div
          className={cn(
            "text-sm text-[var(--accordion-text)]",
            "overflow-hidden transition-all duration-200",

            !isBorderless && "px-5 pt-2 pb-5",

            isBorderless && "px-0 pt-2 pb-4",
          )}
        >
          {children}
        </div>
      </details>
    );
  },
);

Accordion.displayName = "Accordion";

export { Accordion };

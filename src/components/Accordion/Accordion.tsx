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
      variant = "border",
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
            "transition-all duration-300 ease-out",
            "text-[var(--accordion-text)]",

            !isBorderless && [
              "px-5 py-4",
              "hover:bg-[var(--accordion-bg-hover)] rounded-[var(--accordion-radius)] active:scale-[0.99]",
            ],

            isBorderless && [
              "px-0 py-3",
              "hover:opacity-80 active:scale-[0.99] origin-left",
            ],

            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accordion-border)] focus-visible:ring-offset-2",
          )}
        >
          <div className="flex flex-col gap-1.5 min-w-0 flex-1">
            {title && (
              <span className="text-sm font-medium leading-none truncate transition-colors duration-200 group-hover:text-primary">
                {title}
              </span>
            )}
            {subtitle && (
              <span className="text-xs text-[var(--accordion-muted)] leading-snug truncate transition-colors duration-200">
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
            "transition-opacity duration-300 ease-in-out",

            !isBorderless && "px-5 pt-1 pb-5",

            isBorderless && "px-0 pt-1 pb-4",
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

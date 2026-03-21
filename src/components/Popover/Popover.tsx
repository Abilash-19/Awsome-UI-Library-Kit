import React, { forwardRef, useState, useId, useCallback } from "react";
import type { PopoverProps } from "./Popover.types";
import {
  useFloating,
  autoUpdate,
  offset as offsetMiddleware,
  flip,
  shift,
  arrow as arrowMiddleware,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingFocusManager,
  useMergeRefs,
  useTransitionStyles,
  FloatingPortal,
  FloatingArrow,
} from "@floating-ui/react";
import { useRef } from "react";
import { useTheme } from "@/theme";
import { cn } from "@/utils";

const ARROW_HEIGHT = 8;
const ARROW_WIDTH = 8;
const ARROW_OFFSET = ARROW_HEIGHT;

const Popover = forwardRef<HTMLElement, PopoverProps>((props, ref) => {
  const { theme } = useTheme();
  const generatedId = useId();

  const {
    children,
    id = generatedId,
    isOpen,
    defaultOpen = false,
    onOpenChange,
    content,
    placement = "bottom",
    offset = 8,
    showArrow = false,
    disabled = false,
    className,
    zIndex = 1000,
  } = props;

  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = isOpen !== undefined;
  const open = isControlled ? isOpen : internalOpen;

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      if (disabled) return;
      if (!isControlled) setInternalOpen(newOpen);
      onOpenChange?.(newOpen);
    },
    [disabled, isControlled, onOpenChange],
  );

  const arrowRef = useRef<SVGSVGElement>(null);

  const {
    refs: floatingRefs,
    floatingStyles,
    context,
  } = useFloating({
    open,
    onOpenChange: handleOpenChange,
    placement,
    middleware: [
      offsetMiddleware(offset + (showArrow ? ARROW_OFFSET : 0)),
      flip({ fallbackAxisSideDirection: "start" }),
      shift({ padding: 8 }),
      // eslint-disable-next-line react-hooks/refs
      ...(showArrow
        ? [arrowMiddleware({ element: arrowRef, padding: 8 })]
        : []),
    ],
    whileElementsMounted: autoUpdate,
  });

  const { setReference, setFloating } = floatingRefs;
  const mergedRef = useMergeRefs([setReference, ref]);

  const click = useClick(context, { enabled: !disabled });
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });
  const role = useRole(context, { role: "dialog" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: { open: 180, close: 120 },
    initial: ({ side }) => ({
      opacity: 0,
      transform: {
        top: "scale(0.97) translateY(4px)",
        bottom: "scale(0.97) translateY(-4px)",
        left: "scale(0.97) translateX(4px)",
        right: "scale(0.97) translateX(-4px)",
      }[side],
    }),
  });

  const arrowFill = theme.tokens.elevated;

  const isReactChild = React.isValidElement<{
    disabled?: boolean;
    [key: string]: unknown;
  }>(children);

  const referenceProps = getReferenceProps({
    id,
    ...(isReactChild ? children.props : {}),
    ...(isReactChild && { disabled: disabled || children.props.disabled }),
  });

  const trigger = isReactChild ? (
    // eslint-disable-next-line react-hooks/refs
    React.cloneElement(children, {
      ...referenceProps,
      ref: mergedRef,
    } as Partial<{ disabled?: boolean; [key: string]: unknown }> & {
      ref: typeof mergedRef;
    })
  ) : (
    <button
      ref={mergedRef as React.Ref<HTMLButtonElement>}
      id={id}
      type="button"
      disabled={disabled}
      className={cn(
        "inline-flex cursor-pointer select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "focus-visible:ring-[var(--ring-color)]",
        disabled && "pointer-events-none opacity-50",
      )}
      aria-expanded={open}
      aria-haspopup="dialog"
      {...(referenceProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <>
      {trigger}

      {isMounted && (
        <FloatingPortal>
          <FloatingFocusManager
            context={context}
            modal={false}
            initialFocus={-1}
            returnFocus
          >
            <div
              ref={setFloating}
              style={{ ...floatingStyles, zIndex }}
              {...getFloatingProps()}
            >
              <div
                style={
                  {
                    ...transitionStyles,
                    "--popover-bg": theme.tokens.elevated,
                    "--popover-border": theme.tokens.border,
                    "--popover-text": theme.tokens.foreground,
                    "--popover-radius": theme.shape.radiusMd,
                    "--popover-shadow":
                      "0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
                  } as React.CSSProperties
                }
                className={cn(
                  "bg-[var(--popover-bg)]",
                  "border border-[var(--popover-border)]",
                  "text-[var(--popover-text)]",
                  "rounded-[var(--popover-radius)]",
                  "shadow-[var(--popover-shadow)]",
                  "outline-none overflow-hidden",
                  "min-w-[8rem]",
                  className,
                )}
                role="presentation"
              >
                {content}
              </div>

              {showArrow && (
                <FloatingArrow
                  ref={arrowRef}
                  context={context}
                  fill={arrowFill}
                  stroke={theme.tokens.border}
                  strokeWidth={1}
                  height={ARROW_HEIGHT}
                  width={ARROW_WIDTH}
                  tipRadius={2}
                />
              )}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
});

Popover.displayName = "Popover";

export default Popover;

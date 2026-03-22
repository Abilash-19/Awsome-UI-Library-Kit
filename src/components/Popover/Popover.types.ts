import type { Placement } from "@floating-ui/react";

export interface PopoverProps {
  /** The trigger element. A valid React element gets cloneElement'd; raw text/nodes get wrapped in a <button>. */
  children: React.ReactNode;

  /** Optional id forwarded to the trigger. Defaults to a stable generated id. */
  id?: string;

  /**
   * Controlled open state. When provided the component becomes fully controlled
   * and you must manage state changes via `onOpenChange`.
   */
  isOpen?: boolean;

  /** Uncontrolled initial open state. Ignored when `isOpen` is provided. */
  defaultOpen?: boolean;

  /** Callback fired whenever the popover requests an open-state change. */
  onOpenChange?: (open: boolean) => void;

  /** The content rendered inside the floating panel. */
  content: React.ReactNode;

  /**
   * Preferred placement relative to the trigger.
   * Floating UI will automatically flip/shift if there isn't enough space.
   * @default "bottom"
   */
  placement?: Placement;

  /**
   * Gap in pixels between the trigger and the floating panel.
   * When `showArrow` is true the arrow height is added on top of this value automatically.
   * @default 8
   */
  offset?: number;

  /**
   * Render a directional arrow pointing from the panel toward the trigger.
   * Uses Floating UI's `<FloatingArrow>` and inherits theme colours.
   * @default false
   */
  showArrow?: boolean;

  /**
   * When true the trigger interaction is disabled and open-state changes are ignored.
   * @default false
   */
  disabled?: boolean;

  /** Extra class names forwarded to the inner panel wrapper. */
  className?: string;

  /**
   * CSS z-index of the floating panel.
   * @default 1000
   */
  zIndex?: number;

  /** Use React Portal? */
  usePortal?: boolean;

  /** Portal container element */
  portalContainer?: HTMLElement | null;
}

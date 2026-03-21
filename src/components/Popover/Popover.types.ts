import type { ReactNode } from "react";
import type { Placement } from "@floating-ui/react";

export interface PopoverProps {
  id?: string;

  /**
   * The trigger element (like a Button)
   */
  children: ReactNode;

  /**
   * The content inside the popover menu
   */
  content: ReactNode;

  /**
   * Alignment of the popover around the trigger.
   * e.g., 'bottom', 'top-start', 'right-end'
   * @default "bottom"
   */
  placement?: Placement;

  /**
   * Use for a *controlled* popover (you manage the state)
   */
  isOpen?: boolean;

  /**
   * Use for an *uncontrolled* popover (it manages its own state)
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Callback fired when the open state changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Gap between the trigger and the popover menu in pixels
   * @default 8
   */
  offset?: number;

  /**
   * Shows a little floating arrow pointing to the trigger
   * @default false
   */
  showArrow?: boolean;

  /**
   * Prevents the popover from opening if true
   * @default false
   */
  disabled?: boolean;

  /**
   * Additional Tailwind classes for the popover content box
   */
  className?: string;
}

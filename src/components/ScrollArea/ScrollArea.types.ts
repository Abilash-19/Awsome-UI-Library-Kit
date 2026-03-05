import type React from "react";

/**
 * Properties for the ScrollArea container component.
 *
 * The `ScrollArea` component acts as a highly customizable wrapper that coordinates
 * reveal-on-scroll animations for its nested `ScrollAreaItem` descendants.
 */
export interface ScrollAreaProps {
  /**
   * Unique identifier applied to the scrollable container.
   * Useful for accessibility (`aria-controls`) and testing scenarios.
   */
  id?: string;

  /**
   * Ref forwarded internally to the underlying scroll container element (`<div>`).
   * Can be leveraged to programmatically control scroll position.
   */
  ref?: React.RefObject<HTMLDivElement | null>;

  /**
   * Content rendered inside the scrollable container.
   * This typically includes standard HTML elements and `ScrollAreaItem` components
   * which handle individual entry animations.
   */
  children: React.ReactNode;

  /**
   * Optional custom CSS class names to apply to the scroll container.
   */
  className?: string;

  /**
   * Optional inline styles to apply directly to the scroll container viewport.
   */
  style?: React.CSSProperties;

  /**
   * Callback fired synchronously when the user scrolls the container's contents.
   *
   * @param event - The native UI event fired by the underlying `HTMLDivElement`.
   */
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;

  /**
   * Defines the default reveal animation applied to all child `ScrollAreaItem` descendant
   * items when they enter the viewport. Items can override this using their own `revealType`.
   *
   * @remarks
   * - `"up"`, `"down"`, `"left"`, `"right"`: Directional slide-in translations.
   * - `"fade"`: Simple opacity transition from 0% to 100%.
   * - `"scale"`: Zooms in fluidly from a lower scale bound.
   * - `"blur"`: Transitions from a gaussian blur down into sharp focus.
   *
   * @defaultValue `"scale"`
   */
  ScrollAnimation?:
    | "up"
    | "down"
    | "left"
    | "right"
    | "fade"
    | "scale"
    | "blur";
}

/**
 * Properties for an individual scroll-observable item.
 *
 * Specifically designed to be composed within a `ScrollArea` container. It leverages
 * the intersection observer to trigger entrance and reveal animations.
 */
export interface ScrollAreaItemProps {
  /**
   * The content to be wrapped and naturally revealed when intersected by the viewport.
   */
  children: React.ReactNode;

  /**
   * Optional custom CSS class names applied to the wrapper executing the intersection observer.
   */
  className?: string;

  /**
   * Optional inline styles applied directly to the observer wrapper element.
   */
  style?: React.CSSProperties;

  /**
   * Determines whether the reveal animation occurs only a single time or repeatedly.
   *
   * - If `true`, the animation plays the first time the item is visible and remains unobserved mapping to a finalized state.
   * - If `false`, the animation replays every single time the item crosses the threshold back into the viewport's context.
   *
   * @defaultValue `true`
   */
  triggerOnce?: boolean;

  /**
   * Set the threshold ratio indicating the percentage of the item's visibility required
   * to trigger the reveal animation callbacks.
   *
   * - A value of `0.0` reveals instantly when any single pixel enters the viewport.
   * - A value of `0.5` requires 50% visibility prior to executing the animation.
   * - A value of `1.0` dictates the entire element must be thoroughly seen.
   *
   * @defaultValue 0.2
   */
  threshold?: number;

  /**
   * Disables the parent container's `ScrollAnimation` setting exclusively for this particular item.
   * Highly useful for constructing complex cascades where certain hero items enter differently
   * from the standard unified grid items.
   *
   * Inherits strictly from `ScrollAreaProps["ScrollAnimation"]` when left omitted.
   */
  revealType?: NonNullable<ScrollAreaProps["ScrollAnimation"]>;
}

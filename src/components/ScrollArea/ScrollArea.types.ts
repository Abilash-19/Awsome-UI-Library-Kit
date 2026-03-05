export interface ScrollAreaProps {
  /** Unique identifier for the scrollable container. */
  id?: string;

  /** Ref forwarded to the underlying scroll element. */
  ref?: React.RefObject<HTMLDivElement>;

  /** Content rendered inside the scrollable container. */
  children: React.ReactNode;

  /** Additional class names applied to the container. */
  className?: string;

  /** Inline styles applied to the container. */
  style?: React.CSSProperties;

  /** Callback fired when the container is scrolled. */
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;

  /**
   * Controls the reveal animation applied to child items on scroll.
   * - `"up"` / `"down"` / `"left"` / `"right"` — slides in from a direction
   * - `"fade"` — fades in
   * - `"scale"` — scales up from center
   * - `"blur"` — unblurs into view
   * @defaultValue `"fade"`
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

export interface ScrollAreaItemProps {
  /** Content rendered inside the scroll item. */
  children: React.ReactNode;

  /** Additional class names applied to the item. */
  className?: string;

  /** Inline styles applied to the item. */
  style?: React.CSSProperties;

  /**
   * When `true`, the reveal animation only plays the first time the item
   * enters the viewport. When `false`, it replays on every re-entry.
   * @defaultValue `true`
   */
  triggerOnce?: boolean;

  /**
   * When `true`, the reveal animation only plays the first time the item
   * enters the viewport. When `false`, it replays on every re-entry.
   * @defaultValue `true`
   */
  threshold?: number;
  /**
   * Overrides the parent `ScrollArea` animation for this specific item.
   * Inherits from `ScrollAreaProps.ScrollAnimation` when omitted.
   */
  revealType?: NonNullable<ScrollAreaProps["ScrollAnimation"]>;
}

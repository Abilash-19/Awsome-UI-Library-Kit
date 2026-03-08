import type React from "react";
import { type JSX } from "react";

/**
 * The visual variants available for the Typography component.
 */
export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body1"
  | "body2"
  | "subtitle1"
  | "subtitle2"
  | "caption"
  | "overline"
  | "display1"
  | "display2";

/**
 * The available font weights.
 */
export type TypographyWeight =
  | "thin" // 100
  | "extralight" // 200
  | "light" // 300
  | "normal" // 400
  | "medium" // 500
  | "semibold" // 600
  | "bold" // 700
  | "extrabold" // 800
  | "black"; // 900

/**
 * Props for the Typography component.
 */
export interface TypographyProps {
  /** The semantic and visual variant to use. @default "body1" */
  variant?: TypographyVariant;

  /** The HTML tag to render as. If omitted, maps to a default based on variant. */
  as?: keyof JSX.IntrinsicElements;

  /** The font weight to apply. @default based on variant */
  weight?: TypographyWeight;

  /** Additional CSS classes for the text element. */
  className?: string;

  /** Inline styles for the text element. */
  style?: React.CSSProperties;

  /** The text or elements to be rendered. */
  children: React.ReactNode;

  /** Unique ID for the element. */
  id?: string;

  /** Click event handler. */
  onClick?: React.MouseEventHandler<any>;

  /** ID of the element this label is for (useful when `as="label"`). */
  htmlFor?: string;

  /** Whether to show a skeleton loading placeholder instead of text. */
  isLoading?: boolean;
}

/**
 * Default HTML element mapping for each variant
 */
export const VARIANT_ELEMENT_MAP: Record<
  TypographyVariant,
  keyof JSX.IntrinsicElements
> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  body1: "p",
  body2: "p",
  subtitle1: "h6",
  subtitle2: "h6",
  caption: "span",
  overline: "span",
  display1: "h1",
  display2: "h2",
};

/**
 * Default font weight for each variant
 */
export const VARIANT_WEIGHT_MAP: Record<TypographyVariant, TypographyWeight> = {
  h1: "bold",
  h2: "bold",
  h3: "semibold",
  h4: "semibold",
  h5: "medium",
  h6: "medium",
  body1: "normal",
  body2: "normal",
  subtitle1: "medium",
  subtitle2: "medium",
  caption: "normal",
  overline: "medium",
  display1: "bold",
  display2: "bold",
};

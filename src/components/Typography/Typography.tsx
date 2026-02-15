// src/components/Typography/Typography.tsx
import React from "react";
import { cn } from "../../utils/cn";
import type {
  TypographyProps,
  TypographyVariant,
  TypographyWeight,
} from "./Typography.types";
import { VARIANT_ELEMENT_MAP, VARIANT_WEIGHT_MAP } from "./Typography.types";

/**
 * Typography component for consistent text styling across the application
 *
 * @example
 * ```tsx
 * <Typography variant="h1">Main Heading</Typography>
 * <Typography variant="body1">Body text</Typography>
 * <Typography variant="h2" as="h1" weight="bold">Custom element</Typography>
 * ```
 */
export const Typography: React.FC<TypographyProps> = ({
  variant = "body1",
  as,
  weight,
  className,
  style,
  children,
  id,
  onClick,
  ...rest
}) => {
  // Determine the HTML element to render
  const Element = VARIANT_ELEMENT_MAP[variant] || as;

  // Determine font weight
  const fontWeight = weight || VARIANT_WEIGHT_MAP[variant];

  // Build class names
  const classes = cn(
    // Base styles
    "typography",

    // Variant styles
    getVariantClasses(variant),

    // Font weight
    getWeightClasses(fontWeight),

    // Custom classes
    className,
  );

  return (
    <Element
      id={id}
      className={classes}
      style={style}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Element>
  );
};

// Helper functions for generating Tailwind classes

function getVariantClasses(variant: TypographyVariant): string {
  const variantMap: Record<TypographyVariant, string> = {
    display1: "text-6xl leading-tight tracking-tight", // 60px
    display2: "text-5xl leading-tight tracking-tight", // 48px
    h1: "text-4xl leading-tight", // 40px
    h2: "text-3xl leading-snug", // 32px
    h3: "text-2xl leading-snug", // 28px
    h4: "text-xl leading-normal", // 24px
    h5: "text-lg leading-normal", // 20px
    h6: "text-base leading-normal", // 16px
    subtitle1: "text-base leading-normal tracking-wide", // 16px
    subtitle2: "text-sm leading-normal tracking-wide", // 14px
    body1: "text-base leading-relaxed", // 16px
    body2: "text-sm leading-relaxed", // 14px
    caption: "text-xs leading-normal", // 12px
    overline: "text-xs leading-normal tracking-widest uppercase", // 12px
  };

  return variantMap[variant];
}

function getWeightClasses(weight: TypographyWeight): string {
  const weightMap: Record<TypographyWeight, string> = {
    thin: "font-thin", // 100
    extralight: "font-extralight", // 200
    light: "font-light", // 300
    normal: "font-normal", // 400
    medium: "font-medium", // 500
    semibold: "font-semibold", // 600
    bold: "font-bold", // 700
    extrabold: "font-extrabold", // 800
    black: "font-black", // 900
  };

  return weightMap[weight];
}

Typography.displayName = "Typography";

export default Typography;

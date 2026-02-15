export * from "./Button";
export * from "./Input";
export * from "./Modal";
export { ThemeProvider, useTheme, defaultTheme, darkTheme } from "../theme";

export type {
  ThemeConfig,
  ThemeColors,
  ColorScale,
  SemanticColors,
} from "../theme";

export { Typography, default } from "./Typography/Typography";
export type {
  TypographyProps,
  TypographyVariant,
  TypographyWeight,
} from "./Typography/Typography.types";
export {
  VARIANT_ELEMENT_MAP,
  VARIANT_WEIGHT_MAP,
} from "./Typography/Typography.types";

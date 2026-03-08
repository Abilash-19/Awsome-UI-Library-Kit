import type { RadioGroupProps } from "./RadioGroup.types";

export const sizeClasses = {
  small: "w-4 h-4",
  medium: "w-5 h-5",
  large: "w-6 h-6",
};

export const checkedBorderWidths = {
  small: "border-[5px]",
  medium: "border-[6px]",
  large: "border-[7px]",
};

export const touchTargetClasses = {
  small: "min-h-[40px]",
  medium: "min-h-[44px]",
  large: "min-h-[48px]",
};

export const cardClasses = {
  small: "p-3 rounded-lg",
  medium: "p-4 rounded-xl",
  large: "p-5 rounded-2xl",
};

export const SKELETON_SIZE_MAP: Record<
  NonNullable<RadioGroupProps["size"]>,
  { height: string; width: string }
> = {
  small: { height: "16px", width: "16px" },
  medium: { height: "20px", width: "20px" },
  large: { height: "24px", width: "24px" },
};

export const SKELETON_CARD_SIZE_MAP: Record<
  NonNullable<RadioGroupProps["size"]>,
  { height: string; width: string }
> = {
  small: { height: "40px", width: "100%" },
  medium: { height: "44px", width: "100%" },
  large: { height: "48px", width: "100%" },
};

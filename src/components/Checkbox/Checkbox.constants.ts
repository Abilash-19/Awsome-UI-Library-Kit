import type { CheckboxProps } from "./Checkbox.types";

export const labelSizeClasses = {
  small: "text-[13px] font-medium leading-[1.4]",
  medium: "text-[14px] font-medium leading-[1.4]",
  large: "text-[16px] font-medium leading-[1.4]",
};
export const descriptionSizeClasses = {
  small: "text-[12px] leading-[1.4]",
  medium: "text-[13px] leading-[1.4]",
  large: "text-[14px] leading-[1.4]",
};

export const sizeClasses = {
  small: "h-4 w-4",
  medium: "h-5 w-5",
  large: "h-6 w-6",
};

export const iconSizeClasses = {
  small: "w-2 h-2",
  medium: "w-3 h-3",
  large: "w-3.5 h-3.5",
};

export const SKELETON_SIZE_MAP: Record<
  NonNullable<CheckboxProps["size"]>,
  { height: string; width: string }
> = {
  small: { height: "16px", width: "16px" },
  medium: { height: "20px", width: "20px" },
  large: { height: "24px", width: "24px" },
};

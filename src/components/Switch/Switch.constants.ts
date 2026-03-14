import type { SwitchProps } from "./Switch.types";

export const labelSizeClasses: Record<
  NonNullable<SwitchProps["size"]>,
  string
> = {
  small: "text-[13px] font-medium leading-[1.45] tracking-[-0.01em]",
  medium: "text-[14px] font-medium leading-[1.45] tracking-[-0.01em]",
  large: "text-[15px] font-medium leading-[1.45] tracking-[-0.01em]",
};

export const helperSizeClasses: Record<
  NonNullable<SwitchProps["size"]>,
  string
> = {
  small: "text-[11px] leading-[1.5] tracking-[-0.005em]",
  medium: "text-[12px] leading-[1.5] tracking-[-0.005em]",
  large: "text-[13px] leading-[1.5] tracking-[-0.005em]",
};

export const trackSizeClasses: Record<
  NonNullable<SwitchProps["size"]>,
  { width: string; height: string; thumbSize: string; thumbOffset: string }
> = {
  small: {
    width: "28px",
    height: "16px",
    thumbSize: "12px",
    thumbOffset: "2px",
  },
  medium: {
    width: "36px",
    height: "20px",
    thumbSize: "16px",
    thumbOffset: "2px",
  },
  large: {
    width: "44px",
    height: "24px",
    thumbSize: "20px",
    thumbOffset: "2px",
  },
};

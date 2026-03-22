import type { DropdownProps } from "./Dropdown.types";

export const SKELETON_SIZE_MAP: Record<
  NonNullable<DropdownProps["size"]>,
  { height: string; width: string }
> = {
  sm: { height: "28px", width: "100%" },
  md: { height: "32px", width: "100%" },
  lg: { height: "36px", width: "100%" },
};

export const DROPDOWN_SIZE_MAP = {
  sm: "h-8 px-2 text-xs",
  md: "h-10 px-3 text-sm",
  lg: "h-12 px-4 text-base",
};

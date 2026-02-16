import { type ButtonHTMLAttributes, type ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // Content
  text?: string;

  // Visual variants
  variant?: ButtonVariant;
  size?: ButtonSize;

  // Icons
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;

  // States
  isLoading?: boolean;
  disabled?: boolean;

  // Interaction
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  // Accessibility
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-pressed"?: boolean;
}

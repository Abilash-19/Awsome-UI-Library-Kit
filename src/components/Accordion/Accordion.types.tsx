export interface AccordionProps {
  id?: string;
  className?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
  isDefaultOpen?: boolean;
  isDisabled?: boolean;
  variant?: "default" | "borderless";
}

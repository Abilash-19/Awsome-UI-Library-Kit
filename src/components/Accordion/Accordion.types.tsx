/**
 * Props for the Accordion component.
 */
export interface AccordionProps {
  /** Unique identifier for the accordion. */
  id?: string;
  /** Custom CSS class for the root element. */
  className?: string;
  /** The primary content displayed in the accordion header. */
  title?: React.ReactNode;
  /** Optional secondary content displayed next to or below the title. */
  subtitle?: React.ReactNode;
  /** The content to be displayed when the accordion is expanded. */
  children?: React.ReactNode;
  /** Whether the accordion should be open by default (uncontrolled). */
  isDefaultOpen?: boolean;
  /** Whether the accordion is disabled and cannot be toggled. */
  isDisabled?: boolean;
  /** The visual variant of the accordion. @default "default" */
  variant?: "default" | "borderless";
}

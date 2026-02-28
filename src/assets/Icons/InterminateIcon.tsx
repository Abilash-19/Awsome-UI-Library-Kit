import { cn } from "@/utils/cn";

export const InterminateIcon = ({ size }: { size: string }) => {
  return (
    <svg
      className={cn(
        "indeterminate-icon absolute shrink-0 text-white opacity-0 scale-75 transition-all duration-200",
        size,
      )}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
};

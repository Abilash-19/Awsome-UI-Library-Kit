import { cn } from "@/utils";

export const CheckIcon = ({ size }: { size: string }) => {
  return (
    <svg
      className={cn(
        "check-icon shrink-0 text-white opacity-0 scale-75 transition-all duration-200",
        size,
      )}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
};

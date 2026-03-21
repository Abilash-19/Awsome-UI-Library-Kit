import React from "react";
import { useTheme } from "@/theme";

interface PageHeaderProps {
  title: string;
  description: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
}) => {
  const { theme } = useTheme();

  return (
    <div
      className="rounded-lg border px-6 py-5 mb-8"
      style={{
        borderColor: theme.tokens.border,
        backgroundColor: theme.tokens.surface,
      }}
    >
      <div className="flex items-center gap-2.5 mb-2">
        <div
          className="w-5 h-5 rounded flex items-center justify-center text-white text-[8px] font-extrabold"
          style={{ backgroundColor: theme.palette.primary[500] }}
        >
          UI
        </div>
        <span
          className="text-[10px] font-semibold uppercase tracking-wider"
          style={{ color: theme.tokens.foregroundMuted }}
        >
          Awesome UI
        </span>
      </div>
      <h1 className="text-2xl font-bold tracking-tight mb-1">{title}</h1>
      <p className="text-sm" style={{ color: theme.tokens.foregroundMuted }}>
        {description}
      </p>
    </div>
  );
};

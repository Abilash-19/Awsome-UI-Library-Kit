import React from "react";
import { useTheme } from "@/theme";

interface PropItem {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
  required?: boolean;
}

interface PropsTableProps {
  props: PropItem[];
}

export const PropsTable: React.FC<PropsTableProps> = ({ props }) => {
  const { theme } = useTheme();

  return (
    <div
      className="my-10 overflow-x-auto rounded-[1.5rem] border shadow-sm"
      style={{
        borderColor: theme.tokens.border,
        backgroundColor: theme.tokens.surface,
      }}
    >
      <table className="w-full text-left border-collapse">
        <thead>
          <tr
            className="border-b"
            style={{
              borderColor: theme.tokens.border,
              backgroundColor:
                theme.colorMode === "dark"
                  ? "rgba(255,255,255,0.02)"
                  : "rgba(0,0,0,0.01)",
            }}
          >
            <th
              className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ color: theme.tokens.foregroundMuted }}
            >
              Prop
            </th>
            <th
              className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ color: theme.tokens.foregroundMuted }}
            >
              Type
            </th>
            <th
              className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ color: theme.tokens.foregroundMuted }}
            >
              Default
            </th>
            <th
              className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ color: theme.tokens.foregroundMuted }}
            >
              Description
            </th>
          </tr>
        </thead>
        <tbody
          className="divide-y"
          style={{ borderColor: theme.tokens.border }}
        >
          {props.map((prop) => (
            <tr
              key={prop.name}
              className="hover:bg-black/5 dark:hover:bg-white/[0.02] transition-colors group"
            >
              <td
                className="px-6 py-5 text-sm font-mono font-bold transition-colors group-hover:text-pink-500"
                style={{ color: theme.palette.primary[500] }}
              >
                {prop.name}
                {prop.required && (
                  <span className="ml-1 text-rose-500 font-sans">*</span>
                )}
              </td>
              <td
                className="px-6 py-5 text-sm font-mono truncate max-w-[200px]"
                style={{ color: theme.tokens.foregroundMuted }}
              >
                <span className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                  {prop.type}
                </span>
              </td>
              <td className="px-6 py-5 text-sm font-mono opacity-60">
                {prop.defaultValue || "-"}
              </td>
              <td
                className="px-6 py-5 text-sm leading-relaxed"
                style={{ color: theme.tokens.foreground }}
              >
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

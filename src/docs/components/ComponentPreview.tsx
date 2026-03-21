import React, { useState } from "react";
import { useTheme } from "@/theme";

interface ComponentPreviewProps {
  children: React.ReactNode;
  code: string;
  className?: string;
}

export const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  children,
  code,
  className,
}) => {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`my-8 rounded-lg border overflow-hidden ${className ?? ""}`}
      style={{
        borderColor: theme.tokens.border,
        backgroundColor: theme.tokens.surface,
      }}
    >
      {/* Preview */}
      <div
        className="flex min-h-[200px] items-center justify-center p-8"
        style={{
          backgroundImage:
            theme.colorMode === "dark"
              ? "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)"
              : "radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      >
        <div className="w-full flex justify-center not-prose">{children}</div>
      </div>

      {/* Actions */}
      <div
        className="flex items-center justify-between px-4 py-2 border-t"
        style={{ borderColor: theme.tokens.border }}
      >
        <button
          onClick={() => setShowCode(!showCode)}
          className="text-xs font-medium px-2 py-1 rounded transition-colors"
          style={{
            color: showCode
              ? theme.palette.primary[500]
              : theme.tokens.foregroundMuted,
          }}
        >
          {showCode ? "Hide Code" : "View Code"}
        </button>
        <button
          onClick={copyToClipboard}
          className="text-xs font-medium px-2 py-1 rounded transition-colors"
          style={{
            color: copied
              ? theme.palette.success[500]
              : theme.tokens.foregroundMuted,
          }}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {/* Code */}
      {showCode && (
        <div className="border-t" style={{ borderColor: theme.tokens.border }}>
          <pre
            className="p-4 text-sm font-mono overflow-x-auto"
            style={{
              backgroundColor: theme.colorMode === "dark" ? "#111" : "#1e1e2e",
              color: "#d4d4d4",
            }}
          >
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

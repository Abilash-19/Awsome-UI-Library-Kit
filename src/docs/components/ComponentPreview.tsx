import React, { useState } from "react";
import { cn } from "@/utils";
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
      className={cn(
        "my-10 rounded-2xl border overflow-hidden shadow-sm transition-all duration-300",
        className,
      )}
      style={{
        borderColor: theme.tokens.border,
        backgroundColor: theme.tokens.surface,
      }}
    >
      {/* Interactive Preview Area */}
      <div
        className="flex min-h-[250px] items-center justify-center p-8 border-b"
        style={{
          borderColor: theme.tokens.border,
          backgroundImage:
            theme.colorMode === "dark"
              ? "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)"
              : "radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        <div className="w-full flex justify-center animate-in fade-in zoom-in duration-500">
          {children}
        </div>
      </div>

      {/* Action Bar */}
      <div
        className="flex items-center justify-between px-6 py-3"
        style={{
          backgroundColor:
            theme.colorMode === "dark"
              ? "rgba(255,255,255,0.02)"
              : "rgba(0,0,0,0.01)",
        }}
      >
        <button
          onClick={() => setShowCode(!showCode)}
          className="text-xs font-bold uppercase tracking-widest transition-all px-3 py-1.5 rounded-lg border"
          style={{
            color: showCode
              ? theme.palette.primary[500]
              : theme.tokens.foregroundMuted,
            borderColor: showCode
              ? `${theme.palette.primary[500]}40`
              : theme.tokens.border,
            backgroundColor: showCode
              ? `${theme.palette.primary[500]}10`
              : "transparent",
          }}
        >
          {showCode ? "Hide Code" : "View Code"}
        </button>
        <button
          onClick={copyToClipboard}
          className="text-xs font-bold uppercase tracking-widest transition-all px-3 py-1.5 rounded-lg"
          style={{
            color: copied
              ? theme.palette.success[500]
              : theme.tokens.foregroundMuted,
          }}
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>

      {/* Code Area */}
      {showCode && (
        <div className="relative animate-in slide-in-from-top-2 duration-300">
          <pre
            className="p-6 text-sm font-mono overflow-x-auto"
            style={{
              backgroundColor: theme.colorMode === "dark" ? "#000" : "#1e1e1e",
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

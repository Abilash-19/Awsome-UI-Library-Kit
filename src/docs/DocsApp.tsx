import React, { Suspense, lazy, useState } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import { DocsLayout } from "./DocsLayout";
import { useTheme } from "@/theme";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Badge } from "@/components/Badge";
import { Checkbox } from "@/components/Checkbox";

// Lazy load MDX pages
const ButtonDocs = lazy(() => import("./pages/Button.mdx"));
const InputDocs = lazy(() => import("./pages/Input.mdx"));
const RadioGroupDocs = lazy(() => import("./pages/RadioGroup.mdx"));
const AccordionDocs = lazy(() => import("./pages/Accordion.mdx"));
const AvatarDocs = lazy(() => import("./pages/Avatar.mdx"));
const BadgeDocs = lazy(() => import("./pages/Badge.mdx"));
const CheckboxDocs = lazy(() => import("./pages/Checkbox.mdx"));
const DropdownDocs = lazy(() => import("./pages/Dropdown.mdx"));
const ModalDocs = lazy(() => import("./pages/Modal.mdx"));
const PopoverDocs = lazy(() => import("./pages/Popover.mdx"));
const ScrollAreaDocs = lazy(() => import("./pages/ScrollArea.mdx"));
const SkeletonDocs = lazy(() => import("./pages/Skeleton.mdx"));
const SwitchDocs = lazy(() => import("./pages/Switch.mdx"));
const TypographyDocs = lazy(() => import("./pages/Typography.mdx"));
const ThemingPage = lazy(() =>
  import("./pages/ThemingPage").then((m) => ({ default: m.ThemingPage })),
);

const components = [
  {
    name: "Accordion",
    path: "/docs/accordion",
    description: "Collapsible content sections",
  },
  {
    name: "Avatar",
    path: "/docs/avatar",
    description: "User profile images with fallbacks",
  },
  {
    name: "Badge",
    path: "/docs/badge",
    description: "Status indicators and labels",
  },
  {
    name: "Button",
    path: "/docs/button",
    description: "Interactive action triggers",
  },
  {
    name: "Checkbox",
    path: "/docs/checkbox",
    description: "Multi-select form controls",
  },
  {
    name: "Dropdown",
    path: "/docs/dropdown",
    description: "Select menus with keyboard navigation",
  },
  {
    name: "Input",
    path: "/docs/input",
    description: "Text fields with validation",
  },
  {
    name: "Modal",
    path: "/docs/modal",
    description: "Accessible dialog overlays",
  },
  {
    name: "Popover",
    path: "/docs/popover",
    description: "Contextual floating menus",
  },
  {
    name: "Radio Group",
    path: "/docs/radio-group",
    description: "Single-select option groups",
  },
  {
    name: "Scroll Area",
    path: "/docs/scroll-area",
    description: "Scrollable content containers",
  },
  {
    name: "Skeleton",
    path: "/docs/skeleton",
    description: "Loading placeholders",
  },
  {
    name: "Switch",
    path: "/docs/switch",
    description: "Instant setting toggles",
  },
  {
    name: "Typography",
    path: "/docs/typography",
    description: "Text styles and hierarchy",
  },
];

const COLOR_PRESETS = [
  { name: "Pink", value: "#ec4899" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Violet", value: "#8b5cf6" },
  { name: "Emerald", value: "#10b981" },
  { name: "Orange", value: "#f97316" },
  { name: "Red", value: "#ef4444" },
  { name: "Cyan", value: "#06b6d4" },
  { name: "Rose", value: "#f43f5e" },
];

function hexToHSL(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [h * 360, s * 100, l * 100];
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * Math.max(0, Math.min(1, color)))
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function generatePaletteFromColor(hex: string) {
  const [h, s] = hexToHSL(hex);
  return {
    50: hslToHex(h, Math.min(100, s * 1.1), 97),
    100: hslToHex(h, Math.min(100, s * 1.1), 93),
    200: hslToHex(h, Math.min(100, s), 85),
    300: hslToHex(h, Math.min(100, s * 0.95), 73),
    400: hslToHex(h, Math.min(100, s * 0.9), 60),
    500: hex,
    600: hslToHex(h, Math.min(100, s * 0.95), 42),
    700: hslToHex(h, Math.min(100, s * 0.9), 34),
    800: hslToHex(h, Math.min(100, s * 0.85), 26),
    900: hslToHex(h, Math.min(100, s * 0.8), 18),
  };
}

// ─── Surface Theme Presets ─────────────────────────────────────────────────

interface SurfacePreset {
  name: string;
  description: string;
  preview: [string, string, string];
  neutral: Record<number, string>;
  tokens: Record<string, string>;
}

const DARK_SURFACE_PRESETS: SurfacePreset[] = [
  {
    name: "Midnight",
    description: "Pure black",
    preview: ["#080808", "#181818", "#f2f2f2"],
    neutral: {
      50: "#080808",
      100: "#101010",
      200: "#181818",
      300: "#202020",
      400: "#383838",
      500: "#585858",
      600: "#787878",
      700: "#a0a0a0",
      800: "#c8c8c8",
      900: "#f2f2f2",
    },
    tokens: {
      background: "#080808",
      surface: "#101010",
      surfaceHover: "#181818",
      elevated: "#181818",
      foreground: "#f2f2f2",
      foregroundMuted: "#a0a0a0",
      foregroundSubtle: "#787878",
      border: "#202020",
      borderSubtle: "#181818",
      borderStrong: "#383838",
      input: "#181818",
      inputHover: "#202020",
      inputFocus: "#101010",
    },
  },
  {
    name: "Charcoal",
    description: "Soft dark gray",
    preview: ["#121212", "#1e1e1e", "#e8e8e8"],
    neutral: {
      50: "#121212",
      100: "#1a1a1a",
      200: "#1e1e1e",
      300: "#2c2c2c",
      400: "#404040",
      500: "#5e5e5e",
      600: "#808080",
      700: "#a8a8a8",
      800: "#d0d0d0",
      900: "#e8e8e8",
    },
    tokens: {
      background: "#121212",
      surface: "#1a1a1a",
      surfaceHover: "#1e1e1e",
      elevated: "#1e1e1e",
      foreground: "#e8e8e8",
      foregroundMuted: "#a8a8a8",
      foregroundSubtle: "#808080",
      border: "#2c2c2c",
      borderSubtle: "#1e1e1e",
      borderStrong: "#404040",
      input: "#1e1e1e",
      inputHover: "#2c2c2c",
      inputFocus: "#1a1a1a",
    },
  },
  {
    name: "Ocean",
    description: "Deep blue",
    preview: ["#0a1628", "#111d33", "#e2e8f0"],
    neutral: {
      50: "#0a1628",
      100: "#0f1d2e",
      200: "#111d33",
      300: "#1a2a42",
      400: "#2a3f5f",
      500: "#4a6182",
      600: "#6b82a0",
      700: "#8fa3bb",
      800: "#c4d1de",
      900: "#e2e8f0",
    },
    tokens: {
      background: "#0a1628",
      surface: "#0f1d2e",
      surfaceHover: "#111d33",
      elevated: "#111d33",
      foreground: "#e2e8f0",
      foregroundMuted: "#8fa3bb",
      foregroundSubtle: "#6b82a0",
      border: "#1a2a42",
      borderSubtle: "#111d33",
      borderStrong: "#2a3f5f",
      input: "#111d33",
      inputHover: "#1a2a42",
      inputFocus: "#0f1d2e",
    },
  },
  {
    name: "Glass Blue",
    description: "Frosted blue glass",
    preview: ["#0c1929", "#132640", "#dbeafe"],
    neutral: {
      50: "#0c1929",
      100: "#102030",
      200: "#132640",
      300: "#1c3554",
      400: "#2b4d75",
      500: "#3e6a9a",
      600: "#5b8aba",
      700: "#8cb4da",
      800: "#bcd5f0",
      900: "#dbeafe",
    },
    tokens: {
      background: "#0c1929",
      surface: "#102030",
      surfaceHover: "#162d48",
      elevated: "#132640",
      foreground: "#dbeafe",
      foregroundMuted: "#8cb4da",
      foregroundSubtle: "#5b8aba",
      border: "#1e3a5c",
      borderSubtle: "#162d48",
      borderStrong: "#2b4d75",
      input: "#132640",
      inputHover: "#1c3554",
      inputFocus: "#102030",
    },
  },
  {
    name: "Slate",
    description: "Cool blue-gray",
    preview: ["#0f172a", "#1e293b", "#f1f5f9"],
    neutral: {
      50: "#0f172a",
      100: "#1e293b",
      200: "#1e293b",
      300: "#334155",
      400: "#475569",
      500: "#64748b",
      600: "#94a3b8",
      700: "#cbd5e1",
      800: "#e2e8f0",
      900: "#f1f5f9",
    },
    tokens: {
      background: "#0f172a",
      surface: "#1e293b",
      surfaceHover: "#273549",
      elevated: "#1e293b",
      foreground: "#f1f5f9",
      foregroundMuted: "#94a3b8",
      foregroundSubtle: "#64748b",
      border: "#334155",
      borderSubtle: "#1e293b",
      borderStrong: "#475569",
      input: "#1e293b",
      inputHover: "#334155",
      inputFocus: "#1e293b",
    },
  },
  {
    name: "Violet",
    description: "Purple tint",
    preview: ["#0e0a1a", "#1a1425", "#ede9fe"],
    neutral: {
      50: "#0e0a1a",
      100: "#141020",
      200: "#1a1425",
      300: "#251e35",
      400: "#3b3255",
      500: "#5b5278",
      600: "#7c739a",
      700: "#a09abc",
      800: "#cbc5de",
      900: "#ede9fe",
    },
    tokens: {
      background: "#0e0a1a",
      surface: "#141020",
      surfaceHover: "#1a1425",
      elevated: "#1a1425",
      foreground: "#ede9fe",
      foregroundMuted: "#a09abc",
      foregroundSubtle: "#7c739a",
      border: "#251e35",
      borderSubtle: "#1a1425",
      borderStrong: "#3b3255",
      input: "#1a1425",
      inputHover: "#251e35",
      inputFocus: "#141020",
    },
  },
  {
    name: "Rose Dark",
    description: "Warm rose tint",
    preview: ["#1a0a10", "#261218", "#fce7f3"],
    neutral: {
      50: "#1a0a10",
      100: "#201015",
      200: "#261218",
      300: "#3a1c25",
      400: "#552a38",
      500: "#7a4055",
      600: "#a06078",
      700: "#c08898",
      800: "#dbb0be",
      900: "#fce7f3",
    },
    tokens: {
      background: "#1a0a10",
      surface: "#201015",
      surfaceHover: "#261218",
      elevated: "#261218",
      foreground: "#fce7f3",
      foregroundMuted: "#c08898",
      foregroundSubtle: "#a06078",
      border: "#3a1c25",
      borderSubtle: "#261218",
      borderStrong: "#552a38",
      input: "#261218",
      inputHover: "#3a1c25",
      inputFocus: "#201015",
    },
  },
  {
    name: "Forest",
    description: "Deep green",
    preview: ["#071210", "#0d1f1b", "#ecfdf5"],
    neutral: {
      50: "#071210",
      100: "#0a1a17",
      200: "#0d1f1b",
      300: "#162e28",
      400: "#264a40",
      500: "#3d6b5e",
      600: "#5a8c7c",
      700: "#86b5a2",
      800: "#b8d8ca",
      900: "#ecfdf5",
    },
    tokens: {
      background: "#071210",
      surface: "#0a1a17",
      surfaceHover: "#0d1f1b",
      elevated: "#0d1f1b",
      foreground: "#ecfdf5",
      foregroundMuted: "#86b5a2",
      foregroundSubtle: "#5a8c7c",
      border: "#162e28",
      borderSubtle: "#0d1f1b",
      borderStrong: "#264a40",
      input: "#0d1f1b",
      inputHover: "#162e28",
      inputFocus: "#0a1a17",
    },
  },
  {
    name: "Warm",
    description: "Cozy brown",
    preview: ["#120f0b", "#1c1814", "#faf5ef"],
    neutral: {
      50: "#120f0b",
      100: "#181510",
      200: "#1c1814",
      300: "#2a2520",
      400: "#3e3830",
      500: "#5c5448",
      600: "#7a7165",
      700: "#a09688",
      800: "#c8bfb2",
      900: "#faf5ef",
    },
    tokens: {
      background: "#120f0b",
      surface: "#181510",
      surfaceHover: "#1c1814",
      elevated: "#1c1814",
      foreground: "#faf5ef",
      foregroundMuted: "#a09688",
      foregroundSubtle: "#7a7165",
      border: "#2a2520",
      borderSubtle: "#1c1814",
      borderStrong: "#3e3830",
      input: "#1c1814",
      inputHover: "#2a2520",
      inputFocus: "#181510",
    },
  },
  {
    name: "Onyx",
    description: "True black OLED",
    preview: ["#000000", "#0a0a0a", "#fafafa"],
    neutral: {
      50: "#000000",
      100: "#050505",
      200: "#0a0a0a",
      300: "#151515",
      400: "#2a2a2a",
      500: "#505050",
      600: "#707070",
      700: "#999999",
      800: "#c0c0c0",
      900: "#fafafa",
    },
    tokens: {
      background: "#000000",
      surface: "#050505",
      surfaceHover: "#0a0a0a",
      elevated: "#0a0a0a",
      foreground: "#fafafa",
      foregroundMuted: "#999999",
      foregroundSubtle: "#707070",
      border: "#151515",
      borderSubtle: "#0a0a0a",
      borderStrong: "#2a2a2a",
      input: "#0a0a0a",
      inputHover: "#151515",
      inputFocus: "#050505",
    },
  },
];

const LIGHT_SURFACE_PRESETS: SurfacePreset[] = [
  {
    name: "Default",
    description: "Clean white",
    preview: ["#fbfaf9", "#ffffff", "#111827"],
    neutral: {
      50: "#fbfaf9",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
    tokens: {
      background: "#fbfaf9",
      surface: "#ffffff",
      surfaceHover: "#f3f4f6",
      elevated: "#ffffff",
      foreground: "#111827",
      foregroundMuted: "#6b7280",
      foregroundSubtle: "#9ca3af",
      border: "#e5e7eb",
      borderSubtle: "#f3f4f6",
      borderStrong: "#9ca3af",
      input: "#ffffff",
      inputHover: "#fbfaf9",
      inputFocus: "#ffffff",
    },
  },
  {
    name: "Snow Blue",
    description: "Cool blue tint",
    preview: ["#f0f4f8", "#ffffff", "#1a2b4a"],
    neutral: {
      50: "#f0f4f8",
      100: "#e8edf2",
      200: "#d5dce6",
      300: "#b8c4d4",
      400: "#8a9ab5",
      500: "#5d7096",
      600: "#445a7a",
      700: "#344763",
      800: "#25344c",
      900: "#1a2b4a",
    },
    tokens: {
      background: "#f0f4f8",
      surface: "#ffffff",
      surfaceHover: "#e8edf2",
      elevated: "#ffffff",
      foreground: "#1a2b4a",
      foregroundMuted: "#5d7096",
      foregroundSubtle: "#8a9ab5",
      border: "#d5dce6",
      borderSubtle: "#e8edf2",
      borderStrong: "#8a9ab5",
      input: "#ffffff",
      inputHover: "#f0f4f8",
      inputFocus: "#ffffff",
    },
  },
  {
    name: "Warm Sand",
    description: "Soft cream",
    preview: ["#faf6f0", "#ffffff", "#2d1f10"],
    neutral: {
      50: "#faf6f0",
      100: "#f3ede4",
      200: "#e5ddd0",
      300: "#d1c5b4",
      400: "#a89680",
      500: "#7a6b58",
      600: "#5c4f3e",
      700: "#443a2e",
      800: "#322b20",
      900: "#2d1f10",
    },
    tokens: {
      background: "#faf6f0",
      surface: "#ffffff",
      surfaceHover: "#f3ede4",
      elevated: "#ffffff",
      foreground: "#2d1f10",
      foregroundMuted: "#7a6b58",
      foregroundSubtle: "#a89680",
      border: "#e5ddd0",
      borderSubtle: "#f3ede4",
      borderStrong: "#a89680",
      input: "#ffffff",
      inputHover: "#faf6f0",
      inputFocus: "#ffffff",
    },
  },
  {
    name: "Lavender",
    description: "Soft purple tint",
    preview: ["#f5f3ff", "#ffffff", "#1e1040"],
    neutral: {
      50: "#f5f3ff",
      100: "#ede9fe",
      200: "#ddd6fe",
      300: "#c4b5fd",
      400: "#a78bfa",
      500: "#7c5cbf",
      600: "#5b4399",
      700: "#453378",
      800: "#2e2254",
      900: "#1e1040",
    },
    tokens: {
      background: "#f5f3ff",
      surface: "#ffffff",
      surfaceHover: "#ede9fe",
      elevated: "#ffffff",
      foreground: "#1e1040",
      foregroundMuted: "#5b4399",
      foregroundSubtle: "#a78bfa",
      border: "#ddd6fe",
      borderSubtle: "#ede9fe",
      borderStrong: "#a78bfa",
      input: "#ffffff",
      inputHover: "#f5f3ff",
      inputFocus: "#ffffff",
    },
  },
  {
    name: "Mint",
    description: "Fresh green tint",
    preview: ["#f0fdf4", "#ffffff", "#052e16"],
    neutral: {
      50: "#f0fdf4",
      100: "#dcfce7",
      200: "#bbf7d0",
      300: "#86efac",
      400: "#4ade80",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
      800: "#166534",
      900: "#052e16",
    },
    tokens: {
      background: "#f0fdf4",
      surface: "#ffffff",
      surfaceHover: "#dcfce7",
      elevated: "#ffffff",
      foreground: "#052e16",
      foregroundMuted: "#16a34a",
      foregroundSubtle: "#4ade80",
      border: "#bbf7d0",
      borderSubtle: "#dcfce7",
      borderStrong: "#4ade80",
      input: "#ffffff",
      inputHover: "#f0fdf4",
      inputFocus: "#ffffff",
    },
  },
  {
    name: "Rose",
    description: "Warm pink tint",
    preview: ["#fff1f2", "#ffffff", "#4c0519"],
    neutral: {
      50: "#fff1f2",
      100: "#ffe4e6",
      200: "#fecdd3",
      300: "#fda4af",
      400: "#fb7185",
      500: "#f43f5e",
      600: "#e11d48",
      700: "#be123c",
      800: "#9f1239",
      900: "#4c0519",
    },
    tokens: {
      background: "#fff1f2",
      surface: "#ffffff",
      surfaceHover: "#ffe4e6",
      elevated: "#ffffff",
      foreground: "#4c0519",
      foregroundMuted: "#be123c",
      foregroundSubtle: "#fb7185",
      border: "#fecdd3",
      borderSubtle: "#ffe4e6",
      borderStrong: "#fb7185",
      input: "#ffffff",
      inputHover: "#fff1f2",
      inputFocus: "#ffffff",
    },
  },
];

const CopyInstallButton: React.FC = () => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText("npm install awesome-ui-library");
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="h-8 px-4 rounded-md border text-xs font-mono flex items-center gap-2 transition-colors"
      style={{
        borderColor: theme.tokens.border,
        color: theme.tokens.foregroundMuted,
        backgroundColor: theme.tokens.surface,
      }}
    >
      npm install awesome-ui-library
      {copied ? (
        <svg
          className="w-3.5 h-3.5 shrink-0"
          style={{ color: theme.palette.success[500] }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <svg
          className="w-3.5 h-3.5 shrink-0 opacity-50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      )}
    </button>
  );
};

const ColorPicker: React.FC = () => {
  const { theme, overrideTheme, resetTheme } = useTheme();
  const [customColor, setCustomColor] = useState(theme.palette.primary[500]);
  const [copied, setCopied] = useState<string | null>(null);

  const applyColor = (color: string) => {
    setCustomColor(color);
    const palette = generatePaletteFromColor(color);
    overrideTheme({
      palette: { primary: palette },
      tokens: {
        accent: palette[600],
        accentForeground: "#ffffff",
        accentHover: palette[700],
        ring: palette[500],
      },
    });
  };

  const copyColor = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div
      className="rounded-lg border p-6"
      style={{
        borderColor: theme.tokens.border,
        backgroundColor: theme.tokens.surface,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">Primary Color</h3>
        <button
          onClick={() => {
            resetTheme();
            setCustomColor("#ec4899");
          }}
          className="text-xs opacity-50 hover:opacity-100 transition-opacity"
        >
          Reset
        </button>
      </div>

      {/* Preset swatches */}
      <div className="flex flex-wrap gap-2 mb-4">
        {COLOR_PRESETS.map((preset) => (
          <button
            key={preset.name}
            onClick={() => applyColor(preset.value)}
            className="w-8 h-8 rounded-md border-2 transition-transform hover:scale-110"
            style={{
              backgroundColor: preset.value,
              borderColor:
                customColor === preset.value
                  ? theme.tokens.foreground
                  : "transparent",
            }}
            title={preset.name}
          />
        ))}
      </div>

      {/* Custom color input + copy */}
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={customColor}
          onChange={(e) => applyColor(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer border-0 p-0"
        />
        <input
          type="text"
          value={customColor}
          onChange={(e) => {
            const v = e.target.value;
            if (/^#[0-9a-fA-F]{6}$/.test(v)) applyColor(v);
            setCustomColor(v);
          }}
          className="h-8 px-3 rounded-md border text-sm font-mono w-28"
          style={{
            borderColor: theme.tokens.border,
            backgroundColor: theme.tokens.background,
            color: theme.tokens.foreground,
          }}
          maxLength={7}
        />
        <button
          onClick={() => copyColor(customColor, "hex")}
          className="h-8 px-3 rounded-md border text-xs font-medium transition-colors"
          style={{
            borderColor: theme.tokens.border,
            color:
              copied === "hex"
                ? theme.palette.success[500]
                : theme.tokens.foregroundMuted,
          }}
        >
          {copied === "hex" ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Theme Variations */}
      <div className="mt-5">
        <div
          className="text-xs font-semibold mb-3"
          style={{ color: theme.tokens.foregroundMuted }}
        >
          {theme.colorMode === "dark" ? "Dark" : "Light"} Surface Themes
        </div>
        <div className="grid grid-cols-3 gap-2">
          {(theme.colorMode === "dark"
            ? DARK_SURFACE_PRESETS
            : LIGHT_SURFACE_PRESETS
          ).map((preset) => (
            <button
              key={preset.name}
              onClick={() => {
                overrideTheme({
                  neutral: preset.neutral as unknown as typeof theme.neutral,
                  tokens: preset.tokens,
                });
              }}
              className="rounded-md border p-2 text-left transition-all hover:border-[var(--color-accent)]"
              style={{
                borderColor: theme.tokens.border,
                backgroundColor: theme.tokens.surface,
              }}
            >
              <div className="flex gap-0.5 mb-1.5">
                {preset.preview.map((c, i) => (
                  <div
                    key={i}
                    className="h-4 rounded-sm"
                    style={{
                      backgroundColor: c,
                      flex: i === 0 ? 2 : 1,
                    }}
                  />
                ))}
              </div>
              <div className="text-[11px] font-medium leading-tight">
                {preset.name}
              </div>
              <div
                className="text-[9px] leading-tight"
                style={{ color: theme.tokens.foregroundMuted }}
              >
                {preset.description}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const LivePreview: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className="rounded-lg border p-6 space-y-5"
      style={{
        borderColor: theme.tokens.border,
        backgroundColor: theme.tokens.surface,
      }}
    >
      <h3 className="text-sm font-semibold mb-4">Live Preview</h3>
      <div className="flex flex-wrap gap-3">
        <Button variant="primary" size="sm">
          Primary
        </Button>
        <Button variant="secondary" size="sm">
          Secondary
        </Button>
        <Button variant="outline" size="sm">
          Outline
        </Button>
        <Button variant="ghost" size="sm">
          Ghost
        </Button>
      </div>
      <Input label="Email" placeholder="you@example.com" inputSize="sm" />
      <div className="flex flex-wrap gap-2">
        <Badge variant="primary">Active</Badge>
        <Badge variant="success">Online</Badge>
        <Badge variant="warning">Pending</Badge>
        <Badge variant="danger">Offline</Badge>
      </div>
      <Checkbox label="Accept terms and conditions" defaultChecked />
    </div>
  );
};

const LandingPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 sm:py-12">
      {/* Hero + Theme Customizer */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div
          className="inline-block text-xs font-medium px-2.5 py-1 rounded-md mb-4"
          style={{
            backgroundColor: `${theme.palette.primary[500]}15`,
            color: theme.palette.primary[500],
          }}
        >
          v2.0.0
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-3">
          Build better interfaces,{" "}
          <span style={{ color: theme.palette.primary[500] }}>faster.</span>
        </h1>
        <p
          className="text-base leading-relaxed mb-6"
          style={{ color: theme.tokens.foregroundMuted }}
        >
          A production-ready React component library with built-in theming,
          accessibility, and TypeScript support.
        </p>
        <div className="flex flex-wrap items-center gap-3 justify-center">
          <Link to="/docs/button">
            <Button size="sm">Browse Components</Button>
          </Link>
          <CopyInstallButton />
        </div>
      </div>

      {/* Theme Customizer - visible without scrolling */}
      <div className="text-center mb-2">
        <p
          className="text-xs font-medium"
          style={{ color: theme.tokens.foregroundMuted }}
        >
          Pick a primary color to preview
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-10">
        <ColorPicker />
        <LivePreview />
      </div>

      {/* Features */}
      <section
        className="rounded-xl border p-8 sm:p-10"
        style={{
          borderColor: theme.tokens.border,
          background:
            theme.colorMode === "dark"
              ? `linear-gradient(135deg, ${theme.palette.primary[500]}08 0%, transparent 60%)`
              : `linear-gradient(135deg, ${theme.palette.primary[500]}06 0%, transparent 60%)`,
        }}
      >
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          Why Awesome UI?
        </h2>
        <p
          className="text-sm mb-8"
          style={{ color: theme.tokens.foregroundMuted }}
        >
          Built for teams that ship fast without cutting corners.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              ),
              title: "Accessible",
              desc: "WAI-ARIA compliant. Full keyboard navigation and screen reader support out of the box.",
            },
            {
              icon: (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              ),
              title: "Themeable",
              desc: "CSS variable theming with light/dark modes. Override any color at runtime — zero JS cost.",
            },
            {
              icon: (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              ),
              title: "TypeScript",
              desc: "Every component is fully typed. Exported interfaces for all props — autocomplete just works.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border p-5"
              style={{
                borderColor: theme.tokens.border,
                backgroundColor: theme.tokens.surface,
              }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                style={{
                  backgroundColor: `${theme.palette.primary[500]}12`,
                  color: theme.palette.primary[500],
                }}
              >
                {feature.icon}
              </div>
              <h3 className="text-sm font-semibold mb-1.5">{feature.title}</h3>
              <p
                className="text-xs leading-relaxed"
                style={{ color: theme.tokens.foregroundMuted }}
              >
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Components Grid */}
      <section className="mt-12">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-xl font-semibold tracking-tight">Components</h2>
          <span
            className="text-sm"
            style={{ color: theme.tokens.foregroundMuted }}
          >
            {components.length} available
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {components.map((comp) => (
            <Link
              key={comp.path}
              to={comp.path}
              className="group rounded-lg border p-4 transition-colors"
              style={{
                borderColor: theme.tokens.border,
                backgroundColor: theme.tokens.surface,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = theme.palette.primary[500];
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme.tokens.border;
              }}
            >
              <div className="font-medium text-sm mb-1">{comp.name}</div>
              <div
                className="text-xs"
                style={{ color: theme.tokens.foregroundMuted }}
              >
                {comp.description}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export const DocsApp: React.FC = () => {
  return (
    <DocsLayout>
      <Suspense
        fallback={
          <div className="h-64 flex items-center justify-center opacity-40 text-sm">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/theming" element={<ThemingPage />} />
          <Route path="/button" element={<ButtonDocs />} />
          <Route path="/input" element={<InputDocs />} />
          <Route path="/radio-group" element={<RadioGroupDocs />} />
          <Route path="/accordion" element={<AccordionDocs />} />
          <Route path="/avatar" element={<AvatarDocs />} />
          <Route path="/badge" element={<BadgeDocs />} />
          <Route path="/checkbox" element={<CheckboxDocs />} />
          <Route path="/dropdown" element={<DropdownDocs />} />
          <Route path="/modal" element={<ModalDocs />} />
          <Route path="/popover" element={<PopoverDocs />} />
          <Route path="/scroll-area" element={<ScrollAreaDocs />} />
          <Route path="/skeleton" element={<SkeletonDocs />} />
          <Route path="/switch" element={<SwitchDocs />} />
          <Route path="/typography" element={<TypographyDocs />} />
          <Route path="*" element={<Navigate to="/docs" replace />} />
        </Routes>
      </Suspense>
    </DocsLayout>
  );
};

export default DocsApp;

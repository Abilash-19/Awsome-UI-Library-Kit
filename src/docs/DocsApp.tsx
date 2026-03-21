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

      {/* Palette preview with clickable shades */}
      <div className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-xs font-medium"
            style={{ color: theme.tokens.foregroundMuted }}
          >
            Generated Palette
          </span>
          <span
            className="text-[10px]"
            style={{ color: theme.tokens.foregroundMuted }}
          >
            {copied && copied !== "hex"
              ? `Copied ${copied}!`
              : "Click a shade to copy"}
          </span>
        </div>
        <div className="flex rounded-md overflow-hidden">
          {([50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const).map(
            (shade) => {
              const shadeColor =
                theme.palette.primary[
                  shade as keyof typeof theme.palette.primary
                ];
              return (
                <button
                  key={shade}
                  className="flex-1 h-10 transition-transform hover:scale-y-125 relative group cursor-pointer"
                  style={{ backgroundColor: shadeColor }}
                  onClick={() => copyColor(shadeColor, String(shade))}
                  title={`${shade}: ${shadeColor}`}
                >
                  <span
                    className="absolute inset-0 flex items-center justify-center text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: shade <= 300 ? "#000" : "#fff" }}
                  >
                    {shade}
                  </span>
                </button>
              );
            },
          )}
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

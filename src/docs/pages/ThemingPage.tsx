import React, { useState } from "react";
import { useTheme } from "@/theme";
import type { SemanticTokens } from "@/theme";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Input } from "@/components/Input";
import { Checkbox } from "@/components/Checkbox";
import { Dropdown } from "@/components/Dropdown/Dropdown";
import Switch from "@/components/Switch/Switch";
import { PageHeader } from "../components/PageHeader";

const BRAND_PRESETS = [
  { name: "Pink", color: "#ec4899" },
  { name: "Blue", color: "#3b82f6" },
  { name: "Violet", color: "#8b5cf6" },
  { name: "Emerald", color: "#10b981" },
  { name: "Orange", color: "#f97316" },
  { name: "Red", color: "#ef4444" },
  { name: "Cyan", color: "#06b6d4" },
  { name: "Rose", color: "#f43f5e" },
  { name: "Indigo", color: "#6366f1" },
  { name: "Amber", color: "#f59e0b" },
  { name: "Teal", color: "#14b8a6" },
  { name: "Lime", color: "#84cc16" },
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

function generateScale(hex: string) {
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

const CodeBlock: React.FC<{ children: string }> = ({ children }) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);

  return (
    <div className="relative rounded-lg overflow-hidden my-4 group">
      <pre
        className="p-4 pr-16 text-sm font-mono overflow-x-auto"
        style={{
          backgroundColor: theme.colorMode === "dark" ? "#111" : "#1e1e2e",
          color: "#d4d4d4",
        }}
      >
        <code>{children}</code>
      </pre>
      <button
        onClick={() => {
          navigator.clipboard.writeText(children);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-md transition-colors"
        style={{
          backgroundColor: copied
            ? "rgba(74, 222, 128, 0.15)"
            : "rgba(255,255,255,0.08)",
          color: copied ? "#4ade80" : "#999",
        }}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};

const Section: React.FC<{
  title: string;
  description?: string;
  children: React.ReactNode;
}> = ({ title, description, children }) => {
  const { theme } = useTheme();
  return (
    <section className="mb-12">
      <h2 className="text-lg font-semibold tracking-tight mb-1">{title}</h2>
      {description && (
        <p
          className="text-sm mb-5"
          style={{ color: theme.tokens.foregroundMuted }}
        >
          {description}
        </p>
      )}
      {children}
    </section>
  );
};

// ─── Dark Theme Presets ────────────────────────────────────────────────────

interface ThemePreset {
  name: string;
  description: string;
  preview: [string, string, string]; // 3 colors for the preview swatch
  neutral: Record<number, string>;
  tokens: Partial<SemanticTokens>;
}

const DARK_PRESETS: ThemePreset[] = [
  {
    name: "Midnight",
    description: "Pure black with neutral grays",
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
      foregroundInverse: "#0b0f14",
      border: "#202020",
      borderSubtle: "#181818",
      borderStrong: "#383838",
      input: "#181818",
      inputHover: "#202020",
      inputFocus: "#101010",
      ringOffset: "#101010",
    },
  },
  {
    name: "Ocean",
    description: "Deep blue-tinted dark theme",
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
      foregroundInverse: "#0a1628",
      border: "#1a2a42",
      borderSubtle: "#111d33",
      borderStrong: "#2a3f5f",
      input: "#111d33",
      inputHover: "#1a2a42",
      inputFocus: "#0f1d2e",
      ringOffset: "#0f1d2e",
    },
  },
  {
    name: "Slate",
    description: "Cool gray with blue undertones",
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
      foregroundInverse: "#0f172a",
      border: "#334155",
      borderSubtle: "#1e293b",
      borderStrong: "#475569",
      input: "#1e293b",
      inputHover: "#334155",
      inputFocus: "#1e293b",
      ringOffset: "#1e293b",
    },
  },
  {
    name: "Violet Night",
    description: "Dark purple-tinted surfaces",
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
      foregroundInverse: "#0e0a1a",
      border: "#251e35",
      borderSubtle: "#1a1425",
      borderStrong: "#3b3255",
      input: "#1a1425",
      inputHover: "#251e35",
      inputFocus: "#141020",
      ringOffset: "#141020",
    },
  },
  {
    name: "Emerald Dark",
    description: "Forest green undertones",
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
      foregroundInverse: "#071210",
      border: "#162e28",
      borderSubtle: "#0d1f1b",
      borderStrong: "#264a40",
      input: "#0d1f1b",
      inputHover: "#162e28",
      inputFocus: "#0a1a17",
      ringOffset: "#0a1a17",
    },
  },
  {
    name: "Warm Dark",
    description: "Cozy dark with warm brown tones",
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
      foregroundInverse: "#120f0b",
      border: "#2a2520",
      borderSubtle: "#1c1814",
      borderStrong: "#3e3830",
      input: "#1c1814",
      inputHover: "#2a2520",
      inputFocus: "#181510",
      ringOffset: "#181510",
    },
  },
];

const LIGHT_PRESETS: ThemePreset[] = [
  {
    name: "Default",
    description: "Clean white with neutral grays",
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
      foregroundInverse: "#ffffff",
      border: "#e5e7eb",
      borderSubtle: "#f3f4f6",
      borderStrong: "#9ca3af",
      input: "#ffffff",
      inputHover: "#fbfaf9",
      inputFocus: "#ffffff",
      ringOffset: "#ffffff",
    },
  },
  {
    name: "Snow Blue",
    description: "Soft blue-tinted light theme",
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
      foregroundInverse: "#ffffff",
      border: "#d5dce6",
      borderSubtle: "#e8edf2",
      borderStrong: "#8a9ab5",
      input: "#ffffff",
      inputHover: "#f0f4f8",
      inputFocus: "#ffffff",
      ringOffset: "#ffffff",
    },
  },
  {
    name: "Warm Sand",
    description: "Warm cream backgrounds",
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
      foregroundInverse: "#ffffff",
      border: "#e5ddd0",
      borderSubtle: "#f3ede4",
      borderStrong: "#a89680",
      input: "#ffffff",
      inputHover: "#faf6f0",
      inputFocus: "#ffffff",
      ringOffset: "#ffffff",
    },
  },
];

// ─── Theme Preset Card ────────────────────────────────────────────────────

const PresetCard: React.FC<{
  preset: ThemePreset;
  active: boolean;
  onSelect: () => void;
}> = ({ preset, active, onSelect }) => {
  const { theme } = useTheme();
  return (
    <button
      onClick={onSelect}
      className="text-left rounded-lg border p-3 transition-all"
      style={{
        borderColor: active ? theme.tokens.accent : theme.tokens.border,
        backgroundColor: active
          ? `${theme.tokens.accent}10`
          : theme.tokens.surface,
        boxShadow: active ? `0 0 0 1px ${theme.tokens.accent}` : "none",
      }}
    >
      {/* Preview swatches */}
      <div className="flex gap-1 mb-2.5">
        {preset.preview.map((c, i) => (
          <div
            key={i}
            className="h-6 rounded-sm border"
            style={{
              backgroundColor: c,
              borderColor: theme.tokens.borderSubtle,
              flex: i === 0 ? 2 : 1,
            }}
          />
        ))}
      </div>
      <div className="text-sm font-semibold mb-0.5">{preset.name}</div>
      <div
        className="text-[11px] leading-tight"
        style={{ color: theme.tokens.foregroundMuted }}
      >
        {preset.description}
      </div>
    </button>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────

export const ThemingPage: React.FC = () => {
  const { theme, overrideTheme, resetTheme, toggleColorMode } = useTheme();
  const [activePreset, setActivePreset] = useState(theme.palette.primary[500]);
  const [activeVariation, setActiveVariation] = useState<string | null>(null);
  const [ddValue, setDdValue] = useState("");
  const [switchOn, setSwitchOn] = useState(false);
  const [checked, setChecked] = useState(true);

  const variations = theme.colorMode === "dark" ? DARK_PRESETS : LIGHT_PRESETS;

  const applyColor = (color: string) => {
    setActivePreset(color);
    const scale = generateScale(color);
    overrideTheme({
      palette: { primary: scale },
      tokens: { accent: scale[600], accentHover: scale[700], ring: scale[500] },
    });
  };

  const applyVariation = (preset: ThemePreset) => {
    setActiveVariation(preset.name);
    overrideTheme({
      neutral: preset.neutral as unknown as typeof theme.neutral,
      tokens: preset.tokens,
    });
  };

  const handleReset = () => {
    setActivePreset("#ec4899");
    setActiveVariation(null);
    resetTheme();
  };

  return (
    <div>
      <PageHeader
        title="Theming"
        description="Every component reads from a single theme. Change one value and everything updates."
      />

      {/* Installation */}
      <Section title="Installation" description="Install the package from npm.">
        <CodeBlock>{`npm install awesome-ui-library`}</CodeBlock>
      </Section>

      {/* Setup */}
      <Section
        title="Setup"
        description="Add ThemeProvider at the root of your app."
      >
        <CodeBlock>{`import { ThemeProvider } from 'awesome-ui-library';

function App() {
  return (
    <ThemeProvider defaultThemeName="light" storageKey="app-theme">
      <YourApp />
    </ThemeProvider>
  );
}`}</CodeBlock>
      </Section>

      {/* How it works */}
      <Section
        title="How It Works"
        description="The theme flows through three layers."
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              step: "1",
              layer: "Palette",
              desc: "Raw color scales from 50 to 900.",
              code: "palette.primary[500]",
            },
            {
              step: "2",
              layer: "Tokens",
              desc: "Semantic roles like accent and border.",
              code: "tokens.accent",
            },
            {
              step: "3",
              layer: "CSS Variables",
              desc: "Injected into :root. No JS at render time.",
              code: "--color-accent",
            },
          ].map((item) => (
            <div
              key={item.layer}
              className="rounded-lg border p-4"
              style={{
                borderColor: theme.tokens.border,
                backgroundColor: theme.tokens.surface,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ backgroundColor: theme.palette.primary[500] }}
                >
                  {item.step}
                </span>
                <span className="text-sm font-semibold">{item.layer}</span>
              </div>
              <p
                className="text-xs mb-3"
                style={{ color: theme.tokens.foregroundMuted }}
              >
                {item.desc}
              </p>
              <code
                className="text-[11px] font-mono px-1.5 py-0.5 rounded inline-block"
                style={{
                  backgroundColor: `${theme.palette.primary[500]}15`,
                  color: theme.palette.primary[500],
                }}
              >
                {item.code}
              </code>
            </div>
          ))}
        </div>
      </Section>

      {/* Color Modes */}
      <Section
        title="Color Modes"
        description="Switch between light and dark with one function call."
      >
        <div
          className="rounded-lg border p-5 flex flex-wrap items-center justify-between gap-4"
          style={{
            borderColor: theme.tokens.border,
            backgroundColor: theme.tokens.surface,
          }}
        >
          <div>
            <div className="text-sm font-medium mb-0.5">
              Active:{" "}
              <span style={{ color: theme.palette.primary[500] }}>
                {theme.colorMode}
              </span>
            </div>
            <p
              className="text-xs"
              style={{ color: theme.tokens.foregroundMuted }}
            >
              Try it — the entire site will adapt.
            </p>
          </div>
          <Button size="sm" onClick={toggleColorMode}>
            Switch to {theme.colorMode === "light" ? "Dark" : "Light"}
          </Button>
        </div>
        <CodeBlock>{`const { toggleColorMode } = useTheme();
toggleColorMode(); // light ↔ dark`}</CodeBlock>
      </Section>

      {/* Live Brand Switcher */}
      <Section
        title="Dynamic Overrides"
        description="Change the primary color at runtime. Every component on this page will react."
      >
        <div
          className="rounded-lg border p-5"
          style={{
            borderColor: theme.tokens.border,
            backgroundColor: theme.tokens.surface,
          }}
        >
          {/* Brand pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {BRAND_PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => applyColor(p.color)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-medium transition-colors"
                style={{
                  borderColor:
                    activePreset === p.color ? p.color : theme.tokens.border,
                  backgroundColor:
                    activePreset === p.color ? `${p.color}15` : "transparent",
                  color:
                    activePreset === p.color
                      ? p.color
                      : theme.tokens.foreground,
                }}
              >
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: p.color }}
                />
                {p.name}
              </button>
            ))}
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-md border text-xs font-medium"
              style={{
                borderColor: theme.tokens.border,
                color: theme.tokens.foregroundMuted,
              }}
            >
              Reset
            </button>
          </div>

          {/* Theme Variations */}
          <div className="mb-6">
            <div
              className="text-[11px] font-semibold uppercase tracking-wider mb-3"
              style={{ color: theme.tokens.foregroundMuted }}
            >
              {theme.colorMode === "dark" ? "Dark" : "Light"} Theme Variations
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {variations.map((preset) => (
                <PresetCard
                  key={preset.name}
                  preset={preset}
                  active={activeVariation === preset.name}
                  onSelect={() => applyVariation(preset)}
                />
              ))}
            </div>
          </div>

          {/* Live preview */}
          <div
            className="text-[11px] font-semibold uppercase tracking-wider mb-3"
            style={{ color: theme.tokens.foregroundMuted }}
          >
            Live Preview
          </div>
          <div
            className="rounded-lg p-5 space-y-4 border"
            style={{
              backgroundColor: theme.tokens.background,
              borderColor: theme.tokens.border,
            }}
          >
            <div className="flex flex-wrap gap-2">
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
            </div>

            <div className="flex items-center gap-6">
              <Checkbox
                label="Accept terms"
                checked={checked}
                onChange={setChecked}
              />
              <Switch
                label="Notifications"
                checked={switchOn}
                onChange={setSwitchOn}
              />
            </div>

            <Dropdown
              label="Framework"
              placeholder="Select one"
              zIndex={1}
              selectedValue={ddValue}
              onChange={setDdValue}
              options={[
                { label: "React", value: "react" },
                { label: "Vue", value: "vue" },
                { label: "Svelte", value: "svelte" },
              ]}
            />
          </div>
        </div>
        <CodeBlock>{`const { overrideTheme } = useTheme();

overrideTheme({
  palette: {
    primary: { 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8' }
  },
  tokens: {
    accent: '#2563eb',
    accentHover: '#1d4ed8',
  }
});`}</CodeBlock>
      </Section>

      {/* Hooks API */}
      <Section
        title="Hooks"
        description="Two hooks cover every theming use case."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div
            className="rounded-lg border p-4"
            style={{
              borderColor: theme.tokens.border,
              backgroundColor: theme.tokens.surface,
            }}
          >
            <div className="text-sm font-semibold mb-1">useTheme()</div>
            <p
              className="text-xs"
              style={{ color: theme.tokens.foregroundMuted }}
            >
              Full control — read the theme, switch modes, apply overrides, or
              reset.
            </p>
          </div>
          <div
            className="rounded-lg border p-4"
            style={{
              borderColor: theme.tokens.border,
              backgroundColor: theme.tokens.surface,
            }}
          >
            <div className="text-sm font-semibold mb-1">useTokens()</div>
            <p
              className="text-xs"
              style={{ color: theme.tokens.foregroundMuted }}
            >
              Just the semantic tokens. Use when a component only needs color
              values.
            </p>
          </div>
        </div>
        <CodeBlock>{`// Full access
const { theme, setTheme, toggleColorMode, overrideTheme, resetTheme } = useTheme();

// Just colors
const tokens = useTokens();
// tokens.background, tokens.accent, tokens.border, ...`}</CodeBlock>
      </Section>

      {/* CSS Variables */}
      <Section
        title="CSS Variables"
        description="Use theme values in plain CSS or Tailwind without any JS imports."
      >
        <CodeBlock>{`.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-foreground);
  border-radius: var(--radius-md);
}

/* Available variables:
   --color-background, --color-surface, --color-foreground
   --color-border, --color-accent, --color-ring
   --color-primary-50 through --color-primary-900
   --radius-sm, --radius-md, --radius-lg
   --font-sans, --font-mono
*/`}</CodeBlock>
      </Section>
    </div>
  );
};

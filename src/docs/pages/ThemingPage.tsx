import React, { useState } from "react";
import { useTheme } from "@/theme";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Input } from "@/components/Input";
import { PageHeader } from "../components/PageHeader";

const BRAND_PRESETS = [
  { name: "Pink", color: "#ec4899" },
  { name: "Blue", color: "#3b82f6" },
  { name: "Violet", color: "#8b5cf6" },
  { name: "Emerald", color: "#10b981" },
  { name: "Orange", color: "#f97316" },
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

export const ThemingPage: React.FC = () => {
  const { theme, overrideTheme, resetTheme, toggleColorMode } = useTheme();
  const [activePreset, setActivePreset] = useState(theme.palette.primary[500]);

  const applyColor = (color: string) => {
    setActivePreset(color);
    const scale = generateScale(color);
    overrideTheme({
      palette: { primary: scale },
      tokens: { accent: scale[600], accentHover: scale[700], ring: scale[500] },
    });
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
              onClick={() => {
                resetTheme();
                setActivePreset("#ec4899");
              }}
              className="px-3 py-1.5 rounded-md border text-xs font-medium"
              style={{
                borderColor: theme.tokens.border,
                color: theme.tokens.foregroundMuted,
              }}
            >
              Reset
            </button>
          </div>

          {/* Live preview */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button variant="primary" size="sm">
                Primary
              </Button>
              <Button variant="outline" size="sm">
                Outline
              </Button>
              <Button variant="ghost" size="sm">
                Ghost
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="primary">Active</Badge>
              <Badge variant="success">Online</Badge>
              <Badge variant="warning">Pending</Badge>
            </div>
            <Input
              label="Themed Input"
              placeholder="Everything uses the same palette"
              inputSize="sm"
            />
          </div>

          {/* Generated palette */}
          <div className="mt-5">
            <div className="flex rounded-md overflow-hidden">
              {([50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const).map(
                (shade) => (
                  <div
                    key={shade}
                    className="flex-1 h-8 relative group"
                    style={{
                      backgroundColor:
                        theme.palette.primary[
                          shade as keyof typeof theme.palette.primary
                        ],
                    }}
                  >
                    <span
                      className="absolute inset-0 flex items-center justify-center text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: shade <= 300 ? "#000" : "#fff" }}
                    >
                      {shade}
                    </span>
                  </div>
                ),
              )}
            </div>
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

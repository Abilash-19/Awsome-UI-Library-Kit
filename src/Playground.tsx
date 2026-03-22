import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Typography } from "@/components/Typography";
import { Accordion } from "@/components/Accordion";
import { useTheme } from "@/theme";
import { Badge } from "./components/Badge";
import { Avatar } from "@/components/Avatar";
import { Skeleton } from "@/components/Skeleton";
import { Checkbox } from "@/components/Checkbox";
import { ScrollArea, ScrollElement } from "@/components/ScrollArea";
import { RadioGroup } from "@/components/RadioGroup";
import Switch from "@/components/Switch/Switch";
import Popover from "@/components/Popover/Popover";
import { Dropdown } from "@/components/Dropdown/Dropdown";
import reactLogo from "@/assets/react.svg";
import type { ThemeOverride } from "@/theme";

function ThemeToggle() {
  const { toggleColorMode, theme } = useTheme();
  return (
    <div className="fixed top-4 right-4 z-50">
      <Button variant="outline" size="sm" onClick={toggleColorMode}>
        {theme.colorMode === "light" ? "Switch to Dark" : "Switch to Light"}
      </Button>
    </div>
  );
}

const presetThemes: {
  name: string;
  override: ThemeOverride | null;
  color: string;
}[] = [
  { name: "Default (Pink)", override: null, color: "#ec4899" },
  {
    name: "Ocean",
    color: "#3b82f6",
    override: {
      name: "ocean",
      palette: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
      tokens: {
        ring: "#3b82f6",
        accent: "#2563eb",
        accentHover: "#1d4ed8",
      },
    },
  },
  {
    name: "Forest",
    color: "#10b981",
    override: {
      name: "forest",
      palette: {
        primary: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
      },
      tokens: {
        ring: "#10b981",
        accent: "#059669",
        accentHover: "#047857",
      },
    },
  },
  {
    name: "Sunset",
    color: "#f97316",
    override: {
      name: "sunset",
      palette: {
        primary: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
      },
      tokens: {
        ring: "#f97316",
        accent: "#ea580c",
        accentHover: "#c2410c",
      },
    },
  },
  {
    name: "Amethyst",
    color: "#a855f7",
    override: {
      name: "amethyst",
      palette: {
        primary: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
        },
      },
      tokens: {
        ring: "#a855f7",
        accent: "#9333ea",
        accentHover: "#7e22ce",
      },
    },
  },
];

export default function Playground() {
  const { theme, overrideTheme, resetTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError("");
  };

  const validateEmail = () => {
    if (!email.includes("@")) {
      setEmailError("Please enter a valid email address");
    }
  };

  const sectionStyles = {
    backgroundColor: theme.tokens.surface,
    "--ring-color": theme.tokens.border,
  } as React.CSSProperties;

  const mutedColor = {
    "--typography-color": theme.tokens.foregroundMuted,
  } as React.CSSProperties;

  const [isSimulatingData, setIsSimulatingData] = useState(true);
  const [radioValue, setRadioValue] = useState("option-1");
  const [dropdownValue, setDropdownValue] = useState("");
  const [switchState, setSwitchState] = useState(false);

  const [checkedItems, setCheckedItems] = useState({
    item1: false,
    item2: false,
    item3: false,
  });

  const allChecked = Object.values(checkedItems).every(Boolean);
  const isIndeterminate =
    Object.values(checkedItems).some(Boolean) && !allChecked;

  const handleToggleAll = (checked: boolean) => {
    setCheckedItems({
      item1: checked,
      item2: checked,
      item3: checked,
    });
  };

  const handleToggleItem =
    (item: keyof typeof checkedItems) => (checked: boolean) => {
      setCheckedItems((prev) => ({ ...prev, [item]: checked }));
    };

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: theme.tokens.background,
        color: theme.tokens.foreground,
      }}
    >
      <ThemeToggle />

      {/* Header */}
      <header
        className="border-b sticky top-0 z-10 backdrop-blur-sm"
        style={{
          borderColor: theme.tokens.border,
          backgroundColor: theme.tokens.background,
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Typography variant="h2" weight="bold">
                UI Component Library
              </Typography>
              <Typography variant="body2" style={mutedColor} className="mt-1">
                Interactive playground for testing components
              </Typography>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/docs">
                <Button variant="ghost" size="sm">
                  Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Theme Picker Section */}
          <section
            className="rounded-xl p-6 shadow-lg ring-1 ring-[var(--ring-color)] transition-all duration-300 hover:shadow-xl lg:col-span-2"
            style={sectionStyles}
          >
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <Typography variant="h4" weight="bold" className="mb-2">
                  Dynamic Brand Theming
                </Typography>
                <Typography variant="body2" style={mutedColor}>
                  Apply seamless theme overrides and instantly see UI scale
                  changes.
                </Typography>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              {presetThemes.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => {
                    if (preset.override) {
                      overrideTheme(preset.override);
                    } else {
                      resetTheme();
                    }
                  }}
                  className="group relative flex items-center justify-center p-[2px] rounded-full hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--ring-color)]"
                  title={preset.name}
                >
                  <div
                    className="w-10 h-10 rounded-full border-2 border-[var(--bg-color)] shadow-sm group-hover:shadow-md transition-shadow"
                    style={{ background: preset.color }}
                  ></div>
                  <Typography
                    variant="caption"
                    className="absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity font-medium whitespace-nowrap drop-shadow"
                    style={{ color: theme.tokens.foreground }}
                  >
                    {preset.name}
                  </Typography>
                </button>
              ))}
            </div>
          </section>

          {/* Buttons Section */}
          <section
            className="rounded-xl p-6 shadow-lg ring-1 ring-[var(--ring-color)] transition-all duration-300 hover:shadow-xl"
            style={sectionStyles}
          >
            <div className="mb-6">
              <Typography variant="h4" weight="bold" className="mb-2">
                Buttons
              </Typography>
              <Typography variant="body2" style={mutedColor}>
                Interactive buttons with multiple variants and states
              </Typography>
            </div>

            <div className="space-y-6">
              <div>
                <Typography
                  variant="subtitle2"
                  weight="semibold"
                  className="mb-3"
                  style={mutedColor}
                >
                  Variants
                </Typography>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => console.log("Primary")}>
                    Primary
                  </Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="success">Success</Button>
                  <Button variant="warning">Warning</Button>
                  <Button variant="danger">Danger</Button>
                  <Button variant="info">Info</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
              </div>

              <div>
                <Typography
                  variant="subtitle2"
                  weight="semibold"
                  className="mb-3"
                  style={mutedColor}
                >
                  Sizes
                </Typography>
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>

              <div>
                <Typography
                  variant="subtitle2"
                  weight="semibold"
                  className="mb-3"
                  style={mutedColor}
                >
                  States
                </Typography>
                <div className="flex flex-wrap gap-2">
                  <Button isLoading>Loading</Button>
                  <Button disabled>Disabled</Button>
                  <Button variant="danger" isLoading />
                </div>
              </div>

              <div>
                <Typography
                  variant="subtitle2"
                  weight="semibold"
                  className="mb-3"
                  style={mutedColor}
                >
                  Interactive Examples
                </Typography>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Open Modal
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      console.log("Button clicked!", { inputValue })
                    }
                  >
                    Console Log
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Badges Section */}
          <section
            className="rounded-xl p-6 shadow-lg ring-1 ring-[var(--ring-color)] transition-all duration-300 hover:shadow-xl"
            style={sectionStyles}
          >
            <div className="mb-6">
              <Typography variant="h4" weight="bold" className="mb-2">
                Badges
              </Typography>
              <Typography variant="body2" style={mutedColor}>
                Status indicators with multiple variants and sizes
              </Typography>
            </div>

            <div className="space-y-6">
              <div>
                <Typography
                  variant="subtitle2"
                  weight="semibold"
                  className="mb-3"
                  style={mutedColor}
                >
                  Variants
                </Typography>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="primary" isLoading>
                    Primary{" "}
                  </Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="danger">Danger</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="info">Info</Badge>
                  <Badge variant="light">Light</Badge>
                  <Badge variant="dark">Dark</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </div>

              <div>
                <Typography
                  variant="subtitle2"
                  weight="semibold"
                  className="mb-3"
                  style={mutedColor}
                >
                  Sizes
                </Typography>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge size="small">Small</Badge>
                  <Badge size="medium">Medium</Badge>
                  <Badge size="large">Large</Badge>
                </div>
              </div>
            </div>
          </section>

          {/* Avatar Section */}
          <section
            className="rounded-xl p-6 shadow-lg ring-1 ring-[var(--ring-color)] transition-all duration-300 hover:shadow-xl"
            style={sectionStyles}
          >
            <div className="mb-6">
              <Typography variant="h4" weight="bold" className="mb-2">
                Avatars
              </Typography>
              <Typography variant="body2" style={mutedColor}>
                User profile images with support for initials, sizes, and
                badges.
              </Typography>
            </div>

            <div className="space-y-8">
              {/* Variants */}
              <div>
                <Typography
                  variant="subtitle2"
                  weight="semibold"
                  className="mb-3"
                  style={mutedColor}
                >
                  Shapes
                </Typography>
                <div className="flex flex-wrap gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="Circle Avatar"
                    />
                    <Typography variant="caption" style={mutedColor}>
                      Circle
                    </Typography>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Avatar
                      shape="square"
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                      alt="Square Avatar"
                    />
                    <Typography variant="caption" style={mutedColor}>
                      Square
                    </Typography>
                  </div>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <Typography
                  variant="subtitle2"
                  weight="semibold"
                  className="mb-3"
                  style={mutedColor}
                >
                  Sizes
                </Typography>
                <div className="flex flex-wrap items-end gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar
                      size="small"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1"
                    />
                    <Typography variant="caption" style={mutedColor}>
                      Small
                    </Typography>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Avatar
                      size="medium"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1"
                    />
                    <Typography variant="caption" style={mutedColor}>
                      Medium
                    </Typography>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Avatar
                      size="large"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1"
                    />
                    <Typography variant="caption" style={mutedColor}>
                      Large
                    </Typography>
                  </div>
                </div>
              </div>

              {/* Fallbacks */}
              <div>
                <Typography
                  variant="subtitle2"
                  weight="semibold"
                  className="mb-3"
                  style={mutedColor}
                >
                  Initials & Fallbacks
                </Typography>
                <div className="flex flex-wrap gap-6">
                  <Avatar displayName="Abilash" size="large" isLoading />
                  <Avatar displayName="John Doe" size="large" />
                  <Avatar
                    displayName="UI Library"
                    shape="square"
                    size="large"
                  />
                  <Avatar size="large" /> {/* Default placeholder */}
                </div>
              </div>

              {/* Badges */}
              <div>
                <Typography
                  variant="subtitle2"
                  weight="semibold"
                  className="mb-3"
                  style={mutedColor}
                >
                  With Badges
                </Typography>
                <div className="flex flex-wrap gap-6">
                  <Avatar
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1"
                    badge={
                      <Badge
                        variant="success"
                        size="small"
                        className="h-2.5 w-2.5 p-0 rounded-full border-2 border-[var(--bg-color)]"
                      >
                        {""}
                      </Badge>
                    }
                  />
                  <Avatar
                    displayName="JD"
                    badge={
                      <Badge
                        variant="danger"
                        size="small"
                        className="w-2.5 h-2.5 p-0 rounded-full border-2 border-[var(--bg-color)]"
                      >
                        {""}
                      </Badge>
                    }
                  />
                  <Avatar
                    shape="square"
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1"
                    badge={
                      <Badge
                        variant="warning"
                        size="small"
                        className="h-2.5 w-2.5 p-0 rounded-full border-2 border-[var(--bg-color)]"
                      >
                        {""}
                      </Badge>
                    }
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Inputs Section */}
          <section
            className="rounded-xl p-6 shadow-lg ring-1 ring-[var(--ring-color)] transition-all duration-300 hover:shadow-xl"
            style={sectionStyles}
          >
            <div className="mb-6">
              <Typography variant="h4" weight="bold" className="mb-2">
                Input Fields
              </Typography>
              <Typography variant="body2" style={mutedColor}>
                Form inputs with validation and different states
              </Typography>
            </div>

            <div className="space-y-6">
              <div>
                <Typography
                  variant="subtitle2"
                  weight="semibold"
                  className="mb-3"
                  style={mutedColor}
                >
                  Basic Input
                </Typography>
                <Input
                  label="Username"
                  placeholder="Enter your username"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                {inputValue && (
                  <Typography
                    variant="caption"
                    className="mt-2"
                    style={mutedColor}
                  >
                    Current value:{" "}
                    <code
                      className="px-1 py-0.5 rounded"
                      style={{ backgroundColor: theme.neutral[100] }}
                    >
                      {inputValue}
                    </code>
                  </Typography>
                )}
              </div>

              <div>
                <Typography
                  variant="subtitle2"
                  weight="semibold"
                  className="mb-3"
                  style={mutedColor}
                >
                  With Validation
                </Typography>
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={validateEmail}
                  error={emailError}
                />
              </div>

              <div>
                <Typography
                  variant="subtitle2"
                  weight="semibold"
                  className="mb-3"
                  style={mutedColor}
                >
                  Password Input
                </Typography>
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <Typography
                  variant="subtitle2"
                  weight="semibold"
                  className="mb-3"
                  style={mutedColor}
                >
                  Disabled State
                </Typography>
                <Input
                  label="Disabled Input"
                  placeholder="Cannot edit this"
                  disabled
                  value="This field is disabled"
                />
              </div>

              <div>
                <Typography
                  variant="subtitle2"
                  weight="semibold"
                  className="mb-3"
                  style={mutedColor}
                >
                  Error State
                </Typography>
                <Input
                  label="Error Example"
                  placeholder="This has an error"
                  error="This field is required"
                />
              </div>
            </div>
          </section>

          {/* Accordion Section */}
          <section
            className="rounded-xl p-6 shadow-lg ring-1 ring-[var(--ring-color)] transition-all duration-300 hover:shadow-xl"
            style={sectionStyles}
          >
            <div className="mb-6">
              <Typography variant="h4" weight="bold" className="mb-2">
                Accordion
              </Typography>
              <Typography variant="body2" style={mutedColor}>
                Expandable content sections using native details/summary
              </Typography>
            </div>

            <div className="space-y-3">
              <Accordion
                title={<Typography variant="h6">Getting Started</Typography>}
                subtitle="Installation guide"
              >
                Install the package using npm or yarn, then import the
                components you need. Each component is fully typed and supports
                theming out of the box.
              </Accordion>
              <Accordion
                title="Theming"
                subtitle="Light & dark mode support"
                isDefaultOpen
              >
                Wrap your app in a ThemeProvider and use the useTheme hook to
                access theme tokens. Toggle between light and dark themes with a
                single function call.
              </Accordion>
              <Accordion
                title="Accessibility"
                subtitle="Built-in a11y features"
              >
                All components follow WAI-ARIA guidelines. This accordion uses
                native HTML details/summary elements for built-in keyboard
                navigation and screen reader support.
              </Accordion>
              <Accordion title="Disabled Example" isDisabled>
                You should not be able to see this content.
              </Accordion>
            </div>
          </section>

          {/* Modal Section */}
          <section
            className="rounded-xl p-6 shadow-lg ring-1 ring-[var(--ring-color)] transition-all duration-300 hover:shadow-xl"
            style={sectionStyles}
          >
            <div className="mb-6">
              <Typography variant="h4" weight="bold" className="mb-2">
                Modals & Dialogs
              </Typography>
              <Typography variant="body2" style={mutedColor}>
                Accessible modal dialogs with overlay
              </Typography>
            </div>
            <div className="space-y-4">
              <Button onClick={() => setIsModalOpen(true)}>
                Open Confirmation Modal
              </Button>
            </div>
          </section>

          {/* Typography Section */}
          <section
            className="rounded-xl p-6 shadow-lg ring-1 ring-[var(--ring-color)] transition-all duration-300 hover:shadow-xl"
            style={sectionStyles}
          >
            <div className="mb-6">
              <Typography variant="h4" weight="bold" className="mb-2">
                Typography Scale
              </Typography>
              <Typography variant="body2" style={mutedColor}>
                All available typography variants
              </Typography>
            </div>
            <div className="space-y-4">
              <Typography variant="display1" isLoading>
                Display 1
              </Typography>
              <Typography variant="display2">Display 2</Typography>
              <Typography variant="h1">Heading 1</Typography>
              <Typography variant="h2">Heading 2</Typography>
              <Typography variant="h3">Heading 3</Typography>
              <Typography variant="h4">Heading 4</Typography>
              <Typography variant="h5">Heading 5</Typography>
              <Typography variant="h6">Heading 6</Typography>
              <Typography variant="subtitle1">Subtitle 1</Typography>
              <Typography variant="subtitle2">Subtitle 2</Typography>
              <Typography variant="body1">
                Body 1 - Regular paragraph text
              </Typography>
              <Typography variant="body2">
                Body 2 - Smaller paragraph text
              </Typography>
              <Typography variant="caption">Caption text</Typography>
            </div>
          </section>

          {/* Form Example */}
          <section
            className="rounded-xl p-6 shadow-lg ring-1 ring-[var(--ring-color)] transition-all duration-300 hover:shadow-xl lg:col-span-2"
            style={sectionStyles}
          >
            <div className="mb-6">
              <Typography variant="h4" weight="bold" className="mb-2">
                Complete Form Example
              </Typography>
              <Typography variant="body2" style={mutedColor}>
                Combining multiple components together
              </Typography>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Form submitted", { email, password });
                setIsModalOpen(true);
              }}
              className="space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="First Name" placeholder="John" required />
                <Input label="Last Name" placeholder="Doe" isLoading required />
              </div>
              <Input
                label="Email"
                type="email"
                placeholder="john.doe@example.com"
                value={email}
                onChange={handleEmailChange}
                error={emailError}
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="flex gap-2 pt-2">
                <Button type="submit">Submit Form</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEmail("");
                    setPassword("");
                    setEmailError("");
                  }}
                >
                  Reset
                </Button>
              </div>
            </form>
          </section>
        </div>
      </main>

      {/* Skeleton Section */}
      <section
        className="rounded-xl p-6 shadow-lg ring-1 ring-[var(--ring-color)] transition-all duration-300 hover:shadow-xl lg:col-span-2 mt-6"
        style={sectionStyles}
      >
        <div className="mb-6">
          <Typography variant="h4" weight="bold" className="mb-2">
            Skeleton Placeholders
          </Typography>
          <Typography variant="body2" style={mutedColor}>
            Simplified loading placeholders for various content shapes
          </Typography>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          {/* Shapes */}
          <div className="space-y-4">
            <Typography
              variant="subtitle2"
              weight="semibold"
              style={mutedColor}
            >
              Shapes
            </Typography>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Skeleton variant="circular" width={48} height={48} />
                <div className="space-y-2 flex-1">
                  <Skeleton width="60%" height={16} />
                  <Skeleton width="40%" height={12} />
                </div>
              </div>
              <Skeleton variant="rectangular" width="100%" height={100} />
              <Skeleton variant="rounded" width="100%" height={40} />
            </div>
          </div>

          {/* Animations */}
          <div className="space-y-4">
            <Typography
              variant="subtitle2"
              weight="semibold"
              style={mutedColor}
            >
              Animations
            </Typography>
            <div className="space-y-4">
              <div className="space-y-1">
                <Typography variant="caption" style={mutedColor}>
                  Wave (Default)
                </Typography>
                <Skeleton animation="wave" width="100%" height={24} />
              </div>
              <div className="space-y-1">
                <Typography variant="caption" style={mutedColor}>
                  Pulse
                </Typography>
                <Skeleton animation="pulse" width="100%" height={24} />
              </div>
              <div className="space-y-1">
                <Typography variant="caption" style={mutedColor}>
                  None
                </Typography>
                <Skeleton animation="none" width="100%" height={24} />
              </div>
            </div>
          </div>

          {/* Custom Size */}
          <div className="space-y-4">
            <Typography
              variant="subtitle2"
              weight="semibold"
              style={mutedColor}
            >
              Typography Variants
            </Typography>
            <div className="space-y-3">
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="90%" />
              <Skeleton variant="text" width="80%" />
            </div>
          </div>
        </div>

        {/* Real Data Simulation */}
        <div
          className="mt-12 pt-8 border-t"
          style={{ borderColor: theme.tokens.border }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <Typography variant="h5" weight="bold">
                Real Data simulation
              </Typography>
              <Typography variant="body2" style={mutedColor}>
                Toggle to see how skeletons transition to real content
              </Typography>
            </div>
            <Button
              onClick={() => setIsSimulatingData(!isSimulatingData)}
              variant={isSimulatingData ? "outline" : "primary"}
            >
              {isSimulatingData ? "Load Data" : "Show Skeletons"}
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-4 rounded-lg border shadow-sm"
                style={{
                  borderColor: theme.tokens.border,
                  backgroundColor: theme.tokens.background,
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  {isSimulatingData ? (
                    <Skeleton variant="circular" width={48} height={48} />
                  ) : (
                    <Avatar
                      src={`https://i.pravatar.cc/150?u=${i + 10}`}
                      alt={`User ${i}`}
                    />
                  )}
                  <div className="space-y-2 flex-1">
                    {isSimulatingData ? (
                      <>
                        <Skeleton width="60%" height={16} />
                        <Skeleton width="40%" height={12} />
                      </>
                    ) : (
                      <>
                        <Typography variant="subtitle2" weight="bold">
                          {
                            ["Alice Freeman", "Bob Smith", "Charlie Davis"][
                              i - 1
                            ]
                          }
                        </Typography>
                        <Typography variant="caption" style={mutedColor}>
                          {
                            [
                              "Senior Designer",
                              "Software Engineer",
                              "Product Manager",
                            ][i - 1]
                          }
                        </Typography>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  {isSimulatingData ? (
                    <div className="space-y-2">
                      <Skeleton variant="text" width="100%" />
                      <Skeleton variant="text" width="90%" />
                      <Skeleton variant="text" width="80%" />
                    </div>
                  ) : (
                    <Typography
                      variant="body2"
                      style={{ color: theme.tokens.foreground }}
                    >
                      {
                        [
                          "Creative designer with a passion for building beautiful UI components.",
                          "Backend developer focused on scalable architecture and performance.",
                          "Strategic thinker driving product vision and execution.",
                        ][i - 1]
                      }
                    </Typography>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Checkbox Section */}
      <section
        className="rounded-xl p-6 shadow-lg ring-1 ring-[var(--ring-color)] transition-all duration-300 hover:shadow-xl lg:col-span-2 mt-6 overflow-hidden"
        style={sectionStyles}
      >
        <div className="mb-8">
          <Typography variant="h4" weight="bold" className="mb-2">
            Checkboxes
          </Typography>
          <Typography variant="body2" style={mutedColor}>
            Selection controls with support for labels, descriptions, and
            interactive indeterminate states
          </Typography>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Interactive Playground */}
          <div
            className="lg:col-span-1 border rounded-2xl overflow-hidden shadow-sm flex flex-col"
            style={{
              backgroundColor: theme.tokens.background,
              borderColor: theme.tokens.border,
            }}
          >
            <div
              className="p-4 border-b"
              style={{
                backgroundColor: theme.tokens.surface,
                borderBottomColor: theme.tokens.border,
              }}
            >
              <Checkbox
                label="Select All Items"
                id="pg-select-all"
                checked={allChecked}
                indeterminate={isIndeterminate}
                onChange={handleToggleAll}
                className="font-semibold"
              />
            </div>
            <div className="p-4 space-y-4 flex-1">
              <Checkbox
                label="Option One"
                description="This is the first primary selection."
                id="pg-item-1"
                checked={checkedItems.item1}
                onChange={handleToggleItem("item1")}
              />
              <Checkbox
                label="Option Two"
                description="Secondary selection for processing."
                id="pg-item-2"
                checked={checkedItems.item2}
                onChange={handleToggleItem("item2")}
              />
              <Checkbox
                label="Option Three"
                description="Final confirmation item."
                id="pg-item-3"
                checked={checkedItems.item3}
                onChange={handleToggleItem("item3")}
              />
            </div>
          </div>

          {/* Sizes & States */}
          <div className="lg:col-span-2 grid gap-8 sm:grid-cols-2">
            <div className="space-y-6">
              <div>
                <Typography
                  variant="subtitle2"
                  weight="semibold"
                  style={mutedColor}
                  className="mb-4"
                >
                  Available Sizes
                </Typography>
                <div className="flex flex-wrap gap-6 items-end">
                  <div className="flex flex-col items-center gap-2">
                    <Checkbox size="small" label="Small" id="size-sm" />
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Checkbox size="medium" label="Medium" id="size-md" />
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Checkbox size="large" label="Large" id="size-lg" />
                  </div>
                </div>
              </div>

              <div>
                <Typography
                  variant="subtitle2"
                  weight="semibold"
                  style={mutedColor}
                  className="mb-4"
                >
                  Visual Feedback
                </Typography>
                <div className="space-y-3">
                  <Checkbox
                    label="Error State"
                    error
                    description="This selection is required"
                    id="state-err"
                  />
                  <Checkbox
                    label="Loading State"
                    loading
                    description="Synchronizing data..."
                    id="state-load"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Typography
                variant="subtitle2"
                weight="semibold"
                style={mutedColor}
                className="mb-4"
              >
                Native States
              </Typography>
              <div className="grid grid-cols-2 gap-4">
                <Checkbox label="Idle" id="native-idle" />
                <Checkbox label="Checked" defaultChecked id="native-checked" />
                <Checkbox label="Disabled" disabled id="native-disabled" />
                <Checkbox
                  label="Disabled Checked"
                  disabled
                  defaultChecked
                  id="native-disabled-checked"
                />
              </div>
              <div className="pt-2">
                <Typography variant="body2" style={mutedColor}>
                  Combine labels, descriptions, and icons to create clear and
                  actionable interfaces.
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RadioGroup Section */}
      <section
        className="rounded-xl p-6 shadow-lg ring-1 ring-[var(--ring-color)] transition-all duration-300 hover:shadow-xl lg:col-span-2 mt-6 overflow-hidden"
        style={sectionStyles}
      >
        <div className="mb-8">
          <Typography variant="h4" weight="bold" className="mb-2">
            Radio Groups
          </Typography>
          <Typography variant="body2" style={mutedColor}>
            Single selection controls with support for horizontal/vertical
            layouts, descriptions, and validation.
          </Typography>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Basic & Orientations */}
          <div className="space-y-6">
            <div
              className="p-6 border rounded-2xl shadow-sm"
              style={{
                backgroundColor: theme.tokens.background,
                borderColor: theme.tokens.border,
              }}
            >
              <Typography variant="subtitle2" weight="bold" className="mb-4">
                Vertical Layout (Default)
              </Typography>
              <RadioGroup
                name="basic-vertical"
                label="Select an option"
                value={radioValue}
                onChange={setRadioValue}
                options={[
                  {
                    id: "opt-1",
                    value: "option-1",
                    label: "Option One",
                    description: "First detailed choice",
                  },
                  {
                    id: "opt-2",
                    value: "option-2",
                    label: "Option Two",
                    description: "Second detailed choice",
                  },
                  {
                    id: "opt-3",
                    value: "option-3",
                    label: "Option Three",
                    disabled: true,
                  },
                ]}
              />
              <Typography
                variant="caption"
                style={mutedColor}
                className="mt-4 block"
              >
                Selected:{" "}
                <strong style={{ color: theme.tokens.foreground }}>
                  {radioValue}
                </strong>
              </Typography>
            </div>

            <div
              className="p-6 border rounded-2xl shadow-sm"
              style={{
                backgroundColor: theme.tokens.background,
                borderColor: theme.tokens.border,
              }}
            >
              <Typography variant="subtitle2" weight="bold" className="mb-4">
                Horizontal Layout
              </Typography>
              <RadioGroup
                name="basic-horizontal"
                orientation="horizontal"
                defaultValue="apple"
                options={[
                  { id: "h-opt-1", value: "apple", label: "Apple" },
                  { id: "h-opt-2", value: "banana", label: "Banana" },
                  { id: "h-opt-3", value: "cherry", label: "Cherry" },
                ]}
              />
            </div>
          </div>

          {/* Validation & States */}
          <div className="space-y-6">
            <div
              className="p-6 border rounded-2xl shadow-sm"
              style={{
                backgroundColor: theme.tokens.background,
                borderColor: theme.tokens.border,
              }}
            >
              <Typography variant="subtitle2" weight="bold" className="mb-4">
                Validation & States
              </Typography>
              <div className="space-y-6">
                <RadioGroup
                  name="error-state"
                  label="Required Selection"
                  error="Please select an option to continue."
                  required
                  options={[
                    { id: "err-1", value: "yes", label: "Yes" },
                    { id: "err-2", value: "no", label: "No" },
                  ]}
                />

                <RadioGroup
                  name="disabled-state"
                  label="Disabled Group"
                  value="selected"
                  disabled
                  options={[
                    {
                      id: "dis-1",
                      value: "selected",
                      label: "Selected Option",
                    },
                    {
                      id: "dis-2",
                      value: "unselected",
                      label: "Unselected Option",
                    },
                  ]}
                />
              </div>
            </div>

            <div
              className="p-6 border rounded-2xl shadow-sm"
              style={{
                backgroundColor: theme.tokens.background,
                borderColor: theme.tokens.border,
              }}
            >
              <Typography variant="subtitle2" weight="bold" className="mb-4">
                Sizes
              </Typography>
              <div className="space-y-4">
                <RadioGroup
                  name="size-sm"
                  orientation="horizontal"
                  size="small"
                  defaultValue="1"
                  options={[
                    { id: "sm-1", value: "1", label: "Small" },
                    { id: "sm-2", value: "2", label: "Small" },
                  ]}
                />
                <RadioGroup
                  name="size-md"
                  orientation="horizontal"
                  size="medium"
                  defaultValue="1"
                  options={[
                    { id: "md-1", value: "1", label: "Medium" },
                    { id: "md-2", value: "2", label: "Medium" },
                  ]}
                />
                <RadioGroup
                  name="size-lg"
                  orientation="horizontal"
                  size="large"
                  defaultValue="1"
                  options={[
                    { id: "lg-1", value: "1", label: "Large" },
                    { id: "lg-2", value: "2", label: "Large" },
                  ]}
                />
              </div>
            </div>
          </div>
          {/* Card Variant */}
          <div className="lg:col-span-2 space-y-6">
            <div
              className="p-6 border rounded-2xl shadow-sm"
              style={{
                backgroundColor: theme.tokens.background,
                borderColor: theme.tokens.border,
              }}
            >
              <Typography variant="subtitle2" weight="bold" className="mb-4">
                Card Variant (New)
              </Typography>
              <div className="grid gap-6 md:grid-cols-2">
                <RadioGroup
                  name="card-vertical"
                  label="Plan Selection"
                  variant="card"
                  defaultValue="pro"
                  options={[
                    {
                      id: "p-1",
                      value: "basic",
                      label: "Basic Plan",
                      description: "Essential features for individuals",
                    },
                    {
                      id: "p-2",
                      value: "pro",
                      label: "Pro Plan",
                      description: "Advanced tools for professionals",
                    },
                    {
                      id: "p-3",
                      value: "enterprise",
                      label: "Enterprise",
                      description: "Full power for large teams",
                      disabled: true,
                    },
                  ]}
                />
                <RadioGroup
                  name="card-horizontal"
                  label="Payment Method"
                  variant="card"
                  orientation="horizontal"
                  defaultValue="card"
                  options={[
                    { id: "pm-1", value: "card", label: "Credit Card" },
                    { id: "pm-2", value: "paypal", label: "PayPal" },
                    {
                      id: "pm-3",
                      value: "apple",
                      label: (
                        <div className="flex items-center gap-2">
                          React Pay
                          <img
                            src={reactLogo}
                            className="w-5 h-5"
                            alt="React"
                          />
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Switch Section */}
      <section
        className="rounded-xl p-6 shadow-lg ring-1 ring-[var(--ring-color)] transition-all duration-300 hover:shadow-xl lg:col-span-2 mt-6 overflow-hidden"
        style={sectionStyles}
      >
        <div className="mb-8">
          <Typography variant="h4" weight="bold" className="mb-2">
            Switches
          </Typography>
          <Typography variant="body2" style={mutedColor}>
            Binary toggle controls with support for labels, loading states, and
            different sizes.
          </Typography>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Basic Usage */}
          <div className="space-y-6">
            <div
              className="p-6 border rounded-2xl shadow-sm"
              style={{
                backgroundColor: theme.tokens.background,
                borderColor: theme.tokens.border,
              }}
            >
              <Typography variant="subtitle2" weight="bold" className="mb-4">
                Interactive State
              </Typography>
              <div className="space-y-4">
                <Switch
                  label={`Interactive: ${switchState ? "On" : "Off"}`}
                  checked={switchState}
                  onChange={setSwitchState}
                />
                <Switch label="Default Toggle" />
                <Switch label="Disabled" disabled />
                <Switch label="Disabled Checked" disabled checked />
              </div>
            </div>
          </div>

          {/* Sizes & States */}
          <div className="space-y-6">
            <div
              className="p-6 border rounded-2xl shadow-sm"
              style={{
                backgroundColor: theme.tokens.background,
                borderColor: theme.tokens.border,
              }}
            >
              <Typography variant="subtitle2" weight="bold" className="mb-4">
                Sizes & States
              </Typography>
              <div className="flex flex-wrap gap-6 items-center mb-6">
                <Switch size="small" label="Small" />
                <Switch size="medium" label="Medium" />
                <Switch size="large" label="Large" />
              </div>
              <div className="space-y-4">
                <Switch label="Loading State" isLoading />
                <Switch label="Error State" error="Selection required" />
              </div>
            </div>
          </div>
        </div>

        {/* Labels & Descriptions */}
        <div
          className="mt-8 pt-8 border-t"
          style={{ borderColor: theme.tokens.border }}
        >
          <Typography variant="subtitle2" weight="bold" className="mb-4">
            Labels & Descriptions
          </Typography>
          <div className="grid gap-6 md:grid-cols-3">
            <Switch
              label="Email Notifications"
              description="Receive daily summaries of your account activity."
            />
            <Switch
              label="Public Profile"
              description="Allow others to see your profile information and activity."
            />
            <Switch
              label="Dark Mode"
              helperText="Adjust the application appearance to reduce eye strain."
              size="large"
            />
          </div>
        </div>
      </section>

      {/* ScrollArea Section */}
      <section
        className="rounded-xl p-6 shadow-lg ring-1 ring-[var(--ring-color)] transition-all duration-300 hover:shadow-xl lg:col-span-2 mt-6 overflow-hidden"
        style={sectionStyles}
      >
        <div className="mb-8">
          <Typography variant="h4" weight="bold" className="mb-2">
            Scroll Area
          </Typography>
          <Typography variant="body2" style={mutedColor}>
            Customizable scrolling container with support for custom scrollbars
            and visibility controls
          </Typography>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Vertical Scroll */}
          <div className="space-y-4">
            <Typography
              variant="subtitle2"
              weight="semibold"
              style={mutedColor}
            >
              Vertical Scrolling
            </Typography>
            <div
              className="border rounded-xl overflow-hidden shadow-sm"
              style={{
                backgroundColor: theme.tokens.background,
                borderColor: theme.tokens.border,
              }}
            >
              <ScrollArea className="h-[300px]" style={{ padding: "16px" }}>
                <div className="space-y-4 pr-4">
                  {[...Array(12)].map((_, i) => (
                    <ScrollElement
                      key={i}
                      className="p-4 rounded-lg border transition-colors"
                      style={{
                        backgroundColor: theme.tokens.surface,
                        borderColor: theme.tokens.border,
                      }}
                    >
                      <Typography variant="subtitle2" weight="bold">
                        Scroll Item {i + 1}
                      </Typography>
                      <Typography variant="body2" style={mutedColor}>
                        This is a sample item inside the vertical scroll area.
                        It demonstrates how the container handles overflowing
                        vertical content.
                      </Typography>
                    </ScrollElement>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Horizontal Scroll */}
          <div className="space-y-4">
            <Typography
              variant="subtitle2"
              weight="semibold"
              style={mutedColor}
            >
              Horizontal Scrolling
            </Typography>
            <div
              className="border rounded-xl overflow-hidden shadow-sm"
              style={{
                backgroundColor: theme.tokens.background,
                borderColor: theme.tokens.border,
              }}
            >
              <ScrollArea className="w-full" style={{ padding: "16px" }}>
                <div className="flex gap-4 pb-4">
                  {[...Array(8)].map((_, i) => (
                    <ScrollElement
                      key={i}
                      className="min-w-[240px] p-4 rounded-lg border"
                      style={{
                        backgroundColor: theme.tokens.surface,
                        borderColor: theme.tokens.border,
                      }}
                    >
                      <div
                        className="h-32 mb-4 rounded-md flex items-center justify-center font-bold text-xl"
                        style={{
                          backgroundColor: theme.palette.primary[200],
                          color: theme.palette.primary[900],
                        }}
                      >
                        #{i + 1}
                      </div>
                      <Typography variant="subtitle2" weight="bold">
                        Horizontal Item {i + 1}
                      </Typography>
                      <Typography variant="body2" style={mutedColor}>
                        This card scrolls horizontally.
                      </Typography>
                    </ScrollElement>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </section>

      {/* Popover Section */}
      <section
        className="rounded-xl p-6 shadow-lg ring-1 ring-[var(--ring-color)] transition-all duration-300 hover:shadow-xl lg:col-span-2 mt-6"
        style={sectionStyles}
      >
        <div className="mb-8">
          <Typography variant="h4" weight="bold" className="mb-2">
            Popover
          </Typography>
          <Typography variant="body2" style={mutedColor}>
            Smart, accessible floating popovers powered by @floating-ui/react.
          </Typography>
        </div>

        <div className="flex flex-wrap gap-6 items-center">
          <Popover
            placement="bottom"
            className="z-50 outline-none focus:outline-none"
            content={
              <div
                className="p-4 rounded-xl shadow-xl border w-64 space-y-2"
                style={{
                  backgroundColor: theme.tokens.surface,
                  borderColor: theme.tokens.border,
                }}
              >
                <Typography variant="subtitle2" weight="bold">
                  Interactive Popover
                </Typography>
                <Typography variant="body2" style={mutedColor}>
                  This popover handles clicks naturally. Notice how focus is
                  trapped correctly.
                </Typography>
                <div className="pt-2">
                  <Button size="sm" className="w-full">
                    Acknowledge
                  </Button>
                </div>
              </div>
            }
          >
            <Button variant="primary">Open Dialog Popover</Button>
          </Popover>

          <Popover
            placement="top"
            className="z-50 outline-none focus:outline-none"
            content={
              <div
                className="p-3 rounded-lg shadow-xl border w-48"
                style={{
                  backgroundColor: theme.tokens.surface,
                  borderColor: theme.tokens.border,
                }}
              >
                <Typography variant="body2" weight="medium">
                  Aligned Top
                </Typography>
                <Typography variant="caption" style={mutedColor}>
                  Fades and shifts if screen is too small.
                </Typography>
              </div>
            }
          >
            <Button variant="outline">Top Info</Button>
          </Popover>
        </div>

        <div
          className="mt-8 border-t pt-8"
          style={{ borderColor: theme.tokens.border }}
        >
          <Typography variant="subtitle2" weight="bold" className="mb-4">
            Real-World Use Cases
          </Typography>

          <div className="flex flex-wrap gap-12 mt-6">
            {/* Real Case 1: Profile Menu */}
            <div className="flex flex-col items-center gap-4">
              <Typography variant="caption" style={mutedColor}>
                Profile Menu
              </Typography>
              <Popover
                placement="bottom-start"
                offset={10}
                className="z-50 outline-none focus:outline-none"
                content={
                  <div
                    className="p-2 shadow-xl rounded-xl border w-56 flex flex-col gap-1 pointer-events-auto"
                    style={{
                      backgroundColor: theme.tokens.surface,
                      borderColor: theme.tokens.border,
                    }}
                  >
                    <div
                      className="p-3 border-b mb-1"
                      style={{ borderColor: theme.tokens.border }}
                    >
                      <Typography variant="subtitle2" weight="bold">
                        John Doe
                      </Typography>
                      <Typography variant="caption" style={mutedColor}>
                        john.doe@enterprise.com
                      </Typography>
                    </div>
                    <button
                      className="text-left font-medium w-full px-3 py-2 text-sm rounded-md transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                      style={{ color: theme.tokens.foreground }}
                    >
                      Account Settings
                    </button>
                    <button
                      className="text-left font-medium w-full px-3 py-2 text-sm rounded-md transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                      style={{ color: theme.tokens.foreground }}
                    >
                      Billing & Teams
                    </button>
                    <button
                      className="text-left font-medium w-full px-3 py-2 text-sm rounded-md transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                      style={{ color: theme.tokens.foreground }}
                    >
                      Help & Support
                    </button>
                    <div
                      className="border-t my-1"
                      style={{ borderColor: theme.tokens.border }}
                    />
                    <button className="text-left font-medium w-full px-3 py-2 text-sm rounded-md transition-colors text-red-500 hover:bg-red-500/10 hover:text-red-600">
                      Sign Out
                    </button>
                  </div>
                }
              >
                <div className="cursor-pointer hover:ring-2 ring-[var(--ring-color)] ring-offset-2 rounded-full transition-all">
                  <Avatar
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="John Doe"
                    size="medium"
                  />
                </div>
              </Popover>
            </div>

            {/* Real Case 2: Advanced Filter */}
            <div className="flex flex-col items-center gap-4">
              <Typography variant="caption" style={mutedColor}>
                Advanced Filter / Settings
              </Typography>
              <Popover
                placement="bottom-start"
                className="z-50 outline-none focus:outline-none"
                content={
                  <div
                    className="p-5 shadow-xl rounded-xl border w-80 space-y-4 pointer-events-auto"
                    style={{
                      backgroundColor: theme.tokens.surface,
                      borderColor: theme.tokens.border,
                    }}
                  >
                    <div>
                      <Typography variant="subtitle2" weight="bold">
                        Dimensions Configuration
                      </Typography>
                      <Typography variant="caption" style={mutedColor}>
                        Set properties for the current view.
                      </Typography>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Width" defaultValue="100%" inputSize="sm" />
                      <Input
                        label="Max. width"
                        defaultValue="300px"
                        inputSize="sm"
                      />
                      <Input
                        label="Height"
                        defaultValue="25px"
                        inputSize="sm"
                      />
                      <Input
                        label="Max. height"
                        defaultValue="none"
                        inputSize="sm"
                      />
                    </div>

                    <div
                      className="border-t pt-4 mt-2 flex gap-2 justify-end"
                      style={{ borderColor: theme.tokens.border }}
                    >
                      <Button variant="ghost" size="sm">
                        Reset
                      </Button>
                      <Button size="sm">Apply Filters</Button>
                    </div>
                  </div>
                }
              >
                <Button variant="outline">
                  Dimensions{" "}
                  <Badge
                    variant="primary"
                    size="small"
                    className="ml-2 w-5 h-5 flex items-center justify-center rounded-full p-0"
                  >
                    3
                  </Badge>
                </Button>
              </Popover>
            </div>

            {/* Real Case 3: Interactive Info Card */}
            <div className="flex flex-col items-center gap-4">
              <Typography variant="caption" style={mutedColor}>
                System Info Tooltip
              </Typography>
              <Popover
                placement="top"
                className="z-50 outline-none focus:outline-none"
                content={
                  <div
                    className="p-4 shadow-xl rounded-xl border w-72 flex gap-4 pointer-events-auto"
                    style={{
                      backgroundColor: theme.tokens.surface,
                      borderColor: theme.tokens.border,
                    }}
                  >
                    <div className="flex-shrink-0 pt-0.5">
                      <div className="w-4 h-4 rounded-full bg-green-500 ring-4 ring-green-500/20"></div>
                    </div>
                    <div className="flex-1">
                      <Typography
                        variant="subtitle2"
                        weight="bold"
                        className="mb-1 block"
                      >
                        Systems Operational
                      </Typography>
                      <Typography
                        variant="caption"
                        style={mutedColor}
                        className="block mb-2"
                      >
                        All database clusters and API endpoints are currently
                        reporting 100% uptime in the US-East region.
                      </Typography>
                      <a
                        href="#"
                        className="text-sm font-semibold hover:underline"
                        style={{ color: theme.tokens.ring }}
                      >
                        View Detailed Status →
                      </a>
                    </div>
                  </div>
                }
              >
                <button className="w-6 h-6 rounded-full border border-[var(--ring-color)] text-[var(--ring-color)] flex items-center justify-center hover:bg-[var(--ring-color)] hover:text-white transition-colors cursor-pointer text-xs font-bold">
                  i
                </button>
              </Popover>
            </div>
          </div>
        </div>
      </section>

      {/* Dropdown Section */}
      <section
        className="rounded-xl p-6 shadow-lg ring-1 ring-[var(--ring-color)] transition-all duration-300 hover:shadow-xl"
        style={sectionStyles}
      >
        <div className="mb-6 text-center lg:text-left">
          <Typography variant="h4" weight="bold" className="mb-2">
            Dropdown Menus
          </Typography>
          <Typography variant="body2" style={mutedColor}>
            Highly accessible, themeable select menus with support for labels,
            validation, and loading states.
          </Typography>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Column 1: Configurable Examples */}
          <div className="space-y-8">
            <div>
              <Typography
                variant="subtitle2"
                weight="bold"
                className="mb-4 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-primary-500"></span>
                Basic Usage
              </Typography>
              <div className="p-4 rounded-xl border border-dashed border-gray-300 bg-gray-50/50">
                <Dropdown
                  label="Select Framework"
                  required
                  options={[
                    { label: "React", value: "react" },
                    { label: "Vue", value: "vue" },
                    { label: "Svelte", value: "svelte" },
                    { label: "Angular", value: "angular", disabled: true },
                  ]}
                  selectedValue={dropdownValue}
                  onChange={(val: string) => setDropdownValue(val)}
                />
                {dropdownValue && (
                  <Typography
                    variant="caption"
                    className="mt-3 block text-primary-600 font-medium"
                  >
                    Output: {dropdownValue}
                  </Typography>
                )}
              </div>
            </div>

            <div>
              <Typography
                variant="subtitle2"
                weight="bold"
                className="mb-4 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                Validation & Error States
              </Typography>
              <div className="space-y-4">
                <Dropdown
                  label="Shipping Method"
                  error="Please select a carrier to continue"
                  options={[
                    { label: "FedEx Express", value: "fedex" },
                    { label: "UPS Ground", value: "ups" },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Column 2: Visual Variations */}
          <div className="space-y-8">
            <div>
              <Typography
                variant="subtitle2"
                weight="bold"
                className="mb-4 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Sizes & Loading
              </Typography>
              <div className="flex flex-col gap-4">
                <div className="flex items-end gap-3 flex-wrap">
                  <div className="w-24">
                    <Dropdown
                      size="sm"
                      label="Small"
                      options={[]}
                      selectedValue="sm"
                    />
                  </div>
                  <div className="w-32">
                    <Dropdown
                      size="md"
                      label="Medium"
                      options={[]}
                      selectedValue="md"
                    />
                  </div>
                  <div className="w-40">
                    <Dropdown
                      size="lg"
                      label="Large"
                      options={[]}
                      selectedValue="lg"
                    />
                  </div>
                </div>
                <div className="max-w-xs">
                  <Dropdown isLoading label="Fetching data..." options={[]} />
                </div>
              </div>
            </div>

            <div>
              <Typography
                variant="subtitle2"
                weight="bold"
                className="mb-4 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                Disabled States
              </Typography>
              <div className="max-w-xs opacity-80">
                <Dropdown
                  disabled
                  label="Configuration (Locked)"
                  options={[]}
                  selectedValue="production"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirmation Dialog"
      >
        <div className="space-y-4">
          <Typography variant="body1">
            This is an example modal dialog. It demonstrates how the modal
            component works with the current theme.
          </Typography>
          <div
            className="p-4 rounded-lg border"
            style={{
              backgroundColor: theme.tokens.infoSurface,
              borderColor: theme.tokens.border,
            }}
          >
            <Typography
              variant="body2"
              style={
                {
                  "--typography-color": theme.tokens.infoForeground,
                } as React.CSSProperties
              }
            >
              💡 <strong>Pro tip:</strong> Modals automatically trap focus and
              can be closed by clicking outside or pressing the Escape key.
            </Typography>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                console.log("Confirmed!");
                setIsModalOpen(false);
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

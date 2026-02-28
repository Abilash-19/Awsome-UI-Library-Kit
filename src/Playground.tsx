import { useState } from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Typography } from "@/components/Typography";
import { Accordion } from "@/components/Accordion";
import { useTheme } from "@/theme";
import { Badge } from "./components/Badge";
import { Avatar } from "@/components/Avatar";
import { Skeleton } from "@/components/Skeleton";
import Checkbox from "@/components/Checkbox";

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

export default function Playground() {
  const { theme } = useTheme();
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 lg:grid-cols-2">
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
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
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

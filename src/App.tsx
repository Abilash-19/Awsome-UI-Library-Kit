import { useState } from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Typography } from "@/components/Typography";
import { ThemeProvider } from "@/theme";
import { useTheme } from "@/theme";
import "@/theme/index.css";

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

function PlaygroundContent() {
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

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: theme.tokens.background,
        color: theme.tokens.foreground,
      }}
    >
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
              <Typography
                variant="body2"
                style={
                  {
                    "--typography-color": theme.tokens.foregroundMuted,
                  } as React.CSSProperties
                }
                className="mt-1"
              >
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
              <Typography
                variant="body2"
                style={
                  {
                    "--typography-color": theme.tokens.foregroundMuted,
                  } as React.CSSProperties
                }
              >
                Interactive buttons with multiple variants and states
              </Typography>
            </div>

            <div className="space-y-6">
              <div>
                <Typography
                  variant="subtitle2"
                  weight="semibold"
                  className="mb-3"
                  style={
                    {
                      "--typography-color": theme.tokens.foregroundMuted,
                    } as React.CSSProperties
                  }
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
                  style={
                    {
                      "--typography-color": theme.tokens.foregroundMuted,
                    } as React.CSSProperties
                  }
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
                  style={
                    {
                      "--typography-color": theme.tokens.foregroundMuted,
                    } as React.CSSProperties
                  }
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
                  style={
                    {
                      "--typography-color": theme.tokens.foregroundMuted,
                    } as React.CSSProperties
                  }
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

          {/* Inputs Section */}
          <section
            className="rounded-xl p-6 shadow-lg ring-1 ring-[var(--ring-color)] transition-all duration-300 hover:shadow-xl"
            style={sectionStyles}
          >
            <div className="mb-6">
              <Typography variant="h4" weight="bold" className="mb-2">
                Input Fields
              </Typography>
              <Typography
                variant="body2"
                style={
                  {
                    "--typography-color": theme.tokens.foregroundMuted,
                  } as React.CSSProperties
                }
              >
                Form inputs with validation and different states
              </Typography>
            </div>

            <div className="space-y-6">
              <div>
                <Typography
                  variant="subtitle2"
                  weight="semibold"
                  className="mb-3"
                  style={
                    {
                      "--typography-color": theme.tokens.foregroundMuted,
                    } as React.CSSProperties
                  }
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
                    style={
                      {
                        "--typography-color": theme.tokens.foregroundMuted,
                      } as React.CSSProperties
                    }
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
                  style={
                    {
                      "--typography-color": theme.tokens.foregroundMuted,
                    } as React.CSSProperties
                  }
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
                  style={
                    {
                      "--typography-color": theme.tokens.foregroundMuted,
                    } as React.CSSProperties
                  }
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
                  style={
                    {
                      "--typography-color": theme.tokens.foregroundMuted,
                    } as React.CSSProperties
                  }
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
                  style={
                    {
                      "--typography-color": theme.tokens.foregroundMuted,
                    } as React.CSSProperties
                  }
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

          {/* Modal Section */}
          <section
            className="rounded-xl p-6 shadow-lg ring-1 ring-[var(--ring-color)] transition-all duration-300 hover:shadow-xl"
            style={sectionStyles}
          >
            <div className="mb-6">
              <Typography variant="h4" weight="bold" className="mb-2">
                Modals & Dialogs
              </Typography>
              <Typography
                variant="body2"
                style={
                  {
                    "--typography-color": theme.tokens.foregroundMuted,
                  } as React.CSSProperties
                }
              >
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
              <Typography
                variant="body2"
                style={
                  {
                    "--typography-color": theme.tokens.foregroundMuted,
                  } as React.CSSProperties
                }
              >
                All available typography variants
              </Typography>
            </div>
            <div className="space-y-4">
              <Typography variant="display1">Display 1</Typography>
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
              <Typography
                variant="body2"
                style={
                  {
                    "--typography-color": theme.tokens.foregroundMuted,
                  } as React.CSSProperties
                }
              >
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
                <Input label="Last Name" placeholder="Doe" required />
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

function App() {
  return (
    <ThemeProvider defaultThemeName="light" storageKey="playground-theme">
      <div className="relative">
        <ThemeToggle />
        <PlaygroundContent />
      </div>
    </ThemeProvider>
  );
}

export default App;

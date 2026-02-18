import { useState } from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Typography } from "@/components/Typography";
import { ThemeProvider, darkTheme } from "@/theme";
import { useTheme } from "@/theme";
import "@/theme/index.css";

// Inner component that can access theme conchildren
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

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: theme.colors.semantic.background,
        color: theme.colors.semantic.foreground,
      }}
    >
      {/* Header */}
      <header
        className="border-b sticky top-0 z-10 backdrop-blur-sm"
        style={{
          borderColor: theme.colors.semantic.border,
          backgroundColor: theme.colors.semantic.background,
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
                style={{ color: theme.colors.semantic.mutedForeground }}
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
            className="rounded-xl p-6 shadow-lg ring-1 transition-all duration-300 hover:shadow-xl"
            style={{
              backgroundColor: theme.colors.semantic.background,
            }}
          >
            <div className="mb-6">
              <Typography variant="h4" weight="bold" className="mb-2">
                Buttons
              </Typography>
              <Typography
                variant="body2"
                style={{ color: theme.colors.semantic.mutedForeground }}
              >
                Interactive buttons with multiple variants and states
              </Typography>
            </div>

            <div className="space-y-6">
              {/* Variants */}
              <div>
                <Typography
                  variant="subtitle2"
                  weight="semibold"
                  className="mb-3"
                  style={{ color: theme.colors.semantic.mutedForeground }}
                >
                  Variants
                </Typography>
                <div className="flex flex-wrap gap-2">
                  <Button
                    children="Primary"
                    onClick={() => console.log("Primary")}
                  />
                  <Button variant="secondary" children="Secondary" />
                  <Button variant="outline" children="Outline" />
                  <Button variant="ghost" children="Ghost" />
                  <Button variant="danger" children="Danger" />
                </div>
              </div>

              {/* Sizes */}
              <div>
                <Typography
                  variant="subtitle2"
                  weight="semibold"
                  className="mb-3"
                  style={{ color: theme.colors.semantic.mutedForeground }}
                >
                  Sizes
                </Typography>
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="sm" children="Small" />
                  <Button size="md" children="Medium" />
                  <Button size="lg" children="Large" />
                </div>
              </div>

              {/* States */}
              <div>
                <Typography
                  variant="subtitle2"
                  weight="semibold"
                  className="mb-3"
                  style={{ color: theme.colors.semantic.mutedForeground }}
                >
                  States
                </Typography>
                <div className="flex flex-wrap gap-2">
                  <Button isLoading children="Loading" />
                  <Button disabled children="Disabled" />
                  <Button variant="danger" isLoading />
                </div>
              </div>

              {/* With Actions */}
              <div>
                <Typography
                  variant="subtitle2"
                  weight="semibold"
                  className="mb-3"
                  style={{ color: theme.colors.semantic.mutedForeground }}
                >
                  Interactive Examples
                </Typography>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    children="Open Modal"
                    onClick={() => setIsModalOpen(true)}
                  />
                  <Button
                    variant="secondary"
                    children="Console Log"
                    onClick={() =>
                      console.log("Button clicked!", { inputValue })
                    }
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Inputs Section */}
          <section
            className="rounded-xl p-6 shadow-lg ring-1 transition-all duration-300 hover:shadow-xl"
            style={{
              backgroundColor: theme.colors.semantic.background,
            }}
          >
            <div className="mb-6">
              <Typography variant="h4" weight="bold" className="mb-2">
                Input Fields
              </Typography>
              <Typography
                variant="body2"
                style={{ color: theme.colors.semantic.mutedForeground }}
              >
                Form inputs with validation and different states
              </Typography>
            </div>

            <div className="space-y-6">
              {/* Basic Input */}
              <div>
                <Typography
                  variant="subtitle2"
                  weight="semibold"
                  className="mb-3"
                  style={{ color: theme.colors.semantic.mutedForeground }}
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
                    style={{ color: theme.colors.semantic.mutedForeground }}
                  >
                    Current value:{" "}
                    <code
                      className="px-1 py-0.5 rounded"
                      style={{ backgroundColor: theme.colors.secondary[100] }}
                    >
                      {inputValue}
                    </code>
                  </Typography>
                )}
              </div>

              {/* Email with Validation */}
              <div>
                <Typography
                  variant="subtitle2"
                  weight="semibold"
                  className="mb-3"
                  style={{ color: theme.colors.semantic.mutedForeground }}
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

              {/* Password */}
              <div>
                <Typography
                  variant="subtitle2"
                  weight="semibold"
                  className="mb-3"
                  style={{ color: theme.colors.semantic.mutedForeground }}
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

              {/* Disabled State */}
              <div>
                <Typography
                  variant="subtitle2"
                  weight="semibold"
                  className="mb-3"
                  style={{ color: theme.colors.semantic.mutedForeground }}
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

              {/* Error State */}
              <div>
                <Typography
                  variant="subtitle2"
                  weight="semibold"
                  className="mb-3"
                  style={{ color: theme.colors.semantic.mutedForeground }}
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
            className="rounded-xl p-6 shadow-lg ring-1 transition-all duration-300 hover:shadow-xl"
            style={{
              backgroundColor: theme.colors.semantic.background,
            }}
          >
            <div className="mb-6">
              <Typography variant="h4" weight="bold" className="mb-2">
                Modals & Dialogs
              </Typography>
              <Typography
                variant="body2"
                style={{ color: theme.colors.semantic.mutedForeground }}
              >
                Accessible modal dialogs with overlay
              </Typography>
            </div>

            <div className="space-y-4">
              <Button
                children="Open Confirmation Modal"
                onClick={() => setIsModalOpen(true)}
              />
            </div>
          </section>

          {/* Typography Section */}
          <section
            className="rounded-xl p-6 shadow-lg ring-1 transition-all duration-300 hover:shadow-xl"
            style={{
              backgroundColor: theme.colors.semantic.background,
            }}
          >
            <div className="mb-6">
              <Typography variant="h4" weight="bold" className="mb-2">
                Typography Scale
              </Typography>
              <Typography
                variant="body2"
                style={{ color: theme.colors.semantic.mutedForeground }}
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
                Body 1 - Regular paragraph children
              </Typography>
              <Typography variant="body2">
                Body 2 - Smaller paragraph children
              </Typography>
              <Typography variant="caption">Caption children</Typography>
            </div>
          </section>

          {/* Form Example */}
          <section
            className="rounded-xl p-6 shadow-lg ring-1 transition-all duration-300 hover:shadow-xl lg:col-span-2"
            style={{
              backgroundColor: theme.colors.semantic.background,
            }}
          >
            <div className="mb-6">
              <Typography variant="h4" weight="bold" className="mb-2">
                Complete Form Example
              </Typography>
              <Typography
                variant="body2"
                style={{ color: theme.colors.semantic.mutedForeground }}
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
                <Button type="submit" children="Submit Form" />
                <Button
                  type="button"
                  variant="outline"
                  children="Reset"
                  onClick={() => {
                    setEmail("");
                    setPassword("");
                    setEmailError("");
                  }}
                />
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
              backgroundColor: theme.colors.primary[50],
              borderColor: theme.colors.primary[200],
            }}
          >
            <Typography
              variant="body2"
              style={{ color: theme.colors.primary[900] }}
            >
              💡 <strong>Pro tip:</strong> Modals automatically trap focus and
              can be closed by clicking outside or pressing the Escape key.
            </Typography>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="ghost"
              children="Cancel"
              onClick={() => setIsModalOpen(false)}
            />
            <Button
              children="Confirm"
              onClick={() => {
                console.log("Confirmed!");
                setIsModalOpen(false);
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const purpleTheme = {
    colors: {
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
        950: "#3b0764",
      },
    },
  };

  const currentTheme = isDarkMode ? darkTheme : purpleTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <div className="relative">
        {/* Theme Switcher - Fixed Position */}
        <div className="fixed top-4 right-4 z-50">
          <Button
            variant="outline"
            size="sm"
            children={`Switch to ${isDarkMode ? "Light" : "Dark"}`}
            onClick={() => setIsDarkMode(!isDarkMode)}
          />
        </div>

        <PlaygroundContent />
      </div>
    </ThemeProvider>
  );
}

export default App;

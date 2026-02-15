import { useState } from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { ThemeProvider, darkTheme } from "@/theme";
import "@/theme/index.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      <div className="min-h-screen bg-secondary-50 p-8 dark:bg-secondary-900">
        <div className="mx-auto max-w-2xl space-y-8">
          <div
            className={`space-y-4 rounded-lg  ${isDarkMode ? "bg-[#1B211A]" : "bg-white"} p-6 shadow dark:bg-secondary-800`}
          >
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">
                UI Library - {isDarkMode ? "Dark" : "Purple"} Theme{" "}
                {isDarkMode ? "🌙" : "💜"}
              </h1>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                Switch to {isDarkMode ? "Light" : "Dark"} Mode
              </Button>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-secondary-800 dark:text-secondary-100">
                Buttons
              </h2>
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => console.log("Primary clicked")}>
                  Primary
                </Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button isLoading>Loading</Button>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-secondary-800 dark:text-secondary-100">
                Inputs
              </h2>
              <div className="space-y-4">
                <Input label="Default Input" placeholder="Type something..." />
                <Input
                  label="Error Input"
                  error="Something went wrong"
                  placeholder="Error state"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-secondary-800 dark:text-secondary-100">
                Modals
              </h2>
              <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
            </div>
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Example Modal"
        >
          <div className="space-y-4">
            <p>
              This is an example modal with purple theme. Notice the accent
              color!
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>Confirm</Button>
            </div>
          </div>
        </Modal>
      </div>
    </ThemeProvider>
  );
}

export default App;

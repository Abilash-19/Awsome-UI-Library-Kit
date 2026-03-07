import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render as rtlRender, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";
import { ThemeProvider } from "../../theme";

const render = (ui: React.ReactElement) => {
  return rtlRender(<ThemeProvider>{ui}</ThemeProvider>);
};

describe("Input", () => {
  it("renders input element", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(<Input label="Username" />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
  });

  it("displays error message", () => {
    render(<Input error="This field is required" />);
    expect(screen.getByRole("alert")).toHaveTextContent(
      "This field is required",
    );
  });

  it("displays helper text", () => {
    render(<Input helperText="Enter your full name" />);
    expect(screen.getByText("Enter your full name")).toBeInTheDocument();
  });

  it("does not display helper text when error is present", () => {
    render(<Input helperText="Helper text" error="Error message" />);
    expect(screen.queryByText("Helper text")).not.toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("Error message");
  });

  it("applies error styles when error prop is provided", () => {
    render(<Input error="Error" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("handles user input", async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Type here" />);

    const input = screen.getByPlaceholderText("Type here");
    await user.type(input, "Hello");

    expect(input).toHaveValue("Hello");
  });

  it("disables input when disabled prop is true", () => {
    render(<Input disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("applies small size correctly", () => {
    render(<Input inputSize="sm" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("h-9");
  });

  it("applies medium size by default", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("h-11");
  });

  it("applies large size correctly", () => {
    render(<Input inputSize="lg" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("h-12");
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<Input ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it("applies custom className", () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("custom-class");
  });

  it("associates label with input using htmlFor", () => {
    render(<Input label="Email" id="email-input" />);
    const label = screen.getByText("Email");
    const input = screen.getByLabelText("Email");
    expect(label).toHaveAttribute("for", "email-input");
    expect(input).toHaveAttribute("id", "email-input");
  });

  it("shows skeleton when loading", () => {
    render(<Input isLoading />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});

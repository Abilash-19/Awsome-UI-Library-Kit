import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render as rtlRender, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";
import { ThemeProvider } from "../../theme";

const render = (ui: React.ReactElement) => {
  return rtlRender(<ThemeProvider>{ui}</ThemeProvider>);
};

describe("Button", () => {
  it("renders with children", () => {
    render(<Button children="Click me" />);
    expect(
      screen.getByRole("button", { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it("applies primary variant by default", () => {
    render(<Button children="Primary" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-[var(--btn-bg)]");
  });

  it("applies secondary variant correctly", () => {
    render(<Button variant="secondary" children="Secondary" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-[var(--btn-bg)]");
    expect(button).toHaveClass("text-[var(--btn-text)]");
  });

  it("applies outline variant correctly", () => {
    render(<Button variant="outline" children="Outline" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("border-2");
    expect(button).toHaveClass("border-[var(--btn-border)]");
  });

  it("applies ghost variant correctly", () => {
    render(<Button variant="ghost" children="Ghost" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("text-[var(--btn-text)]");
  });

  it("applies danger variant correctly", () => {
    render(<Button variant="danger" children="Danger" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-[var(--btn-bg)]");
  });

  it("applies small size correctly", () => {
    render(<Button size="sm" children="Small" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("h-8");
  });

  it("applies medium size by default", () => {
    render(<Button children="Medium" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("h-10");
  });

  it("applies large size correctly", () => {
    render(<Button size="lg" children="Large" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("h-12");
  });

  it("handles click events", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick} children="Click me" />);
    await user.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("disables button when disabled prop is true", () => {
    render(<Button disabled children="Disabled" />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("shows loading state", () => {
    render(<Button isLoading children="Loading" />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("disables button when loading", () => {
    render(<Button isLoading children="Loading" />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<Button ref={ref} children="Button" />);
    expect(ref).toHaveBeenCalled();
  });

  it("applies custom className", () => {
    render(<Button className="custom-class" children="Custom" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });
});

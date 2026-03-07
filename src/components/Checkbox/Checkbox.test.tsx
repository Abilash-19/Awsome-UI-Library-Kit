import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Checkbox from "./Checkbox";
import { ThemeProvider } from "@/theme";

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe("Checkbox", () => {
  it("renders with a label", () => {
    renderWithTheme(<Checkbox label="Test Label" id="test-checkbox" />);
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
  });

  it("handles checked state change", () => {
    const onChange = vi.fn();
    renderWithTheme(<Checkbox label="Toggle" onChange={onChange} />);
    const input = screen.getByRole("checkbox");

    fireEvent.click(input);
    expect(onChange).toHaveBeenCalledWith(true);

    fireEvent.click(input);
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it("renders in indeterminate state", () => {
    renderWithTheme(<Checkbox label="Indeterminate" indeterminate />);
    const input = screen.getByRole("checkbox") as HTMLInputElement;
    expect(input.indeterminate).toBe(true);
  });

  it("is disabled when disabled prop is true", () => {
    renderWithTheme(<Checkbox label="Disabled" disabled />);
    const input = screen.getByRole("checkbox");
    expect(input).toBeDisabled();
  });

  it("shows error state", () => {
    renderWithTheme(
      <Checkbox label="Error" error description="Error message" />,
    );
    expect(screen.getByText("Error message")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("renders loading state", () => {
    const { container } = renderWithTheme(<Checkbox label="Loading" loading />);
    expect(container.querySelector(".skeleton-root")).toBeInTheDocument();
  });

  it("associates description via aria-describedby", () => {
    renderWithTheme(
      <Checkbox label="Label" description="This is a description" id="cb" />,
    );
    const input = screen.getByRole("checkbox");
    const description = screen.getByText("This is a description");
    expect(input).toHaveAttribute("aria-describedby", description.id);
  });
});

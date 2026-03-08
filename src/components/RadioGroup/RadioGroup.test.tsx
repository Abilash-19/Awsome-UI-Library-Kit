import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import RadioGroup from "./RadioGroup";
import { ThemeProvider } from "../../theme";

const options = [
  {
    id: "opt-1",
    value: "option-1",
    label: "Option One",
    description: "Description 1",
  },
  { id: "opt-2", value: "option-2", label: "Option Two" },
  { id: "opt-3", value: "option-3", label: "Option Three", disabled: true },
];

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe("RadioGroup", () => {
  it("renders correctly with all options", () => {
    renderWithTheme(
      <RadioGroup name="test-group" label="Group Label" options={options} />,
    );

    expect(screen.getByText("Group Label")).toBeInTheDocument();
    expect(
      screen.getByRole("radio", { name: /Option One/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Description 1")).toBeInTheDocument();
    expect(
      screen.getByRole("radio", { name: /Option Two/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", { name: /Option Three/i }),
    ).toBeInTheDocument();
  });

  it("handles uncontrolled selection change", () => {
    const onChange = vi.fn();
    renderWithTheme(
      <RadioGroup
        name="test-group"
        defaultValue="option-1"
        options={options}
        onChange={onChange}
      />,
    );

    const option2 = screen.getByRole("radio", {
      name: /Option Two/i,
    }) as HTMLInputElement;
    expect(screen.getByRole("radio", { name: /Option One/i })).toBeChecked();
    expect(option2).not.toBeChecked();

    fireEvent.click(option2);
    expect(option2).toBeChecked();
    expect(onChange).toHaveBeenCalledWith("option-2");
  });

  it("handles controlled state", () => {
    const onChange = vi.fn();
    const { rerender } = renderWithTheme(
      <RadioGroup
        name="test-group"
        value="option-1"
        options={options}
        onChange={onChange}
      />,
    );

    const option2 = screen.getByRole("radio", {
      name: /Option Two/i,
    }) as HTMLInputElement;

    fireEvent.click(option2);
    expect(onChange).toHaveBeenCalledWith("option-2");
    // Should still be option-1 because it's controlled and we haven't updated the value prop
    expect(option2).not.toBeChecked();

    rerender(
      <ThemeProvider>
        <RadioGroup
          name="test-group"
          value="option-2"
          options={options}
          onChange={onChange}
        />
      </ThemeProvider>,
    );
    expect(option2).toBeChecked();
  });

  it("respects individual option disabled state", () => {
    const onChange = vi.fn();
    renderWithTheme(
      <RadioGroup name="test-group" options={options} onChange={onChange} />,
    );

    const disabledOption = screen.getByRole("radio", { name: /Option Three/i });
    expect(disabledOption).toBeDisabled();

    // Clicking a disabled input directly should not trigger onChange in JSDOM
    fireEvent.click(disabledOption);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("respects group disabled state", () => {
    renderWithTheme(
      <RadioGroup name="test-group" options={options} disabled />,
    );

    options.forEach((option) => {
      expect(
        screen.getByRole("radio", {
          name: new RegExp(option.label as string, "i"),
        }),
      ).toBeDisabled();
    });
  });

  it("renders with card variant", () => {
    const { container } = renderWithTheme(
      <RadioGroup name="test-group" variant="card" options={options} />,
    );

    // Check if the card styles are applied
    const labels = container.querySelectorAll("label");
    labels.forEach((label) => {
      expect(label.className).toContain("border-2");
    });
  });

  it("shows error and accessibility attributes", () => {
    renderWithTheme(
      <RadioGroup
        id="test-rg"
        name="test-group"
        label="Test Group"
        options={options}
        error="Field is required"
        required
      />,
    );

    const errorMessage = screen.getByText("Field is required");
    const fieldset = screen.getByRole("group", { name: /test group/i });
    const inputs = screen.getAllByRole("radio");

    expect(errorMessage).toBeInTheDocument();
    expect(fieldset).toHaveAttribute("aria-describedby", "test-rg-error");
    expect(fieldset).toHaveAttribute("aria-invalid", "true");

    inputs.forEach((input) => {
      expect(input).toHaveAttribute("required");
    });
  });

  it("renders loading state", () => {
    const { container } = renderWithTheme(
      <RadioGroup name="test-group" isLoading options={options} />,
    );

    // Skeletons should be visible
    const skeletons = container.querySelectorAll(".skeleton-root");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("associates helper text via aria-describedby", () => {
    renderWithTheme(
      <RadioGroup
        id="test-rg"
        name="test-group"
        options={options}
        helperText="Select one of the above"
      />,
    );

    const fieldset = screen.getByRole("group");
    // We know the id should be test-rg-helper
    expect(fieldset).toHaveAttribute("aria-describedby", "test-rg-helper");
  });
});

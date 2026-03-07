import React from "react";
import { describe, it, expect } from "vitest";
import { render as rtlRender, screen } from "@testing-library/react";
import { Badge } from "./Badge";
import { ThemeProvider } from "../../theme";

const render = (ui: React.ReactElement) => {
  return rtlRender(<ThemeProvider>{ui}</ThemeProvider>);
};

describe("Badge", () => {
  it("renders with children", () => {
    render(<Badge>Status</Badge>);
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("applies variant styles correctly", () => {
    const { container } = render(<Badge variant="success">Success</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass("bg-[var(--badge-bg)]");
    expect(badge).toHaveClass("text-[var(--badge-text)]");
  });

  it("applies size styles correctly", () => {
    const { container: smallContainer } = render(
      <Badge size="small">Small</Badge>,
    );
    expect(smallContainer.firstChild).toHaveClass("h-5");

    const { container: mediumContainer } = render(
      <Badge size="medium">Medium</Badge>,
    );
    expect(mediumContainer.firstChild).toHaveClass("h-6");

    const { container: largeContainer } = render(
      <Badge size="large">Large</Badge>,
    );
    expect(largeContainer.firstChild).toHaveClass("h-7");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>Ref Test</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("applies custom className", () => {
    const { container } = render(
      <Badge className="custom-test-class">Custom</Badge>,
    );
    expect(container.firstChild).toHaveClass("custom-test-class");
  });

  it("applies custom style", () => {
    const { container } = render(<Badge style={{ color: "red" }}>Style</Badge>);
    expect(container.firstChild).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });

  it("shows skeleton when loading", () => {
    render(<Badge isLoading>Loading</Badge>);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});

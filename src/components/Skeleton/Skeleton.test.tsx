import React from "react";
import { describe, it, expect } from "vitest";
import { render as rtlRender, screen } from "@testing-library/react";
import { Skeleton } from "./Skeleton";
import { ThemeProvider } from "../../theme";

const render = (ui: React.ReactElement) => {
  return rtlRender(<ThemeProvider>{ui}</ThemeProvider>);
};

describe("Skeleton", () => {
  it("renders correctly", () => {
    render(<Skeleton />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("applies variant styles correctly", () => {
    render(<Skeleton variant="circular" />);
    const span = screen.getByRole("status");
    expect(span).toHaveStyle({ borderRadius: "50%" });
  });

  it("applies width and height correctly", () => {
    render(<Skeleton width={100} height={50} />);
    const span = screen.getByRole("status");
    expect(span).toHaveStyle({ width: "100px", height: "50px" });
  });

  it("applies animation class correctly", () => {
    const { rerender } = render(<Skeleton animation="pulse" />);
    let span = screen.getByRole("status");
    expect(span).toHaveClass("skeleton-pulse");

    rerender(
      <ThemeProvider>
        <Skeleton animation="wave" />
      </ThemeProvider>,
    );
    span = screen.getByRole("status");
    expect(span).toHaveClass("skeleton-wave");
  });

  it("applies custom className", () => {
    render(<Skeleton className="custom-class" />);
    expect(screen.getByRole("status")).toHaveClass("custom-class");
  });

  it("has accessible roles and labels", () => {
    render(<Skeleton />);
    const span = screen.getByRole("status");
    expect(span).toHaveAttribute("aria-label", "Loading…");
    expect(span).toHaveAttribute("aria-busy", "true");
  });
});

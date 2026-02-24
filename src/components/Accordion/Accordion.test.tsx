import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Accordion } from "./Accordion";

// ─── Mocks ───────────────────────────────────────────────────────────────────

vi.mock("@/theme", () => ({
  useTheme: () => ({
    theme: {
      tokens: {
        surface: "#ffffff",
        surfaceHover: "#f5f5f5",
        borderStrong: "#e0e0e0",
        foreground: "#111111",
        foregroundMuted: "#888888",
      },
      shape: {
        radiusMd: "8px",
      },
    },
  }),
}));

vi.mock("@/utils", () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(" "),
}));

vi.mock("@/assets/Icons/Chevron", () => ({
  Chevron: ({ className }: { className?: string }) => (
    <span data-testid="chevron" className={className} />
  ),
}));

// ─── Helpers ─────────────────────────────────────────────────────────────────

const renderAccordion = (props = {}) =>
  render(
    <Accordion title="Test Title" {...props}>
      <p>Accordion content</p>
    </Accordion>,
  );

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("Accordion", () => {
  describe("Rendering", () => {
    it("renders a details element", () => {
      const { container } = renderAccordion();
      const details = container.querySelector("details");
      expect(details).toBeInTheDocument();
    });

    it("renders title and subtitle", () => {
      renderAccordion({
        title: "Main Title",
        subtitle: "Secondary text",
      });

      expect(screen.getByText("Main Title")).toBeInTheDocument();
      expect(screen.getByText("Secondary text")).toBeInTheDocument();
    });

    it("renders children content", () => {
      renderAccordion();
      expect(screen.getByText("Accordion content")).toBeInTheDocument();
    });

    it("renders chevron icon", () => {
      renderAccordion();
      expect(screen.getByTestId("chevron")).toBeInTheDocument();
    });
  });

  describe("Props & State", () => {
    it("is closed by default", () => {
      const { container } = renderAccordion();
      const details = container.querySelector("details") as HTMLDetailsElement;
      expect(details.open).toBe(false);
    });

    it("is open when isDefaultOpen is true", () => {
      const { container } = renderAccordion({ isDefaultOpen: true });
      const details = container.querySelector("details") as HTMLDetailsElement;
      expect(details.open).toBe(true);
    });

    it("applies disabled styles", () => {
      const { container } = renderAccordion({ isDisabled: true });
      const details = container.querySelector("details");

      expect(details).toHaveClass("pointer-events-none");
      expect(details).toHaveClass("opacity-50");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to details element", () => {
      const ref = React.createRef<HTMLDetailsElement>();

      render(
        <Accordion title="Ref Test" ref={ref}>
          Content
        </Accordion>,
      );

      expect(ref.current).toBeInstanceOf(HTMLDetailsElement);
    });
  });

  describe("ID Handling", () => {
    it("uses provided id", () => {
      const { container } = renderAccordion({ id: "custom-id" });
      const details = container.querySelector("details");

      expect(details).toHaveAttribute("id", "custom-id");
    });

    it("generates id when none is provided", () => {
      const { container } = render(<Accordion title="T1">C1</Accordion>);
      const details = container.querySelector("details");

      expect(details?.id).toBeTruthy();
    });
  });

  describe("Interaction", () => {
    it("toggles open state when summary is clicked", () => {
      const { container } = renderAccordion();
      const details = container.querySelector("details") as HTMLDetailsElement;
      const summary = container.querySelector("summary") as HTMLElement;

      expect(details.open).toBe(false);

      fireEvent.click(summary);
      expect(details.open).toBe(true);

      fireEvent.click(summary);
      expect(details.open).toBe(false);
    });
  });

  describe("Styling", () => {
    it("applies CSS variables from theme", () => {
      const { container } = renderAccordion();
      const details = container.querySelector("details") as HTMLElement;

      const style = details.getAttribute("style") || "";
      expect(style).toContain("--accordion-bg: #ffffff");
      expect(style).toContain("--accordion-border: #e0e0e0");
    });

    it("applies custom className", () => {
      const { container } = renderAccordion({
        className: "custom-test-class",
      });

      const details = container.querySelector("details");
      expect(details).toHaveClass("custom-test-class");
    });
  });
});

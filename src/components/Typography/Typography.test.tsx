// src/components/Typography/Typography.test.tsx
import React from "react";
import { describe, it, expect } from "vitest";
import { render as rtlRender, screen } from "@testing-library/react";
import { Typography } from "./Typography";
import { ThemeProvider } from "../../theme";

const render = (ui: React.ReactElement) => {
  return rtlRender(<ThemeProvider>{ui}</ThemeProvider>);
};

describe("Typography", () => {
  it("renders children correctly", () => {
    render(<Typography>Hello World</Typography>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("applies default variant (body1)", () => {
    const { container } = render(<Typography>Text</Typography>);
    const element = container.firstChild as HTMLElement;
    expect(element.tagName).toBe("P");
  });

  it("renders different variants with correct elements", () => {
    const { rerender, container } = render(
      <Typography variant="h1">Heading</Typography>,
    );
    expect((container.firstChild as HTMLElement).tagName).toBe("H1");

    rerender(
      <ThemeProvider>
        <Typography variant="h2">Heading</Typography>
      </ThemeProvider>,
    );
    expect((container.firstChild as HTMLElement).tagName).toBe("H2");

    rerender(
      <ThemeProvider>
        <Typography variant="body1">Body</Typography>
      </ThemeProvider>,
    );
    expect((container.firstChild as HTMLElement).tagName).toBe("P");

    rerender(
      <ThemeProvider>
        <Typography variant="caption">Caption</Typography>
      </ThemeProvider>,
    );
    expect((container.firstChild as HTMLElement).tagName).toBe("SPAN");
  });

  it('respects custom "as" prop', () => {
    const { container } = render(
      <Typography variant="h1" as="div">
        Custom Element
      </Typography>,
    );
    expect((container.firstChild as HTMLElement).tagName).toBe("DIV");
  });

  it("applies weight classes correctly", () => {
    const { container } = render(
      <Typography weight="bold">Bold text</Typography>,
    );
    expect(container.firstChild).toHaveClass("font-bold");
  });

  it("applies default weight based on variant", () => {
    const { container } = render(<Typography variant="h1">Heading</Typography>);
    expect(container.firstChild).toHaveClass("font-bold");
  });

  it("custom weight overrides default variant weight", () => {
    const { container } = render(
      <Typography variant="h1" weight="light">
        Light Heading
      </Typography>,
    );
    expect(container.firstChild).toHaveClass("font-light");
    expect(container.firstChild).not.toHaveClass("font-bold");
  });

  it("applies variant styles correctly", () => {
    const { container } = render(<Typography variant="h1">Heading</Typography>);
    expect(container.firstChild).toHaveClass("text-4xl");
  });

  it("applies custom className", () => {
    const { container } = render(
      <Typography className="custom-class">Custom</Typography>,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("applies custom styles", () => {
    const { container } = render(
      <Typography style={{ fontSize: "20px" }}>Styled</Typography>,
    );
    expect(container.firstChild).toHaveStyle({ fontSize: "20px" });
  });

  it("applies id attribute", () => {
    render(<Typography id="test-id">Text</Typography>);
    expect(screen.getByText("Text")).toHaveAttribute("id", "test-id");
  });

  it("handles onClick events", () => {
    let clicked = false;
    const handleClick = () => {
      clicked = true;
    };

    render(<Typography onClick={handleClick}>Clickable</Typography>);
    screen.getByText("Clickable").click();
    expect(clicked).toBe(true);
  });

  it("combines variant, weight, and custom className", () => {
    const { container } = render(
      <Typography variant="h2" weight="semibold" className="my-custom-class">
        Combined styles
      </Typography>,
    );
    const element = container.firstChild as HTMLElement;

    expect(element).toHaveClass("text-3xl"); // h2 variant
    expect(element).toHaveClass("font-semibold");
    expect(element).toHaveClass("my-custom-class"); // custom class
  });

  describe("Display variants", () => {
    it("renders display1 variant correctly", () => {
      const { container } = render(
        <Typography variant="display1">Display 1</Typography>,
      );
      expect((container.firstChild as HTMLElement).tagName).toBe("H1");
      expect(container.firstChild).toHaveClass("text-6xl");
    });

    it("renders display2 variant correctly", () => {
      const { container } = render(
        <Typography variant="display2">Display 2</Typography>,
      );
      expect((container.firstChild as HTMLElement).tagName).toBe("H2");
      expect(container.firstChild).toHaveClass("text-5xl");
    });
  });

  describe("Heading variants", () => {
    it("renders all heading variants", () => {
      const headings = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

      headings.forEach((variant) => {
        const { container } = render(
          <Typography variant={variant}>Heading</Typography>,
        );
        expect((container.firstChild as HTMLElement).tagName).toBe(
          variant.toUpperCase(),
        );
      });
    });
  });

  describe("Body variants", () => {
    it("renders body1 as paragraph", () => {
      const { container } = render(
        <Typography variant="body1">Body text</Typography>,
      );
      expect((container.firstChild as HTMLElement).tagName).toBe("P");
      expect(container.firstChild).toHaveClass("text-base");
    });

    it("renders body2 as paragraph", () => {
      const { container } = render(
        <Typography variant="body2">Body text</Typography>,
      );
      expect((container.firstChild as HTMLElement).tagName).toBe("P");
      expect(container.firstChild).toHaveClass("text-sm");
    });
  });

  describe("Subtitle variants", () => {
    it("renders subtitle1 correctly", () => {
      const { container } = render(
        <Typography variant="subtitle1">Subtitle</Typography>,
      );
      expect((container.firstChild as HTMLElement).tagName).toBe("H6");
      expect(container.firstChild).toHaveClass("text-base");
    });

    it("renders subtitle2 correctly", () => {
      const { container } = render(
        <Typography variant="subtitle2">Subtitle</Typography>,
      );
      expect((container.firstChild as HTMLElement).tagName).toBe("H6");
      expect(container.firstChild).toHaveClass("text-sm");
    });
  });

  describe("Special variants", () => {
    it("renders caption as span", () => {
      const { container } = render(
        <Typography variant="caption">Caption text</Typography>,
      );
      expect((container.firstChild as HTMLElement).tagName).toBe("SPAN");
      expect(container.firstChild).toHaveClass("text-xs");
    });

    it("renders overline as span", () => {
      const { container } = render(
        <Typography variant="overline">Overline text</Typography>,
      );
      expect((container.firstChild as HTMLElement).tagName).toBe("SPAN");
      expect(container.firstChild).toHaveClass("text-xs");
    });
  });

  describe("Font weights", () => {
    const weights = [
      "thin",
      "extralight",
      "light",
      "normal",
      "medium",
      "semibold",
      "bold",
      "extrabold",
      "black",
    ] as const;

    weights.forEach((weight) => {
      it(`applies ${weight} weight correctly`, () => {
        const { container } = render(
          <Typography weight={weight}>Text</Typography>,
        );
        expect(container.firstChild).toHaveClass(`font-${weight}`);
      });
    });
  });

  describe("Custom element rendering", () => {
    it("renders as div when specified", () => {
      const { container } = render(<Typography as="div">Div text</Typography>);
      expect((container.firstChild as HTMLElement).tagName).toBe("DIV");
    });

    it("renders as span when specified", () => {
      const { container } = render(
        <Typography as="span">Span text</Typography>,
      );
      expect((container.firstChild as HTMLElement).tagName).toBe("SPAN");
    });

    it("renders as article when specified", () => {
      const { container } = render(
        <Typography as="article">Article text</Typography>,
      );
      expect((container.firstChild as HTMLElement).tagName).toBe("ARTICLE");
    });
  });

  describe("Edge cases", () => {
    it("handles empty children", () => {
      const { container } = render(<Typography>{""}</Typography>);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("handles numeric children", () => {
      render(<Typography>{42}</Typography>);
      expect(screen.getByText("42")).toBeInTheDocument();
    });

    it("handles multiple children", () => {
      render(
        <Typography>
          Hello <strong>World</strong>
        </Typography>,
      );
      expect(screen.getByText(/Hello/)).toBeInTheDocument();
      expect(screen.getByText("World")).toBeInTheDocument();
    });

    it("merges custom className with default classes", () => {
      const { container } = render(
        <Typography className="my-custom-class another-class">Text</Typography>,
      );
      expect(container.firstChild).toHaveClass("typography");
      expect(container.firstChild).toHaveClass("my-custom-class");
      expect(container.firstChild).toHaveClass("another-class");
    });
  });

  describe("Accessibility", () => {
    it("applies correct semantic HTML for headings", () => {
      const { container } = render(
        <Typography variant="h1">Main Heading</Typography>,
      );
      expect((container.firstChild as HTMLElement).tagName).toBe("H1");
    });

    it("allows custom id for anchor links", () => {
      render(
        <Typography variant="h2" id="section-heading">
          Section
        </Typography>,
      );
      const heading = screen.getByText("Section");
      expect(heading).toHaveAttribute("id", "section-heading");
    });
  });

  it("shows skeleton when loading", () => {
    render(<Typography isLoading>Loading</Typography>);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});

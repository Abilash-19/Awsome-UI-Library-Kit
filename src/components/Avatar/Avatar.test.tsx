import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render as rtlRender, screen, fireEvent } from "@testing-library/react";
import Avatar from "./Avatar";
import { ThemeProvider } from "../../theme";
import { Badge } from "../Badge/Badge";

const render = (ui: React.ReactElement) => {
  return rtlRender(<ThemeProvider>{ui}</ThemeProvider>);
};

describe("Avatar", () => {
  it("renders an image when src is provided", () => {
    const src = "https://example.com/avatar.jpg";
    render(<Avatar src={src} alt="User Avatar" />);
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", src);
    expect(img).toHaveAttribute("alt", "User Avatar");
  });

  it("renders initials when src is missing", () => {
    render(<Avatar displayName="John Doe" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("renders a placeholder '?' when both src and displayName are missing", () => {
    render(<Avatar />);
    expect(screen.getByText("?")).toBeInTheDocument();
  });

  it("applies size styles correctly", () => {
    const { container: smallContainer } = render(<Avatar size="small" />);
    expect(smallContainer.firstChild).toHaveClass("h-6", "w-6");

    const { container: mediumContainer } = render(<Avatar size="medium" />);
    expect(mediumContainer.firstChild).toHaveClass("h-8", "w-8");

    const { container: largeContainer } = render(<Avatar size="large" />);
    expect(largeContainer.firstChild).toHaveClass("h-10", "w-10");
  });

  it("applies shape styles correctly", () => {
    const { container: circleContainer } = render(<Avatar shape="circle" />);
    // Testing inner container for shape
    expect(circleContainer.querySelector(".h-full")).toHaveClass(
      "rounded-full",
    );

    const { container: squareContainer } = render(<Avatar shape="square" />);
    expect(squareContainer.querySelector(".h-full")).toHaveClass("rounded-md");
  });

  it("renders badge and handles clicks", () => {
    const onBadgeClick = vi.fn();
    render(<Avatar badge={<Badge>1</Badge>} onBadgeClick={onBadgeClick} />);
    const badge = screen.getByText("1");
    expect(badge).toBeInTheDocument();
    fireEvent.click(badge.parentElement!);
    expect(onBadgeClick).toHaveBeenCalled();
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Avatar ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("switches to initials when image fails to load", () => {
    const src = "https://example.com/invalid.jpg";
    render(<Avatar src={src} displayName="Error User" />);

    const img = screen.getByRole("img");
    fireEvent.error(img);

    expect(screen.getByText("EU")).toBeInTheDocument();
  });

  it("shows skeleton when loading", () => {
    render(<Avatar isLoading />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});

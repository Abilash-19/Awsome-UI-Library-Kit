import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScrollArea, ScrollElement } from "./ScrollArea";

const meta: Meta<typeof ScrollArea> = {
  title: "Components/ScrollArea",
  component: ScrollArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    enableAnimation: {
      control: "boolean",
      description: "Toggles reveal animations globally for all nested Items.",
    },
    ScrollAnimation: {
      control: "select",
      options: ["up", "down", "left", "right", "fade", "scale", "blur"],
      description: "Default animation applied to all children.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const DefaultVertical: Story = {
  args: {
    className: "h-[300px] w-[400px] border p-4 rounded-xl",
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="space-y-4">
        {[...Array(10)].map((_, i) => (
          <ScrollElement
            key={i}
            className="p-4 rounded-lg border bg-surface text-foreground"
          >
            Item {i + 1}
          </ScrollElement>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const HorizontalScroll: Story = {
  args: {
    className: "w-[600px] border p-4 rounded-xl",
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="flex gap-4">
        {[...Array(8)].map((_, i) => (
          <ScrollElement
            key={i}
            className="min-w-[200px] p-6 rounded-lg border text-center font-bold"
          >
            Horizontal {i + 1}
          </ScrollElement>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const MixedAnimations: Story = {
  args: {
    className: "h-[400px] w-[500px] border p-4 rounded-xl",
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="space-y-4">
        <ScrollElement revealType="up" className="p-4 rounded border">
          I will slide UP when scrolled into view!
        </ScrollElement>
        <ScrollElement revealType="down" className="p-4 rounded border">
          I will slide DOWN.
        </ScrollElement>
        <ScrollElement revealType="left" className="p-4 rounded border">
          I will slide LEFT.
        </ScrollElement>
        <ScrollElement revealType="right" className="p-4 rounded border">
          I will slide RIGHT.
        </ScrollElement>
        <ScrollElement
          revealType="blur"
          className="p-4 border"
          style={{ paddingBottom: "100px" }}
        >
          I will BLUR in elegantly.
        </ScrollElement>
      </div>
    </ScrollArea>
  ),
};

export const AnimationsDisabled: Story = {
  args: {
    className: "h-[300px] w-[400px] border p-4 rounded-xl",
    enableAnimation: false,
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="space-y-4">
        <ScrollElement className="p-4 rounded-lg border">
          Visible instantly
        </ScrollElement>
        <ScrollElement className="p-4 rounded-lg border">
          No animations here either.
        </ScrollElement>
      </div>
    </ScrollArea>
  ),
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["rectangular", "circular", "text", "rounded"],
    },
    animation: {
      control: "select",
      options: ["pulse", "wave", "none"],
    },
    width: { control: "text" },
    height: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Rectangular: Story = {
  args: {
    variant: "rectangular",
    width: 200,
    height: 100,
  },
};

export const Circular: Story = {
  args: {
    variant: "circular",
    width: 60,
    height: 60,
  },
};

export const Text: Story = {
  args: {
    variant: "text",
    width: "100%",
  },
};

export const Rounded: Story = {
  args: {
    variant: "rounded",
    width: 200,
    height: 100,
  },
};

export const Pulse: Story = {
  args: {
    animation: "pulse",
    width: 200,
    height: 100,
  },
};

export const Wave: Story = {
  args: {
    animation: "wave",
    width: 200,
    height: 100,
  },
};

export const NoAnimation: Story = {
  args: {
    animation: "none",
    width: 200,
    height: 100,
  },
};

export const ComplexLayout: Story = {
  render: () => (
    <div className="flex gap-4 items-center" style={{ width: "300px" }}>
      <Skeleton variant="circular" width={48} height={48} />
      <div className="flex-1 flex flex-col gap-2">
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
      </div>
    </div>
  ),
};

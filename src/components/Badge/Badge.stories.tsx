import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "light",
        "dark",
      ],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
  args: {
    children: "Primary",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Success: Story = {
  args: {
    children: "Success",
    variant: "success",
  },
};

export const Danger: Story = {
  args: {
    children: "Danger",
    variant: "danger",
  },
};

export const Warning: Story = {
  args: {
    children: "Warning",
    variant: "warning",
  },
};

export const Info: Story = {
  args: {
    children: "Info",
    variant: "info",
  },
};

export const Light: Story = {
  args: {
    children: "Light",
    variant: "light",
  },
};

export const Dark: Story = {
  args: {
    children: "Dark",
    variant: "dark",
  },
};

export const Small: Story = {
  args: {
    children: "Small",
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    children: "Medium",
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    children: "Large",
    size: "large",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Badge variant="primary">Primary</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="light">Light</Badge>
        <Badge variant="dark">Dark</Badge>
      </div>
      <div className="flex items-center gap-2">
        <Badge size="small">Small</Badge>
        <Badge size="medium">Medium</Badge>
        <Badge size="large">Large</Badge>
      </div>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    children: "Loading",
    isLoading: true,
  },
};

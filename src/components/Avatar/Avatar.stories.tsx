import type { Meta, StoryObj } from "@storybook/react-vite";
import Avatar from "./Avatar";
import { Badge } from "../Badge/Badge";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    shape: {
      control: "select",
      options: ["circle", "square"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Image: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    alt: "User Avatar",
  },
};

export const Initials: Story = {
  args: {
    displayName: "Abilash",
    size: "large",
  },
};

export const Square: Story = {
  args: {
    shape: "square",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar size="small" displayName="S" />
      <Avatar size="medium" displayName="M" />
      <Avatar size="large" displayName="L" />
    </div>
  ),
};

export const WithBadge: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1",
    badge: (
      <Badge
        variant="success"
        size="small"
        className="h-2.5 w-2.5 p-0 rounded-full border-2 border-white"
      >
        {""}
      </Badge>
    ),
  },
};

export const Fallback: Story = {
  args: {
    displayName: "John Doe",
    src: "https://invalid-url.com/image.jpg", // Force error
  },
};

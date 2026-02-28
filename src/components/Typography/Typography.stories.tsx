// src/components/Typography/Typography.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Typography } from "./Typography";

const meta: Meta<typeof Typography> = {
  title: "Components/Typography",
  component: Typography,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Typography component for consistent text styling across the application.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "display1",
        "display2",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "subtitle1",
        "subtitle2",
        "body1",
        "body2",
        "caption",
        "overline",
      ],
      description: "Typography variant",
    },
    weight: {
      control: "select",
      options: [
        "thin",
        "extralight",
        "light",
        "normal",
        "medium",
        "semibold",
        "bold",
        "extrabold",
        "black",
      ],
      description: "Font weight",
    },
    children: {
      control: "text",
      description: "Content to display",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

// Default story
export const Default: Story = {
  args: {
    variant: "h1",
    children: "The quick brown fox jumps over the lazy dog",
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="display1">
        Display 1 - The quick brown fox
      </Typography>
      <Typography variant="display2">
        Display 2 - The quick brown fox
      </Typography>
      <Typography variant="h1">Heading 1 - The quick brown fox</Typography>
      <Typography variant="h2">Heading 2 - The quick brown fox</Typography>
      <Typography variant="h3">Heading 3 - The quick brown fox</Typography>
      <Typography variant="h4">Heading 4 - The quick brown fox</Typography>
      <Typography variant="h5">Heading 5 - The quick brown fox</Typography>
      <Typography variant="h6">Heading 6 - The quick brown fox</Typography>
      <Typography variant="subtitle1">
        Subtitle 1 - The quick brown fox
      </Typography>
      <Typography variant="subtitle2">
        Subtitle 2 - The quick brown fox
      </Typography>
      <Typography variant="body1">
        Body 1 - The quick brown fox jumps over the lazy dog
      </Typography>
      <Typography variant="body2">
        Body 2 - The quick brown fox jumps over the lazy dog
      </Typography>
      <Typography variant="caption">Caption - The quick brown fox</Typography>
      <Typography variant="overline">Overline - The quick brown fox</Typography>
    </div>
  ),
};

// Font weights
export const FontWeights: Story = {
  render: () => (
    <div className="space-y-2">
      <Typography variant="body1" weight="thin">
        Font Weight Thin (100)
      </Typography>
      <Typography variant="body1" weight="extralight">
        Font Weight Extra Light (200)
      </Typography>
      <Typography variant="body1" weight="light">
        Font Weight Light (300)
      </Typography>
      <Typography variant="body1" weight="normal">
        Font Weight Normal (400)
      </Typography>
      <Typography variant="body1" weight="medium">
        Font Weight Medium (500)
      </Typography>
      <Typography variant="body1" weight="semibold">
        Font Weight Semibold (600)
      </Typography>
      <Typography variant="body1" weight="bold">
        Font Weight Bold (700)
      </Typography>
      <Typography variant="body1" weight="extrabold">
        Font Weight Extra Bold (800)
      </Typography>
      <Typography variant="body1" weight="black">
        Font Weight Black (900)
      </Typography>
    </div>
  ),
};

// Custom styling with className
export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="h2" className="text-blue-500">
        Blue heading
      </Typography>
      <Typography variant="body1" className="text-red-500">
        Red text
      </Typography>
      <Typography variant="h3" className="text-center">
        Centered heading
      </Typography>
      <Typography variant="body1" className="text-right">
        Right aligned text
      </Typography>
      <Typography variant="body1" className="uppercase">
        Uppercase text
      </Typography>
      <Typography variant="body1" className="italic">
        Italic text
      </Typography>
      <Typography variant="body1" className="underline">
        Underlined text
      </Typography>
      <Typography variant="body1" className="line-through">
        Strikethrough text
      </Typography>
    </div>
  ),
};

// Realistic example
export const RealisticExample: Story = {
  render: () => (
    <article className="max-w-2xl space-y-4">
      <Typography variant="overline" className="text-blue-600">
        Technology
      </Typography>
      <Typography variant="h1">
        The Future of Web Development in 2026
      </Typography>
      <Typography variant="subtitle1" className="text-gray-600">
        Exploring the latest trends and technologies shaping the industry
      </Typography>

      <Typography variant="body1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris.
      </Typography>

      <Typography variant="h3">Key Takeaways</Typography>

      <Typography variant="body1">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Typography>

      <Typography variant="body2" className="text-gray-600 italic">
        "Innovation distinguishes between a leader and a follower." - Steve Jobs
      </Typography>

      <Typography variant="caption" className="text-gray-500">
        Published on February 15, 2026 • 5 min read
      </Typography>
    </article>
  ),
};

export const Loading: Story = {
  args: {
    isLoading: true,
    children: "This content is loading...",
  },
};

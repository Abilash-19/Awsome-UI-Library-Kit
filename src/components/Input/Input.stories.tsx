import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    inputSize: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Username",
    placeholder: "Enter your username",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    placeholder: "your.email@example.com",
    error: "Please enter a valid email address",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Full Name",
    placeholder: "John Doe",
    helperText: "Enter your first and last name",
  },
};

export const Small: Story = {
  args: {
    label: "Small Input",
    placeholder: "Small size",
    inputSize: "sm",
  },
};

export const Medium: Story = {
  args: {
    label: "Medium Input",
    placeholder: "Medium size",
    inputSize: "md",
  },
};

export const Large: Story = {
  args: {
    label: "Large Input",
    placeholder: "Large size",
    inputSize: "lg",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "Cannot edit",
    disabled: true,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Input label="Small" placeholder="Small input" inputSize="sm" />
      <Input label="Medium" placeholder="Medium input" inputSize="md" />
      <Input label="Large" placeholder="Large input" inputSize="lg" />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Input label="Email" type="email" placeholder="your.email@example.com" />
      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
      />
      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        helperText="Passwords must match"
      />
    </div>
  ),
};

export const Loading: Story = {
  args: {
    label: "Loading Input",
    isLoading: true,
  },
};

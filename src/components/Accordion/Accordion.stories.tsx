import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion } from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isDefaultOpen: {
      control: "boolean",
    },
    isDisabled: {
      control: "boolean",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "480px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    title: "What is a UI Library?",
    children:
      "A UI library is a collection of reusable components that help developers build consistent and polished user interfaces quickly.",
  },
};

export const WithSubtitle: Story = {
  args: {
    title: "Getting Started",
    subtitle: "Learn how to install and use the library",
    children:
      "Install the package using npm or yarn, then import the components you need into your project. Each component is fully typed and supports theming out of the box.",
  },
};

export const OpenByDefault: Story = {
  args: {
    title: "Already Expanded",
    subtitle: "This accordion starts open",
    isDefaultOpen: true,
    children:
      "This content is visible immediately because isDefaultOpen is set to true.",
  },
};

export const Disabled: Story = {
  args: {
    title: "Disabled Accordion",
    subtitle: "This cannot be toggled",
    isDisabled: true,
    children: "You should not be able to see this content.",
  },
};

export const WithRichContent: Story = {
  args: {
    title: "Shipping Information",
    subtitle: "Delivery options and timelines",
    isDefaultOpen: true,
    children: (
      <div className="space-y-2">
        <p>We offer the following shipping options:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Standard</strong> — 5-7 business days
          </li>
          <li>
            <strong>Express</strong> — 2-3 business days
          </li>
          <li>
            <strong>Overnight</strong> — Next business day
          </li>
        </ul>
        <p className="text-xs opacity-70">Free shipping on orders over $50.</p>
      </div>
    ),
  },
};

export const AccordionGroup: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Accordion title="Section 1" subtitle="Introduction">
        Welcome to our application. This section covers the basics you need to
        get started.
      </Accordion>
      <Accordion title="Section 2" subtitle="Features">
        Explore the powerful features built into every component, including
        theming, accessibility, and responsive design.
      </Accordion>
      <Accordion title="Section 3" subtitle="FAQ">
        Find answers to frequently asked questions about installation,
        configuration, and customization.
      </Accordion>
    </div>
  ),
};

export const FAQ: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Accordion title="How do I install the library?">
        Run <code>npm install @awesome-ui/library</code> in your project
        directory.
      </Accordion>
      <Accordion title="Does it support dark mode?">
        Yes! Wrap your app in a ThemeProvider and toggle between light and dark
        themes.
      </Accordion>
      <Accordion title="Is it accessible?">
        All components follow WAI-ARIA guidelines and support keyboard
        navigation.
      </Accordion>
      <Accordion title="Can I customize the styles?" isDefaultOpen>
        Absolutely. Every component accepts a className prop and uses CSS
        variables for theming, making customization straightforward.
      </Accordion>
    </div>
  ),
};

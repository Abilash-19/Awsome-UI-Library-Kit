// src/components/Modal/Modal.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Modal } from "./Modal";
import { Button } from "../Button";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A fully accessible modal component with backdrop, keyboard controls, and focus management.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Controls modal visibility",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Modal size preset",
    },
    showCloseButton: {
      control: "boolean",
      description: "Show/hide close button",
    },
    preventBackdropClose: {
      control: "boolean",
      description: "Prevent closing on backdrop click",
    },
    preventEscapeClose: {
      control: "boolean",
      description: "Prevent closing on Escape key",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Wrapper component for stories
const ModalWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

// Default modal
export const Default: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "Modal Title",
    children: (
      <div>
        <p className="mb-4">
          This is a modal dialog. You can close it by clicking the close button,
          clicking outside, or pressing the Escape key.
        </p>
        <Button>Action Button</Button>
      </div>
    ),
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => {
    const [activeModal, setActiveModal] = useState<string | null>(null);

    return (
      <div className="flex gap-2">
        <Button onClick={() => setActiveModal("sm")}>Small</Button>
        <Button onClick={() => setActiveModal("md")}>Medium</Button>
        <Button onClick={() => setActiveModal("lg")}>Large</Button>
        <Button onClick={() => setActiveModal("xl")}>Extra Large</Button>

        <Modal
          isOpen={activeModal === "sm"}
          onClose={() => setActiveModal(null)}
          size="sm"
          title="Small Modal"
        >
          <p>This is a small modal (max-w-md)</p>
        </Modal>

        <Modal
          isOpen={activeModal === "md"}
          onClose={() => setActiveModal(null)}
          size="md"
          title="Medium Modal"
        >
          <p>This is a medium modal (max-w-lg) - the default size</p>
        </Modal>

        <Modal
          isOpen={activeModal === "lg"}
          onClose={() => setActiveModal(null)}
          size="lg"
          title="Large Modal"
        >
          <p>This is a large modal (max-w-2xl)</p>
        </Modal>

        <Modal
          isOpen={activeModal === "xl"}
          onClose={() => setActiveModal(null)}
          size="xl"
          title="Extra Large Modal"
        >
          <p>This is an extra large modal (max-w-4xl)</p>
        </Modal>
      </div>
    );
  },
};

// Without close button
export const NoCloseButton: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "No Close Button",
    showCloseButton: false,
    children: (
      <div>
        <p className="mb-4">
          This modal has no close button. You can still close it by clicking
          outside or pressing Escape.
        </p>
      </div>
    ),
  },
};

// Prevent backdrop close
export const PreventBackdropClose: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "Cannot Close on Backdrop Click",
    preventBackdropClose: true,
    children: (
      <div>
        <p className="mb-4">
          You cannot close this modal by clicking outside. Use the close button
          or press Escape.
        </p>
      </div>
    ),
  },
};

// Prevent all closes except button
export const ForceCloseButton: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "Must Use Close Button",
    preventBackdropClose: true,
    preventEscapeClose: true,
    children: (
      <div>
        <p className="mb-4">
          You must use the close button to close this modal. Backdrop click and
          Escape key are disabled.
        </p>
      </div>
    ),
  },
};

// Long content with scroll
export const LongContent: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "Modal with Long Content",
    children: (
      <div className="max-h-96 overflow-y-auto">
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} className="mb-4">
            Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
        ))}
      </div>
    ),
  },
};

// Confirmation dialog example
export const ConfirmationDialog: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleConfirm = () => {
      alert("Confirmed!");
      setIsOpen(false);
    };

    return (
      <>
        <Button variant="danger" onClick={() => setIsOpen(true)}>
          Delete Item
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Confirm Deletion"
          size="sm"
        >
          <div>
            <p className="mb-6">
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>
            <div className="flex gap-2 justify-end">
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleConfirm}>
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      </>
    );
  },
};

// Form inside modal
export const FormModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert("Form submitted!");
      setIsOpen(false);
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Add New Item</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Add New Item"
          size="md"
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Enter description"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Modal>
      </>
    );
  },
};

// Without title
export const NoTitle: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    children: (
      <div>
        <p className="mb-4">This modal has no title.</p>
      </div>
    ),
  },
};

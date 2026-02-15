import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';

const meta: Meta<typeof Modal> = {
    title: 'Components/Modal',
    component: Modal,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg', 'xl'],
        },
        showCloseButton: {
            control: 'boolean',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
    render: (args) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <>
                <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
                <Modal
                    {...args}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                >
                    <p>This is the modal content.</p>
                </Modal>
            </>
        );
    },
};

export const WithTitle: Story = {
    render: (args) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <>
                <Button onClick={() => setIsOpen(true)}>Open Modal with Title</Button>
                <Modal
                    {...args}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Modal Title"
                >
                    <p>This modal has a title.</p>
                </Modal>
            </>
        );
    },
};

export const Small: Story = {
    render: (args) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <>
                <Button onClick={() => setIsOpen(true)}>Open Small Modal</Button>
                <Modal
                    {...args}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Small Modal"
                    size="sm"
                >
                    <p>This is a small modal.</p>
                </Modal>
            </>
        );
    },
};

export const Large: Story = {
    render: (args) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <>
                <Button onClick={() => setIsOpen(true)}>Open Large Modal</Button>
                <Modal
                    {...args}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Large Modal"
                    size="lg"
                >
                    <p>
                        This is a large modal with more content. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                    </p>
                </Modal>
            </>
        );
    },
};

export const WithoutCloseButton: Story = {
    render: (args) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <>
                <Button onClick={() => setIsOpen(true)}>
                    Open Modal (No Close Button)
                </Button>
                <Modal
                    {...args}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="No Close Button"
                    showCloseButton={false}
                >
                    <div className="flex flex-col gap-4">
                        <p>This modal has no close button.</p>
                        <Button onClick={() => setIsOpen(false)}>Close</Button>
                    </div>
                </Modal>
            </>
        );
    },
};

export const ConfirmationDialog: Story = {
    render: (args) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <>
                <Button variant="danger" onClick={() => setIsOpen(true)}>
                    Delete Item
                </Button>
                <Modal
                    {...args}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Confirm Deletion"
                    size="sm"
                >
                    <div className="flex flex-col gap-4">
                        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
                        <div className="flex justify-end gap-2">
                            <Button variant="ghost" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={() => setIsOpen(false)}>
                                Delete
                            </Button>
                        </div>
                    </div>
                </Modal>
            </>
        );
    },
};

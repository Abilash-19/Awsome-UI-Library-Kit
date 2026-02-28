import type { Meta, StoryObj } from "@storybook/react-vite";
import Checkbox from "./Checkbox";
import { useState } from "react";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    loading: { control: "boolean" },
    indeterminate: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: "Accept terms and conditions",
    id: "terms",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Notifications",
    description: "Receive updates about new features and announcements.",
    id: "notifications",
  },
};

export const Playground: Story = {
  render: () => {
    const [checkedItems, setCheckedItems] = useState({
      item1: false,
      item2: false,
      item3: false,
    });

    const allChecked = Object.values(checkedItems).every(Boolean);
    const isIndeterminate =
      Object.values(checkedItems).some(Boolean) && !allChecked;

    const handleToggleAll = (checked: boolean) => {
      setCheckedItems({
        item1: checked,
        item2: checked,
        item3: checked,
      });
    };

    const handleToggleItem =
      (item: keyof typeof checkedItems) => (checked: boolean) => {
        setCheckedItems((prev) => ({ ...prev, [item]: checked }));
      };

    return (
      <div className="flex flex-col gap-0 p-1 border rounded-2xl shadow-xl bg-white min-w-[360px] overflow-hidden">
        <div className="p-4 bg-gray-50/50 border-b">
          <h4 className="text-sm font-bold text-gray-900 mb-1">
            Email Preferences
          </h4>
          <p className="text-xs text-gray-500 mb-4">
            Manage how you receive updates and alerts.
          </p>

          <Checkbox
            label="Enable all notifications"
            id="select-all"
            checked={allChecked}
            indeterminate={isIndeterminate}
            onChange={handleToggleAll}
            className="font-semibold"
          />
        </div>
        <div className="flex flex-col p-4 bg-white divide-y divide-gray-100">
          <div className="py-3">
            <Checkbox
              label="Product Updates"
              description="New features and improvements."
              id="item-1"
              checked={checkedItems.item1}
              onChange={handleToggleItem("item1")}
            />
          </div>
          <div className="py-3">
            <Checkbox
              label="Security Alerts"
              description="Important security and account notifications."
              id="item-2"
              checked={checkedItems.item2}
              onChange={handleToggleItem("item2")}
            />
          </div>
          <div className="py-3">
            <Checkbox
              label="Marketing Emails"
              description="Special offers and promotional content."
              id="item-3"
              checked={checkedItems.item3}
              onChange={handleToggleItem("item3")}
            />
          </div>
        </div>
        <div className="p-4 bg-gray-50/50 border-t flex justify-end gap-2">
          <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900">
            Cancel
          </button>
          <button className="px-3 py-1.5 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition-all">
            Save Changes
          </button>
        </div>
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-12 p-8 max-w-4xl">
      <section className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Standard Sizes</h3>
          <p className="text-sm text-gray-500 mt-1">
            Consistency across different scales.
          </p>
        </div>
        <div className="flex items-end gap-12 p-6 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <div className="flex flex-col items-center gap-3">
            <Checkbox size="small" label="Small" id="size-small" />
            <span className="text-[10px] font-mono text-gray-400">
              14px font
            </span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Checkbox size="medium" label="Medium" id="size-medium" />
            <span className="text-[10px] font-mono text-gray-400">
              14px font
            </span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Checkbox size="large" label="Large" id="size-large" />
            <span className="text-[10px] font-mono text-gray-400">
              16px font
            </span>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            Interaction States
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Visual feedback for every user action.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="p-4 rounded-lg border bg-white shadow-sm space-y-4">
            <h4 className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
              Basic
            </h4>
            <div className="space-y-3">
              <Checkbox label="Idle" id="state-idle" />
              <Checkbox label="Checked" checked id="state-checked" />
              <Checkbox
                label="Indeterminate"
                indeterminate
                id="state-indeterminate"
              />
            </div>
          </div>
          <div className="p-4 rounded-lg border bg-white shadow-sm space-y-4">
            <h4 className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
              Disabled
            </h4>
            <div className="space-y-3">
              <Checkbox label="Disabled Idle" disabled id="state-disabled" />
              <Checkbox
                label="Disabled Checked"
                disabled
                checked
                id="state-disabled-checked"
              />
              <Checkbox
                label="Disabled Loading"
                disabled
                loading
                id="state-disabled-loading"
              />
            </div>
          </div>
          <div className="p-4 rounded-lg border bg-white shadow-sm space-y-4">
            <h4 className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
              Feedback
            </h4>
            <div className="space-y-3">
              <Checkbox
                label="Error State"
                error
                description="This selection is required"
                id="state-error"
              />
              <Checkbox
                label="Loading State"
                loading
                description="Saving changes..."
                id="state-loading"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Content Layouts</h3>
          <p className="text-sm text-gray-500 mt-1">
            Combining labels with helper text and descriptions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl border border-gray-100 bg-white">
            <Checkbox
              label="Marketing Communications"
              description="I would like to receive update emails about product features and exclusive offers."
              id="layout-1"
            />
          </div>
          <div className="p-6 rounded-xl border border-gray-100 bg-white">
            <Checkbox
              size="large"
              label="Accept Privacy Policy"
              id="layout-2"
            />
          </div>
        </div>
      </section>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    loading: true,
    label: "Loading state",
    description: "This will show a skeleton loader.",
  },
};

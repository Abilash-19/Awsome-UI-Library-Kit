import React, { useState } from "react";
import { Dropdown } from "@/components/Dropdown/Dropdown";
import { Badge } from "@/components/Badge";

export const BasicDemo: React.FC = () => {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-3 w-full max-w-sm">
      <Dropdown
        label="Framework"
        required
        zIndex={1}
        placeholder="Pick a framework"
        options={[
          { label: "React", value: "react" },
          { label: "Vue", value: "vue" },
          { label: "Svelte", value: "svelte" },
          { label: "Angular", value: "angular" },
        ]}
        selectedValue={value}
        onChange={setValue}
      />
      {value && (
        <Badge variant="success" size="small">
          Selected: {value}
        </Badge>
      )}
    </div>
  );
};

export const IconDemo: React.FC = () => {
  const [value, setValue] = useState("");

  return (
    <div className="w-full max-w-sm">
      <Dropdown
        label="Payment Method"
        placeholder="Select payment"
        zIndex={1}
        selectedValue={value}
        onChange={setValue}
        options={[
          {
            label: "Credit Card",
            value: "card",
            icon: (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
            ),
          },
          {
            label: "Bank Transfer",
            value: "bank",
            icon: (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            ),
          },
          {
            label: "Crypto",
            value: "crypto",
            icon: (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            ),
            disabled: true,
          },
        ]}
      />
    </div>
  );
};

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Germany",
  "France",
  "Japan",
  "Australia",
  "Brazil",
  "India",
  "South Korea",
  "Mexico",
  "Italy",
  "Spain",
  "Netherlands",
  "Sweden",
  "Norway",
  "Switzerland",
  "Singapore",
  "New Zealand",
  "Argentina",
];

export const ScrollDemo: React.FC = () => {
  const [value, setValue] = useState("");

  return (
    <div className="w-full max-w-sm">
      <Dropdown
        label="Country"
        placeholder="Select country"
        zIndex={1}
        selectedValue={value}
        onChange={setValue}
        options={COUNTRIES.map((c) => ({
          label: c,
          value: c.toLowerCase().replace(/\s+/g, "-"),
        }))}
      />
    </div>
  );
};

export const SearchDemo: React.FC = () => {
  const [value, setValue] = useState("");

  return (
    <div className="w-full max-w-sm">
      <Dropdown
        label="Country"
        placeholder="Search & select country"
        zIndex={1}
        searchable
        searchPlaceholder="Type to filter..."
        selectedValue={value}
        onChange={setValue}
        options={COUNTRIES.map((c) => ({
          label: c,
          value: c.toLowerCase().replace(/\s+/g, "-"),
        }))}
      />
    </div>
  );
};

export const SizesDemo: React.FC = () => (
  <div className="flex items-end gap-4 flex-wrap">
    <div className="w-32">
      <Dropdown
        size="sm"
        label="Small"
        zIndex={1}
        placeholder="Select..."
        options={[
          { label: "Option A", value: "a" },
          { label: "Option B", value: "b" },
        ]}
      />
    </div>
    <div className="w-40">
      <Dropdown
        size="md"
        label="Medium"
        zIndex={1}
        placeholder="Select..."
        options={[
          { label: "Option A", value: "a" },
          { label: "Option B", value: "b" },
        ]}
      />
    </div>
    <div className="w-48">
      <Dropdown
        size="lg"
        label="Large"
        zIndex={1}
        placeholder="Select..."
        options={[
          { label: "Option A", value: "a" },
          { label: "Option B", value: "b" },
        ]}
      />
    </div>
  </div>
);

export const StatesDemo: React.FC = () => (
  <div className="space-y-4 w-full max-w-sm">
    <Dropdown
      label="With Error"
      error="Please select a carrier"
      zIndex={1}
      placeholder="Select carrier"
      options={[
        { label: "FedEx", value: "fedex" },
        { label: "UPS", value: "ups" },
      ]}
    />
    <Dropdown
      disabled
      label="Disabled"
      zIndex={1}
      selectedValue="locked"
      options={[{ label: "Locked Option", value: "locked" }]}
    />
    <Dropdown isLoading label="Loading..." options={[]} />
  </div>
);

"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/data-display/card/Card";
import { FormField } from "@/components/forms/form-field/FormField";
import { AdvancedSelect, SelectOption, SelectGroup } from "@/components/forms/advanced-select/AdvancedSelect";
import { UserIcon, BoltIcon, FolderIcon } from "@/icons";

// Sample data
const countries: SelectOption[] = [
  { value: "us", label: "United States", description: "North America" },
  { value: "uk", label: "United Kingdom", description: "Europe" },
  { value: "ca", label: "Canada", description: "North America" },
  { value: "au", label: "Australia", description: "Oceania" },
  { value: "de", label: "Germany", description: "Europe" },
  { value: "fr", label: "France", description: "Europe" },
  { value: "jp", label: "Japan", description: "Asia" },
  { value: "cn", label: "China", description: "Asia" },
  { value: "br", label: "Brazil", description: "South America" },
  { value: "in", label: "India", description: "Asia" },
];

const groupedCountries: SelectGroup[] = [
  {
    label: "North America",
    options: [
      { value: "us", label: "United States" },
      { value: "ca", label: "Canada" },
      { value: "mx", label: "Mexico" },
    ],
  },
  {
    label: "Europe",
    options: [
      { value: "uk", label: "United Kingdom" },
      { value: "de", label: "Germany" },
      { value: "fr", label: "France" },
      { value: "it", label: "Italy" },
    ],
  },
  {
    label: "Asia",
    options: [
      { value: "jp", label: "Japan" },
      { value: "cn", label: "China" },
      { value: "in", label: "India" },
    ],
  },
];

const roles: SelectOption[] = [
  { value: "admin", label: "Administrator", icon: <BoltIcon className="w-4 h-4" /> },
  { value: "editor", label: "Editor", icon: <FolderIcon className="w-4 h-4" /> },
  { value: "viewer", label: "Viewer", icon: <UserIcon className="w-4 h-4" /> },
];

const asyncUsers: SelectOption[] = [
  { value: "1", label: "Alice Johnson", description: "alice@example.com" },
  { value: "2", label: "Bob Smith", description: "bob@example.com" },
  { value: "3", label: "Carol Williams", description: "carol@example.com" },
];

export default function AdvancedSelectPage() {
  // Single select states
  const [country, setCountry] = useState<string>("");
  const [role, setRole] = useState<string>("");

  // Multi select states
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Async loading state
  const [asyncLoading, setAsyncLoading] = useState(false);
  const [asyncUsers, setAsyncUsers] = useState<string[]>([]);

  // Handlers for multi-select
  const handleCountriesChange = (val: string | string[]) => {
    if (Array.isArray(val)) setSelectedCountries(val);
  };

  const handleTagsChange = (val: string | string[]) => {
    if (Array.isArray(val)) setSelectedTags(val);
  };

  const handleAsyncUsersChange = (val: string | string[]) => {
    if (Array.isArray(val)) setAsyncUsers(val);
  };

  // Simulate async loading
  useEffect(() => {
    if (asyncLoading) {
      const timer = setTimeout(() => {
        setAsyncLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [asyncLoading]);

  const tags: SelectOption[] = [
    { value: "react", label: "React" },
    { value: "typescript", label: "TypeScript" },
    { value: "nextjs", label: "Next.js" },
    { value: "tailwind", label: "Tailwind CSS" },
    { value: "node", label: "Node.js" },
    { value: "python", label: "Python" },
    { value: "graphql", label: "GraphQL" },
    { value: "docker", label: "Docker" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Advanced Select</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Feature-rich select component with search, multi-select, async loading, and grouped options
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Single Select with Search */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Single Select with Search</h3>
            <p className="text-sm text-gray-500">Search through options and select one</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField label="Select Country">
              <AdvancedSelect
                value={country}
                onChange={(val) => setCountry(val as string)}
                options={countries}
                placeholder="Choose a country..."
                searchable
              />
            </FormField>
            <div className="text-sm text-gray-500">
              Selected: <span className="font-medium text-gray-900 dark:text-white">{country || "None"}</span>
            </div>
          </CardContent>
        </Card>

        {/* Single Select with Icons */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Single Select with Icons</h3>
            <p className="text-sm text-gray-500">Options with custom icons</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField label="Select Role">
              <AdvancedSelect
                value={role}
                onChange={(val) => setRole(val as string)}
                options={roles}
                placeholder="Choose a role..."
                searchable
              />
            </FormField>
            <div className="text-sm text-gray-500">
              Selected: <span className="font-medium text-gray-900 dark:text-white">{role || "None"}</span>
            </div>
          </CardContent>
        </Card>

        {/* Grouped Options */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Grouped Options</h3>
            <p className="text-sm text-gray-500">Options organized by category</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField label="Select Country (Grouped)">
              <AdvancedSelect
                value={country}
                onChange={(val) => setCountry(val as string)}
                options={groupedCountries}
                placeholder="Choose a country..."
                searchable
              />
            </FormField>
          </CardContent>
        </Card>

        {/* Multi Select */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Multi Select</h3>
            <p className="text-sm text-gray-500">Select multiple options with tags</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField label="Select Countries">
              <AdvancedSelect
                value={selectedCountries}
                onChange={handleCountriesChange}
                options={countries}
                placeholder="Choose countries..."
                searchable
                multiple
              />
            </FormField>
            <div className="text-sm text-gray-500">
              Selected: <span className="font-medium text-gray-900 dark:text-white">
                {selectedCountries.length || "None"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Multi Select with Max */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Multi Select with Limit</h3>
            <p className="text-sm text-gray-500">Maximum 3 selections allowed</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField label="Select Tags (max 3)">
              <AdvancedSelect
                value={selectedTags}
                onChange={handleTagsChange}
                options={tags}
                placeholder="Choose tags..."
                searchable
                multiple
                maxSelected={3}
              />
            </FormField>
            <div className="text-sm text-gray-500">
              Selected: <span className="font-medium text-gray-900 dark:text-white">
                {selectedTags.length || "None"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Async Loading */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Async Loading</h3>
            <p className="text-sm text-gray-500">Load options asynchronously</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField label="Search Users">
              <AdvancedSelect
                value={asyncUsers}
                onChange={handleAsyncUsersChange}
                options={asyncUsers.length === 0 && asyncLoading ? [] : asyncUsers.length > 0 ? [
                  { value: "1", label: "Alice Johnson" },
                  { value: "2", label: "Bob Smith" },
                  { value: "3", label: "Carol Williams" },
                ] : []}
                placeholder="Search users..."
                searchable
                multiple
                loading={asyncLoading}
                loadingMessage="Loading users..."
                noOptionsMessage="No users found"
              />
            </FormField>
            <div className="flex gap-2">
              <button
                onClick={() => setAsyncLoading(true)}
                className="px-3 py-1.5 text-sm bg-brand-500 text-white rounded-md hover:bg-brand-600"
              >
                Simulate Load
              </button>
              <button
                onClick={() => setAsyncUsers([])}
                className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Clear
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Disabled State */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Disabled State</h3>
            <p className="text-sm text-gray-500">Select in disabled mode</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField label="Disabled Select">
              <AdvancedSelect
                value="us"
                options={countries}
                placeholder="Choose a country..."
                disabled
              />
            </FormField>
            <FormField label="Disabled Multi Select">
              <AdvancedSelect
                value={["us", "uk"]}
                options={countries}
                placeholder="Choose countries..."
                multiple
                disabled
              />
            </FormField>
          </CardContent>
        </Card>

        {/* Error State */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Error State</h3>
            <p className="text-sm text-gray-500">Select with validation error</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField label="Required Select" error="This field is required">
              <AdvancedSelect
                value=""
                options={countries}
                placeholder="Choose a country..."
                error
              />
            </FormField>
          </CardContent>
        </Card>

        {/* Sizes */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Sizes</h3>
            <p className="text-sm text-gray-500">Different select sizes</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <AdvancedSelect
              value=""
              options={countries}
              placeholder="Small size"
              size="sm"
            />
            <AdvancedSelect
              value=""
              options={countries}
              placeholder="Medium size (default)"
              size="md"
            />
            <AdvancedSelect
              value=""
              options={countries}
              placeholder="Large size"
              size="lg"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

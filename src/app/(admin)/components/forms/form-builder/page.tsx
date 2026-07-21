"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/data-display/card/Card";
import { FormBuilder, FormSchema, createField } from "@/components/forms/form-builder/FormBuilder";
import { ToastProvider, useToastHelpers } from "@/components/overlay/toast/Toast";

// Sample form schema
const sampleSchema: FormSchema = {
  sections: [
    {
      id: "personal",
      title: "Personal Information",
      description: "Tell us about yourself",
      fields: [
        createField("text", "firstName", "First Name", {
          placeholder: "John",
          validation: { required: true, minLength: 2 },
        }),
        createField("text", "lastName", "Last Name", {
          placeholder: "Doe",
          validation: { required: true, minLength: 2 },
        }),
        createField("email", "email", "Email Address", {
          placeholder: "john@example.com",
          validation: { required: true },
        }),
        createField("phone", "phone", "Phone Number", {
          placeholder: "+1 (555) 000-0000",
        }),
        createField("select", "country", "Country", {
          placeholder: "Select a country",
          options: [
            { label: "United States", value: "us" },
            { label: "Canada", value: "ca" },
            { label: "United Kingdom", value: "uk" },
            { label: "Germany", value: "de" },
            { label: "France", value: "fr" },
            { label: "Japan", value: "jp" },
          ],
        }),
        createField("date", "birthdate", "Date of Birth", {
          validation: { required: true },
        }),
        createField("textarea", "bio", "Bio", {
          placeholder: "Tell us a little about yourself...",
          validation: { maxLength: 500 },
        }),
      ],
    },
    {
      id: "account",
      title: "Account Settings",
      description: "Configure your account",
      fields: [
        createField("text", "username", "Username", {
          placeholder: "johndoe",
          validation: { required: true, minLength: 3, maxLength: 20 },
        }),
        createField("password", "password", "Password", {
          placeholder: "Enter password",
          validation: { required: true, minLength: 8 },
        }),
        createField("password", "confirmPassword", "Confirm Password", {
          placeholder: "Confirm password",
          validation: { required: true },
        }),
        createField("switch", "notifications", "Enable Notifications", {
          placeholder: "Receive email notifications",
          defaultValue: true,
        }),
        createField("checkbox", "terms", "Terms & Conditions", {
          placeholder: "I agree to the Terms of Service",
          validation: { required: true },
        }),
      ],
    },
    {
      id: "preferences",
      title: "Preferences",
      description: "Customize your experience",
      fields: [
        createField("multiselect", "interests", "Interests", {
          placeholder: "Select your interests",
          options: [
            { label: "Technology", value: "tech" },
            { label: "Design", value: "design" },
            { label: "Marketing", value: "marketing" },
            { label: "Finance", value: "finance" },
            { label: "Healthcare", value: "healthcare" },
            { label: "Education", value: "education" },
          ],
        }),
        createField("radio", "theme", "Theme", {
          options: [
            { label: "Light", value: "light" },
            { label: "Dark", value: "dark" },
            { label: "System", value: "system" },
          ],
        }),
        createField("range", "volume", "Volume", {
          validation: { min: 0, max: 100 },
          defaultValue: 50,
        }),
        createField("color", "accentColor", "Accent Color", {
          defaultValue: "#3b82f6",
        }),
        createField("select", "language", "Language", {
          placeholder: "Select language",
          options: [
            { label: "English", value: "en" },
            { label: "Spanish", value: "es" },
            { label: "French", value: "fr" },
            { label: "German", value: "de" },
            { label: "Japanese", value: "ja" },
          ],
          defaultValue: "en",
        }),
      ],
    },
  ],
};

function FormBuilderDemo() {
  const toast = useToastHelpers();
  const [submittedData, setSubmittedData] = useState<Record<string, unknown> | null>(null);

  const handleSubmit = (data: Record<string, unknown>) => {
    setSubmittedData(data);
    toast.success("Form Submitted", "Your information has been saved successfully");
    console.log("Form submitted:", data);
  };

  const handleChange = (data: Record<string, unknown>) => {
    console.log("Form changed:", data);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Form Builder</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Dynamic form generation with validation and multiple field types
        </p>
      </div>

      {/* Main Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Registration Form</h3>
              <p className="text-sm text-gray-500">Fill out the form below</p>
            </CardHeader>
            <CardContent>
              <FormBuilder
                schema={sampleSchema}
                onSubmit={handleSubmit}
                onChange={handleChange}
                submitLabel="Create Account"
                resetLabel="Clear Form"
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Field Types */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Field Types</h3>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500" />
                  Text / Email / Password
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500" />
                  Number / Phone / URL
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500" />
                  Textarea
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500" />
                  Select / Multi-select
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500" />
                  Radio / Checkbox
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500" />
                  Switch (toggle)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500" />
                  Date / Time / DateTime
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500" />
                  Color picker
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500" />
                  Range slider
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500" />
                  File upload
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Features</h3>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success-500" />
                  Real-time validation
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success-500" />
                  Required field markers
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success-500" />
                  Error messages
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success-500" />
                  Help text
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success-500" />
                  Disabled state
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success-500" />
                  Section grouping
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success-500" />
                  Responsive grid
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success-500" />
                  Dark mode support
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Validation Rules */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Validation Rules</h3>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>• required</li>
                <li>• minLength / maxLength</li>
                <li>• min / max (numbers)</li>
                <li>• pattern (regex)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Submitted Data */}
      {submittedData && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Submitted Data</h3>
            <p className="text-sm text-gray-500">This is the data that was submitted</p>
          </CardHeader>
          <CardContent>
            <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto text-sm">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function FormBuilderPage() {
  return (
    <ToastProvider position="top-right">
      <FormBuilderDemo />
    </ToastProvider>
  );
}

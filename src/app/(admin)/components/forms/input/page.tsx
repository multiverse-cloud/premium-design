"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/data-display/card/Card";
import { Input } from "@/components/forms/input/Input";
import { FormField } from "@/components/forms/form-field/FormField";

export default function InputPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Input</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Text input component for collecting user data
        </p>
      </div>

      {/* Variants */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Input Variants</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField label="Default Input">
            <Input placeholder="Enter text..." />
          </FormField>
          
          <FormField label="Disabled Input">
            <Input placeholder="Disabled" disabled />
          </FormField>
          
          <FormField label="Input with Error">
            <Input placeholder="Error state" error />
          </FormField>
        </CardContent>
      </Card>

      {/* Sizes */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Input Sizes</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField label="Small">
            <Input placeholder="Small input" inputSize="sm" />
          </FormField>
          
          <FormField label="Medium (Default)">
            <Input placeholder="Medium input" inputSize="md" />
          </FormField>
          
          <FormField label="Large">
            <Input placeholder="Large input" inputSize="lg" />
          </FormField>
        </CardContent>
      </Card>

      {/* With Prefix/Suffix */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">With Prefix & Suffix</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField label="With Prefix">
            <Input placeholder="Search..." prefix={<span>🔍</span>} />
          </FormField>
          
          <FormField label="With Suffix">
            <Input placeholder="Enter email" suffix={<span>@</span>} />
          </FormField>
        </CardContent>
      </Card>
    </div>
  );
}

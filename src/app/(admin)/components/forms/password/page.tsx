"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/data-display/card/Card";
import { PasswordInput } from "@/components/forms/password-input/PasswordInput";
import { FormField } from "@/components/forms/form-field/FormField";

export default function PasswordInputPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Password Input</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Password input with show/hide toggle
        </p>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Password Input Examples</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField label="Password">
            <PasswordInput placeholder="Enter password" />
          </FormField>
          
          <FormField label="Disabled">
            <PasswordInput placeholder="Disabled" disabled />
          </FormField>
        </CardContent>
      </Card>
    </div>
  );
}

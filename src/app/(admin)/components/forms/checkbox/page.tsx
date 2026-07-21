"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/data-display/card/Card";
import { Checkbox } from "@/components/forms/checkbox/Checkbox";

export default function CheckboxPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Checkbox</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Checkbox input component for boolean selections
        </p>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Checkbox Examples</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Checkbox label="Accept terms and conditions" />
            <Checkbox label="Subscribe to newsletter" defaultChecked />
            <Checkbox label="Disabled option" disabled />
            <Checkbox label="Disabled checked" disabled defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

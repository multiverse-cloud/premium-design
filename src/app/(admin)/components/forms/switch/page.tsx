"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/data-display/card/Card";
import { Switch } from "@/components/forms/switch/Switch";

export default function SwitchPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Switch</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Toggle switch component for on/off states
        </p>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Switch Examples</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <Switch label="Enable notifications" />
          <Switch label="Dark mode" />
          <Switch label="Auto-save" defaultChecked />
          <Switch label="Disabled switch" disabled />
        </CardContent>
      </Card>
    </div>
  );
}

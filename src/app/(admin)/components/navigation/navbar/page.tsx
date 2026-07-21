"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/data-display/card/Card";

export default function NavbarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Navbar</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Navigation header component
        </p>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Navbar Component</h3>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            The navbar is shown in the top header of the dashboard. 
            It includes search, notifications, user menu, and other header actions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

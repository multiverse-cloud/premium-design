"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/data-display/card/Card";

export default function SidebarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Sidebar</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Navigation sidebar component (see the main sidebar in the layout)
        </p>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Sidebar Component</h3>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            The sidebar navigation is shown in the left side of the dashboard layout. 
            It includes collapsible submenus, active state indicators, and responsive behavior.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

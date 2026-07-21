"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/data-display/card/Card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from "@/components/data-display/breadcrumb/Breadcrumb";

export default function BreadcrumbPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Breadcrumb</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Navigation breadcrumb component
        </p>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Breadcrumb Examples</h3>
        </CardHeader>
        <CardContent>
          <Breadcrumb>
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem href="/components">Components</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem isCurrentPage>Breadcrumb</BreadcrumbItem>
          </Breadcrumb>
        </CardContent>
      </Card>
    </div>
  );
}

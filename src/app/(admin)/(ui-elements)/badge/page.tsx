import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Badge from "@/components/ui/badge/Badge";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Badge",
  description: "Verdant premium analytics dashboard",
};

export default function BadgePage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Badges" />
      <div className="space-y-5 sm:space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="px-6 py-5">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Light Background</h3>
          </div>
          <div className="flex flex-wrap gap-4 p-6 border-t border-gray-100 dark:border-gray-800 xl:p-10 sm:items-center sm:justify-center">
            <Badge variant="light" color="primary">Primary</Badge>
            <Badge variant="light" color="success">Success</Badge>
            <Badge variant="light" color="error">Error</Badge>
            <Badge variant="light" color="warning">Warning</Badge>
            <Badge variant="light" color="info">Info</Badge>
            <Badge variant="light" color="gray">Gray</Badge>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="px-6 py-5">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Solid Background</h3>
          </div>
          <div className="flex flex-wrap gap-4 p-6 border-t border-gray-100 dark:border-gray-800 xl:p-10 sm:items-center sm:justify-center">
            <Badge variant="solid" color="primary">Primary</Badge>
            <Badge variant="solid" color="success">Success</Badge>
            <Badge variant="solid" color="error">Error</Badge>
            <Badge variant="solid" color="warning">Warning</Badge>
            <Badge variant="solid" color="info">Info</Badge>
            <Badge variant="solid" color="gray">Gray</Badge>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="px-6 py-5">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Gradient Background</h3>
          </div>
          <div className="flex flex-wrap gap-4 p-6 border-t border-gray-100 dark:border-gray-800 xl:p-10 sm:items-center sm:justify-center">
            <Badge variant="gradient" color="primary">Primary</Badge>
            <Badge variant="gradient" color="success">Success</Badge>
            <Badge variant="gradient" color="error">Error</Badge>
            <Badge variant="gradient" color="warning">Warning</Badge>
            <Badge variant="gradient" color="info">Info</Badge>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="px-6 py-5">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Outline Background</h3>
          </div>
          <div className="flex flex-wrap gap-4 p-6 border-t border-gray-100 dark:border-gray-800 xl:p-10 sm:items-center sm:justify-center">
            <Badge variant="outline" color="primary">Primary</Badge>
            <Badge variant="outline" color="success">Success</Badge>
            <Badge variant="outline" color="error">Error</Badge>
            <Badge variant="outline" color="warning">Warning</Badge>
            <Badge variant="outline" color="info">Info</Badge>
            <Badge variant="outline" color="gray">Gray</Badge>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="px-6 py-5">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">With Dot</h3>
          </div>
          <div className="flex flex-wrap gap-4 p-6 border-t border-gray-100 dark:border-gray-800 xl:p-10 sm:items-center sm:justify-center">
            <Badge variant="light" color="primary" dot>Primary</Badge>
            <Badge variant="light" color="success" dot>Success</Badge>
            <Badge variant="light" color="error" dot>Error</Badge>
            <Badge variant="light" color="warning" dot>Warning</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}

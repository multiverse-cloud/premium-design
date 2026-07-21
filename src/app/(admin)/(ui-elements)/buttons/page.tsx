import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Button from "@/components/ui/button/Button";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Buttons",
  description: "Verdant premium analytics dashboard",
};

export default function Buttons() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Buttons" />
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title="Solid Buttons">
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm" variant="solid">Small</Button>
            <Button size="md" variant="solid">Medium</Button>
            <Button size="lg" variant="solid">Large</Button>
          </div>
        </ComponentCard>

        <ComponentCard title="Outline Buttons">
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm" variant="outline">Small</Button>
            <Button size="md" variant="outline">Medium</Button>
            <Button size="lg" variant="outline">Large</Button>
          </div>
        </ComponentCard>

        <ComponentCard title="Ghost Buttons">
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm" variant="ghost">Small</Button>
            <Button size="md" variant="ghost">Medium</Button>
            <Button size="lg" variant="ghost">Large</Button>
          </div>
        </ComponentCard>

        <ComponentCard title="Soft Buttons">
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm" variant="soft">Small</Button>
            <Button size="md" variant="soft">Medium</Button>
            <Button size="lg" variant="soft">Large</Button>
          </div>
        </ComponentCard>

        <ComponentCard title="Gradient Buttons">
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm" variant="gradient">Small</Button>
            <Button size="md" variant="gradient">Medium</Button>
            <Button size="lg" variant="gradient">Large</Button>
          </div>
        </ComponentCard>

        <ComponentCard title="Color Variants">
          <div className="flex flex-wrap items-center gap-4">
            <Button color="brand">Brand</Button>
            <Button color="success">Success</Button>
            <Button color="error">Error</Button>
            <Button color="warning">Warning</Button>
            <Button color="gray">Gray</Button>
          </div>
        </ComponentCard>

        <ComponentCard title="Disabled Buttons">
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm" disabled>Disabled</Button>
            <Button size="md" disabled>Disabled</Button>
            <Button size="lg" disabled>Disabled</Button>
          </div>
        </ComponentCard>

        <ComponentCard title="Link Buttons">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="link">Link Text</Button>
          </div>
        </ComponentCard>
      </div>
    </div>
  );
}

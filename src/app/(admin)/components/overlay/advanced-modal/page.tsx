"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/data-display/card/Card";
import { Button } from "@/components/ui/button/Button";
import { AdvancedModal, ConfirmDialog, AlertDialog, Drawer } from "@/components/overlay/modal/AdvancedModal";
import { FormField } from "@/components/forms/form-field/FormField";
import { Input } from "@/components/forms/input/Input";

export default function AdvancedModalPage() {
  // Modal states
  const [basicModalOpen, setBasicModalOpen] = useState(false);
  const [sizesModalOpen, setSizesModalOpen] = useState<string | null>(null);
  const [positionModalOpen, setPositionModalOpen] = useState<string | null>(null);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [warningConfirmOpen, setWarningConfirmOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({ name: "", email: "" });

  // Confirmation handler
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleConfirm = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
      setConfirmDialogOpen(false);
    }, 1500);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Advanced Modal</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Feature-rich modal component with confirmations, alerts, and drawer variants
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Modal */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Basic Modal</h3>
            <p className="text-sm text-gray-500">Simple modal with title, description, and footer</p>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setBasicModalOpen(true)}>
              Open Basic Modal
            </Button>
          </CardContent>
        </Card>

        {/* Sizes */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Modal Sizes</h3>
            <p className="text-sm text-gray-500">Available sizes: xs, sm, md, lg, xl, full</p>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => setSizesModalOpen("xs")}>XS</Button>
            <Button variant="outline" size="sm" onClick={() => setSizesModalOpen("sm")}>SM</Button>
            <Button variant="outline" size="sm" onClick={() => setSizesModalOpen("md")}>MD</Button>
            <Button variant="outline" size="sm" onClick={() => setSizesModalOpen("lg")}>LG</Button>
            <Button variant="outline" size="sm" onClick={() => setSizesModalOpen("xl")}>XL</Button>
            <Button variant="outline" size="sm" onClick={() => setSizesModalOpen("full")}>Full</Button>
          </CardContent>
        </Card>

        {/* Positions */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Modal Positions</h3>
            <p className="text-sm text-gray-500">Center, top, or bottom-right positioning</p>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => setPositionModalOpen("center")}>Center</Button>
            <Button variant="outline" onClick={() => setPositionModalOpen("top")}>Top</Button>
            <Button variant="outline" onClick={() => setPositionModalOpen("bottom-right")}>Bottom Right</Button>
          </CardContent>
        </Card>

        {/* Form Modal */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Form Modal</h3>
            <p className="text-sm text-gray-500">Modal with form content and validation</p>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setFormModalOpen(true)}>
              Open Form Modal
            </Button>
          </CardContent>
        </Card>

        {/* Confirm Dialogs */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Confirm Dialogs</h3>
            <p className="text-sm text-gray-500">Ask for confirmation before actions</p>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => setConfirmDialogOpen(true)}>
              Default Confirm
            </Button>
            <Button variant="outline" color="error" onClick={() => setDeleteConfirmOpen(true)}>
              Delete Confirm
            </Button>
            <Button variant="outline" color="warning" onClick={() => setWarningConfirmOpen(true)}>
              Warning Confirm
            </Button>
          </CardContent>
        </Card>

        {/* Alert Dialogs */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Alert Dialogs</h3>
            <p className="text-sm text-gray-500">Display informational alerts</p>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => setAlertOpen("info")}>Info</Button>
            <Button variant="outline" color="success" onClick={() => setAlertOpen("success")}>Success</Button>
            <Button variant="outline" color="warning" onClick={() => setAlertOpen("warning")}>Warning</Button>
            <Button variant="outline" color="error" onClick={() => setAlertOpen("error")}>Error</Button>
          </CardContent>
        </Card>

        {/* Drawers */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Right Drawer</h3>
            <p className="text-sm text-gray-500">Slide-in panel from the right</p>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setDrawerOpen(true)}>
              Open Right Drawer
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Left Drawer</h3>
            <p className="text-sm text-gray-500">Slide-in panel from the left</p>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setLeftDrawerOpen(true)}>
              Open Left Drawer
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Basic Modal */}
      <AdvancedModal
        open={basicModalOpen}
        onClose={() => setBasicModalOpen(false)}
        title="Basic Modal"
        description="This is a simple modal dialog with a title and description."
        footerActions={[
          { label: "Cancel", variant: "outline", onClick: () => setBasicModalOpen(false) },
          { label: "Confirm", variant: "solid", onClick: () => setBasicModalOpen(false) },
        ]}
      >
        <p className="text-gray-600 dark:text-gray-300">
          Modals are overlay dialogs that focus user attention on a specific task or information.
          They block interaction with the rest of the page until dismissed.
        </p>
      </AdvancedModal>

      {/* Size Modals */}
      {["xs", "sm", "md", "lg", "xl", "full"].map((size) => (
        <AdvancedModal
          key={size}
          open={sizesModalOpen === size}
          onClose={() => setSizesModalOpen(null)}
          title={`${size.toUpperCase()} Modal`}
          size={size as "xs" | "sm" | "md" | "lg" | "xl" | "full"}
          footerActions={[
            { label: "Close", variant: "outline", onClick: () => setSizesModalOpen(null) },
          ]}
        >
          <p className="text-gray-600 dark:text-gray-300">
            This is a {size.toUpperCase()} sized modal. Modals come in various sizes to accommodate different content needs.
          </p>
        </AdvancedModal>
      ))}

      {/* Position Modals */}
      {["center", "top", "bottom-right"].map((pos) => (
        <AdvancedModal
          key={pos}
          open={positionModalOpen === pos}
          onClose={() => setPositionModalOpen(null)}
          title={`${pos} Position Modal`}
          position={pos as "center" | "top" | "bottom-right"}
          footerActions={[
            { label: "Close", variant: "outline", onClick: () => setPositionModalOpen(null) },
          ]}
        >
          <p className="text-gray-600 dark:text-gray-300">
            This modal is positioned at the {pos.replace("-", " ")} of the viewport.
          </p>
        </AdvancedModal>
      ))}

      {/* Form Modal */}
      <AdvancedModal
        open={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        title="Create New User"
        description="Fill in the details below to create a new user account."
        size="md"
        footerActions={[
          { label: "Cancel", variant: "outline", onClick: () => setFormModalOpen(false) },
          { label: "Create User", variant: "solid", onClick: () => {
            console.log("Form submitted:", formData);
            setFormModalOpen(false);
          }},
        ]}
      >
        <div className="space-y-4">
          <FormField label="Full Name">
            <Input
              placeholder="Enter full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </FormField>
          <FormField label="Email Address">
            <Input
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </FormField>
          <FormField label="Role">
            <select className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500">
              <option value="">Select a role</option>
              <option value="admin">Administrator</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
          </FormField>
        </div>
      </AdvancedModal>

      {/* Confirm Dialogs */}
      <ConfirmDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={handleConfirm}
        title="Are you sure you want to continue?"
        message="This action will proceed with the operation. Please confirm to continue."
        confirmLabel="Continue"
        cancelLabel="Go Back"
        loading={confirmLoading}
      />

      <ConfirmDialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={() => setDeleteConfirmOpen(false)}
        title="Delete Item"
        message="This will permanently delete the selected item. This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
      />

      <ConfirmDialog
        open={warningConfirmOpen}
        onClose={() => setWarningConfirmOpen(false)}
        onConfirm={() => setWarningConfirmOpen(false)}
        title="Warning: Unsaved Changes"
        message="You have unsaved changes that will be lost if you leave this page."
        confirmLabel="Leave Anyway"
        cancelLabel="Stay Here"
        variant="warning"
      />

      {/* Alert Dialogs */}
      <AlertDialog
        open={alertOpen === "info"}
        onClose={() => setAlertOpen(null)}
        type="info"
        title="Information"
        message="This is an informational message for the user."
        buttonLabel="Got It"
      />

      <AlertDialog
        open={alertOpen === "success"}
        onClose={() => setAlertOpen(null)}
        type="success"
        title="Success"
        message="Your action was completed successfully!"
        buttonLabel="Continue"
      />

      <AlertDialog
        open={alertOpen === "warning"}
        onClose={() => setAlertOpen(null)}
        type="warning"
        title="Warning"
        message="Please review your changes before proceeding."
        buttonLabel="Review"
      />

      <AlertDialog
        open={alertOpen === "error"}
        onClose={() => setAlertOpen(null)}
        type="error"
        title="Error"
        message="Something went wrong. Please try again."
        buttonLabel="Try Again"
      />

      {/* Right Drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Notification Settings"
        description="Configure how you receive notifications."
        position="right"
        size="md"
        footerActions={[
          { label: "Cancel", variant: "outline", onClick: () => setDrawerOpen(false) },
          { label: "Save Changes", variant: "solid", onClick: () => setDrawerOpen(false) },
        ]}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Email Notifications</h4>
              <p className="text-sm text-gray-500">Receive email updates</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-brand-500 focus:ring-brand-500" />
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Push Notifications</h4>
              <p className="text-sm text-gray-500">Receive push notifications</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-brand-500 focus:ring-brand-500" />
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">SMS Notifications</h4>
              <p className="text-sm text-gray-500">Receive text messages</p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-brand-500 focus:ring-brand-500" />
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Marketing Emails</h4>
              <p className="text-sm text-gray-500">Receive promotional content</p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-brand-500 focus:ring-brand-500" />
          </div>
        </div>
      </Drawer>

      {/* Left Drawer */}
      <Drawer
        open={leftDrawerOpen}
        onClose={() => setLeftDrawerOpen(false)}
        title="Quick Actions"
        description="Navigate to common tasks."
        position="left"
        size="sm"
      >
        <div className="space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center">
              <span className="text-brand-600 dark:text-brand-400 font-semibold">+</span>
            </div>
            <div className="text-left">
              <h4 className="font-medium text-gray-900 dark:text-white">Create New</h4>
              <p className="text-sm text-gray-500">Start a new project</p>
            </div>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <div className="w-10 h-10 rounded-full bg-success-100 dark:bg-success-900 flex items-center justify-center">
              <span className="text-success-600 dark:text-success-400">&#10003;</span>
            </div>
            <div className="text-left">
              <h4 className="font-medium text-gray-900 dark:text-white">View Tasks</h4>
              <p className="text-sm text-gray-500">See your pending tasks</p>
            </div>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <div className="w-10 h-10 rounded-full bg-warning-100 dark:bg-warning-900 flex items-center justify-center">
              <span className="text-warning-600 dark:text-warning-400">!</span>
            </div>
            <div className="text-left">
              <h4 className="font-medium text-gray-900 dark:text-white">View Reports</h4>
              <p className="text-sm text-gray-500">Check analytics</p>
            </div>
          </button>
        </div>
      </Drawer>
    </div>
  );
}

"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/data-display/card/Card";
import { Button } from "@/components/ui/button/Button";
import { ToastProvider, useToastHelpers } from "@/components/overlay/toast/Toast";

function ToastDemo() {
  const toast = useToastHelpers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Toast Notifications</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Toast notification system with multiple types, positions, and features
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Toast Types */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Toast Types</h3>
            <p className="text-sm text-gray-500">Different notification types</p>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button variant="solid" color="success" onClick={() => toast.success("Success!", "Your changes have been saved.")}>
              Success
            </Button>
            <Button variant="solid" color="error" onClick={() => toast.error("Error!", "Something went wrong. Please try again.")}>
              Error
            </Button>
            <Button variant="solid" color="warning" onClick={() => toast.warning("Warning!", "This action may have consequences.")}>
              Warning
            </Button>
            <Button variant="solid" color="brand" onClick={() => toast.info("Info", "Here is some useful information.")}>
              Info
            </Button>
            <Button variant="outline" onClick={() => toast.loading("Loading...", "Processing your request...")}>
              Loading
            </Button>
          </CardContent>
        </Card>

        {/* With Action */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">With Action</h3>
            <p className="text-sm text-gray-500">Toast with action button</p>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() =>
                toast.success("File saved!", "Your file has been uploaded.", {
                  action: {
                    label: "View File",
                    onClick: () => console.log("View file clicked"),
                  },
                })
              }
            >
              With Action
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast.error("Delete failed", "The file could not be deleted.", {
                  action: {
                    label: "Retry",
                    onClick: () => console.log("Retry clicked"),
                  },
                })
              }
            >
              Error with Action
            </Button>
          </CardContent>
        </Card>

        {/* Custom Duration */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Custom Duration</h3>
            <p className="text-sm text-gray-500">Different auto-dismiss timings</p>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => toast.success("Quick!", "Disappears in 2 seconds.", { duration: 2000 })}
            >
              2 Seconds
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.info("Normal", "Disappears in 5 seconds.", { duration: 5000 })}
            >
              5 Seconds
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.info("Long", "Disappears in 10 seconds.", { duration: 10000 })}
            >
              10 Seconds
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.info("Persistent", "Click to dismiss.", { duration: 0 })}
            >
              Persistent (No Auto-dismiss)
            </Button>
          </CardContent>
        </Card>

        {/* Progress Bar */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Progress Bar</h3>
            <p className="text-sm text-gray-500">Visual countdown timer</p>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() =>
                toast.success("Progress", "With progress bar.", { progress: true, duration: 5000 })
              }
            >
              With Progress
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast.info("No Progress", "Without progress bar.", { progress: false })
              }
            >
              Without Progress
            </Button>
          </CardContent>
        </Card>

        {/* Combinations */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <h3 className="text-lg font-semibold">Complex Examples</h3>
            <p className="text-sm text-gray-500">Multiple options combined</p>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() =>
                toast.success("Payment Successful!", "Invoice #1234 has been paid.", {
                  duration: 8000,
                  progress: true,
                  action: {
                    label: "View Invoice",
                    onClick: () => console.log("View invoice"),
                  },
                })
              }
            >
              Payment Success
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast.error("Connection Lost", "Please check your internet connection.", {
                  duration: 0,
                  progress: true,
                  action: {
                    label: "Reconnect",
                    onClick: () => console.log("Reconnect"),
                  },
                })
              }
            >
              Connection Error
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast.warning("Storage Almost Full", "Only 2GB remaining. Consider upgrading your plan.", {
                  duration: 15000,
                  progress: true,
                  action: {
                    label: "Upgrade",
                    onClick: () => console.log("Upgrade"),
                  },
                })
              }
            >
              Storage Warning
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast.info("New Feature Available", "Dark mode is now available. Try it out!", {
                  duration: 10000,
                  progress: true,
                  action: {
                    label: "Enable Dark Mode",
                    onClick: () => console.log("Enable dark mode"),
                  },
                })
              }
            >
              Feature Announcement
            </Button>
          </CardContent>
        </Card>

        {/* Multiple Toasts */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Multiple Toasts</h3>
            <p className="text-sm text-gray-500">Stack multiple notifications</p>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              onClick={() => {
                toast.success("Task Completed", "Your export is ready.", { duration: 6000, progress: true });
                setTimeout(() => {
                  toast.info("New Comment", "Alice commented on your post.", { duration: 6000, progress: true });
                }, 500);
                setTimeout(() => {
                  toast.warning("Reminder", "Meeting starts in 15 minutes.", { duration: 6000, progress: true });
                }, 1000);
              }}
            >
              Trigger Multiple
            </Button>
          </CardContent>
        </Card>

        {/* Long Content */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Long Content</h3>
            <p className="text-sm text-gray-500">Toast with longer messages</p>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              onClick={() =>
                toast.info(
                  "Your export is being prepared",
                  "This may take a few minutes depending on the size of your data. You can close this notification and continue working. We will notify you when it's ready."
                )
              }
            >
              Long Message
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Features List */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Features</h3>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Multiple types: success, error, warning, info, loading
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Auto-dismiss with configurable duration
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Progress bar showing remaining time
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Action buttons for user interaction
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Pause on hover
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Stack multiple toasts (max 5 by default)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              6 position options: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Dark mode support
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500" />
              Smooth animations
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ToastPage() {
  return (
    <ToastProvider position="top-right">
      <ToastDemo />
    </ToastProvider>
  );
}

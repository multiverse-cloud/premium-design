"use client";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Alert from "@/components/ui/alert/Alert";
import React, { useState } from "react";

export default function Alerts() {
  const [showDismissible, setShowDismissible] = useState(true);

  return (
    <div>
      <PageBreadcrumb pageTitle="Alerts" />
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title="Success Alert">
          <div className="space-y-4">
            <Alert
              variant="success"
              title="Success Message"
              message="Your changes have been saved successfully."
              showLink={true}
              linkHref="/"
              linkText="Learn more"
            />
            <Alert
              variant="success"
              title="Success Message"
              message="Your changes have been saved successfully."
              showLink={false}
            />
          </div>
        </ComponentCard>
        <ComponentCard title="Warning Alert">
          <div className="space-y-4">
            <Alert
              variant="warning"
              title="Warning Message"
              message="Please review your changes before proceeding."
              showLink={true}
              linkHref="/"
              linkText="Learn more"
            />
            <Alert
              variant="warning"
              title="Warning Message"
              message="Please review your changes before proceeding."
              showLink={false}
            />
          </div>
        </ComponentCard>
        <ComponentCard title="Error Alert">
          <div className="space-y-4">
            <Alert
              variant="error"
              title="Error Message"
              message="Something went wrong. Please try again later."
              showLink={true}
              linkHref="/"
              linkText="Learn more"
            />
            <Alert
              variant="error"
              title="Error Message"
              message="Something went wrong. Please try again later."
              showLink={false}
            />
          </div>
        </ComponentCard>
        <ComponentCard title="Info Alert">
          <div className="space-y-4">
            <Alert
              variant="info"
              title="Info Message"
              message="New features have been added to your dashboard."
              showLink={true}
              linkHref="/"
              linkText="Learn more"
            />
            <Alert
              variant="info"
              title="Info Message"
              message="New features have been added to your dashboard."
              showLink={false}
            />
          </div>
        </ComponentCard>
        <ComponentCard title="Dismissible Alert">
          <div className="space-y-4">
            {showDismissible && (
              <Alert
                variant="success"
                title="Dismissible Alert"
                message="You can close this alert by clicking the X button."
                dismissible={true}
                onDismiss={() => setShowDismissible(false)}
              />
            )}
            {!showDismissible && (
              <button
                onClick={() => setShowDismissible(true)}
                className="px-4 py-2 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-xl font-semibold hover:from-brand-600 hover:to-brand-700 transition-all duration-300 shadow-lg shadow-brand-500/30"
              >
                Show Alert Again
              </button>
            )}
          </div>
        </ComponentCard>
      </div>
    </div>
  );
}

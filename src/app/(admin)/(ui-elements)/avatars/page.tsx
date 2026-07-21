"use client";

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Avatar from "@/components/ui/avatar/Avatar";
import React from "react";

export default function AvatarPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Avatar" />
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title="Default Avatar">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Avatar src="/images/user/user-01.jpg" size="xs" />
            <Avatar src="/images/user/user-01.jpg" size="sm" />
            <Avatar src="/images/user/user-01.jpg" size="md" />
            <Avatar src="/images/user/user-01.jpg" size="lg" />
            <Avatar src="/images/user/user-01.jpg" size="xl" />
            <Avatar src="/images/user/user-01.jpg" size="2xl" />
          </div>
        </ComponentCard>
        <ComponentCard title="Avatar with Ring">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Avatar src="/images/user/user-01.jpg" size="xs" ring={true} />
            <Avatar src="/images/user/user-01.jpg" size="sm" ring={true} />
            <Avatar src="/images/user/user-01.jpg" size="md" ring={true} />
            <Avatar src="/images/user/user-01.jpg" size="lg" ring={true} />
            <Avatar src="/images/user/user-01.jpg" size="xl" ring={true} />
            <Avatar src="/images/user/user-01.jpg" size="2xl" ring={true} />
          </div>
        </ComponentCard>
        <ComponentCard title="Avatar with Online Indicator">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Avatar src="/images/user/user-01.jpg" size="xs" status="online" />
            <Avatar src="/images/user/user-01.jpg" size="sm" status="online" />
            <Avatar src="/images/user/user-01.jpg" size="md" status="online" />
            <Avatar src="/images/user/user-01.jpg" size="lg" status="online" />
            <Avatar src="/images/user/user-01.jpg" size="xl" status="online" />
            <Avatar src="/images/user/user-01.jpg" size="2xl" status="online" />
          </div>
        </ComponentCard>
        <ComponentCard title="Avatar with Offline Indicator">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Avatar src="/images/user/user-01.jpg" size="xs" status="offline" />
            <Avatar src="/images/user/user-01.jpg" size="sm" status="offline" />
            <Avatar src="/images/user/user-01.jpg" size="md" status="offline" />
            <Avatar src="/images/user/user-01.jpg" size="lg" status="offline" />
            <Avatar src="/images/user/user-01.jpg" size="xl" status="offline" />
            <Avatar src="/images/user/user-01.jpg" size="2xl" status="offline" />
          </div>
        </ComponentCard>
        <ComponentCard title="Avatar with Busy Indicator">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Avatar src="/images/user/user-01.jpg" size="xs" status="busy" />
            <Avatar src="/images/user/user-01.jpg" size="sm" status="busy" />
            <Avatar src="/images/user/user-01.jpg" size="md" status="busy" />
            <Avatar src="/images/user/user-01.jpg" size="lg" status="busy" />
            <Avatar src="/images/user/user-01.jpg" size="xl" status="busy" />
            <Avatar src="/images/user/user-01.jpg" size="2xl" status="busy" />
          </div>
        </ComponentCard>
        <ComponentCard title="Avatar with Fallback">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Avatar src="" size="sm" fallback="JD" />
            <Avatar src="" size="md" fallback="AB" />
            <Avatar src="" size="lg" fallback="XY" />
            <Avatar src="" size="xl" fallback="Z" />
          </div>
        </ComponentCard>
        <ComponentCard title="Clickable Avatar">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Avatar
              src="/images/user/user-01.jpg"
              size="md"
              onClick={() => console.log("Avatar clicked!")}
            />
            <Avatar
              src="/images/user/user-01.jpg"
              size="lg"
              ring={true}
              onClick={() => console.log("Avatar clicked!")}
            />
          </div>
        </ComponentCard>
      </div>
    </div>
  );
}

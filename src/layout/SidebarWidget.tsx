import React from "react";

export default function SidebarWidget() {
  return (
    <div
      className={`
        relative mx-auto mb-10 w-full max-w-60 overflow-hidden rounded-2xl border border-brand-100/70 bg-gradient-to-br from-brand-50 to-brand-100/40 px-4 py-5 text-center shadow-theme-sm dark:border-brand-500/20 dark:from-brand-500/10 dark:to-brand-500/[0.02]`}
    >
      <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-brand-400/20 blur-2xl" />
      <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
        Verdant Pro
      </h3>
      <p className="mb-4 text-gray-600 text-theme-sm dark:text-gray-300">
        Unlock advanced analytics, custom reports, and priority support.
      </p>
      <a
        href="#"
        className="flex items-center justify-center rounded-xl bg-brand-500 p-3 font-medium text-white text-theme-sm shadow-brand-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-600"
      >
        Upgrade to Pro
      </a>
    </div>
  );
}

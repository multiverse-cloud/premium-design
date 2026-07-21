import GridShape from "@/components/common/GridShape";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Error 404",
  description:
    "Verdant premium analytics dashboard",
};

export default function Error404() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
      <GridShape />
      <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
        <h1 className="mb-8 font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent text-title-md dark:from-white dark:to-gray-200 xl:text-title-2xl">
          ERROR
        </h1>

        <Image
          src="/images/error/404.svg"
          alt="404"
          className="dark:hidden drop-shadow-lg"
          width={472}
          height={152}
        />
        <Image
          src="/images/error/404-dark.svg"
          alt="404"
          className="hidden dark:block drop-shadow-lg"
          width={472}
          height={152}
        />

        <p className="mt-10 mb-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg leading-relaxed">
          We can't seem to find the page you are looking for!
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-gradient-to-r from-white to-gray-50 px-6 py-3.5 text-sm font-semibold text-gray-700 shadow-lg shadow-gray-900/10 hover:shadow-xl hover:shadow-gray-900/20 hover:from-gray-50 hover:to-gray-100 hover:text-gray-900 transition-all duration-300 dark:border-gray-700 dark:from-gray-800 dark:to-gray-900 dark:text-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-800 dark:hover:text-white dark:shadow-black/30 dark:hover:shadow-black/40"
        >
          Back to Home Page
        </Link>
      </div>
      {/* <!-- Footer --> */}
      <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 dark:text-gray-400">
        &copy; {new Date().getFullYear()} - Verdant
      </p>
    </div>
  );
}

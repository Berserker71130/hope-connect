"use client";

import * as React from "react";

export const SkeletonCard = () => {
  return (
    <div className="relative bg-background-default border border-text-light/10 rounded-xl overflow-hidden shadow-sm animate-pulse flex flex-col h-[460px]">
      {/* Visual Image Shell */}
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-800" />

      {/* Content Canvas */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="h-5 w-16 bg-gray-200 dark:bg-gray-800 rounded-full" />
            <div className="h-5 w-20 bg-gray-200 dark:bg-gray-800 rounded-full" />
          </div>
          <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-md" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded-md" />
            <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded-md" />
          </div>
        </div>

        {/* Progress Canvas */}
        <div className="space-y-2 pt-4 border-t border-text-light/10 mt-4">
          <div className="flex justify-between">
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded-md" />
            <div className="h-5 w-16 bg-gray-200 dark:bg-gray-800 rounded-md" />
          </div>
          <div className="h-3.5 w-full bg-gray-200 dark:bg-gray-800 rounded-full" />
          <div className="h-10 w-full bg-gray-200 dark:bg-gray-800 rounded-lg mt-4" />
        </div>
      </div>
    </div>
  );
};

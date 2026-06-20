"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Select, type SelectOption } from "../ui/select";
import { dummyCampaigns } from "@/lib/dummy-data";
import { Button } from "../ui/button";
// Import our optimized reusable card component
import { CampaignCard } from "./CampaignCard";

const SORT_OPTIONS: SelectOption[] = [
  { value: "urgent", label: "Most Urgent First" },
  { value: "funded", label: "Nearly Funded First" },
  { value: "recent", label: "All Active Collections" },
];

export default function ActiveCampaigns() {
  const [currentSort, setCurrentSort] = useState<string>("urgent");

  const computedCampaigns = useMemo(() => {
    const mutableList = [...dummyCampaigns];

    switch (currentSort) {
      case "urgent":
        return mutableList.sort((a, b) => {
          const aUrgent = a.status === "Urgent" ? 1 : 0;
          const bUrgent = b.status === "Urgent" ? 1 : 0;
          if (aUrgent !== bUrgent) return bUrgent - aUrgent;
          return (
            b.currentAmount / b.targetAmount - a.currentAmount / a.targetAmount
          );
        });
      case "funded":
        return mutableList.sort(
          (a, b) =>
            b.currentAmount / b.targetAmount - a.currentAmount / a.targetAmount,
        );
      default:
        return mutableList;
    }
  }, [currentSort]);

  return (
    <section className="relative w-full py-16 sm:py-24 bg-background-default overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION GRID HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-text-light/10 mb-12 sm:mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-primary font-sans text-xs font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Live Field Reports
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-gray-900 tracking-tight leading-none">
              Current Campaigns
            </h2>
            <p className="text-body text-text-muted font-body leading-relaxed text-sm sm:text-base">
              Transparent, measurable funding allocations addressing immediate
              resource gaps across the global community. Monitor progress in
              real time.
            </p>
          </div>

          <div className="w-full sm:w-72 shrink-0">
            <Select
              label="Filter Collections"
              options={SORT_OPTIONS}
              value={currentSort}
              onChange={(value) => setCurrentSort(value)}
              placeholder="Sort campaigns..."
            />
          </div>
        </div>

        {/* REUSE COMPONENT GRID: Works flawlessly in responsive grids */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {computedCampaigns.map((campaign) => (
              <motion.div
                key={campaign.id}
                layout
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="w-full"
              >
                {/* Single, powerful, clean implementation hook */}
                <CampaignCard campaign={campaign} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* SECTION ACTION FOOTER REDIRECT LINK */}
        <div className="mt-12 sm:mt-20 text-center">
          <Button
            variant="outline"
            size="lg"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider px-6 py-2.5 sm:px-10 sm:py-3.5 bg-background-default shadow-sm hover:shadow-md"
          >
            <span>View All Active Campaigns</span>
          </Button>
        </div>
      </div>
    </section>
  );
}

"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Absolute UI Core Token Dependencies
import { Button } from "../ui/button";
import { Badge, type BadgeCategory } from "../ui/badge";
import { LinearProgress } from "../ui/progress";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Select, type SelectOption } from "../ui/select";
import { dummyCampaigns } from "@/lib/dummy-data";

// Premium UI Filter Integration Layer Configuration
const SORT_OPTIONS: SelectOption[] = [
  { value: "urgent", label: "Most Urgent First" },
  { value: "funded", label: "Nearly Funded First" },
  { value: "recent", label: "All Active Collections" },
];

export default function ActiveCampaigns() {
  const [currentSort, setCurrentSort] = useState<string>("urgent");

  // Client-side sorting engine mapping directly to your seed arrays data shape
  const computedCampaigns = useMemo(() => {
    const mutableList = [...dummyCampaigns];

    switch (currentSort) {
      case "urgent":
        return mutableList.sort((a, b) => {
          const aUrgent = a.status === "Urgent" ? 1 : 0;
          const bUrgent = b.status === "Urgent" ? 1 : 0;
          if (aUrgent !== bUrgent) return bUrgent - aUrgent;
          // Sub-sorting layer: If status matches, prioritize higher funding milestones
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

        {/* FIXED: 2 Columns on mobile (grid-cols-2), tight gap on mobile (gap-3 sm:gap-8) */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8 lg:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {computedCampaigns.map((campaign) => {
              // Map data parameters cleanly to match component requirements
              const percentValue =
                (campaign.currentAmount / campaign.targetAmount) * 100;
              const isUrgentState = campaign.status === "Urgent";

              const trackColor = isUrgentState
                ? "orange"
                : percentValue >= 85
                  ? "green"
                  : "blue";

              // Safely type-cast the string category down to match your lowercase Badge Category schema
              const safeBadgeCategory =
                campaign.category.toLowerCase() as BadgeCategory;

              return (
                <motion.div
                  key={campaign.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="group flex flex-col h-full"
                >
                  <Card
                    variant={isUrgentState ? "featured" : "default"}
                    padding="none"
                    isHoverable={true}
                    className="flex flex-col h-full border border-text-light/10 overflow-hidden"
                  >
                    {/* Media Component Viewport Frame - Made height smaller on mobile (h-36 sm:h-56) */}
                    <div className="relative w-full h-36 sm:h-56 overflow-hidden bg-background-soft shrink-0">
                      <img
                        src={campaign.image}
                        alt={campaign.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

                      {/* Floating Absolute Badges Row - scaled smaller text/padding on mobile */}
                      <div className="absolute top-2 left-2 right-2 sm:top-4 sm:left-4 sm:right-4 flex flex-wrap sm:flex-nowrap items-center justify-between gap-1.5 sm:gap-3 pointer-events-none">
                        <Badge
                          category={safeBadgeCategory}
                          className="text-[9px] sm:text-xs px-1.5 py-0.5 sm:px-2.5 sm:py-1"
                        >
                          {campaign.category}
                        </Badge>

                        {isUrgentState && (
                          <Badge
                            variant="urgent"
                            className="shadow-md text-[9px] sm:text-xs px-1.5 py-0.5 sm:px-2.5 sm:py-1"
                          >
                            Urgent
                          </Badge>
                        )}
                        {campaign.status === "Completed" && (
                          <Badge
                            variant="completed"
                            className="shadow-md text-[9px] sm:text-xs px-1.5 py-0.5 sm:px-2.5 sm:py-1"
                          >
                            Completed
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Content Component Body - Tighter internal padding on mobile (p-3 sm:p-6) */}
                    <div className="flex flex-col flex-grow p-3 sm:p-6">
                      <CardHeader className="p-0 pb-2 sm:pb-3">
                        {/* FIXED: Removed line-clamp-1 so text can wrap over multiple lines, and scaled text smaller on mobile (text-sm sm:text-lg md:text-h4) */}
                        <h3 className="text-sm sm:text-lg md:text-h4 font-heading font-black text-slate-900 dark:text-white tracking-tight transition-colors duration-200 group-hover:text-primary min-h-[2.5rem] sm:min-h-0">
                          {campaign.title}
                        </h3>
                      </CardHeader>

                      <CardContent className="p-0 pb-4 sm:pb-6 flex-grow">
                        {/* Scaled descriptive paragraph sizing on mobile to guarantee layout balance */}
                        <p className="text-[11px] sm:text-small text-text-muted font-body leading-relaxed line-clamp-3 h-[3.5rem] sm:h-[4.5rem]">
                          {campaign.description}
                        </p>
                      </CardContent>

                      {/* Live Native LinearProgress Track Component Integration */}
                      <div className="pt-1 sm:pt-2 mt-auto">
                        <LinearProgress
                          value={campaign.currentAmount}
                          max={campaign.targetAmount}
                          variant={trackColor}
                          showPercentText={true}
                          isCurrency={true}
                          label="Campaign Funding"
                        />
                      </div>

                      {/* Base Action Interactive Layer - scaled padding/margins down on mobile */}
                      <CardFooter className="p-0 pt-3 sm:pt-4 mt-4 sm:mt-6 border-t border-text-light/10">
                        <Button
                          variant={isUrgentState ? "secondary" : "primary"}
                          size="md"
                          className="w-full text-xs sm:text-sm py-2 sm:py-3 group/action-btn relative overflow-hidden"
                          rightIcon={
                            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover/action-btn:translate-x-0.5" />
                          }
                        >
                          Donate Now
                        </Button>
                      </CardFooter>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
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

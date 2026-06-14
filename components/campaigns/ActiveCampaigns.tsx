"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Absolute UI Core Token Dependencies
import { Button } from "../ui/button";
import { Badge, BadgeCategory } from "../ui/badge";
import { LinearProgress } from "../ui/progress";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Select, type SelectOption } from "../ui/select";

// 1. Core Strict Data Schema Mappings
interface Campaign {
  id: string;
  title: string;
  category: BadgeCategory;
  isUrgent: boolean;
  description: string;
  imageUrl: string;
  raised: number;
  goal: number;
  createdAt: string; //ISO-8601 Strings for chronological sorting matrix calculations
}

// 2. High-Impact, Mission-Driven Narrative Dummy Dataset (6 Elements Required)
const DUMMY_CAMPAIGNS: Campaign[] = [
  {
    id: "camp-urban-clean-water",
    title: "Emergency Clean Water Pipeline Infrastructure",
    category: "emergency",
    isUrgent: true,
    description:
      "Constructing an essential 12km fresh water distribution infrastructure network delivering immediate potable relief to over 4,500 families facing severe structural displacement.",
    imageUrl: "/images/campaigns/emergencypipes.jpg",
    raised: 43200,
    goal: 50000,
    createdAt: "2026-06-12T08:00:00Z",
  },
  {
    id: "camp-mobile-health-clinic",
    title: "Mobile Healthcare Clinic Expansion Unit",
    category: "healthcare",
    isUrgent: false,
    description:
      "Equipping and deploying a specialized all-terrain heavy maternal health unit to provide life saving neonatal screenings and basic vaccinations to isolated rural populations.",
    imageUrl: "/images/campaigns/mobilehealth.jpg",
    raised: 89700,
    goal: 95000,
    createdAt: "2026-06-13T14:30:00Z",
  },
  {
    id: "camp-primary-school-kits",
    title: "Primary Education Text & Learning Toolkits",
    category: "education",
    isUrgent: false,
    description:
      "Sourcing and distribution complete foundational engineering textbooks, solar desk lamps and structural classroom equipment to community-run literacy centers.",
    imageUrl: "/images/campaigns/schoolkit.jpg",
    raised: 11200,
    goal: 30000,
    createdAt: "2026-05-25T09:15:00Z",
  },
  {
    id: "camp-agroforestry-reforestation",
    title: "Sustainable Smallholder Agroforestry Network",
    category: "environment",
    isUrgent: false,
    description:
      "Restoring fragile localized ecosystems by planting 50,000 native canopy trees while training resident farming groups in climate-resilient crop practices.",
    imageUrl: "/images/campaigns/aforestation.jpg",
    raised: 18500,
    goal: 40000,
    createdAt: "2026-06-02T11:00:00Z",
  },
  {
    id: "camp-crisis-nutrition-hubs",
    title: "Acute Malnutrition Crisis Nutrition Pipeline",
    category: "emergency",
    isUrgent: true,
    description:
      "Rapid tactical provisioning of therapeutic high-protein meal distributions explicitly targeted at safeguarding childhood development across emergency municipal sectors.",
    imageUrl: "/images/campaigns/nutrition.jpg",
    raised: 61800,
    goal: 65000,
    createdAt: "2026-06-11T17:45:00Z",
  },
  {
    id: "camp-urban-wildlife-sanctuary",
    title: "Community Wildlife Care & Habitat Sanctuary",
    category: "animal-welfare",
    isUrgent: false,
    description:
      "Building specialized rescue facilities, vetenary containment centers, and rehabilitation programs to protect vulnerable domestic and wild populations in expanding urban areas.",
    imageUrl: "/images/campaigns/wildlifepreservation.jpg",
    raised: 13900,
    goal: 15000,
    createdAt: "2026-06-08T06:20:00Z",
  },
];

// 3. Dropdown Selection Configuration Options Array
const SORT_OPTIONS: SelectOption[] = [
  { value: "urgent", label: "Most Urgent First" },
  { value: "funded", label: "Nearly Funded First" },
  { value: "recent", label: "Most Recent First" },
];

export default function ActiveCampaigns() {
  const [currentSort, setCurrentSort] = useState<string>("urgent");

  //   4 Client-side sorting engine calculation block
  const computedCampaigns = useMemo(() => {
    const mutableList = [...DUMMY_CAMPAIGNS];

    switch (currentSort) {
      case "urgent":
        return mutableList.sort((a, b) => {
          if (a.isUrgent !== b.isUrgent) return a.isUrgent ? -1 : 1;
          //   Sub-sorting layer: If urgent status matches prioritize higher funding milestones
          return b.raised / b.goal - a.raised / a.goal;
        });
      case "funded":
        return mutableList.sort(
          (a, b) => b.raised / b.goal - a.raised / a.goal,
        );
      case "recent":
        return mutableList.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      default:
        return mutableList;
    }
  }, [currentSort]);

  return (
    <section className="relative w-full py-24 bg-background-default overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION GRID HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-text-light/10 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-primary font-sans text-xs font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Live Field Reports
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-gray-900 tracking-tight leading-none">
              Current Campaigns
            </h2>
            <p className="text-body text-text-muted font-body leading-relaxed">
              Transparent, measurable funding allocations addressing immediate
              resource gaps across the global community. Monitor progress in
              real time.
            </p>
          </div>

          {/* Premium UI Filter Integration Layer */}
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

        {/* COMPONENT ASSEMBLY DISPLAY GRID */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {computedCampaigns.map((campaign) => {
              // Calculate percentage to determine matching visual status indicator themes
              const percentValue = (campaign.raised / campaign.goal) * 100;
              const trackColor = campaign.isUrgent
                ? "orange"
                : percentValue >= 85
                  ? "green"
                  : "blue";

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
                    variant={campaign.isUrgent ? "featured" : "default"}
                    padding="none"
                    isHoverable={true}
                    className="flex flex-col h-full border border-text-light/10"
                  >
                    {/* Media Component Viewport Frame */}
                    <div className="relative w-full h-56 overflow-hidden bg-background-soft shrink-0">
                      <img
                        src={campaign.imageUrl}
                        alt={campaign.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {/* Protective Backdrop Shadows */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

                      {/* Floating Absolute Badges Row */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-3 pointer-events-none">
                        <Badge category={campaign.category}>
                          {campaign.category.replace("-", " ")}
                        </Badge>

                        {campaign.isUrgent && (
                          <Badge variant="urgent" className="shadow-md">
                            Urgent
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Content Component Body */}
                    <div className="flex flex-col flex-grow p-6">
                      <CardHeader className="p-0 pb-3">
                        <h3 className="text-h4 font-heading font-black text-gray-900 tracking-tight transition-colors duration-200 group-hover:text-primary line-clamp-1">
                          {campaign.title}
                        </h3>
                      </CardHeader>

                      <CardContent className="p-0 pb-6 flex-grow">
                        {/* Enforces clean uniform sizing profiles using precise line clamping and matching height caps */}
                        <p className="text-small text-text-muted font-body leading-relaxed line-clamp-3 h-[4.5rem]">
                          {campaign.description}
                        </p>
                      </CardContent>

                      {/* Unified Live LinearProgress Track Component */}
                      <div className="pt-2 mt-auto">
                        <LinearProgress
                          value={campaign.raised}
                          max={campaign.goal}
                          variant={trackColor}
                          showPercentText={true}
                          isCurrency={true}
                        />
                      </div>

                      {/* Base Action Interactive Layer */}
                      <CardFooter className="p-0 pt-4 mt-6 border-t border-text-light/10">
                        <Button
                          variant={campaign.isUrgent ? "secondary" : "primary"}
                          size="md"
                          className="w-full group/action-btn relative overflow-hidden"
                          rightIcon={
                            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/action-btn:translate-x-0.5" />
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
        <div className="mt-20 text-center">
          <Button
            variant="outline"
            size="lg"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider px-10 py-3.5 bg-background-default shadow-sm hover:shadow-md"
          >
            <span>View All Active Campaigns</span>
          </Button>
        </div>
      </div>
    </section>
  );
}

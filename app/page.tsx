"use client";

import React from "react";
import { motion } from "framer-motion";
// IMPORTING ATOMIC UI SYSTEM TO PREVENT DUPLICATES OR BREAK DESIGN SYSTEM RULES
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowDown,
  Eye,
  Heart,
  Landmark,
  ShieldCheck,
  Users,
} from "lucide-react";
import ActiveCampaigns from "@/components/campaigns/ActiveCampaigns";
import ImpactStats from "@/components/impact/ImpactStats";

export default function PremiumHomepage() {
  // High performance smooth interface scroll anchor calculation mapping
  const handleScrollToContent = () => {
    const nextSection = document.getElementById("trust-badges-strip");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background-default w-full overflow-x-hidden selection:bg-secondary/10 selection:text-secondary">
      {/* 1. HERO SECTION WITH LAYERED RADIAL GRAPHICS & TYPOGRAPHY PROTECTION */}
      <section className="relative min-h-[95vh] md:min-h-screen w-full flex flex-col justify-center items-start pt-20 px-6 lg:px-16 bg-slate-950">
        {/* Verified High Quality Close Up Unity Asset Backdrop */}
        <div
          className="absolute inset-0 w-full h-full object-cover bg-cover bg-center opacity-45 transition-opacity duration-700 pointer-events-none"
          style={{ backgroundImage: "url('/charity.jpg')" }}
          aria-hidden="true"
        />

        {/* Sophisticated Layered Mesh-Light Protection Core for Dark Backdrops */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/60 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />

        {/* Central Component Flex Grid Alignment Node */}
        <div className="relative z-10 max-w-4xl w-full space-y-6 md:space-y-8 mt-10 md:mt-0">
          {/* Micro Notification Tag Premium Tracking Ring (Using Atomic Badge Variant) */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="verified"
              size="sm"
              className="bg-white/10 text-slate-200 border-white/20 font-body tracking-wider"
            >
              Verified Global Impact Ledger
            </Badge>
          </motion.div>

          {/* Mission Statement Mapping the Merriweather dynamic layout automatically via <h1> */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-hero font-normal text-white tracking-tight leading-[1.12] max-w-3xl"
          >
            Empowering Communities, <br />
            <span className="font-body font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-200">
              Transforming Lives.
            </span>
          </motion.h1>

          {/* Subheadline:1-2 sentence descriptive summary statement */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-body sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl font-light font-body"
          >
            We deliver direct, transparent infrastructure systems and reliable
            medical access channels to equip regional leadership with
            sustainable assets to break resource volatility cycles.
          </motion.p>

          {/* Core Interactive Actions Leveraging True Component Button Schema */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 w-full sm:w-auto"
          >
            {/* Primary Orange Call To Action Button Element */}
            <Button
              variant="secondary"
              size="xl"
              className="font-medium shadow-professional flex items-center justify-center"
              leftIcon={<Heart className="h-5 w-5 fill-white text-white" />}
            >
              Donate Now
            </Button>

            {/* Secondary Transparent Call To Action Button Element */}
            <Button
              variant="outline"
              size="xl"
              className="text-white border-white/20 hover:border-white/60 hover:bg-white/10 font-medium flex items-center justify-center"
              leftIcon={<Users className="h-5 w-5 text-slate-300" />}
            >
              Become a Volunteer
            </Button>
          </motion.div>
        </div>

        {/* 2. DISCOVERY IMPACT TICKER CONTAINER STRIP FLOATING OVERLAY */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="absolute bottom-20 md:bottom-24 left-0 w-full px-6 lg:px-16 z-10 pointer-events-none"
        >
          <div className="max-w-7xl mx-auto w-full bg-white/[0.02] backdrop-blur-xl rounded-lg border border-white/10 p-4 md:p-6 shadow-professional">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-8">
              {/* Ticker Element Panel A */}
              <div className="flex items-center gap-3">
                <span
                  className="text-2xl md:text-3xl shrink-0"
                  role="img"
                  aria-label="Celebration Party Popper"
                >
                  🎊 🎆
                </span>
                <div>
                  <p className="text-xl md:text-2xl font-bold text-white tracking-tight font-body flex items-center gap-2">
                    $1.2M raised{" "}
                    <span className="text-slate-400 font-light text-sm md:text-base">
                      this year
                    </span>
                  </p>
                </div>
              </div>

              {/* Structural Split Token Divider */}
              <div className="hidden md:block h-8 w-px bg-white/10 shrink-0" />

              {/* Ticker Element Panel B */}
              <div className="flex items-center gap-3">
                {/* Leveraging Custom Native Urgent Animated Badge Layout */}
                <Badge
                  variant="urgent"
                  size="md"
                  className="border-orange-500/30 bg-orange-500/10 text-orange-400 font-body"
                >
                  Live Impact Counter
                </Badge>
                <div>
                  <p className="text-xl md:text-2xl font-bold text-white tracking-tight font-body">
                    10,000+{" "}
                    <span className="text-slate-400 font-light text-sm md:text-base">
                      Lives impacted
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bouncing Visual Directional Amchoring Node */}
        <button
          onClick={handleScrollToContent}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity group cursor-pointer border-none bg-transparent select-none"
          aria-label="Scroll layout content framework down to trust indicators strip"
        >
          <span className="text-[10px] tracking-widest font-bold text-slate-400 uppercase group-hover:text-slate-200 transition-colors font-body">
            Discover Missions
          </span>
          <ArrowDown className="h-4 w-4 text-slate-400 group-hover:text-slate-200 animate-bounce transition-transform" />
        </button>
      </section>

      {/* TRUST BADGES ROW MATRIX (CREDIBILITY INJECTOR INTERFACES) */}
      <section
        id="trust-badges-strip"
        className="bg-background-muted border-y border-gray-200 py-10 px-6 lg:px-16 w-full scroll-mt-6"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
            {/* Credibility Node 1: Identity Status */}
            <div className="flex items-start gap-4 p-1">
              <div className="h-12 w-12 rounded-md bg-white border border-gray-200 shadow-sm flex items-center justify-center shrink-0 text-trust">
                <ShieldCheck className="h-6 w-6 stroke-[1.75]" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-small font-bold text-text-primary tracking-tight uppercase font-body">
                  Registered Charity
                </h3>
                <p className="text-small text-text-muted leading-normal font-body">
                  Certified 501(c)(3) continous corporate nonprofit
                  organizational stream.
                </p>
              </div>
            </div>

            {/* Credibility Node 2: Ledger Status */}
            <div className="flex items-start gap-4 p-1">
              <div className="h-12 w-12 rounded-md bg-white border border-gray-200 shadow-sm flex items-center justify-center shrink-0 text-trust">
                <Eye className="h-6 w-6 stroke-[1.75]" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-small font-bold text-text-primary tracking-tight uppercase font-body">
                  100% Transparent
                </h3>
                <p className="text-small text-text-muted leading-normal font-body">
                  Open public database tracking allocation vectors down to
                  regional nodes.
                </p>
              </div>
            </div>

            {/* Credibility Node 3: Fiscal Status */}
            <div className="flex items-start gap-4 p-1">
              <div className="h-12 w-12 rounded-md bg-white border border-gray-200 shadow-sm flex items-center justify-center shrink-0 text-trust">
                <Landmark className="h-6 w-6 stroke-[1.75]" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-small font-bold text-text-primary tracking-tight uppercase font-body">
                  Tax Deductible
                </h3>
                <p className="text-small text-text-muted leading-normal font-body">
                  All asset allocations generate instant fiscal validation
                  receipts automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ActiveCampaigns />
      <ImpactStats />
    </div>
  );
}

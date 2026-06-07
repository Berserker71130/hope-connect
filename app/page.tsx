"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { CircleDot, ShieldAlert, Award } from "lucide-react";

export default function BadgeVerificationSandbox() {
  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-6 lg:px-16 w-full font-sans">
      <div className="w-full space-y-10 max-w-5xl mx-auto">
        {/* Header Metadata Container */}
        <div className="border-b border-gray-200 pb-5 w-full">
          <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Verification Sandbox — Issue UI-08 (#9)
          </span>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mt-3">
            Badge & Impact Tag System
          </h1>
          <p className="text-base text-gray-500 mt-1">
            Testing structural contrast ratios, semantic category matching,
            micro-sizes, and custom icon injections.
          </p>
        </div>

        {/* SECTION 1: SYSTEM AND CAMPAIGN STATUS VARIANTS */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm space-y-6 w-full">
          <div>
            <h2 className="text-lg font-black text-gray-900 tracking-tight">
              1. Campaign Status Variants
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Validating background tints, text contrast, and custom
              configurations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <Badge variant="active" size="md">
              Active Campaign
            </Badge>
            <Badge variant="urgent" size="md">
              Urgent Funding Required
            </Badge>
            <Badge variant="completed" size="md">
              Completed Goal
            </Badge>
            <Badge variant="new" size="md">
              New Mission
            </Badge>
            <Badge variant="verified" size="md">
              Verified Partner
            </Badge>
          </div>
        </div>

        {/* SECTION 2: NGO SECTOR IMPACT CATEGORIES */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm space-y-6 w-full">
          <div>
            <h2 className="text-lg font-black text-gray-900 tracking-tight">
              2. Core Sector Impact Tags
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Ensuring color meanings perfectly lock onto respective operational
              sectors with auto-loaded symbols.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center justify-center gap-2 text-center">
              <Badge category="education" size="md">
                Education
              </Badge>
              <span className="text-[10px] text-gray-400 font-mono">
                Indigo Core
              </span>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center justify-center gap-2 text-center">
              <Badge category="healthcare" size="md">
                Healthcare
              </Badge>
              <span className="text-[10px] text-gray-400 font-mono">
                Rose Core
              </span>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center justify-center gap-2 text-center">
              <Badge category="environment" size="md">
                Environment
              </Badge>
              <span className="text-[10px] text-gray-400 font-mono">
                Emerald Core
              </span>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center justify-center gap-2 text-center">
              <Badge category="poverty-relief" size="md">
                Poverty Relief
              </Badge>
              <span className="text-[10px] text-gray-400 font-mono">
                Amber Core
              </span>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center justify-center gap-2 text-center">
              <Badge category="emergency" size="md">
                Emergency Aid
              </Badge>
              <span className="text-[10px] text-gray-400 font-mono">
                Red Core Pulse
              </span>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center justify-center gap-2 text-center">
              <Badge category="animal-welfare" size="md">
                Animal Welfare
              </Badge>
              <span className="text-[10px] text-gray-400 font-mono">
                Teal Core
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 3: SIZE VARIATIONS & CUSTOM ICON INJECTIONS */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm space-y-6 w-full">
          <div>
            <h2 className="text-lg font-black text-gray-900 tracking-tight">
              3. Sizing Framework & Custom Structural Overrides
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Comparing scale metrics between sm and default md tokens.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <span className="text-xs font-bold text-gray-400 w-24">
                Small (sm):
              </span>
              <Badge variant="active" size="sm">
                Active
              </Badge>
              <Badge variant="urgent" size="sm">
                Urgent
              </Badge>
              <Badge category="education" size="sm">
                Education
              </Badge>
              <Badge variant="verified" size="sm">
                Verified
              </Badge>
              <Badge
                variant="new"
                size="sm"
                icon={<CircleDot className="h-3 w-3 text-sky-600 stroke-[3]" />}
              >
                Live Feed
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <span className="text-xs font-bold text-gray-400 w-24">
                Medium (md):
              </span>
              <Badge variant="active" size="md">
                Active
              </Badge>
              <Badge variant="urgent" size="md">
                Urgent
              </Badge>
              <Badge category="education" size="md">
                Education
              </Badge>
              <Badge variant="verified" size="md">
                Verified
              </Badge>
              <Badge
                variant="active"
                size="md"
                icon={<Award className="h-3.5 w-3.5 text-blue-600" />}
              >
                Top Donor Choice
              </Badge>
            </div>
          </div>
        </div>

        {/* SECTION 4: REAL PRODUCTION ENVIRONMENT SIMULATION */}
        <div className="space-y-4 w-full">
          <div>
            <h2 className="text-lg font-black text-gray-900 tracking-tight pl-1">
              4. Real NGO Campaign Card Simulations
            </h2>
            <p className="text-xs text-gray-400 pl-1 mt-0.5">
              Testing tag scannability when surrounded by competing UI layout
              metadata.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {/* Card Mock 1: Emergency Healthcare Response */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between w-full">
                <Badge category="healthcare" size="sm">
                  Healthcare Mission
                </Badge>
                <Badge variant="urgent" size="sm">
                  Urgent
                </Badge>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                  Oxygen Concentrator Field Supply
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Providing continuous oxygen generation vectors directly to
                  emergency field hospital structures.
                </p>
              </div>
              <div className="border-t border-gray-50 pt-3 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400">
                  Target: $45,000
                </span>
                <Badge variant="verified" size="sm">
                  Verified Account
                </Badge>
              </div>
            </div>

            {/* Card Mock 2: Completed Education Initiative */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between w-full">
                <Badge category="education" size="sm">
                  Education Sector
                </Badge>
                <Badge variant="completed" size="sm">
                  Completed
                </Badge>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                  Rural Digital Literacy Textbooks
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Procured and deployed interactive tech training items across
                  14 primary regional schools.
                </p>
              </div>
              <div className="border-t border-gray-50 pt-3 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600 font-mono">
                  100% Funded
                </span>
                <Badge variant="new" size="sm">
                  Archived
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

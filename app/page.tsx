"use client";

import React, { useState } from "react";
import { LinearProgress, CircularProgress } from "@/components/ui/progress";

export default function ProgressVerificationSandbox() {
  // Configured mock simulation value updates
  const [simulationMultiplier, setSimulationMultiplier] = useState<number>(1);

  const triggerSimulationBoost = () => {
    // Toggles track views between 50% state and full 100% capacity loading
    setSimulationMultiplier((prev) => (prev === 1 ? 1.35 : 1));
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-6 lg:px-16 w-full font-sans">
      <div className="w-full space-y-10 max-w-5xl mx-auto">
        {/* Header Block Section */}
        <div className="border-b border-gray-200 pb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
          <div>
            <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
              Verification Sandbox — Issue UI-07 (#8)
            </span>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mt-3">
              Progress & Goal Systems
            </h1>
            <p className="text-base text-gray-500 mt-1">
              Validating hardware-accelerated transforms, micro-milestones,
              dynamic scaling strings, and high-tier values.
            </p>
          </div>
          <button
            onClick={triggerSimulationBoost}
            className="shrink-0 h-11 px-5 bg-gray-900 hover:bg-gray-800 text-white font-bold text-sm rounded-lg transition-all shadow-md active:scale-95 cursor-pointer self-start md:self-center"
          >
            Simulate Metric Injection Boost ⚡
          </button>
        </div>

        {/* Matrix Grouping 1: Primary Linear Tracker Elements */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm space-y-8 w-full">
          <h2 className="text-lg font-black text-gray-900 uppercase tracking-wider border-b border-gray-50 pb-3">
            1. Linear Track Layout Matrix & Sizing Tests
          </h2>

          {/* Test A: Default Blue Variant with Small Goals ($1.2K) */}
          <LinearProgress
            label="Community Medical Kit Supplies"
            value={Math.min(850 * simulationMultiplier, 1200)}
            max={1200}
            variant="blue"
            isCurrency={true}
            milestones={[25, 50, 75]}
          />

          {/* Test B: Impact Green Variant with Mid-tier Goals ($75K) */}
          <LinearProgress
            label="Clean Water Reservoir Construction (Regional Target)"
            value={Math.min(52000 * simulationMultiplier, 75000)}
            max={75000}
            variant="green"
            isCurrency={true}
            milestones={[20, 40, 60, 80]}
          />

          {/* Test C: Urgent Orange Variant with High-Tier Value Vectors ($1.5M) */}
          <LinearProgress
            label="Emergency Crisis Response Unit Fund"
            value={Math.min(980000 * simulationMultiplier, 1500000)}
            max={1500000}
            variant="orange"
            isCurrency={true}
            milestones={[25, 50, 75, 90]}
          />

          {/* Test D: Non-Currency Pure Numeric Hour Metric Track */}
          <LinearProgress
            label="Volunteer Mobilization Direct Deployment Hours"
            value={Math.min(1420 * simulationMultiplier, 2000)}
            max={2000}
            variant="blue"
            isCurrency={false}
            showPercentText={true}
          />
        </div>

        {/* Matrix Grouping 2: Optional Circular Goals (Fundraising Thermometers) */}
        <div className="space-y-4 w-full">
          <h2 className="text-lg font-black text-gray-900 uppercase tracking-wider pl-1">
            2. Circular Thermometer Target Nodes
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
            <CircularProgress
              label="Nutrition Delivery"
              value={Math.min(65 * simulationMultiplier, 100)}
              max={100}
              variant="blue"
            />
            <CircularProgress
              label="Surgical Kits Sent"
              value={Math.min(88 * simulationMultiplier, 100)}
              max={100}
              variant="green"
            />
            <CircularProgress
              label="Disaster Flight Lift"
              value={Math.min(42 * simulationMultiplier, 100)}
              max={100}
              variant="orange"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

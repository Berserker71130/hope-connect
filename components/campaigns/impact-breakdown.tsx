"use client";

import * as React from "react";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  BookOpen,
  CheckCircle2,
  HeartPulse,
  HelpCircle,
  Trees,
  Utensils,
} from "lucide-react";

// TYPES AND INTERFACES
interface ImpactTier {
  id: string;
  amount: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  bgGradient: string;
  glowColor: string;
}

interface ImpactBreakdownProps {
  currentAmount: number;
  onSelectAmount?: (amount: number) => void;
}

// CONSTANT STATIC DATA MATRIX
const IMPACT_TIERS: ImpactTier[] = [
  {
    id: "tier-meals",
    amount: 5000,
    title: "Nutritional Support",
    description: "Provides 10 meals for children",
    icon: Utensils,
    accentColor: "text-emerald-500 border-emerald-500/30 bg-emerald-500/10",
    bgGradient: "from-emerald-500/5 to-transparent",
    glowColor: "rgba(16,185,129,0.15)",
  },
  {
    id: "tier-education",
    amount: 10000,
    title: "Primary Education",
    description: "Buys 3 text books and 1 school uniform",
    icon: BookOpen,
    accentColor: "text-blue-500 border-blue-500/30 bg-blue-500/10",
    bgGradient: "from-blue-500/5 to-transparent",
    glowColor: "rgba(59,130,246,0.15)",
  },
  {
    id: "tier-healthcare",
    amount: 25000,
    title: "Family Medical Care",
    description: "Covers 1 month of healthcare for a family",
    icon: HeartPulse,
    accentColor: "text-purple-500 border-purple-500/30 bg-purple-500/10",
    bgGradient: "from-purple-500/5 to-transparent",
    glowColor: "rgba(168,85,247,0.15)",
  },
  {
    id: "tier-environment",
    amount: 50000,
    title: "Eco Restoration",
    description: "Plants 100 trees in deforested area",
    icon: Trees,
    accentColor: "text-green-500 border-green-500/30 bg-green-500/10",
    bgGradient: "from-green-500/5 to-transparent",
    glowColor: "rgba(34,197,94,0.15)",
  },
];

// CURRENCY HELPER
const formatNaira = (value: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
};

// MAIN COMPONENT IMPLEMENTATION
export default function ImpactBreakdown({
  currentAmount,
  onSelectAmount,
}: ImpactBreakdownProps) {
  // Strategy: Determine the highest unlocked tier threshold reached by the donation
  const highestUnlockedTier = [...IMPACT_TIERS]
    .reverse()
    .find((tier) => currentAmount >= tier.amount);

  // Check if the current custom amount matches no specific milestones directly
  const isExactMilestone = IMPACT_TIERS.some(
    (tier) => tier.amount === currentAmount,
  );
  const showCustomBanner = currentAmount > 0 && !isExactMilestone;

  return (
    <div className="w-full space-y-6">
      {/* Structural Labelling Header */}
      <div className="flex flex-col space-y-1">
        <h3 className="text-lg font-semibold text-text-default font-heading tracking-tight">
          Your Impact Breakdown
        </h3>
        <p className="text-sm text-text-muted">
          See exactly how your contribution directly transforms lives on the
          field.
        </p>
      </div>

      {/* Grid allocation layout matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {IMPACT_TIERS.map((tier) => {
          const Icon = tier.icon;
          // Cumulative Logic: A tier is considered unlocked if the entered amount matches or surpasses its baseline
          const isUnlocked = currentAmount >= tier.amount;
          const isHighestActive = highestUnlockedTier?.id === tier.id;

          return (
            <Card
              key={tier.id}
              onClick={() => onSelectAmount?.(tier.amount)}
              variant={isHighestActive ? "bordered" : "default"}
              className={`cursor-pointer transition-all duration-300 relative group overflow-hidden ${
                isUnlocked
                  ? "bg-background-default opacity-100"
                  : "bg-background-default/60 opacity-70 hover:opacity-90"
              }`}
              style={{
                boxShadow: isHighestActive
                  ? `0 12px 30px -10px ${tier.glowColor}, 0 4px 10px -5px ${tier.glowColor}`
                  : undefined,
              }}
            >
              {/* Dynamic Animated Gradient Background Overlay on Active States */}
              {isUnlocked && (
                <motion.div
                  layoutId={`bg-gradient-${tier.id}`}
                  className={`absolute inset-0 bg-gradient-to-br ${tier.bgGradient} pointer-events-none`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}

              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 z-20 relative">
                <div
                  className={`p-2.5 rounded-xl border ${tier.accentColor} transition-transform duration-300 group-hover:scale-110 shadow-sm`}
                >
                  <Icon className="w-5 h-5 stroke-[2.25]" />
                </div>

                {/* Animated Unlocked Badging indicator */}
                <AnimatePresence mode="popLayout">
                  {isUnlocked && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                      className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-full border border-emerald-500/20 shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-600 text-white" />
                      <span>
                        {isHighestActive ? "Active Match" : "Achieved"}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardHeader>

              <CardContent className="space-y-1.5 z-20 relative pt-2">
                <div className="text-xl font-bold font-heading text-text-default tracking-tight">
                  {formatNaira(tier.amount)}
                </div>
                <div className="text-sm font-medium text-text-default font-body leading-snug">
                  {tier.title}
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  {tier.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Every contribution counts custom amount message container */}
      <AnimatePresence mode="wait">
        {showCustomBanner && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: easeOut }}
            className="p-4 rounded-xl border border-blue-500/10 bg-gradient-to-r from-blue-50/50 via-blue-50/20 to-transparent flex items-start gap-3 shadow-xs"
          >
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 mt-0.5">
              <HelpCircle className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-semibold text-blue-950 dark:text-blue-200">
                Custom Impact Calculation
              </h4>
              <p className="text-xs text-blue-800/80 dark:text-blue-300/80 leading-relaxed">
                Every single transaction builds the architecture of change. Your
                custom contribution of{" "}
                <span className="font-bold text-blue-900 dark:text-blue-100">
                  {formatNaira(currentAmount)}
                </span>{" "}
                supplies vital backup resources straight to active local
                initiatives
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

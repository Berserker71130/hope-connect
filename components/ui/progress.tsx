"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { motion } from "framer-motion";

// Types for strict color handling and metrics
export type ProgressVariant = "blue" | "green" | "orange";

interface LinearProgressProps {
  value: number; //Current value
  max: number;
  variant?: ProgressVariant;
  showPercentText?: boolean;
  milestones?: number[]; //Array of percentages
  label?: string;
  isCurrency?: boolean;
}

interface CircularProgressProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  variant?: ProgressVariant;
  label?: string;
}

// Helper utility for professional currency configuration ($1K to $1M+)
const formatAmount = (amount: number, isCurrency: boolean) => {
  if (!isCurrency) return amount.toLocaleString();
  if (amount >= 1000000)
    return `$${(amount / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  if (amount >= 1000)
    return `$${(amount / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return `$${amount.toLocaleString()}`;
};

const colorMaps = {
  blue: {
    bg: "bg-blue-100",
    fill: "bg-blue-600",
    text: "text-blue-600",
    border: "border-blue-600",
    svg: "stroke-blue-600",
  },
  green: {
    bg: "bg-emerald-100",
    fill: "bg-emerald-600",
    text: "text-emerald-600",
    border: "border-emerald-600",
    svg: "stroke-emerald-600",
  },
  orange: {
    bg: "bg-orange-100",
    fill: "bg-orange-600",
    text: "text-orange-600",
    border: "border-orange-600",
    svg: "stroke-orange-600",
  },
};

// 1. LINEAR PROGRESS & GOAL TRACKER COMPONENT
export const LinearProgress = ({
  value,
  max,
  variant = "blue",
  showPercentText = true,
  milestones = [],
  label,
  isCurrency = false,
}: LinearProgressProps) => {
  // Safe percentage calculation locked between 0 and 100%
  const percentage = Math.min(
    Math.max(Math.round((value / max) * 100), 0),
    100,
  );
  const colors = colorMaps[variant];

  return (
    <div className="w-full space-y-2.5">
      {/* Label and Goal Tracker Metadata Display */}
      <div className="flex items-center justify-between text-sm">
        <div className="space-y-0.5">
          {label && (
            <p className="font-bold text-gray-900 tracking-tight">{label}</p>
          )}
          <p className="text-xs text-gray-500 font-medium">
            Raised:{" "}
            <span className="font-bold text-gray-800">
              {formatAmount(value, isCurrency)}
            </span>{" "}
            of {formatAmount(max, isCurrency)}
          </p>
        </div>
        {showPercentText && (
          <span
            className={`font-mono font-black text-sm px-2 py-0.5 rounded ${colors.bg} ${colors.text}`}
          >
            {percentage}% funded
          </span>
        )}
      </div>

      {/* Progress Track Primitive */}
      <ProgressPrimitive.Root
        value={percentage}
        className={`relative h-3.5 w-full overflow-hidden rounded-full ${colors.bg} bg-opacity-60`}
      >
        {/* Animated Fill: Uses high-performance CSS transforms via Framer Motion */}
        <ProgressPrimitive.Indicator asChild>
          <motion.div
            className={`h-full w-full ${colors.fill}`}
            initial={{ transform: "translateX(-100%" }}
            animate={{ transform: `translateX(-${100 - percentage}%)` }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} //Smooth, clean hardware easing
          />
        </ProgressPrimitive.Indicator>

        {/* Milestone Markers embedded directly onto the structural track canvas */}
        {milestones.map((milestone, index) => {
          const isAchieved = percentage >= milestone;
          return (
            <div
              key={index}
              className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-colors duration-300 pointer-events-none ${
                isAchieved ? "bg-white shadow-sm" : "bg-gray-300/80"
              }`}
              style={{ left: `${milestone}%` }}
              title={`Milestone: ${milestone}%`}
            />
          );
        })}
      </ProgressPrimitive.Root>

      {/* Dynamic Milestone Legend Sub-Text */}
      {milestones.length > 0 && (
        <div className="relative w-full h-4 flex justify-between px-0.5 pointer-events-none">
          {milestones.map((milestone, index) => (
            <span
              key={index}
              className="text-[10px]"
              style={{ left: `${milestone}%` }}
            >
              {milestone}%
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

// 2. CIRCULAR PROGRESS (fUNDRAISING THERMOMETER)
export const CircularProgress = ({
  value,
  max,
  size = 140,
  strokeWidth = 12,
  variant = "blue",
  label,
}: CircularProgressProps) => {
  const percentage = Math.min(
    Math.max(Math.round((value / max) * 100), 0),
    100,
  );
  const colors = colorMaps[variant];

  // Mathematical parameters for native SVG tracking calculations
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Base Background Track Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="stroke-gray-100"
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {/* Core SVG Progress Vector: High-performance strokeDasharray manipulation */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className={`${colors.svg}`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{
              strokeDashoffset:
                circumference - (percentage / 100) * circumference,
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Floating Center Data Node */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
          <span className="text-2xl font-black text-gray-900 leading-none tracking-tight">
            {percentage}%
          </span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
            Achieved
          </span>
        </div>
      </div>

      {label && (
        <p className="text-xs font-extrabold text-gray-700 tracking-wide uppercase text-center max-w-[120px] truncate">
          {label}
        </p>
      )}
    </div>
  );
};

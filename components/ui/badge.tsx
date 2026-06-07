"use client";

import {
  BookOpen,
  Check,
  Heart,
  HeartPulse,
  Leaf,
  PawPrint,
  ShieldAlert,
} from "lucide-react";
import * as React from "react";

// 1. Strict Typing Definitions
export type BadgeVariant =
  | "active"
  | "urgent"
  | "completed"
  | "new"
  | "verified";
export type BadgeCategory =
  | "education"
  | "healthcare"
  | "environment"
  | "poverty-relief"
  | "emergency"
  | "animal-welfare";
export type BadgeSize = "sm" | "md";

interface BadgeProps {
  variant?: BadgeVariant;
  category?: BadgeCategory; //Optional: If passed, overrides status styling with specific category branding
  size?: BadgeSize;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

// 2. Comprehensive Style Mapping Matrix
const statusStyles = {
  active: "bg-blue-50 text-blue-700 border-blue-200/80",
  urgent:
    "bg-orange-50 text-orange-700 border-orange-200/80 font-bold animate-pulse",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
  new: "bg-sky-50 text-sky-700 border-sky-200/80",
  verified: "bg-teal-50 text-teal-800 border-teal-200/80 font-semibold",
};

const categoryStyles = {
  education: "bg-indigo-50 text-indigo-700 border-indigo-200/80",
  healthcare: "bg-rose-50 text-rose-700 border-rose-200/80",
  environment: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
  "poverty-relief": "bg-amber-50 text-amber-800 border-amber-200/80",
  emergency: "bg-red-50 text-red-700 border-red-200/80 font-bold",
  "animal-welfare": "bg-teal-50 text-teal-700 border-teal-200/80",
};

const sizeStyles = {
  sm: "px-2.5 py-0.5 text-[11px] gap-1",
  md: "px-3.5 py-1 text-xs gap-1.5",
};

const iconSizes = {
  sm: "h-3 w-3 stroke-[2.5]",
  md: "h-3.5 w-3.5 stroke-[2.5]",
};

// 3. Fallback Core Category Icon Resolver Matrix
const getCategoryIcon = (category: BadgeCategory, size: BadgeSize) => {
  const className = iconSizes[size];
  switch (category) {
    case "education":
      return <BookOpen className={className} />;
    case "healthcare":
      return <HeartPulse className={className} />;
    case "environment":
      return <Leaf className={className} />;
    case "poverty-relief":
      return <Heart className={className} />;
    case "emergency":
      return <ShieldAlert className={className} />;
    case "animal-welfare":
      return <PawPrint className={className} />;
  }
};

// 4. Primary Component Arrow Function
export const Badge = ({
  variant,
  category,
  size = "md",
  icon,
  children,
  className = "",
}: BadgeProps) => {
  // Determine style baseline: Category styles completely take precedence over base variants if declared
  const selecetdStyle = category
    ? categoryStyles[category]
    : statusStyles[variant || "active"];
  const selectedSize = sizeStyles[size];

  // Resolve left-side icon: prioritize passed manual icon, fallback to automatic category icon, or handle specific verified checkmark state
  let leftIcon = icon;
  if (!leftIcon && category) {
    leftIcon = getCategoryIcon(category, size);
  } else if (!leftIcon && variant === "verified") {
    leftIcon = <Check className={iconSizes[size]} />;
  }

  return (
    <span
      className={`*:inline-flex items-center justify-center font-medium border tracking-wide select-none transition-all duration-200 rounded-full uppercase font-sans shrink-0
    ${selecetdStyle}
    ${selectedSize}
    ${className}`}
    >
      {leftIcon && (
        <span className="flex items-center shrink-0">{leftIcon}</span>
      )}
      <span className="leading-none whitespace-nowrap">{children}</span>
    </span>
  );
};

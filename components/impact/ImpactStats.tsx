"use client";

import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useSpring,
  Variants,
} from "framer-motion";
import { Heart, DollarSign, Users, MapPin, BarChart3 } from "lucide-react";

// Direct imports of your native UI design system components
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Single Source of Truth Import straight from your real data file
import { dummyHomeStats } from "@/lib/dummy-data";

// Explicit Lucide Icon Registry mapping string data fields to active components
const iconRegistry = {
  Heart,
  DollarSign,
  Users,
  MapPin,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// FIXED: Transition objects are now structurally nested inside variant definitions correctly
const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ==========================================
// UNIVERSAL HIGH-PERFORMANCE SMART COUNTER
// ==========================================
interface CounterProps {
  target: number;
  prefix: string;
  suffix: string;
  decimals: number;
  inView: boolean;
}

const SmartAnimatedCounter: React.FC<CounterProps> = ({
  target,
  prefix,
  suffix,
  decimals,
  inView,
}) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);

  const springValue = useSpring(motionValue, {
    damping: 26,
    stiffness: 50,
    restDelta: 0.001,
  });

  const displayValue = useTransform(springValue, (latest) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(latest);
  });

  useEffect(() => {
    if (inView) {
      const controls = animate(motionValue, target, {
        duration: 2.5,
        ease: [0.16, 1, 0.3, 1],
      });
      return () => controls.stop();
    } else {
      motionValue.set(0);
    }
  }, [inView, target, motionValue]);

  useEffect(() => {
    return displayValue.onChange((latest) => {
      if (nodeRef.current) {
        nodeRef.current.textContent = `${prefix}${latest}${suffix}`;
      }
    });
  }, [displayValue, prefix, suffix]);

  return (
    <span
      ref={nodeRef}
      className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl font-mono"
    >
      {prefix}0{suffix}
    </span>
  );
};

// ==========================================
// PRIMARY EXPORT MODULE (MEETS ALL HOME-03 CRITERIA)
// ==========================================
export default function ImpactStats() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  // Safe color mapper for structural progress indicator bars inside cards
  const progressColorMap = {
    blue: "bg-blue-600 dark:bg-blue-500",
    green: "bg-emerald-500 dark:bg-emerald-400",
    orange: "bg-orange-500 dark:bg-orange-400",
  };

  return (
    <section
      ref={ref}
      id="our-impact"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50/60 to-white dark:from-slate-950/40 dark:to-slate-950 py-24 sm:py-32 border-t border-text-light/10"
    >
      {/* OPTIONAL CRITERIA: WORLD MAP SHOWING REACH IN BACKGROUND */}
      <div className="absolute inset-0 z-0 opacity-[0.07] dark:opacity-[0.05] pointer-events-none select-none mix-blend-multiply dark:mix-blend-normal">
        <svg
          className="h-full w-full object-cover"
          viewBox="0 0 1000 500"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M150,120 Q180,100 220,150 T200,280 Q170,350 190,420 T150,480 Q110,400 130,300 T120,180 Z" />
          <path d="M450,100 Q550,60 700,80 T850,150 Q900,220 800,280 T650,220 Q550,260 500,380 T420,450 Q380,320 400,200 Z" />
          <path d="M780,360 Q840,350 880,400 T800,450 Q740,430 780,360 Z" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* REQUIRED CRITERIA: "Our Impact" heading */}
        <div className="mx-auto max-w-3xl text-center mb-16 sm:mb-20">
          <div className="mb-4 inline-block">
            <Badge variant="verified" size="md">
              Our Impact
            </Badge>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl font-sans">
            Numbers that matter.
          </h2>
          <p className="mt-4 text-base text-text-muted font-body max-w-xl mx-auto">
            We track, validate, and report our operational metrics with absolute
            transparency.
          </p>
        </div>

        {/* REQUIRED CRITERIA: Stats grid: 4 columns desktop, 2 mobile */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 gap-6 lg:grid-cols-4 max-w-7xl mx-auto"
        >
          {dummyHomeStats.map((stat) => {
            const IconComponent = iconRegistry[stat.iconName] || BarChart3;

            const progressPct = Math.min(
              Math.round(
                (stat.currentProgressValue / stat.maxProgressValue) * 100,
              ),
              100,
            );

            return (
              <motion.div
                key={stat.id}
                variants={cardVariants}
                className="h-full"
              >
                <Card
                  variant="default"
                  padding="none"
                  isHoverable={true}
                  className="h-full flex flex-col justify-between bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-text-light/10 shadow-sm"
                >
                  <div className="p-6 flex flex-col h-full justify-between">
                    <CardHeader className="p-0 flex flex-row items-center justify-between pb-6">
                      <span className="text-xs font-bold uppercase tracking-widest text-text-muted/80 block max-w-[70%]">
                        {stat.title}
                      </span>
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl shadow-inner ${stat.iconBgColor} ${stat.iconColor}`}
                      >
                        <IconComponent className="h-5 w-5 stroke-[2.25]" />
                      </div>
                    </CardHeader>

                    <CardContent className="p-0 flex flex-col justify-end flex-grow">
                      <div className="flex items-baseline gap-x-1">
                        <SmartAnimatedCounter
                          target={stat.targetNumber}
                          prefix={stat.prefix || ""}
                          suffix={stat.suffix || ""}
                          decimals={stat.decimals || 0}
                          inView={inView}
                        />
                      </div>

                      {/* INTEGRATED PROGRESS GRAPHICS SPECIFIED BY YOUR SCHEMA */}
                      <div className="mt-4 mb-4">
                        <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-wider">
                          <span>{stat.progressLabel}</span>
                          <span className="font-mono">{progressPct}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          {/* FIXED: Transition properties are perfectly declared inside a single object literal here */}
                          <motion.div
                            className={`h-full rounded-full ${progressColorMap[stat.progressVariant] || progressColorMap.blue}`}
                            initial={{ width: 0 }}
                            animate={
                              inView
                                ? { width: `${progressPct}%` }
                                : { width: 0 }
                            }
                            transition={{
                              duration: 1.5,
                              ease: [0.16, 1, 0.3, 1],
                              delay: 0.2,
                            }}
                          />
                        </div>
                      </div>

                      {/* REQUIRED CRITERIA: Description text rendered clearly per stat card */}
                      <p className="text-xs leading-relaxed text-text-muted font-body mt-2">
                        {stat.description}
                      </p>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

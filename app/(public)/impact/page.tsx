"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Play,
  Search,
  Film,
  Sparkles,
  SlidersHorizontal,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";
import { Badge, BadgeCategory } from "@/components/ui/badge";
import {
  dummyImpactStories,
  dummyTestimonials,
  ImpactStory,
} from "@/lib/dummy-data";

export default function PremiumImpactStoriesPage() {
  const router = useRouter();
  // Mounting protection guard to safely synchronize Radix UI viewports with Next.js SSR
  const [isMounted, setIsMounted] = React.useState(false);

  // Filter, Filter-Bar, and Real-time Search Parameters
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [selectedYear, setSelectedYear] = React.useState("all");
  const [sortBy, setSortBy] = React.useState("recent");

  // Interactive Modal Target Controllers
  const [activeVideoUrl, setActiveVideoUrl] = React.useState<string | null>(
    null,
  );
  const [activeVideoTitle, setActiveVideoTitle] = React.useState("");
  const [activeStory, setActiveStory] = React.useState<ImpactStory | null>(
    null,
  );

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // 1. ISOLATE FEATURED HERO STORY
  // Anchors explicitly to the tagged featured item, fallback to the first entry if none marked
  const featuredStory =
    dummyImpactStories.find((story) => story.isFeatured) ||
    dummyImpactStories[0];

  // 2. RUN SEARCH & MULTI-FILTER COMPLIANCE LOOP
  const filteredStories = dummyImpactStories.filter((story) => {
    // Keep featured item strictly in hero position to ensure it remains exclusive and stands out
    if (story.id === featuredStory.id) return false;

    const matchesSearch =
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.beneficiary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.narrative.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || story.category === selectedCategory;
    const matchesYear = selectedYear === "all" || story.year === selectedYear;

    return matchesSearch && matchesCategory && matchesYear;
  });

  // 3. APPLY PREMIUM SORTING ALGORITHM
  const sortedStories = [...filteredStories].sort((a, b) => {
    if (sortBy === "recent") {
      return b.year.localeCompare(a.year);
    }
    if (sortBy === "impactful") {
      // Prioritizes video media documentation and multi-line descriptive density for maximum impact scoring
      const scoreA = (a.videoUrl ? 3 : 0) + a.outcome.length * 0.1;
      const scoreB = (b.videoUrl ? 3 : 0) + b.outcome.length * 0.1;
      return scoreB - scoreA;
    }
    return 0;
  });

  // Transform Data Structures to match SelectOption API perfectly
  const categoryOptions = [
    { value: "all", label: "All Sectors" },
    { value: "education", label: "Education & Literacy" },
    { value: "healthcare", label: "Clinical & Healthcare" },
    { value: "poverty-relief", label: "Poverty Alleviation" },
    { value: "environment", label: "Environmental Action" },
    { value: "emergency", label: "Crisis & Disaster Response" },
  ];

  const yearOptions = [
    { value: "all", label: "All Historical Eras" },
    { value: "2026", label: "2026 Operations" },
    { value: "2025", label: "2025 Operations" },
  ];

  const sortOptions = [
    { value: "recent", label: "Timeline: Most Recent" },
    { value: "impactful", label: "Metrics: High Impact" },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 antialiased font-sans transition-colors duration-300">
      {/* LUXURY HERO HEADER SECTION */}
      <div className="relative overflow-hidden bg-white border-b border-gray-100 py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.15]" />
        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold uppercase tracking-widest text-blue-600 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 fill-current" /> Verified
            Transformation Index
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
            Documenting Real{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Human Progress
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-500 font-body leading-relaxed">
            A verified ledger of structural changes across global development
            grids. Explore our direct beneficiaries, localized field narratives,
            and audit parameters.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* CRITERIA: FEATURED HERO STORY (STANDS OUT AT THE TOP) */}
        {featuredStory && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-600">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-ping" />
              Global Spotlight Feature
            </div>
            <Card
              variant="featured"
              padding="none"
              accentBar="blue"
              className="grid grid-cols-1 lg:grid-cols-12 overflow-hidden border border-blue-100 shadow-xl bg-gradient-to-br from-blue-50/30 to-indigo-50/10 rounded-2xl group"
            >
              {/* Image Frame Grid Column */}
              <div className="relative h-72 sm:h-96 lg:h-auto lg:col-span-5 min-h-[420px] overflow-hidden">
                <img
                  src={featuredStory.image}
                  alt={featuredStory.title}
                  className="absolute inset-0 w-full h-full object-cover transform scale-100 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                <div className="absolute top-6 left-6 z-20">
                  <Badge
                    category={featuredStory.category as BadgeCategory}
                    size="md"
                  >
                    {featuredStory.category}
                  </Badge>
                </div>
              </div>

              {/* Info Frame Grid Column */}
              <div className="p-8 sm:p-12 lg:col-span-7 flex flex-col justify-between space-y-8 bg-white/80 backdrop-blur-md">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs font-semibold text-slate-400 tracking-wider">
                    <span>{featuredStory.location}</span>
                    <span>&bull;</span>
                    <span>Fiscal Year {featuredStory.year}</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    {featuredStory.title}
                  </h2>
                  <div className="relative p-5 bg-slate-50 border-l-4 border-blue-600 rounded-r-xl">
                    <p className="font-serif italic text-slate-600 text-base sm:text-lg leading-relaxed">
                      "{featuredStory.quote}"
                    </p>
                    <span className="text-xs uppercase font-bold text-slate-400 mt-2 block tracking-wide">
                      — {featuredStory.beneficiary}, Representative Beneficiary
                    </span>
                  </div>
                  <p className="text-slate-500 font-body text-sm sm:text-base leading-relaxed line-clamp-3">
                    {featuredStory.narrative}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-slate-100">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-black block">
                      Direct Metric Outcome:
                    </span>
                    <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-sm bg-emerald-50/60 border border-emerald-100 px-3 py-1 rounded-md">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                      {featuredStory.outcome}
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowUpRight className="w-4 h-4" />}
                    onClick={() => router.push(`/impact/${featuredStory.id}`)}
                    className="w-full sm:w-auto shrink-0 shadow-lg"
                  >
                    Read Full Blueprint
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* CONTROLS ROW: ARCHITECTURAL FILTER BAR SYSTEM */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 items-end backdrop-blur-sm">
          <div className="lg:col-span-4 space-y-2">
            <Input
              label="Keyword Registry Search"
              placeholder="Filter by beneficiary name, location, keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-50/50 border-slate-200/60"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:col-span-8 w-full">
            <Select
              label="Development Sector"
              options={categoryOptions}
              value={selectedCategory}
              onChange={(val) => setSelectedCategory(val)}
            />
            <Select
              label="Temporal Year"
              options={yearOptions}
              value={selectedYear}
              onChange={(val) => setSelectedYear(val)}
            />
            <Select
              label="Sorting Model"
              options={sortOptions}
              value={sortBy}
              onChange={(val) => setSortBy(val)}
            />
          </div>
        </div>

        {/* RESPONSIVE CARD ENGINE: 2-3 COLUMNS DESKTOP, 1 MOBILE */}
        {sortedStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedStories.map((story) => (
              <Card
                key={story.id}
                variant="default"
                padding="none"
                className="group flex flex-col justify-between h-full bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-slate-200/80 transition-all duration-300 overflow-hidden"
              >
                {/* CRITERIA: CLEAR THUMBNAILS WITH VISUAL OVERLAY FOR VIDEO CONTENT */}
                <div className="relative w-full h-56 overflow-hidden bg-slate-900">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-95 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <Badge category={story.category as BadgeCategory} size="sm">
                      {story.category}
                    </Badge>
                  </div>

                  {story.videoUrl && (
                    <button
                      onClick={() => {
                        setActiveVideoUrl(story.videoUrl || null);
                        setActiveVideoTitle(story.title);
                      }}
                      className="absolute inset-0 flex items-center justify-center bg-slate-950/30 group-hover:bg-slate-950/40 transition-colors duration-300 cursor-pointer z-10"
                      aria-label="Stream media file container"
                    >
                      {/* Premium Glassmorphism Pulsing Inner Ring */}
                      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-blue-600 shadow-xl backdrop-blur-sm transform transition-all duration-300 group-hover:scale-110">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-white/40 animate-ping opacity-75" />
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </span>
                      <span className="absolute bottom-3 right-3 bg-slate-950/70 border border-white/10 text-white font-mono text-[9px] px-2 py-0.5 rounded-md flex items-center gap-1 uppercase tracking-wider backdrop-blur-xs">
                        <Film className="w-2.5 h-2.5" /> Motion Asset
                      </span>
                    </button>
                  )}
                </div>

                {/* Card Title Context Headers */}
                <CardHeader className="px-6 pt-6 pb-2 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                    <span>{story.location}</span>
                    <span>&bull;</span>
                    <span>{story.year}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors duration-200 line-clamp-1">
                    {story.title}
                  </h3>
                </CardHeader>

                {/* CRITERIA: EXCERPT CLAMP SPECIFICATION (ENTICES READING FULL NARRATIVE) */}
                <CardContent className="px-6 pb-6 flex-1">
                  <p className="text-sm text-slate-500 font-body line-clamp-3 leading-relaxed">
                    {story.narrative}
                  </p>
                </CardContent>

                {/* Bottom Interactive Trigger Actions */}
                <CardFooter className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase text-slate-400 font-black block tracking-wider">
                      Beneficiary
                    </span>
                    <span className="text-xs font-bold text-slate-700 truncate block">
                      {story.beneficiary}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/impact/${story.id}`)}
                    className="border-slate-200 text-slate-700 bg-white hover:bg-slate-50 hover:text-blue-600 shadow-xs"
                  >
                    Read Story
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white border border-slate-100 rounded-2xl shadow-xs max-w-xl mx-auto p-8 space-y-4">
            <div className="mx-auto w-12 h-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <p className="text-lg font-bold text-slate-900">
              No Registry Matches Found
            </p>
            <p className="text-sm text-slate-400 max-w-sm mx-auto font-body">
              Your active combination of development criteria yielded 0
              references. Adjust your filters or reset search parameters.
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedYear("all");
              }}
            >
              Reset Dashboard Filters
            </Button>
          </div>
        )}

        {/* ACCREDITED WITNESS TESTIMONIAL GRID */}
        {dummyTestimonials && dummyTestimonials.length > 0 && (
          <div className="pt-16 border-t border-slate-100 space-y-8">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
                Verified Testaments
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                Beneficiary & Donor Affirmations
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dummyTestimonials.map((testimonial) => (
                <Card
                  key={testimonial.id}
                  variant="default"
                  padding="lg"
                  accentBar="green"
                  className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col justify-between space-y-6"
                >
                  <p className="font-serif italic text-slate-600 text-sm sm:text-base leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3.5">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-11 h-11 rounded-full object-cover ring-4 ring-slate-50 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 truncate">
                        {testimonial.author}
                      </h4>
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full uppercase font-bold tracking-wider inline-block mt-0.5">
                        Verified {testimonial.role}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL WINDOW 1: ULTRA-PREMIUM CINEMATIC VIDEO SCREEN CONTAINER */}
      <Modal
        isOpen={!!activeVideoUrl}
        onClose={() => setActiveVideoUrl(null)}
        size="lg"
      >
        <ModalHeader
          title={activeVideoTitle}
          description="Verified Field Footage & Case Evidence Tracking"
        />
        <ModalBody>
          {activeVideoUrl && (
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-950 shadow-2xl border border-slate-800">
              <iframe
                src={activeVideoUrl}
                title={activeVideoTitle}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            variant="ghost"
            size="md"
            onClick={() => setActiveVideoUrl(null)}
          >
            Dismiss Viewport
          </Button>
        </ModalFooter>
      </Modal>

      {/* MODAL WINDOW 2: EDITORIAL BLUEPRINT NARRATIVE READER VIEW */}
      <Modal
        isOpen={!!activeStory}
        onClose={() => setActiveStory(null)}
        size="lg"
      >
        {activeStory && (
          <>
            <ModalHeader
              title={activeStory.title}
              description={`Asset Context Ledger: ${activeStory.location} • Year ${activeStory.year}`}
            />
            <ModalBody>
              <div className="space-y-6 font-body text-slate-600 text-sm sm:text-base leading-relaxed">
                <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-inner border border-slate-100">
                  <img
                    src={activeStory.image}
                    alt={activeStory.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4">
                    <Badge
                      category={activeStory.category as BadgeCategory}
                      size="md"
                    >
                      {activeStory.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase tracking-wider font-black text-emerald-800 block">
                    Audited Strategic Result:
                  </span>
                  <p className="text-emerald-800 font-extrabold text-sm sm:text-base">
                    {activeStory.outcome}
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-widest font-black text-slate-900 block">
                    Comprehensive Account Study:
                  </span>
                  <p className="whitespace-pre-wrap text-slate-500 font-body text-sm leading-relaxed">
                    {activeStory.narrative}
                  </p>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" onClick={() => setActiveStory(null)}>
                Dismiss Ledger
              </Button>
            </ModalFooter>
          </>
        )}
      </Modal>
    </div>
  );
}

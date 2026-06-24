"use client";

import * as React from "react";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Grid,
  MapPin,
  Search,
  Calendar,
  Clock,
  UserCheck,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";

// 1. IMPORT CUSTOM UI COMPONENTS
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge, type BadgeCategory } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// 2. IMPORT UPDATED SEED DATA REFERENCE
import { dummyOpportunities } from "@/lib/dummy-data";

// 3. DEFINITION MATRICES MATCHING JIRA ISSUE SPECIFICATIONS
const CATEGORIES = [
  "Education",
  "Healthcare",
  "Environment",
  "Event Support",
  "Administrative",
];
const COMMITMENTS = ["One-time", "Weekly", "Monthly", "Flexible"];
const LOCATION_TYPES = ["On-site", "Remote", "Hybrid"];
const SKILLS = [
  { label: "No experience", value: "No Experience Needed" },
  { label: "Teaching", value: "Mentoring" },
  { label: "Medical", value: "Animal Handling" },
  { label: "Tech", value: "HTML/CSS" },
  { label: "Manual Labor", value: "Heavy Lifting" },
];

const SORT_OPTIONS = [
  { value: "recent", label: "Most Recent" },
  { value: "soonest", label: "Soonest" },
  { value: "needed", label: "Most Needed (Slots)" },
];

// 🚀 INNER VOLUNTEER WORKSPACE WRAPPED FOR STATIC BAILOUT COMPLIANCE
function VolunteerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // --- A. STATE INITIALIZATION VIA URL SPECIFICATIONS ---
  const searchQuery = searchParams.get("search") || "";
  const locationQuery = searchParams.get("location") || "";
  const sortBy = searchParams.get("sort") || "recent";
  const viewMode = (searchParams.get("view") as "grid" | "map") || "grid";

  const selectedCategories =
    searchParams.get("categories")?.split(",").filter(Boolean) || [];
  const selectedCommitments =
    searchParams.get("commitments")?.split(",").filter(Boolean) || [];
  const selectedLocations =
    searchParams.get("locations")?.split(",").filter(Boolean) || [];
  const selectedSkills =
    searchParams.get("skills")?.split(",").filter(Boolean) || [];

  // --- B. URL PERSISTENCE ROUTER COMPANION ---
  const updateFilters = (key: string, value: string | string[] | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (
      value === null ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    ) {
      params.delete(key);
    } else {
      params.set(key, Array.isArray(value) ? value.join(",") : value);
    }

    router.push(`?${params.toString()}, { scroll: false }`);
  };

  // --- C. MULTI-SELECT TOGGLE HANDLERS ---
  const handleToggleFilter = (
    key: string,
    currentList: string[],
    item: string,
  ) => {
    const nextList = currentList.includes(item)
      ? currentList.filter((i) => i !== item)
      : [...currentList, item];
    updateFilters(key, nextList);
  };

  const handleResetFilters = () => {
    router.push("?", { scroll: false });
  };

  // --- D. THE CORE FILTER ENGINE MATRIX ---
  const filteredOpportunities = React.useMemo(() => {
    return dummyOpportunities
      .filter((opp) => {
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          const matchTitle = opp.title.toLowerCase().includes(query);
          const matchDesc = opp.description.toLowerCase().includes(query);
          if (!matchTitle && !matchDesc) return false;
        }

        if (locationQuery) {
          const loc = locationQuery.toLowerCase();
          if (!opp.location.toLowerCase().includes(loc)) return false;
        }

        if (
          selectedCategories.length > 0 &&
          !selectedCategories.includes(opp.category)
        ) {
          return false;
        }

        if (
          selectedCommitments.length > 0 &&
          !selectedCommitments.includes(opp.timeCommitmentLabel)
        ) {
          return false;
        }

        if (
          selectedLocations.length > 0 &&
          !selectedLocations.includes(opp.locationType)
        ) {
          return false;
        }

        if (selectedSkills.length > 0) {
          const hasMatchingSkill = opp.skillsNeeded.some((skill) =>
            selectedSkills.includes(skill),
          );
          if (!hasMatchingSkill) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "soonest") {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        if (sortBy === "needed") {
          return b.slotsAvailable - a.slotsAvailable;
        }
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }, [
    searchQuery,
    locationQuery,
    sortBy,
    selectedCategories,
    selectedCommitments,
    selectedLocations,
    selectedSkills,
  ]);

  return (
    <div className="min-h-screen bg-background-soft/30 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* ================= HEADER SECTION WITH LAYOUT TOGGLES ================= */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-text-light/10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-text-primary font-body">
              Volunteer Deployments
            </h1>
            <p className="text-body text-text-muted mt-1">
              Discover and secure elite service missions across global regional
              networks.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <Button
              variant={viewMode === "grid" ? "primary" : "outline"}
              size="sm"
              leftIcon={<Grid className="w-4 h-4" />}
              onClick={() => updateFilters("view", "grid")}
            >
              Grid View
            </Button>
            <Button
              variant={viewMode === "map" ? "primary" : "outline"}
              size="sm"
              leftIcon={<MapPin className="w-4 h-4" />}
              onClick={() => updateFilters("view", "map")}
            >
              Map View
            </Button>
          </div>
        </div>

        {/* ================= SEARCH PANEL ================= */}
        <Card
          variant="default"
          padding="sm"
          className="bg-background-default shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-5">
              <Input
                label="Search Keyword"
                placeholder="Title, description strings..."
                value={searchQuery}
                onChange={(e) => updateFilters("search", e.target.value)}
              />
            </div>
            <div className="md:col-span-4">
              <Input
                label="Location Profile"
                placeholder="City, region, or hub..."
                value={locationQuery}
                onChange={(e) => updateFilters("location", e.target.value)}
              />
            </div>
            <div className="md:col-span-3">
              <Select
                label="Sorting Metric"
                value={sortBy}
                options={SORT_OPTIONS}
                onChange={(val) => updateFilters("sort", val)}
              />
            </div>
          </div>
        </Card>

        {/* ================= DYNAMIC COUNTER BAR ================= */}
        <div className="flex items-center justify-between">
          <p className="text-body font-medium text-text-primary">
            <span className="text-blue-600 font-bold text-h4 mr-1">
              {filteredOpportunities.length}
            </span>
            opportunities available
          </p>

          {(selectedCategories.length > 0 ||
            selectedCommitments.length > 0 ||
            selectedLocations.length > 0 ||
            selectedSkills.length > 0 ||
            searchQuery ||
            locationQuery) && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 text-small font-semibold text-orange-600 hover:text-orange-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Active Filters
            </button>
          )}
        </div>

        {/* ================= MAIN SPLIT CONTENT WORKSPACE ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* SIDEBAR FILTER PANEL */}
          <aside className="lg:col-span-1 space-y-6 lg:sticky lg:top-6">
            <Card
              variant="default"
              padding="md"
              className="space-y-6 bg-background-default border-text-light/10"
            >
              <div className="flex items-center gap-2 pb-2 border-b border-text-light/10 text-text-primary">
                <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                <h2 className="text-body font-bold uppercase tracking-wider">
                  Filter Control Matrix
                </h2>
              </div>

              <div className="space-y-3">
                <h3 className="text-small font-bold text-text-primary uppercase tracking-wide">
                  Category
                </h3>
                <div className="space-y-2">
                  {CATEGORIES.map((cat) => (
                    <Checkbox
                      key={cat}
                      label={cat}
                      checked={selectedCategories.includes(cat)}
                      onCheckedChange={() =>
                        handleToggleFilter(
                          "categories",
                          selectedCategories,
                          cat,
                        )
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-text-light/10">
                <h3 className="text-small font-bold text-text-primary uppercase tracking-wide">
                  Time Commitment
                </h3>
                <div className="space-y-2">
                  {COMMITMENTS.map((com) => (
                    <Checkbox
                      key={com}
                      label={com}
                      checked={selectedCommitments.includes(com)}
                      onCheckedChange={() =>
                        handleToggleFilter(
                          "commitments",
                          selectedCommitments,
                          com,
                        )
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-text-light/10">
                <h3 className="text-small font-bold text-text-primary uppercase tracking-wide">
                  Location Type
                </h3>
                <div className="space-y-2">
                  {LOCATION_TYPES.map((loc) => (
                    <Checkbox
                      key={loc}
                      label={loc}
                      checked={selectedLocations.includes(loc)}
                      onCheckedChange={() =>
                        handleToggleFilter("locations", selectedLocations, loc)
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-text-light/10">
                <h3 className="text-small font-bold text-text-primary uppercase tracking-wide">
                  Skills Required
                </h3>
                <div className="space-y-2">
                  {SKILLS.map((skill) => (
                    <Checkbox
                      key={skill.value}
                      label={skill.label}
                      checked={selectedSkills.includes(skill.value)}
                      onCheckedChange={() =>
                        handleToggleFilter(
                          "skills",
                          selectedSkills,
                          skill.value,
                        )
                      }
                    />
                  ))}
                </div>
              </div>
            </Card>
          </aside>

          {/* GRID RECIPIENT SCREEN */}
          <main className="lg:col-span-3">
            {viewMode === "grid" ? (
              filteredOpportunities.length === 0 ? (
                <Card
                  variant="featured"
                  padding="lg"
                  className="text-center py-16"
                >
                  <p className="text-h4 font-bold text-blue-950">
                    No operational deployment matches found
                  </p>
                  <p className="text-body text-text-muted mt-2 max-w-md mx-auto">
                    Try modifying your configuration tokens or hit reset to
                    return to the baseline data array.
                  </p>
                  <Button
                    variant="outline"
                    size="md"
                    className="mt-6"
                    onClick={handleResetFilters}
                  >
                    Clear Parameters
                  </Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredOpportunities.map((opp) => (
                    <Card
                      key={opp.id}
                      variant="default"
                      padding="none"
                      accentBar={
                        opp.locationType === "Remote" ? "blue" : "none"
                      }
                      className="flex flex-col h-full bg-background-default shadow-sm border-text-light/10 cursor-pointer group hover:border-blue-500/30 hover:shadow-md transition-all duration-200"
                      onClick={() => router.push(`/volunteer/${opp.id}`)}
                    >
                      <div className="relative h-48 w-full bg-background-muted overflow-hidden">
                        <img
                          src={opp.image}
                          alt={opp.title}
                          className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 z-20">
                          <Badge
                            category={
                              opp.category.toLowerCase() as BadgeCategory
                            }
                          >
                            {opp.category}
                          </Badge>
                        </div>
                        <div className="absolute top-3 right-3 z-20">
                          <span className="px-2 py-1 rounded text-[10px] font-bold uppercase bg-background-default/90 text-text-primary shadow-sm tracking-wider border border-text-light/10">
                            {opp.locationType}
                          </span>
                        </div>
                      </div>

                      <CardHeader className="p-5 pb-2">
                        <h3 className="text-h4 font-bold text-text-primary font-body line-clamp-1">
                          {opp.title}
                        </h3>
                      </CardHeader>

                      <CardContent className="px-5 flex-grow space-y-4">
                        <p className="text-body text-text-muted text-sm line-clamp-2">
                          {opp.description}
                        </p>

                        <div className="space-y-2 text-small text-text-muted pt-2 border-t border-text-light/5">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                            <span className="line-clamp-1">{opp.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{opp.timeCommitment}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                            <span>Deployment Target: {opp.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <UserCheck className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                            <span className="font-semibold text-text-primary">
                              {opp.slotsAvailable} open slots remaining
                            </span>
                          </div>
                        </div>

                        <div className="pt-2 flex flex-wrap gap-1.5">
                          {opp.skillsNeeded.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-0.5 rounded text-[11px] font-medium bg-background-soft text-text-muted border border-text-light/10"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </CardContent>

                      <CardFooter className="p-5 bg-background-soft/20 mt-0">
                        <Button
                          variant="primary"
                          size="md"
                          className="w-full pointer-events-none"
                          disabled={opp.slotsAvailable === 0}
                        >
                          {opp.slotsAvailable === 0
                            ? "Mission Full"
                            : "Sign Up For Deployment"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )
            ) : (
              /* MAP SIMULATOR VIEW */
              <Card
                variant="featured"
                padding="lg"
                className="h-[600px] flex flex-col items-center justify-center text-center relative overflow-hidden bg-blue-50/20 border-2 border-dashed border-blue-300"
              >
                <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
                <div className="relative z-10 space-y-4 max-w-md">
                  <div className="p-4 bg-blue-500 text-white rounded-full inline-flex shadow-md">
                    <MapPin className="w-8 h-8 animate-bounce" />
                  </div>
                  <h3 className="text-h3 font-bold text-blue-950 font-body">
                    Geospatial Grid Active
                  </h3>
                  <p className="text-body text-text-muted text-sm">
                    Rendering{" "}
                    <span className="font-bold text-blue-600">
                      {filteredOpportunities.length}
                    </span>{" "}
                    live coordinates across local networks.
                  </p>
                  <div className="pt-4 max-h-40 overflow-y-auto space-y-2 text-left text-xs bg-background-default/80 p-3 rounded-lg shadow-inner border border-text-light/10">
                    {filteredOpportunities.map((opp) => (
                      <div
                        key={opp.id}
                        className="flex justify-between border-b border-text-light/5 pb-1 last:border-0 hover:text-blue-600 cursor-pointer"
                        onClick={() => router.push(`/volunteer/${opp.id}`)}
                      >
                        <span className="font-semibold text-text-primary truncate max-w-[200px]">
                          {opp.title}
                        </span>
                        <span className="text-text-muted font-mono bg-background-soft px-1 rounded">
                          [{opp.coordinates.lat.toFixed(2)},{" "}
                          {opp.coordinates.lng.toFixed(2)}]
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

// 4. MASTER COMPONENT SECURELY WRAPPED IN SUSPENSE FOR PRODUCTION COMPILES
export default function VolunteerManagementPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background-soft/30 font-sans">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-body text-text-muted animate-pulse">
              Synchronizing deployment configuration arrays...
            </p>
          </div>
        </div>
      }
    >
      <VolunteerContent />
    </Suspense>
  );
}

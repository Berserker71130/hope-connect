"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { dummyCampaigns, Campaign } from "@/lib/dummy-data";
import { Input } from "@/components/ui/input";
import { Select, SelectOption } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CampaignCard } from "@/components/campaigns/CampaignCard";
import { SkeletonCard } from "@/components/campaigns/SkeletonCards";
import {
  useCampaignFilterStore,
  CampaignCategoryFilter,
  CampaignStatusFilter,
  CampaignGoalFilter,
  CampaignSortOption,
} from "@/lib/store";
import {
  SlidersHorizontal,
  RotateCcw,
  FolderHeart,
  Search,
} from "lucide-react";

const CATEGORIES: CampaignCategoryFilter[] = [
  "All",
  "Education",
  "Healthcare",
  "Environment",
  "Poverty Relief",
  "Emergency Response",
];
const STATUSES: CampaignStatusFilter[] = [
  "All",
  "Active",
  "Completed",
  "Urgent",
];
const GOALS: CampaignGoalFilter[] = [
  "All",
  "<$5K",
  "$5K-$25K",
  "$25K-$100K",
  "$100K+",
];

const SORT_OPTIONS: SelectOption[] = [
  { value: "Most Urgent", label: "Most Urgent" },
  { value: "Nearly Funded", label: "Nearly Funded" },
  { value: "Most Recent", label: "Most Recent" },
  { value: "Highest Impact", label: "Highest Impact" },
];

const CARDS_PER_PAGE = 6;

// 1. MAIN CONTENT COMPONENT (Handles all your existing dashboard engine)
function AdminCampaignsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = React.useTransition();

  const store = useCampaignFilterStore();

  React.useEffect(() => {
    store.initializeFromUrl(searchParams);
  }, [searchParams]);

  const updateUrl = (updates: Partial<typeof store>) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    const currentStore = { ...store, ...updates };

    if (currentStore.search) nextParams.set("search", currentStore.search);
    else nextParams.delete("search");

    if (currentStore.category !== "All")
      nextParams.set("category", currentStore.category);
    else nextParams.delete("category");

    if (currentStore.status !== "All")
      nextParams.set("status", currentStore.status);
    else nextParams.delete("status");

    if (currentStore.goalRange !== "All")
      nextParams.set("goalRange", currentStore.goalRange);
    else nextParams.delete("goalRange");

    if (currentStore.sortBy !== "Most Urgent")
      nextParams.set("sortBy", currentStore.sortBy);
    else nextParams.delete("sortBy");

    if (currentStore.page > 1)
      nextParams.set("page", String(currentStore.page));
    else nextParams.delete("page");

    startTransition(() => {
      router.push(`/admin/campaigns?${nextParams.toString()}`);
    });
  };

  const filteredCampaigns = React.useMemo(() => {
    return dummyCampaigns
      .filter((campaign) => {
        if (store.search.trim() !== "") {
          const query = store.search.toLowerCase();
          const matchesTitle = campaign.title.toLowerCase().includes(query);
          const matchesDesc = campaign.description
            .toLowerCase()
            .includes(query);
          if (!matchesTitle && !matchesDesc) return false;
        }

        if (store.category !== "All") {
          const targetCategory =
            store.category === "Emergency Response"
              ? "Disaster Response"
              : store.category;
          if (campaign.category !== targetCategory) return false;
        }

        if (store.status !== "All" && campaign.status !== store.status)
          return false;

        if (store.goalRange !== "All") {
          const target = campaign.targetAmount;
          if (store.goalRange === "<$5K" && target >= 5000) return false;
          if (
            store.goalRange === "$5K-$25K" &&
            (target < 5000 || target > 25000)
          )
            return false;
          if (
            store.goalRange === "$25K-$100K" &&
            (target < 25000 || target > 100000)
          )
            return false;
          if (store.goalRange === "$100K+" && target <= 100000) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (store.sortBy === "Most Urgent") {
          if (a.status === "Urgent" && b.status !== "Urgent") return -1;
          if (a.status !== "Urgent" && b.status === "Urgent") return 1;
        }
        if (store.sortBy === "Nearly Funded") {
          const aProgress = a.currentAmount / a.targetAmount;
          const bProgress = b.currentAmount / b.targetAmount;
          return bProgress - aProgress;
        }
        if (store.sortBy === "Highest Impact") {
          return b.targetAmount - a.targetAmount;
        }
        return b.id.localeCompare(a.id);
      });
  }, [
    store.search,
    store.category,
    store.status,
    store.goalRange,
    store.sortBy,
  ]);

  const totalPages = Math.ceil(filteredCampaigns.length / CARDS_PER_PAGE) || 1;
  const paginatedCampaigns = React.useMemo(() => {
    const startIndex = (store.page - 1) * CARDS_PER_PAGE;
    return filteredCampaigns.slice(startIndex, startIndex + CARDS_PER_PAGE);
  }, [filteredCampaigns, store.page]);

  const activeCountLabel = `Showing ${filteredCampaigns.length} active campaign${filteredCampaigns.length === 1 ? "" : "s"}`;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-background-soft/30 min-h-screen">
      <section className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-text-light/10 pb-6 gap-4">
        <div className="space-y-1">
          <h1 className="text-h1 font-sans font-black tracking-tight text-text-primary flex items-center gap-2.5">
            <FolderHeart className="w-8 h-8 text-primary shrink-0" />
            Admin Campaign Control
          </h1>
          <p className="text-body font-body text-text-muted">
            Track performance, execute donation runs, and monitor live global
            funding metrics.
          </p>
        </div>

        <div className="w-full md:w-80">
          <Input
            label="Search campaigns"
            id="campaign-search-bar"
            placeholder="Search by name or keyword..."
            value={store.search}
            className="w-full"
            onChange={(e) => {
              store.setSearch(e.target.value);
              updateUrl({ search: e.target.value, page: 1 });
            }}
          />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <aside className="lg:col-span-1 border border-text-light/10 rounded-xl bg-background-default p-6 space-y-6 shadow-sm sticky top-6">
          <div className="flex items-center justify-between border-b border-text-light/10 pb-4">
            <h2 className="text-body font-sans font-bold text-text-primary flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-text-muted" />
              Filter Matrix
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-text-muted text-small hover:text-orange-600 gap-1"
              onClick={() => {
                store.resetFilters();
                router.push("/admin/campaigns");
              }}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All
            </Button>
          </div>

          <div className="space-y-3">
            <h3 className="text-small font-bold text-text-primary tracking-wide uppercase">
              Category
            </h3>
            <div className="flex flex-wrap lg:flex-col gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    store.setCategory(cat);
                    updateUrl({ category: cat, page: 1 });
                  }}
                  className={`px-3 py-2 text-left rounded-lg text-small font-medium font-body transition-all w-full border ${
                    store.category === cat
                      ? "bg-blue-50 text-blue-700 border-blue-200 font-bold"
                      : "bg-transparent text-text-muted border-transparent hover:bg-background-soft hover:text-text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 border-t border-text-light/10 pt-5">
            <h3 className="text-small font-bold text-text-primary tracking-wide uppercase">
              Status
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
              {STATUSES.map((stat) => (
                <button
                  key={stat}
                  onClick={() => {
                    store.setStatus(stat);
                    updateUrl({ status: stat, page: 1 });
                  }}
                  className={`px-3 py-2 text-left rounded-lg text-small font-medium font-body transition-all border ${
                    store.status === stat
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200 font-bold"
                      : "bg-transparent text-text-muted border-transparent hover:bg-background-soft hover:text-text-primary"
                  }`}
                >
                  {stat === "All" ? "All Statuses" : stat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 border-t border-text-light/10 pt-5">
            <h3 className="text-small font-bold text-text-primary tracking-wide uppercase">
              Goal Budget
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
              {GOALS.map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    store.setGoalRange(range);
                    updateUrl({ goalRange: range, page: 1 });
                  }}
                  className={`px-3 py-2 text-left rounded-lg text-small font-medium font-body transition-all border ${
                    store.goalRange === range
                      ? "bg-indigo-50 text-indigo-800 border-indigo-200 font-bold"
                      : "bg-transparent text-text-muted border-transparent hover:bg-background-soft hover:text-text-primary"
                  }`}
                >
                  {range === "All" ? "Any Amount" : range}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section className="lg:col-span-3 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-background-default border border-text-light/10 rounded-xl px-5 py-3.5 gap-4 shadow-sm">
            <span className="text-body font-bold text-text-primary font-sans">
              {activeCountLabel}
            </span>

            <div className="w-full sm:w-56">
              <Select
                label="Sort Campaigns By"
                options={SORT_OPTIONS}
                value={store.sortBy}
                onChange={(val) => {
                  store.setSortBy(val as CampaignSortOption);
                  updateUrl({ sortBy: val as CampaignSortOption });
                }}
              />
            </div>
          </div>

          {isPending ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: CARDS_PER_PAGE }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : paginatedCampaigns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed border-text-light/20 rounded-2xl p-16 text-center max-w-xl mx-auto space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-h3 font-sans font-extrabold text-text-primary">
                No Matching Campaigns Found
              </h3>
              <p className="text-body font-body text-text-muted max-w-sm mx-auto">
                We couldn't track down any campaigns matching your current
                filter metrics. Try shifting your structural terms or clearing
                search keywords.
              </p>
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  store.resetFilters();
                  router.push("/admin/campaigns");
                }}
              >
                Clear Search Parameters
              </Button>
            </div>
          )}

          {totalPages > 1 && !isPending && (
            <nav className="flex items-center justify-between border-t border-text-light/10 pt-6 mt-8">
              <Button
                variant="outline"
                size="sm"
                disabled={store.page === 1}
                onClick={() => {
                  const prevPage = store.page - 1;
                  store.setPage(prevPage);
                  updateUrl({ page: prevPage });
                }}
              >
                Previous Page
              </Button>
              <span className="text-small font-mono font-bold text-text-muted uppercase">
                Page {store.page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={store.page === totalPages}
                onClick={() => {
                  const nextPage = store.page + 1;
                  store.setPage(nextPage);
                  updateUrl({ page: nextPage });
                }}
              >
                Next Page
              </Button>
            </nav>
          )}
        </section>
      </div>
    </main>
  );
}

// 2. EXPORTED DEFAULT WRAPPER (Satisfies Next.js Production Prerender Compiler)
export default function AdminCampaignsPage() {
  return (
    <React.Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      }
    >
      <AdminCampaignsContent />
    </React.Suspense>
  );
}

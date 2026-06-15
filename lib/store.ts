"use client";

import { create } from "zustand";

// Explicit string type configurations mapped cleanly to ticket filters
export type CampaignCategoryFilter =
  | "All"
  | "Education"
  | "Healthcare"
  | "Environment"
  | "Poverty Relief"
  | "Emergency Response";
export type CampaignStatusFilter = "All" | "Active" | "Completed" | "Urgent";
export type CampaignGoalFilter =
  | "All"
  | "<$5K"
  | "$5K-$25K"
  | "$25K-$100K"
  | "$100K+";
export type CampaignSortOption =
  | "Most Urgent"
  | "Nearly Funded"
  | "Most Recent"
  | "Highest Impact";

export interface FilterState {
  search: string;
  category: CampaignCategoryFilter;
  status: CampaignStatusFilter;
  goalRange: CampaignGoalFilter;
  sortBy: CampaignSortOption;
  page: number;
  setSearch: (search: string) => void;
  setCategory: (category: CampaignCategoryFilter) => void;
  setStatus: (status: CampaignStatusFilter) => void;
  setGoalRange: (range: CampaignGoalFilter) => void;
  setSortBy: (sort: CampaignSortOption) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
  initializeFromUrl: (urlParams: URLSearchParams) => void;
}

export const useCampaignFilterStore = create<FilterState>((set) => ({
  search: "",
  category: "All",
  status: "All",
  goalRange: "All",
  sortBy: "Most Urgent",
  page: 1,

  setSearch: (search) => set({ search, page: 1 }),
  setCategory: (category) => set({ category, page: 1 }),
  setStatus: (status) => set({ status, page: 1 }),
  setGoalRange: (goalRange) => set({ goalRange, page: 1 }),
  setSortBy: (sortBy) => set({ sortBy }),
  setPage: (page) => set({ page }),

  resetFilters: () =>
    set({
      search: "",
      category: "All",
      status: "All",
      goalRange: "All",
      sortBy: "Most Urgent",
      page: 1,
    }),

  initializeFromUrl: (params) => {
    set({
      search: params.get("search") || "",
      category: (params.get("category") as CampaignCategoryFilter) || "All",
      status: (params.get("status") as CampaignStatusFilter) || "All",
      goalRange: (params.get("goalRange") as CampaignGoalFilter) || "All",
      sortBy: (params.get("sortBy") as CampaignSortOption) || "Most Urgent",
      page: Number(params.get("page")) || 1,
    });
  },
}));

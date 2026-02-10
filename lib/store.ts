import { create } from "zustand";
import type {
  DashboardStats,
  ChartData,
  UserDistribution,
} from "./mockData";
import {
  fetchDashboardStats,
  fetchRevenueData,
  fetchOrdersData,
  fetchUserDistribution,
} from "./mockData";

export type DateRange = "7days" | "30days" | "12months";
export type UserType = "all" | "free" | "premium" | "enterprise";

interface DashboardStore {
  // State
  stats: DashboardStats | null;
  revenueData: ChartData[];
  ordersData: ChartData[];
  userDistribution: UserDistribution[];
  dateRange: DateRange;
  userType: UserType;
  isLoading: boolean;
  error: string | null;

  // Actions
  setDateRange: (range: DateRange) => void;
  setUserType: (type: UserType) => void;
  fetchAllData: () => Promise<void>;
  setError: (error: string | null) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  stats: null,
  revenueData: [],
  ordersData: [],
  userDistribution: [],
  dateRange: "30days",
  userType: "all",
  isLoading: false,
  error: null,

 
  setDateRange: (range: DateRange) => set({ dateRange: range }),
  setUserType: (type: UserType) => set({ userType: type }),

  setError: (error: string | null) => set({ error }),

  fetchAllData: async () => {
    set({ isLoading: true, error: null });
    try {
      const state = useDashboardStore.getState();
      const [stats, revenue, orders, distribution] = await Promise.all([
        fetchDashboardStats(state.dateRange, state.userType),
        fetchRevenueData(state.dateRange, state.userType),
        fetchOrdersData(state.dateRange, state.userType),
        fetchUserDistribution(state.userType),
      ]);

      set({
        stats,
        revenueData: revenue,
        ordersData: orders,
        userDistribution: distribution,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to load data",
        isLoading: false,
      });
    }
  },
}));

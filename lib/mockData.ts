export interface DashboardStats {
  totalRevenue: number;
  totalUsers: number;
  orders: number;
  conversionRate: number;
  revenueChange: number;
  usersChange: number;
  ordersChange: number;
  conversionChange: number;
}

export interface ChartData {
  month: string;
  revenue: number;
  orders: number;
}

export interface UserDistribution {
  name: string;
  value: number;
  color: string;
}

export interface DashboardData {
  stats: DashboardStats;
  revenueChart: ChartData[];
  ordersChart: ChartData[];
  userDistribution: UserDistribution[];
}

// Mock data for the dashboard
export const mockDashboardData: DashboardData = {
  stats: {
    totalRevenue: 54230,
    totalUsers: 1245,
    orders: 342,
    conversionRate: 4.3,
    revenueChange: 12.5,
    usersChange: 8.2,
    ordersChange: -2.4,
    conversionChange: 3.1,
  },
  revenueChart: [
    { month: "Jan", revenue: 35000, orders: 240 },
    { month: "Feb", revenue: 38000, orders: 260 },
    { month: "Mar", revenue: 42000, orders: 280 },
    { month: "Apr", revenue: 39000, orders: 270 },
    { month: "May", revenue: 45000, orders: 290 },
    { month: "Jun", revenue: 48000, orders: 310 },
    { month: "Jul", revenue: 51000, orders: 330 },
    { month: "Aug", revenue: 49000, orders: 320 },
    { month: "Sep", revenue: 52000, orders: 340 },
    { month: "Oct", revenue: 54230, orders: 342 },
    { month: "Nov", revenue: 50000, orders: 330 },
    { month: "Dec", revenue: 56000, orders: 355 },
  ],
  ordersChart: [
    { month: "Jan", revenue: 35000, orders: 240 },
    { month: "Feb", revenue: 38000, orders: 260 },
    { month: "Mar", revenue: 42000, orders: 280 },
    { month: "Apr", revenue: 39000, orders: 270 },
    { month: "May", revenue: 45000, orders: 290 },
    { month: "Jun", revenue: 48000, orders: 310 },
    { month: "Jul", revenue: 51000, orders: 330 },
    { month: "Aug", revenue: 49000, orders: 320 },
    { month: "Sep", revenue: 52000, orders: 340 },
    { month: "Oct", revenue: 54230, orders: 342 },
    { month: "Nov", revenue: 50000, orders: 330 },
    { month: "Dec", revenue: 56000, orders: 355 },
  ],
  userDistribution: [
    { name: "Free Users", value: 720, color: "#3b82f6" },
    { name: "Premium Users", value: 380, color: "#10b981" },
    { name: "Enterprise Users", value: 145, color: "#f59e0b" },
  ],
};

// Simulated API delay
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Mock API endpoints
export async function fetchDashboardStats(): Promise<DashboardStats> {
  await delay(300);
  return mockDashboardData.stats;
}

export async function fetchRevenueData(): Promise<ChartData[]> {
  await delay(400);
  return mockDashboardData.revenueChart;
}

export async function fetchOrdersData(): Promise<ChartData[]> {
  await delay(400);
  return mockDashboardData.ordersChart;
}

export async function fetchUserDistribution(): Promise<UserDistribution[]> {
  await delay(350);
  return mockDashboardData.userDistribution;
}

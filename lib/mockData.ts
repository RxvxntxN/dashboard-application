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

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));


export async function fetchDashboardStats(
  dateRange: string,
  userType: string
): Promise<DashboardStats> {
  await delay(300);

  const multiplier =
    dateRange === "7days"
      ? 0.15
      : dateRange === "30days"
        ? 0.6
        : dateRange === "12months"
          ? 1
          : 1;

  const userTypeMultiplier =
    userType === "free"
      ? 0.4
      : userType === "premium"
        ? 0.8
        : userType === "enterprise"
          ? 0.6
          : 1;

  const baseStats = mockDashboardData.stats;
  return {
    totalRevenue: Math.round(baseStats.totalRevenue * multiplier * userTypeMultiplier),
    totalUsers: Math.round(baseStats.totalUsers * multiplier * userTypeMultiplier),
    orders: Math.round(baseStats.orders * multiplier * userTypeMultiplier),
    conversionRate: baseStats.conversionRate,
    revenueChange: baseStats.revenueChange,
    usersChange: baseStats.usersChange,
    ordersChange: baseStats.ordersChange,
    conversionChange: baseStats.conversionChange,
  };
}

export async function fetchRevenueData(
  dateRange: string,
  userType: string
): Promise<ChartData[]> {
  await delay(400);
  let data = mockDashboardData.revenueChart;

  if (dateRange === "7days") {
    data = data.slice(-7);
  } else if (dateRange === "30days") {
    data = data.slice(-9);
  }

  const multiplier =
    userType === "free"
      ? 0.4
      : userType === "premium"
        ? 0.8
        : userType === "enterprise"
          ? 0.6
          : 1;

  return data.map((item) => ({
    ...item,
    revenue: Math.round(item.revenue * multiplier),
    orders: Math.round(item.orders * multiplier),
  }));
}

export async function fetchOrdersData(
  dateRange: string,
  userType: string
): Promise<ChartData[]> {
  await delay(400);
  let data = mockDashboardData.ordersChart;

  if (dateRange === "7days") {
    data = data.slice(-7);
  } else if (dateRange === "30days") {
    data = data.slice(-9);
  }

  const multiplier =
    userType === "free"
      ? 0.4
      : userType === "premium"
        ? 0.8
        : userType === "enterprise"
          ? 0.6
          : 1;

  return data.map((item) => ({
    ...item,
    revenue: Math.round(item.revenue * multiplier),
    orders: Math.round(item.orders * multiplier),
  }));
}

export async function fetchUserDistribution(
  userType: string
): Promise<UserDistribution[]> {
  await delay(350);
  let distribution = mockDashboardData.userDistribution;

  if (userType !== "all") {
    distribution = distribution.filter((item) =>
      item.name.toLowerCase().includes(userType.toLowerCase())
    );
  }

  return distribution;
}
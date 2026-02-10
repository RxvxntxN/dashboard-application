'use client';
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { useState } from "react";
import { FilterDateSection } from "@/components/dashboard/FilterDateSection";
import { KPICard } from "@/components/dashboard/KPICard";
import { useDashboardStore } from "@/lib/store";
import { DollarSign, Users, ShoppingCart, TrendingUp } from "lucide-react";
import { useEffect } from "react";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { OrdersChart } from "@/components/dashboard/OrdersChart";
import { UserDistributionChart } from "@/components/dashboard/UserDistributionChart";

export default function Home() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const {
    stats,
    revenueData,
    ordersData,
    userDistribution,
    isLoading,
    error,
    fetchAllData,
  } = useDashboardStore();

  useEffect(() => {
    setMounted(true);
    fetchAllData();
  }, [fetchAllData]);


  return (
    <div className="flex h-screen bg-background">
      
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <FilterDateSection />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <KPICard
                title="Total Revenue"
                value={stats?.totalRevenue ?? 0}
                change={stats?.revenueChange ?? 0}
                icon={<DollarSign className="w-6 h-6" />}
                isLoading={isLoading}
              />
              <KPICard
                title="Total Users"
                value={stats?.totalUsers ?? 0}
                change={stats?.usersChange ?? 0}
                icon={<Users className="w-6 h-6" />}
                isLoading={isLoading}
              />
              <KPICard
                title="Orders"
                value={stats?.orders ?? 0}
                change={stats?.ordersChange ?? 0}
                icon={<ShoppingCart className="w-6 h-6" />}
                isLoading={isLoading}
              />
              <KPICard
                title="Conversion Rate"
                value={`${stats?.conversionRate ?? 0}%`}
                change={stats?.conversionChange ?? 0}
                icon={<TrendingUp className="w-6 h-6" />}
                isLoading={isLoading}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <RevenueChart data={revenueData} isLoading={isLoading} />
              <OrdersChart data={ordersData} isLoading={isLoading} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <UserDistributionChart
                data={userDistribution}
                isLoading={isLoading}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

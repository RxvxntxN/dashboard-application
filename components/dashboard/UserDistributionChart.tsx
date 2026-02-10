"use client";
import { ChartOptions } from "chart.js";
import { Card } from "@/components/ui/card";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Skeleton } from "@/components/ui/skeleton";

ChartJS.register(ArcElement, Tooltip, Legend);

interface UserDistributionChartProps {
  data: Array<{ name: string; value: number; color: string }>;
  isLoading?: boolean;
}

export function UserDistributionChart({
  data,
  isLoading = false,
}: UserDistributionChartProps) {
  if (isLoading) {
    return (
      <Card className="p-6 bg-card border-border">
        <div className="h-4 w-40 bg-muted rounded animate-pulse mb-6" />
        <Skeleton className="h-64 w-full rounded" />
      </Card>
    );
  }

  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: "Users",
        data: data.map((item) => item.value),
        backgroundColor: data.map((item) => item.color),
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 2,
        hoverBorderColor: "rgba(255, 255, 255, 0.3)",
        hoverBorderWidth: 3,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#6b7280",
          font: { size: 12, weight: "bold" as const },
          padding: 15,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: "rgba(31, 41, 55, 0.9)",
        borderColor: "#374151",
        borderWidth: 1,
        titleColor: "#f3f4f6",
        bodyColor: "#f3f4f6",
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context: any) => {
            return `Users: ${context.parsed}`;
          },
        },
      },
    },
  };

  return (
    <Card className="p-6 bg-card border-border">
      <h3 className="text-lg font-semibold text-foreground mb-6">
        User Distribution
      </h3>
      <div className="h-80">
        <Doughnut data={chartData} options={options} />
      </div>
    </Card>
  );
}

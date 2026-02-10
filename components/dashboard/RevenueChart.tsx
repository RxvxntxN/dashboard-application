"use client";
import { ChartOptions } from "chart.js";
import { Card } from "@/components/ui/card";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Skeleton } from "@/components/ui/skeleton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface RevenueChartProps {
  data: Array<{ month: string; revenue: number; orders: number }>;
  isLoading?: boolean;
}

export function RevenueChart({ data, isLoading = false }: RevenueChartProps) {
  if (isLoading) {
    return (
      <Card className="p-6 bg-card border-border">
        <div className="h-4 w-40 bg-muted rounded animate-pulse mb-6" />
        <Skeleton className="h-64 w-full rounded" />
      </Card>
    );
  }

  const chartData = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: "Revenue",
        data: data.map((item) => item.revenue),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 2,
        pointBackgroundColor: "#3b82f6",
        pointBorderColor: "#1e40af",
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#6b7280",
          font: { size: 12, weight: "bold" as const },
          padding: 15,
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
            return `Revenue: $${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(229, 231, 235, 0.2)",
        },
        ticks: {
          color: "#6b7280",
          font: { size: 12 },
          callback: (value: any) => `$${value}k`,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6b7280",
          font: { size: 12 },
        },
      },
    },
  };

  return (
    <Card className="p-6 bg-card border-border">
      <h3 className="text-lg font-semibold text-foreground mb-6">
        Revenue Over Time
      </h3>
      <div className="h-80">
        <Line data={chartData} options={options} />
      </div>
    </Card>
  );
}

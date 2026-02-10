"use client";
import { ChartOptions } from "chart.js";
import { Card } from "@/components/ui/card";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Skeleton } from "@/components/ui/skeleton";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface OrdersChartProps {
  data: Array<{ month: string; revenue: number; orders: number }>;
  isLoading?: boolean;
}

export function OrdersChart({ data, isLoading = false }: OrdersChartProps) {
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
        label: "Orders",
        data: data.map((item) => item.orders),
        backgroundColor: "#10b981",
        borderColor: "#059669",
        borderWidth: 1,
        borderRadius: 8,
        hoverBackgroundColor: "#047857",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
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
            return `Orders: ${context.parsed.y}`;
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
        Orders Per Month
      </h3>
      <div className="h-80">
        <Bar data={chartData} options={options} />
      </div>
    </Card>
  );
}

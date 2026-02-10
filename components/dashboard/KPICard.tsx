import React from "react"
//import { LucideIcon } from "lucide-react"; // Uncomment if you want to use Lucide icons in the future
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  change: number;
  icon?: React.ReactNode;
  isLoading?: boolean;
}

export function KPICard({
  title,
  value,
  change,
  icon,
  isLoading = false,
}: KPICardProps) {
  const isPositive = change >= 0;

  if (isLoading) {
    return (
      <Card className="p-6 bg-card border-border">
        <div className="h-4 w-20 bg-muted rounded animate-pulse mb-4" />
        <div className="h-8 w-32 bg-muted rounded animate-pulse mb-3" />
        <div className="h-4 w-24 bg-muted rounded animate-pulse" />
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-card border-border hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-2">
            {typeof value === "number" ? `$${value.toLocaleString()}` : value}
          </p>
        </div>
        {icon && <div className="text-primary">{icon}</div>}
      </div>

      <div className="flex items-center gap-2">
        {isPositive ? (
          <TrendingUp className="w-4 h-4 text-green-500" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-500" />
        )}
        <span
          className={`text-sm font-semibold ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? "+" : ""}
          {change.toFixed(1)}%
        </span>
        <span className="text-xs text-muted-foreground">vs last month</span>
      </div>
    </Card>
  );
}

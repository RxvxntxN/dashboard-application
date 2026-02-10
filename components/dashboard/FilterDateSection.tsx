"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDashboardStore, type DateRange, type UserType } from "@/lib/store";
import { Calendar, Filter } from "lucide-react";

export function FilterDateSection() {
  const { dateRange, userType, setDateRange, setUserType } =
    useDashboardStore();

  const dateRangeLabels: Record<DateRange, string> = {
    "7days": "Last 7 Days",
    "30days": "Last 30 Days",
    "12months": "Last 12 Months",
  };

  const userTypeLabels: Record<UserType, string> = {
    all: "All Users",
    free: "Free Users",
    premium: "Premium Users",
    enterprise: "Enterprise Users",
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-8">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-muted-foreground">
          Date Range
        </label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Calendar className="w-4 h-4" />
              {dateRangeLabels[dateRange]}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setDateRange("7days")}>
              Last 7 Days
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDateRange("30days")}>
              Last 30 Days
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDateRange("12months")}>
              Last 12 Months
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-muted-foreground">
          User Type
        </label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="w-4 h-4" />
              {userTypeLabels[userType]}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setUserType("all")}>
              All Users
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setUserType("free")}>
              Free Users
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setUserType("premium")}>
              Premium Users
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setUserType("enterprise")}>
              Enterprise Users
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useDashboardStore, type UserType } from "@/lib/store";
import { Filter } from "lucide-react";
import { useState } from "react";
import { subDays } from "date-fns";

export function FilterDateSection() {
  const { userType, setUserType } = useDashboardStore();
  const [dateRange, setDateRange] = useState<{
    from?: Date;
    to?: Date;
  }>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  const userTypeLabels: Record<UserType, string> = {
    all: "All Users",
    free: "Free Users",
    premium: "Premium Users",
    enterprise: "Enterprise Users",
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="flex flex-col gap-2 flex-1 max-w-sm">
        <label className="text-sm font-medium text-muted-foreground">
          Date Range
        </label>
        <DateRangePicker
          from={dateRange.from}
          to={dateRange.to}
          onDateRangeChange={setDateRange}
          placeholder="Pick a date range"
        />
      </div>

      <div className="flex flex-col gap-2 flex-1 max-w-sm">
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

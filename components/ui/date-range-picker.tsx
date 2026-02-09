"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface DateRangePickerProps {
  from?: Date
  to?: Date
  onDateRangeChange?: (range: { from?: Date; to?: Date }) => void
  placeholder?: string
  disabled?: boolean
}

export function DateRangePicker({
  from,
  to,
  onDateRangeChange,
  placeholder = "Pick a date range",
  disabled,
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: from,
    to: to,
  })

  React.useEffect(() => {
    setDate({ from, to })
  }, [from, to])

  const handleSelect = (newDate: DateRange | undefined) => {
    setDate(newDate)
    if (onDateRangeChange) {
      onDateRangeChange({ from: newDate?.from, to: newDate?.to })
    }
  }

  const formatDateRange = () => {
    if (date?.from) {
      if (date?.to) {
        return `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`
      }
      return format(date.from, "LLL dd, y")
    }
    return placeholder
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal bg-transparent",
            !date?.from && "text-muted-foreground"
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formatDateRange()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          autoFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={handleSelect}
          disabled={disabled}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}

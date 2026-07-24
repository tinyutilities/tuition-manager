"use client";

import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import SearchBar from "@/components/shared/SearchBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Batch } from "@/types/batch";

interface AttendanceFiltersProps {
  searchTerm: string;
  selectedBatch: string;
  selectedStatus: string;
  selectedDate: string;
  batches: Batch[];
  onSearchChange: (value: string) => void;
  onBatchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onReset: () => void;
  onDatePrev?: () => void;
  onDateNext?: () => void;
}

const statusOptions = [
  { value: "all", label: "All" },
  { value: "present", label: "Present" },
  { value: "absent", label: "Absent" },
  { value: "late", label: "Late" },
  { value: "excused", label: "Excused" },
];

export default function AttendanceFilters({
  searchTerm,
  selectedBatch,
  selectedStatus,
  selectedDate,
  batches,
  onSearchChange,
  onBatchChange,
  onStatusChange,
  onDateChange,
  onReset,
  onDatePrev,
  onDateNext,
}: AttendanceFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950 lg:flex-row lg:items-center lg:gap-3">
      <div className="w-full lg:flex-1">
        <label htmlFor="attendance-search" className="sr-only">
          Search students or batches
        </label>
        <SearchBar
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search students or batches..."
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-nowrap">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="attendance-batch-filter"
            className="text-xs font-medium text-muted-foreground lg:sr-only"
          >
            Batch
          </label>
          <Select value={selectedBatch} onValueChange={onBatchChange}>
            <SelectTrigger
              id="attendance-batch-filter"
              className="h-11 w-full rounded-xl sm:w-[160px]"
            >
              <SelectValue placeholder="All Batches" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Batches</SelectItem>
              {batches.map((batch) => (
                <SelectItem key={batch.id} value={batch.id}>
                  {batch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="attendance-date-filter"
            className="text-xs font-medium text-muted-foreground lg:sr-only"
          >
            Date
          </label>
          <div className="flex items-center gap-1">
            {onDatePrev && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-11 w-11 shrink-0 rounded-xl"
                onClick={onDatePrev}
                disabled={!selectedDate}
                aria-label="Previous day"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </Button>
            )}
            <Input
              id="attendance-date-filter"
              type="date"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="h-11 w-full rounded-xl sm:w-[170px]"
            />
            {onDateNext && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-11 w-11 shrink-0 rounded-xl"
                onClick={onDateNext}
                disabled={!selectedDate}
                aria-label="Next day"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="attendance-status-filter"
            className="text-xs font-medium text-muted-foreground lg:sr-only"
          >
            Status
          </label>
          <Select value={selectedStatus} onValueChange={onStatusChange}>
            <SelectTrigger
              id="attendance-status-filter"
              className="h-11 w-full rounded-xl sm:w-[140px]"
            >
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          className="h-11 gap-2 rounded-xl"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Reset Filters
        </Button>
      </div>
    </div>
  );
}

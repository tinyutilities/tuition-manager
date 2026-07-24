"use client";

import { RotateCcw } from "lucide-react";
import SearchBar from "@/components/shared/SearchBar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { monthLabel } from "@/lib/mock/fees";
import type { Batch } from "@/types/batch";

interface FeeFiltersProps {
  searchTerm: string;
  selectedBatch: string;
  selectedStatus: string;
  selectedMonth: string;
  selectedSort: string;
  batches: Batch[];
  months: string[];
  onSearchChange: (value: string) => void;
  onBatchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onMonthChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onReset: () => void;
}

const statusOptions = [
  { value: "all", label: "All" },
  { value: "paid", label: "Paid" },
  { value: "partial", label: "Partial" },
  { value: "pending", label: "Pending" },
  { value: "overdue", label: "Overdue" },
];

const sortOptions = [
  { value: "dueDate-desc", label: "Due Date: Newest" },
  { value: "dueDate-asc", label: "Due Date: Oldest" },
  { value: "amount-desc", label: "Highest Amount" },
  { value: "balance-desc", label: "Highest Balance" },
  { value: "name-asc", label: "Name A-Z" },
];

export default function FeeFilters({
  searchTerm,
  selectedBatch,
  selectedStatus,
  selectedMonth,
  selectedSort,
  batches,
  months,
  onSearchChange,
  onBatchChange,
  onStatusChange,
  onMonthChange,
  onSortChange,
  onReset,
}: FeeFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950 lg:flex-row lg:items-center lg:gap-3">
      <div className="w-full lg:flex-1">
        <label htmlFor="fee-search" className="sr-only">
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
            htmlFor="fee-batch-filter"
            className="text-xs font-medium text-muted-foreground lg:sr-only"
          >
            Batch
          </label>
          <Select value={selectedBatch} onValueChange={onBatchChange}>
            <SelectTrigger
              id="fee-batch-filter"
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
            htmlFor="fee-month-filter"
            className="text-xs font-medium text-muted-foreground lg:sr-only"
          >
            Month
          </label>
          <Select value={selectedMonth} onValueChange={onMonthChange}>
            <SelectTrigger
              id="fee-month-filter"
              className="h-11 w-full rounded-xl sm:w-[180px]"
            >
              <SelectValue placeholder="All Months" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Months</SelectItem>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {monthLabel(month)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="fee-status-filter"
            className="text-xs font-medium text-muted-foreground lg:sr-only"
          >
            Status
          </label>
          <Select value={selectedStatus} onValueChange={onStatusChange}>
            <SelectTrigger
              id="fee-status-filter"
              className="h-11 w-full rounded-xl sm:w-[150px]"
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

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="fee-sort-filter"
            className="text-xs font-medium text-muted-foreground lg:sr-only"
          >
            Sort
          </label>
          <Select value={selectedSort} onValueChange={onSortChange}>
            <SelectTrigger
              id="fee-sort-filter"
              className="h-11 w-full rounded-xl sm:w-[180px]"
            >
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
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

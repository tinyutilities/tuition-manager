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

interface BatchFiltersProps {
  searchTerm: string;
  selectedSubject: string;
  selectedStatus: string;
  selectedSort: string;
  subjects: string[];
  onSearchChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onReset: () => void;
}

const statusOptions = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const sortOptions = [
  { value: "name-asc", label: "Name A-Z" },
  { value: "name-desc", label: "Name Z-A" },
  { value: "enrolled-desc", label: "Most Enrolled" },
  { value: "enrolled-asc", label: "Least Enrolled" },
  { value: "capacity-desc", label: "Highest Capacity" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
];

export default function BatchFilters({
  searchTerm,
  selectedSubject,
  selectedStatus,
  selectedSort,
  subjects,
  onSearchChange,
  onSubjectChange,
  onStatusChange,
  onSortChange,
  onReset,
}: BatchFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950 lg:flex-row lg:items-center lg:gap-3">
      <div className="w-full lg:flex-1">
        <label htmlFor="batch-search" className="sr-only">
          Search batches
        </label>
        <SearchBar
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search batches..."
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-nowrap">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="subject-filter"
            className="text-xs font-medium text-muted-foreground lg:sr-only"
          >
            Subject
          </label>
          <Select value={selectedSubject} onValueChange={onSubjectChange}>
            <SelectTrigger
              id="subject-filter"
              className="h-11 w-full rounded-xl sm:w-[160px]"
            >
              <SelectValue placeholder="All Subjects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="batch-status-filter"
            className="text-xs font-medium text-muted-foreground lg:sr-only"
          >
            Status
          </label>
          <Select value={selectedStatus} onValueChange={onStatusChange}>
            <SelectTrigger
              id="batch-status-filter"
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

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="batch-sort-filter"
            className="text-xs font-medium text-muted-foreground lg:sr-only"
          >
            Sort
          </label>
          <Select value={selectedSort} onValueChange={onSortChange}>
            <SelectTrigger
              id="batch-sort-filter"
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

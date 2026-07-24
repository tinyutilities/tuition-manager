"use client";

import { RotateCcw } from "lucide-react";
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

interface MarksFiltersProps {
  searchTerm: string;
  selectedBatch: string;
  selectedSubject: string;
  selectedDate: string;
  batches: Batch[];
  subjects: string[];
  onSearchChange: (value: string) => void;
  onBatchChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onReset: () => void;
}

export default function MarksFilters({
  searchTerm,
  selectedBatch,
  selectedSubject,
  selectedDate,
  batches,
  subjects,
  onSearchChange,
  onBatchChange,
  onSubjectChange,
  onDateChange,
  onReset,
}: MarksFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950 lg:flex-row lg:items-center lg:gap-3">
      <div className="w-full lg:flex-1">
        <label htmlFor="marks-search" className="sr-only">
          Search tests or batches
        </label>
        <SearchBar
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search tests, students or batches..."
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-nowrap">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="marks-batch-filter"
            className="text-xs font-medium text-muted-foreground lg:sr-only"
          >
            Batch
          </label>
          <Select value={selectedBatch} onValueChange={onBatchChange}>
            <SelectTrigger
              id="marks-batch-filter"
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
            htmlFor="marks-subject-filter"
            className="text-xs font-medium text-muted-foreground lg:sr-only"
          >
            Subject
          </label>
          <Select value={selectedSubject} onValueChange={onSubjectChange}>
            <SelectTrigger
              id="marks-subject-filter"
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
            htmlFor="marks-date-filter"
            className="text-xs font-medium text-muted-foreground lg:sr-only"
          >
            Date
          </label>
          <Input
            id="marks-date-filter"
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="h-11 w-full rounded-xl sm:w-[170px]"
          />
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

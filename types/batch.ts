// types/batch.ts

import type { Student } from "./student";

export type BatchStatus = "active" | "inactive";

export type WeekDay = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface Batch {
  id: string;
  name: string;
  subject: string;
  teacherName: string;
  googleMeetLink: string;
  days: WeekDay[];
  startTime: string;
  endTime: string;
  capacity: number;
  status: BatchStatus;
  createdAt: string;
}

export interface BatchWithRoster extends Batch {
  students: Student[];
  enrolledCount: number;
  capacityPercentage: number;
}

export interface BatchStatsData {
  totalBatches: number;
  activeBatches: number;
  totalEnrolled: number;
  averageCapacityUsage: number;
}

export interface BatchStatsProps {
  stats: BatchStatsData;
}

export interface BatchFormData {
  name: string;
  subject: string;
  teacherName: string;
  googleMeetLink: string;
  days: WeekDay[];
  startTime: string;
  endTime: string;
  capacity: number;
  status: BatchStatus;
}

export type BatchSortOption =
  | "name-asc"
  | "name-desc"
  | "enrolled-desc"
  | "enrolled-asc"
  | "capacity-desc"
  | "capacity-asc"
  | "newest"
  | "oldest";

export interface BatchFilter {
  search: string;
  subject: string | "all";
  status: BatchStatus | "all";
}

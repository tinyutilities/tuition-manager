// types/attendance.ts

export type AttendanceStatus = "present" | "absent" | "late" | "excused";

export interface AttendanceRecord {
  id: string;
  studentId: string;
  batchId: string;
  date: string;
  status: AttendanceStatus;
  markedAt: string;
}

export interface AttendanceEntryInput {
  studentId: string;
  status: AttendanceStatus;
}

export interface AttendanceStatsData {
  totalRecords: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  excusedCount: number;
  averageAttendancePercentage: number;
}

export interface AttendanceStatsProps {
  stats: AttendanceStatsData;
}

export interface TodayAttendanceSummary {
  date: string;
  totalBatchesScheduledToday: number;
  batchesMarkedToday: number;
  totalStudentsMarked: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  excusedCount: number;
}

export interface AttendanceFilter {
  search: string;
  batchId: string | "all";
  status: AttendanceStatus | "all";
  date: string | "all";
}

export interface StudentAttendanceSummary {
  studentId: string;
  totalRecords: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  excusedCount: number;
  attendancePercentage: number;
}

export interface MonthlyAttendanceSummary {
  month: string;
  averagePercentage: number;
  totalRecords: number;
}

export interface BatchAttendanceSession {
  batchId: string;
  batchName: string;
  date: string;
  records: AttendanceRecord[];
  presentCount: number;
  absentCount: number;
  lateCount: number;
  excusedCount: number;
  totalStudents: number;
}

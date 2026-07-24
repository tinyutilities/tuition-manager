// types/student.ts

export type StudentStatus = "active" | "inactive";

export type Gender = "male" | "female" | "other";

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  gender: Gender;
  dateOfBirth: string;
  guardianName: string;
  guardianPhone: string;
  address: string;
  batchId: string;
  batchName: string;
  school: string;
  status: StudentStatus;
  attendancePercentage: number;
  pendingFees: number;
  avatar?: string;
  createdAt: string;
}

export interface StudentStatsData {
  totalStudents: number;
  activeStudents: number;
  averageAttendance: number;
  pendingFeesAmount: number;
  pendingFeesCount: number;
}

export interface StudentStatsProps {
  stats: StudentStatsData;
}

export interface StudentFilter {
  search: string;
  batchId: string | "all";
  status: StudentStatus | "all";
}

export type StudentSortOption =
  | "name-asc"
  | "name-desc"
  | "attendance-asc"
  | "attendance-desc"
  | "fees-asc"
  | "fees-desc"
  | "recent";

export interface StudentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: Gender;
  dateOfBirth: string;
  guardianName: string;
  guardianPhone: string;
  address: string;
  batchId: string;
  school: string;
  status: StudentStatus;
}

export interface StudentTableColumn {
  key: keyof Student | "actions";
  label: string;
  sortable?: boolean;
}
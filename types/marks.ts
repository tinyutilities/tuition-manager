// types/marks.ts

export type Grade = "A+" | "A" | "B+" | "B" | "C" | "D" | "F";

export type MarkStatus = "present" | "absent";

export interface Test {
  id: string;
  name: string;
  subject: string;
  batchId: string;
  maxMarks: number;
  testDate: string;
  remarks?: string;
  createdAt: string;
}

export interface MarkRecord {
  id: string;
  testId: string;
  studentId: string;
  marksObtained: number;
  status: MarkStatus;
  remarks?: string;
  createdAt: string;
}

export interface TestFormData {
  name: string;
  subject: string;
  batchId: string;
  maxMarks: number;
  testDate: string;
  remarks: string;
}

export interface MarkEntryInput {
  studentId: string;
  marksObtained: number;
  status: MarkStatus;
}

export interface MarksStatsData {
  totalTests: number;
  averagePercentage: number;
  highestPercentage: number;
  lowestPercentage: number;
  passRate: number;
}

export interface MarksStatsProps {
  stats: MarksStatsData;
}

export interface SubjectSummary {
  subject: string;
  testsCount: number;
  averagePercentage: number;
}

export interface TestResultSummary {
  test: Test;
  batchName: string;
  studentsAppeared: number;
  averagePercentage: number;
  highestPercentage: number;
  lowestPercentage: number;
  passCount: number;
  failCount: number;
}

export interface TestResultRow {
  studentId: string;
  studentName: string;
  mark: MarkRecord | null;
  percentage: number;
  grade: Grade | null;
}

export interface MonthlyTestSummary {
  month: string;
  testsCount: number;
  averagePercentage: number;
}

export interface TopperEntry {
  studentId: string;
  studentName: string;
  percentage: number;
}

export interface StudentMarkRecord extends MarkRecord {
  test: Test;
  percentage: number;
  grade: Grade;
}

export interface StudentMarkSummary {
  studentId: string;
  testsCount: number;
  overallPercentage: number;
  subjectAverages: SubjectSummary[];
  trend: "up" | "down" | "flat";
  records: StudentMarkRecord[];
}

export type MarksSortOption =
  | "date-desc"
  | "date-asc"
  | "average-desc"
  | "average-asc"
  | "name-asc";

export interface MarksFilter {
  search: string;
  batchId: string | "all";
  subject: string | "all";
  date: string | "all";
}

export interface MarkEntrySession {
  testId: string;
  createdAt: string;
  count: number;
}

// lib/mock/dashboard.ts

import {
  computeBatchStats,
  formatBatchTime,
  getBatchById,
  getStudentsByBatch,
  mockBatches,
} from "@/lib/mock/batch";
import { computeStudentStats, getStudentById, mockStudents } from "@/lib/mock/student";
import {
  computeAttendanceStats,
  getAllAttendanceSessions,
  getMonthlyAttendanceStats,
  getScheduledBatchesForDate,
  isAttendanceMarkedForBatch,
  toDateKey,
} from "@/lib/mock/attendance";
import {
  computeFeeStats,
  getAllFees,
  getMonthlyCollectionStats,
  getOverdueFees,
  mockPayments,
  monthLabel,
} from "@/lib/mock/fees";
import {
  computeMarksStats,
  getAllTests,
  getMarkEntrySessions,
  getMarksByTest,
  getMonthlyTestSummaries,
  getTestById,
} from "@/lib/mock/marks";
import type {
  ActivityItem,
  AlertItem,
  DashboardStatsData,
  DashboardTrends,
  ScheduleEntry,
} from "@/types/dashboard";

function currentMonthKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export function getDashboardStats(): DashboardStatsData {
  const today = toDateKey(new Date());
  const thisMonth = currentMonthKey();

  const studentStats = computeStudentStats(mockStudents);
  const batchStats = computeBatchStats(mockBatches);
  const todaysBatches = getScheduledBatchesForDate(today);

  const todayRecords = getAllAttendanceSessions()
    .filter((session) => session.date === today)
    .flatMap((session) => session.records);
  const todayAttendanceStats = computeAttendanceStats(todayRecords);

  const monthCollection = getMonthlyCollectionStats(1)[0];
  const pendingFeesThisMonth = computeFeeStats(
    getAllFees().filter((fee) => fee.month === thisMonth)
  );

  const testsThisMonth = getMonthlyTestSummaries(1)[0];
  const marksStats = computeMarksStats(getAllTests());

  return {
    totalStudents: studentStats.totalStudents,
    activeBatches: batchStats.activeBatches,
    todaysClasses: todaysBatches.length,
    attendanceTodayPercentage: todayAttendanceStats.averageAttendancePercentage,
    attendanceTodayMarked: todayRecords.length,
    attendanceTodayTotal: todaysBatches.reduce(
      (sum, batch) => sum + getStudentsByBatch(batch.id).length,
      0
    ),
    monthlyCollection: monthCollection?.collected ?? 0,
    pendingFees: pendingFeesThisMonth.pendingAmount,
    testsThisMonth: testsThisMonth?.testsCount ?? 0,
    averageMarksPercentage: marksStats.averagePercentage,
  };
}

export function getTodaySchedule(): ScheduleEntry[] {
  const today = toDateKey(new Date());

  return getScheduledBatchesForDate(today)
    .slice()
    .sort((a, b) => (a.startTime < b.startTime ? -1 : 1))
    .map((batch) => ({
      batchId: batch.id,
      batchName: batch.name,
      subject: batch.subject,
      teacherName: batch.teacherName,
      timeLabel: `${formatBatchTime(batch.startTime)} - ${formatBatchTime(batch.endTime)}`,
      googleMeetLink: batch.googleMeetLink,
      isMarked: isAttendanceMarkedForBatch(batch.id, today),
    }));
}

export function getRecentActivity(limit = 8): ActivityItem[] {
  const items: ActivityItem[] = [];

  mockStudents.forEach((student) => {
    items.push({
      id: `student-${student.id}`,
      type: "student_added",
      at: student.createdAt,
      title: `${student.fullName} was added as a new student`,
      description: student.batchName,
    });
  });

  getAllAttendanceSessions().forEach((session) => {
    const markedAt = session.records[0]?.markedAt ?? `${session.date}T00:00:00.000Z`;
    items.push({
      id: `attendance-${session.batchId}-${session.date}`,
      type: "attendance_marked",
      at: markedAt,
      title: `Attendance marked for ${session.batchName}`,
      description: `${session.presentCount} present, ${session.absentCount} absent of ${session.totalStudents}`,
    });
  });

  mockPayments.forEach((payment) => {
    const student = getStudentById(payment.studentId);
    items.push({
      id: `payment-${payment.id}`,
      type: "payment_recorded",
      at: payment.createdAt,
      title: `Payment of ₹${payment.amount.toLocaleString("en-IN")} recorded`,
      description: student?.fullName,
    });
  });

  getAllTests().forEach((test) => {
    const batch = getBatchById(test.batchId);
    items.push({
      id: `test-${test.id}`,
      type: "test_created",
      at: test.createdAt,
      title: `Test "${test.name}" created`,
      description: batch?.name,
    });
  });

  getMarkEntrySessions().forEach((session) => {
    const test = getTestById(session.testId);
    items.push({
      id: `marks-${session.testId}-${session.createdAt}`,
      type: "marks_entered",
      at: session.createdAt,
      title: `Marks entered for ${test?.name ?? "a test"}`,
      description: `${session.count} student${session.count === 1 ? "" : "s"} scored`,
    });
  });

  return items.sort((a, b) => (a.at < b.at ? 1 : -1)).slice(0, limit);
}

export function getDashboardAlerts(): AlertItem[] {
  const alerts: AlertItem[] = [];
  const today = toDateKey(new Date());

  const overdueFees = getOverdueFees();
  if (overdueFees.length > 0) {
    const totalOverdue = overdueFees.reduce(
      (sum, fee) => sum + (fee.amount - fee.amountPaid),
      0
    );
    alerts.push({
      id: "overdue-fees",
      severity: "critical",
      title: `${overdueFees.length} overdue fee${overdueFees.length === 1 ? "" : "s"}`,
      description: `₹${totalOverdue.toLocaleString("en-IN")} pending past the due date`,
      href: "/dashboard/fees",
    });
  }

  const unmarkedBatches = getScheduledBatchesForDate(today).filter(
    (batch) => !isAttendanceMarkedForBatch(batch.id, today)
  );
  if (unmarkedBatches.length > 0) {
    alerts.push({
      id: "attendance-not-marked",
      severity: "warning",
      title: `${unmarkedBatches.length} batch${unmarkedBatches.length === 1 ? "" : "es"} without attendance marked today`,
      description: unmarkedBatches.map((batch) => batch.name).join(", "),
      href: "/dashboard/attendance",
    });
  }

  const testsWithoutMarks = getAllTests().filter(
    (test) => getMarksByTest(test.id).length === 0
  );
  if (testsWithoutMarks.length > 0) {
    alerts.push({
      id: "tests-without-marks",
      severity: "warning",
      title: `${testsWithoutMarks.length} test${testsWithoutMarks.length === 1 ? "" : "s"} without marks entered`,
      description: testsWithoutMarks.map((test) => test.name).join(", "),
      href: "/dashboard/marks",
    });
  }

  const emptyBatches = mockBatches.filter(
    (batch) => getStudentsByBatch(batch.id).length === 0
  );
  if (emptyBatches.length > 0) {
    alerts.push({
      id: "empty-batches",
      severity: "warning",
      title: `${emptyBatches.length} empty batch${emptyBatches.length === 1 ? "" : "es"}`,
      description: emptyBatches.map((batch) => batch.name).join(", "),
      href: "/dashboard/batches",
    });
  }

  return alerts;
}

export function getDashboardTrends(monthsBack = 6): DashboardTrends {
  return {
    attendance: getMonthlyAttendanceStats(monthsBack).map((point) => ({
      label: monthLabel(point.month),
      percentage: point.averagePercentage,
    })),
    feeCollection: getMonthlyCollectionStats(monthsBack).map((point) => ({
      label: monthLabel(point.month),
      percentage: point.collectionRate,
    })),
    marks: getMonthlyTestSummaries(monthsBack).map((point) => ({
      label: monthLabel(point.month),
      percentage: point.averagePercentage,
    })),
  };
}

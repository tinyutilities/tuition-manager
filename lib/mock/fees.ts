// lib/mock/fees.ts

import type {
  BatchFeeSummary,
  FeeRecord,
  FeeStatsData,
  FeeStatus,
  MonthlyCollectionStats,
  Payment,
  PaymentInput,
  StudentFeeSummary,
} from "@/types/fees";
import { mockStudents } from "@/lib/mock/student";
import { toDateKey, toMonthKey } from "@/lib/utils";
import { USE_DEMO_DATA } from "@/lib/config";

// Monthly billing rate per batch. Fees don't have a rate field on Batch yet
// (Prisma's Fee.amount is per-record, not derived), so this table is the
// Fees domain's own pricing source until a real billing model exists.
const BATCH_MONTHLY_FEE: Record<string, number> = {
  "batch-a": 3500,
  "batch-b": 4000,
  "batch-c": 3200,
  "batch-d": 4500,
};

function getMonthlyFeeForBatch(batchId: string): number {
  return BATCH_MONTHLY_FEE[batchId] ?? 3000;
}

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  cash: "Cash",
  upi: "UPI",
  bank_transfer: "Bank Transfer",
  card: "Card",
  cheque: "Cheque",
};

export function formatPaymentMethod(method: string): string {
  return PAYMENT_METHOD_LABELS[method] ?? method;
}

export function monthLabel(monthKey: string): string {
  const [year, month] = monthKey.split("-").map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
}

function makeFeeId(studentId: string, month: string) {
  return `fee-${studentId}-${month}`;
}

function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

// Status is always recomputed from amount/amountPaid/dueDate rather than
// trusted from storage, so "overdue" stays accurate as days pass without
// needing a cron-style recompute job.
export function computeFeeStatus(fee: {
  amount: number;
  amountPaid: number;
  dueDate: string;
}): FeeStatus {
  const isOverdue = new Date(fee.dueDate).getTime() < startOfToday().getTime();

  if (fee.amountPaid >= fee.amount) return "paid";
  if (fee.amountPaid > 0) return isOverdue ? "overdue" : "partial";
  return isOverdue ? "overdue" : "pending";
}

function withLiveStatus(fee: FeeRecord): FeeRecord {
  return { ...fee, status: computeFeeStatus(fee) };
}

const FEE_HISTORY_MONTHS = 3;

function generateSeedFees(): { fees: FeeRecord[]; payments: Payment[] } {
  const fees: FeeRecord[] = [];
  const payments: Payment[] = [];
  const today = new Date();

  mockStudents.forEach((student) => {
    if (!student.batchId) return;
    const monthlyAmount = getMonthlyFeeForBatch(student.batchId);

    for (let offset = FEE_HISTORY_MONTHS - 1; offset >= 0; offset--) {
      const monthDate = new Date(
        today.getFullYear(),
        today.getMonth() - offset,
        1
      );
      const monthKey = toMonthKey(monthDate);
      const dueDate = toDateKey(
        new Date(monthDate.getFullYear(), monthDate.getMonth(), 5)
      );
      const isCurrentMonth = offset === 0;

      const amountPaid = isCurrentMonth
        ? Math.max(0, monthlyAmount - student.pendingFees)
        : monthlyAmount;

      const feeId = makeFeeId(student.id, monthKey);
      const fee: FeeRecord = {
        id: feeId,
        studentId: student.id,
        batchId: student.batchId,
        month: monthKey,
        amount: monthlyAmount,
        amountPaid,
        dueDate,
        status: computeFeeStatus({ amount: monthlyAmount, amountPaid, dueDate }),
        createdAt: new Date(
          monthDate.getFullYear(),
          monthDate.getMonth(),
          1
        ).toISOString(),
      };
      fees.push(fee);

      if (amountPaid > 0) {
        payments.push({
          id: `pay-${feeId}`,
          feeId,
          studentId: student.id,
          amount: amountPaid,
          method: "upi",
          date: dueDate,
          referenceNumber: "",
          notes: "",
          createdAt: new Date(
            monthDate.getFullYear(),
            monthDate.getMonth(),
            5
          ).toISOString(),
        });
      }
    }
  });

  return { fees, payments };
}

// A first-time user has no billing history yet — only seed demo data when
// the feature flag is on (see lib/config.ts). This also cascades naturally:
// generateSeedFees() derives everything from mockStudents, so it would
// already produce empty arrays once that repository is empty.
const seed = USE_DEMO_DATA ? generateSeedFees() : { fees: [], payments: [] };
export const mockFeeRecords: FeeRecord[] = seed.fees;
export const mockPayments: Payment[] = seed.payments;

export function getAllFees(): FeeRecord[] {
  return mockFeeRecords.map(withLiveStatus);
}

export function getFeeById(id: string): FeeRecord | undefined {
  const fee = mockFeeRecords.find((record) => record.id === id);
  return fee ? withLiveStatus(fee) : undefined;
}

export function getFeesByStudent(studentId: string): FeeRecord[] {
  return mockFeeRecords
    .filter((record) => record.studentId === studentId)
    .map(withLiveStatus)
    .sort((a, b) => (a.month < b.month ? 1 : -1));
}

export function getFeesByBatch(batchId: string): FeeRecord[] {
  return mockFeeRecords.filter((record) => record.batchId === batchId).map(withLiveStatus);
}

export function getPendingFees(): FeeRecord[] {
  return mockFeeRecords.map(withLiveStatus).filter((fee) => fee.status !== "paid");
}

export function getOverdueFees(): FeeRecord[] {
  return mockFeeRecords.map(withLiveStatus).filter((fee) => fee.status === "overdue");
}

export function getPaymentsByStudent(studentId: string): Payment[] {
  return mockPayments
    .filter((payment) => payment.studentId === studentId)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPaymentsByFee(feeId: string): Payment[] {
  return mockPayments.filter((payment) => payment.feeId === feeId);
}

function syncStudentPendingFees(studentId: string): void {
  const index = mockStudents.findIndex((student) => student.id === studentId);
  if (index === -1) return;

  const pendingBalance = getFeesByStudent(studentId).reduce(
    (sum, fee) => sum + Math.max(0, fee.amount - fee.amountPaid),
    0
  );
  mockStudents[index] = {
    ...mockStudents[index],
    pendingFees: pendingBalance,
  };
}

export function createFeeRecord(data: {
  studentId: string;
  batchId: string;
  month: string;
  amount: number;
  dueDate: string;
}): FeeRecord {
  const fee: FeeRecord = {
    id: makeFeeId(data.studentId, data.month),
    studentId: data.studentId,
    batchId: data.batchId,
    month: data.month,
    amount: data.amount,
    amountPaid: 0,
    dueDate: data.dueDate,
    status: computeFeeStatus({ amount: data.amount, amountPaid: 0, dueDate: data.dueDate }),
    createdAt: new Date().toISOString(),
  };

  mockFeeRecords.push(fee);
  syncStudentPendingFees(data.studentId);
  return fee;
}

export function getOrCreateCurrentMonthFee(studentId: string): FeeRecord | null {
  const student = mockStudents.find((s) => s.id === studentId);
  if (!student || !student.batchId) return null;

  const monthKey = toMonthKey(new Date());
  const existing = mockFeeRecords.find(
    (record) => record.studentId === studentId && record.month === monthKey
  );
  if (existing) return withLiveStatus(existing);

  const dueDate = toDateKey(
    new Date(new Date().getFullYear(), new Date().getMonth(), 5)
  );
  return createFeeRecord({
    studentId,
    batchId: student.batchId,
    month: monthKey,
    amount: getMonthlyFeeForBatch(student.batchId),
    dueDate,
  });
}

export function updateFeeRecord(
  id: string,
  updates: Partial<Pick<FeeRecord, "amount" | "dueDate">>
): FeeRecord | null {
  const index = mockFeeRecords.findIndex((record) => record.id === id);
  if (index === -1) return null;

  const updated: FeeRecord = { ...mockFeeRecords[index], ...updates };
  updated.status = computeFeeStatus(updated);
  mockFeeRecords[index] = updated;

  syncStudentPendingFees(updated.studentId);
  return withLiveStatus(updated);
}

export function deleteFeeRecord(id: string): boolean {
  const index = mockFeeRecords.findIndex((record) => record.id === id);
  if (index === -1) return false;

  const { studentId } = mockFeeRecords[index];
  mockFeeRecords.splice(index, 1);

  for (let i = mockPayments.length - 1; i >= 0; i--) {
    if (mockPayments[i].feeId === id) mockPayments.splice(i, 1);
  }

  syncStudentPendingFees(studentId);
  return true;
}

export function recordPayment(
  feeId: string,
  input: PaymentInput
): Payment | null {
  const index = mockFeeRecords.findIndex((record) => record.id === feeId);
  if (index === -1) return null;

  const fee = mockFeeRecords[index];
  const payment: Payment = {
    id: `pay-${feeId}-${mockPayments.length + 1}`,
    feeId,
    studentId: fee.studentId,
    amount: input.amount,
    method: input.method,
    date: input.date,
    referenceNumber: input.referenceNumber,
    notes: input.notes,
    createdAt: new Date().toISOString(),
  };
  mockPayments.push(payment);

  const amountPaid = fee.amountPaid + input.amount;
  const updated: FeeRecord = {
    ...fee,
    amountPaid,
    status: computeFeeStatus({ amount: fee.amount, amountPaid, dueDate: fee.dueDate }),
  };
  mockFeeRecords[index] = updated;

  syncStudentPendingFees(fee.studentId);
  return payment;
}

export function computeFeeStats(fees: FeeRecord[]): FeeStatsData {
  const liveFees = fees.map(withLiveStatus);
  const totalBilled = liveFees.reduce((sum, fee) => sum + fee.amount, 0);
  const totalCollected = liveFees.reduce((sum, fee) => sum + fee.amountPaid, 0);
  const pendingAmount = liveFees
    .filter((fee) => fee.status !== "paid")
    .reduce((sum, fee) => sum + (fee.amount - fee.amountPaid), 0);
  const overdueAmount = liveFees
    .filter((fee) => fee.status === "overdue")
    .reduce((sum, fee) => sum + (fee.amount - fee.amountPaid), 0);

  const paidStudentIds = new Set(
    liveFees.filter((fee) => fee.status === "paid").map((fee) => fee.studentId)
  );
  const pendingStudentIds = new Set(
    liveFees.filter((fee) => fee.status !== "paid").map((fee) => fee.studentId)
  );

  return {
    totalCollected,
    pendingAmount,
    overdueAmount,
    studentsPaid: paidStudentIds.size,
    studentsPending: pendingStudentIds.size,
    collectionRate:
      totalBilled > 0 ? Math.round((totalCollected / totalBilled) * 100) : 0,
  };
}

export function getMonthlyCollectionStats(
  monthsBack = 6
): MonthlyCollectionStats[] {
  const today = new Date();
  const results: MonthlyCollectionStats[] = [];

  for (let offset = monthsBack - 1; offset >= 0; offset--) {
    const monthDate = new Date(today.getFullYear(), today.getMonth() - offset, 1);
    const monthKey = toMonthKey(monthDate);
    const monthFees = mockFeeRecords.filter((record) => record.month === monthKey);
    const billed = monthFees.reduce((sum, fee) => sum + fee.amount, 0);
    const collected = monthFees.reduce((sum, fee) => sum + fee.amountPaid, 0);

    results.push({
      month: monthKey,
      billed,
      collected,
      collectionRate: billed > 0 ? Math.round((collected / billed) * 100) : 0,
    });
  }

  return results;
}

export function getStudentFeeSummary(studentId: string): StudentFeeSummary {
  const fees = getFeesByStudent(studentId);
  const payments = getPaymentsByStudent(studentId);
  const totalBilled = fees.reduce((sum, fee) => sum + fee.amount, 0);
  const totalPaid = fees.reduce((sum, fee) => sum + fee.amountPaid, 0);
  const pendingBalance = totalBilled - totalPaid;
  const overdueAmount = fees
    .filter((fee) => fee.status === "overdue")
    .reduce((sum, fee) => sum + (fee.amount - fee.amountPaid), 0);

  let status: FeeStatus = "paid";
  if (overdueAmount > 0) {
    status = "overdue";
  } else if (pendingBalance > 0) {
    status = fees.some((fee) => fee.status === "partial") ? "partial" : "pending";
  }

  return {
    studentId,
    totalBilled,
    totalPaid,
    pendingBalance,
    overdueAmount,
    status,
    fees,
    payments,
  };
}

export function getBatchFeeSummary(batchId: string): BatchFeeSummary {
  const fees = getFeesByBatch(batchId);
  const totalBilled = fees.reduce((sum, fee) => sum + fee.amount, 0);
  const totalCollected = fees.reduce((sum, fee) => sum + fee.amountPaid, 0);
  const studentIds = new Set(fees.map((fee) => fee.studentId));
  const paidStudentIds = new Set(
    fees.filter((fee) => fee.status === "paid").map((fee) => fee.studentId)
  );

  return {
    batchId,
    totalBilled,
    totalCollected,
    pendingAmount: totalBilled - totalCollected,
    studentsCount: studentIds.size,
    studentsPaidCount: paidStudentIds.size,
  };
}

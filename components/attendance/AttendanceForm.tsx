"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCheck, Eraser, XOctagon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { AttendanceEntryInput, AttendanceStatus } from "@/types/attendance";
import type { Student } from "@/types/student";

interface AttendanceFormProps {
  students: Student[];
  initialStatuses?: Record<string, AttendanceStatus>;
  onSave: (entries: AttendanceEntryInput[]) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const STATUS_OPTIONS: {
  value: AttendanceStatus;
  label: string;
  activeClass: string;
}[] = [
  {
    value: "present",
    label: "Present",
    activeClass:
      "border-emerald-500 bg-emerald-500 text-white hover:bg-emerald-500",
  },
  {
    value: "absent",
    label: "Absent",
    activeClass: "border-red-500 bg-red-500 text-white hover:bg-red-500",
  },
  {
    value: "late",
    label: "Late",
    activeClass: "border-amber-500 bg-amber-500 text-white hover:bg-amber-500",
  },
  {
    value: "excused",
    label: "Excused",
    activeClass: "border-blue-500 bg-blue-500 text-white hover:bg-blue-500",
  },
];

function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export default function AttendanceForm({
  students,
  initialStatuses = {},
  onSave,
  onCancel,
  isSubmitting = false,
}: AttendanceFormProps) {
  const [statuses, setStatuses] = useState<
    Record<string, AttendanceStatus | undefined>
  >(() => {
    const map: Record<string, AttendanceStatus | undefined> = {};
    students.forEach((student) => {
      map[student.id] = initialStatuses[student.id] ?? "present";
    });
    return map;
  });

  const unmarkedCount = students.filter((s) => !statuses[s.id]).length;

  function setStatus(studentId: string, status: AttendanceStatus) {
    setStatuses((prev) => ({ ...prev, [studentId]: status }));
  }

  function markAll(status: AttendanceStatus) {
    setStatuses(() => {
      const map: Record<string, AttendanceStatus | undefined> = {};
      students.forEach((student) => {
        map[student.id] = status;
      });
      return map;
    });
  }

  function clearAll() {
    setStatuses(() => {
      const map: Record<string, AttendanceStatus | undefined> = {};
      students.forEach((student) => {
        map[student.id] = undefined;
      });
      return map;
    });
  }

  function handleSubmit() {
    if (unmarkedCount > 0) return;

    const entries: AttendanceEntryInput[] = students.map((student) => ({
      studentId: student.id,
      status: statuses[student.id] as AttendanceStatus,
    }));
    onSave(entries);
  }

  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm dark:border-slate-800">
      <CardContent className="flex flex-col gap-4 p-0">
        <div className="flex flex-col gap-3 border-b border-slate-100 px-6 py-4 dark:border-slate-900 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            {students.length} student{students.length === 1 ? "" : "s"}
            {unmarkedCount > 0 && (
              <span className="ml-2 text-amber-600 dark:text-amber-400">
                · {unmarkedCount} unmarked
              </span>
            )}
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1.5 rounded-xl"
              onClick={() => markAll("present")}
            >
              <CheckCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Mark all Present
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1.5 rounded-xl"
              onClick={() => markAll("absent")}
            >
              <XOctagon className="h-3.5 w-3.5" aria-hidden="true" />
              Mark all Absent
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1.5 rounded-xl"
              onClick={clearAll}
            >
              <Eraser className="h-3.5 w-3.5" aria-hidden="true" />
              Clear Selections
            </Button>
          </div>
        </div>

        <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-900">
          {students.map((student) => {
            const currentStatus = statuses[student.id];

            return (
              <div
                key={student.id}
                className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <Link
                  href={`/dashboard/students/${student.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:underline"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>
                      {getInitials(student.firstName, student.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">
                      {student.fullName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {student.batchName}
                    </span>
                  </div>
                </Link>

                <div className="flex flex-wrap gap-2">
                  {STATUS_OPTIONS.map((option) => (
                    <Button
                      key={option.value}
                      type="button"
                      variant="outline"
                      size="sm"
                      className={cn(
                        "rounded-xl",
                        currentStatus === option.value && option.activeClass
                      )}
                      onClick={() => setStatus(student.id, option.value)}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="sticky bottom-0 flex flex-col-reverse gap-3 border-t border-slate-100 bg-white px-6 py-4 dark:border-slate-900 dark:bg-slate-950 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-xl sm:w-auto"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="h-11 rounded-xl sm:w-auto"
            onClick={handleSubmit}
            disabled={isSubmitting || unmarkedCount > 0}
          >
            Save Attendance
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

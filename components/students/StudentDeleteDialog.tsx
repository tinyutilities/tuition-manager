"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Student } from "@/types/student";

interface StudentDeleteDialogProps {
  student: Student | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: (student: Student) => void;
}

export default function StudentDeleteDialog({
  student,
  onOpenChange,
  onConfirm,
}: StudentDeleteDialogProps) {
  return (
    <AlertDialog open={student !== null} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete student</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently remove{" "}
            {student?.fullName ?? "this student"} from your student records.
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => {
              if (student) onConfirm(student);
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

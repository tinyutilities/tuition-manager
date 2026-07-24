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
import type { Batch } from "@/types/batch";

interface BatchDeleteDialogProps {
  batch: Batch | null;
  enrolledCount: number;
  onOpenChange: (open: boolean) => void;
  onConfirm: (batch: Batch) => void;
}

export default function BatchDeleteDialog({
  batch,
  enrolledCount,
  onOpenChange,
  onConfirm,
}: BatchDeleteDialogProps) {
  const canDelete = enrolledCount === 0;

  return (
    <AlertDialog open={batch !== null} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {canDelete ? "Delete batch" : "Batch has enrolled students"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {canDelete ? (
              <>
                This will permanently remove{" "}
                {batch?.name ?? "this batch"}. This action cannot be undone.
              </>
            ) : (
              <>
                {batch?.name ?? "This batch"} has {enrolledCount}{" "}
                {enrolledCount === 1 ? "student" : "students"} enrolled.
                Reassign or remove them from this batch before deleting it.
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {canDelete ? "Cancel" : "Close"}
          </AlertDialogCancel>
          {canDelete && (
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                if (batch) onConfirm(batch);
              }}
            >
              Delete
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

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
import type { Test } from "@/types/marks";

interface TestDeleteDialogProps {
  test: Test | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: (test: Test) => void;
}

export default function TestDeleteDialog({
  test,
  onOpenChange,
  onConfirm,
}: TestDeleteDialogProps) {
  return (
    <AlertDialog open={test !== null} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete test</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently remove {test?.name ?? "this test"} and all
            of its recorded marks. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => {
              if (test) onConfirm(test);
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

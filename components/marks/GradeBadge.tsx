import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Grade } from "@/types/marks";

interface GradeBadgeProps {
  grade: Grade;
  className?: string;
}

const GRADE_CLASSES: Record<Grade, string> = {
  "A+": "bg-emerald-50 text-emerald-600 hover:bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400",
  A: "bg-indigo-50 text-indigo-600 hover:bg-indigo-50 dark:bg-indigo-500/10 dark:text-indigo-400",
  "B+": "bg-blue-50 text-blue-600 hover:bg-blue-50 dark:bg-blue-500/10 dark:text-blue-400",
  B: "bg-amber-50 text-amber-600 hover:bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400",
  C: "bg-orange-50 text-orange-600 hover:bg-orange-50 dark:bg-orange-500/10 dark:text-orange-400",
  D: "bg-rose-50 text-rose-600 hover:bg-rose-50 dark:bg-rose-500/10 dark:text-rose-400",
  F: "bg-red-50 text-red-600 hover:bg-red-50 dark:bg-red-500/10 dark:text-red-400",
};

export default function GradeBadge({ grade, className }: GradeBadgeProps) {
  return (
    <Badge
      className={cn(
        "rounded-full border-transparent",
        GRADE_CLASSES[grade],
        className
      )}
    >
      {grade}
    </Badge>
  );
}

import { CheckCircle2, Clock, ShieldCheck, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { AttendanceStatus } from "@/types/attendance";

interface AttendanceStatusBadgeProps {
  status: AttendanceStatus;
  className?: string;
}

const STATUS_CONFIG: Record<
  AttendanceStatus,
  { label: string; className: string; icon: typeof CheckCircle2 }
> = {
  present: {
    label: "Present",
    className:
      "bg-emerald-50 text-emerald-600 hover:bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400",
    icon: CheckCircle2,
  },
  absent: {
    label: "Absent",
    className:
      "bg-red-50 text-red-600 hover:bg-red-50 dark:bg-red-500/10 dark:text-red-400",
    icon: XCircle,
  },
  late: {
    label: "Late",
    className:
      "bg-amber-50 text-amber-600 hover:bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400",
    icon: Clock,
  },
  excused: {
    label: "Excused",
    className:
      "bg-blue-50 text-blue-600 hover:bg-blue-50 dark:bg-blue-500/10 dark:text-blue-400",
    icon: ShieldCheck,
  },
};

export default function AttendanceStatusBadge({
  status,
  className,
}: AttendanceStatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <Badge
      className={cn(
        "gap-1 rounded-full border-transparent",
        config.className,
        className
      )}
    >
      <Icon className="h-3 w-3" aria-hidden="true" />
      {config.label}
    </Badge>
  );
}

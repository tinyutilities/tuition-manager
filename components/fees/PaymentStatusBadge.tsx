import { AlertTriangle, CheckCircle2, CircleDashed, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { FeeStatus } from "@/types/fees";

interface PaymentStatusBadgeProps {
  status: FeeStatus;
  className?: string;
}

const STATUS_CONFIG: Record<
  FeeStatus,
  { label: string; className: string; icon: typeof CheckCircle2 }
> = {
  paid: {
    label: "Paid",
    className:
      "bg-emerald-50 text-emerald-600 hover:bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400",
    icon: CheckCircle2,
  },
  partial: {
    label: "Partial",
    className:
      "bg-amber-50 text-amber-600 hover:bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400",
    icon: Clock,
  },
  pending: {
    label: "Pending",
    className:
      "bg-slate-100 text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400",
    icon: CircleDashed,
  },
  overdue: {
    label: "Overdue",
    className:
      "bg-red-50 text-red-600 hover:bg-red-50 dark:bg-red-500/10 dark:text-red-400",
    icon: AlertTriangle,
  },
};

export default function PaymentStatusBadge({
  status,
  className,
}: PaymentStatusBadgeProps) {
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

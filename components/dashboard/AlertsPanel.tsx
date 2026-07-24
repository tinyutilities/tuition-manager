import Link from "next/link";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { cn } from "@/lib/utils";
import type { AlertItem } from "@/types/dashboard";

interface AlertsPanelProps {
  alerts: AlertItem[];
}

export default function AlertsPanel({ alerts }: AlertsPanelProps) {
  return (
    <DashboardCard title="Alerts" description="Things that may need your attention">
      {alerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
          <ShieldCheck
            className="h-8 w-8 text-emerald-500"
            aria-hidden="true"
          />
          <p className="text-sm text-muted-foreground">
            Nothing needs your attention right now.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {alerts.map((alert) => (
            <Link
              key={alert.id}
              href={alert.href}
              className={cn(
                "flex items-start gap-3 rounded-xl border px-4 py-3 transition-colors hover:bg-muted/40",
                alert.severity === "critical"
                  ? "border-rose-200 dark:border-rose-900/50"
                  : "border-amber-200 dark:border-amber-900/50"
              )}
            >
              <AlertTriangle
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0",
                  alert.severity === "critical"
                    ? "text-rose-600 dark:text-rose-400"
                    : "text-amber-600 dark:text-amber-400"
                )}
                aria-hidden="true"
              />
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-medium text-foreground">
                  {alert.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {alert.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </DashboardCard>
  );
}

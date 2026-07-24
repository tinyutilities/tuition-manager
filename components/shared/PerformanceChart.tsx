import { cn } from "@/lib/utils";

interface PerformanceChartProps {
  data: { label: string; percentage: number }[];
  emptyMessage?: string;
}

function getBarColor(percentage: number) {
  if (percentage >= 90) return "bg-emerald-500";
  if (percentage >= 75) return "bg-blue-500";
  if (percentage >= 50) return "bg-amber-500";
  return "bg-red-500";
}

export default function PerformanceChart({
  data,
  emptyMessage = "No performance data yet.",
}: PerformanceChartProps) {
  if (data.length === 0) {
    return <p className="text-sm text-muted-foreground">{emptyMessage}</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {data.map((point, index) => (
        <div key={`${point.label}-${index}`} className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">{point.label}</span>
            <span className="text-muted-foreground">{point.percentage}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className={cn(
                "h-full rounded-full",
                getBarColor(point.percentage)
              )}
              style={{ width: `${Math.min(point.percentage, 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

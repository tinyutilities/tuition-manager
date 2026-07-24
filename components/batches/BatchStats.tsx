import { Layers, CheckCircle2, Users, Gauge } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import type { BatchStatsProps } from "@/types/batch";

export default function BatchStats({ stats }: BatchStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Batches"
        value={stats.totalBatches}
        description="Across all subjects"
        icon={<Layers className="h-5 w-5" />}
        color="indigo"
      />
      <StatCard
        title="Active Batches"
        value={stats.activeBatches}
        description={`${stats.totalBatches - stats.activeBatches} inactive`}
        icon={<CheckCircle2 className="h-5 w-5" />}
        color="green"
      />
      <StatCard
        title="Total Enrolled"
        value={stats.totalEnrolled}
        description="Students across all batches"
        icon={<Users className="h-5 w-5" />}
        color="blue"
      />
      <StatCard
        title="Avg. Capacity Usage"
        value={`${stats.averageCapacityUsage}%`}
        description="Across active batches"
        icon={<Gauge className="h-5 w-5" />}
        color="amber"
      />
    </div>
  );
}

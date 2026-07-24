"use client";

import { useMemo } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import DashboardStats from "@/components/dashboard/DashboardStats";
import TodaySchedule from "@/components/dashboard/TodaySchedule";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickActions from "@/components/dashboard/QuickActions";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import WelcomeOnboarding from "@/components/dashboard/WelcomeOnboarding";
import PerformanceChart from "@/components/shared/PerformanceChart";
import {
  getDashboardAlerts,
  getDashboardStats,
  getDashboardTrends,
  getRecentActivity,
  getTodaySchedule,
} from "@/lib/mock/dashboard";
import { toDateKey } from "@/lib/mock/attendance";
import { mockBatches } from "@/lib/mock/batch";
import { mockStudents } from "@/lib/mock/student";

export default function DashboardPage() {
  const today = useMemo(() => toDateKey(new Date()), []);
  const stats = useMemo(() => getDashboardStats(), []);
  const schedule = useMemo(() => getTodaySchedule(), []);
  const activity = useMemo(() => getRecentActivity(8), []);
  const alerts = useMemo(() => getDashboardAlerts(), []);
  const trends = useMemo(() => getDashboardTrends(6), []);

  // A brand-new teacher has created nothing at all yet — show onboarding
  // instead of an analytics dashboard full of meaningless zeros. Checked
  // against total batches/students (not just "active" ones) so a batch
  // that exists but is marked inactive still counts as "not new".
  const isNewUser = mockBatches.length === 0 && mockStudents.length === 0;

  if (isNewUser) {
    return <WelcomeOnboarding />;
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Good Evening, Teacher 👋"
        description="Here's an overview of your tuition classes."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TodaySchedule schedule={schedule} today={today} />
        </div>
        <AlertsPanel alerts={alerts} />
      </div>

      <QuickActions />

      <DashboardStats stats={stats} />

      <RecentActivity activity={activity} />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <DashboardCard
          title="Attendance Trend"
          description="Average attendance over the last 6 months"
        >
          <PerformanceChart
            data={trends.attendance}
            emptyMessage="No attendance data yet."
          />
        </DashboardCard>

        <DashboardCard
          title="Fee Collection Trend"
          description="Collection rate over the last 6 months"
        >
          <PerformanceChart
            data={trends.feeCollection}
            emptyMessage="No fee data yet."
          />
        </DashboardCard>

        <DashboardCard
          title="Marks Trend"
          description="Average test performance over the last 6 months"
        >
          <PerformanceChart
            data={trends.marks}
            emptyMessage="No marks data yet."
          />
        </DashboardCard>
      </div>
    </div>
  );
}

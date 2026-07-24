import Link from "next/link";
import { CalendarX2, CheckCircle2, Clock, User, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { cn } from "@/lib/utils";
import type { ScheduleEntry } from "@/types/dashboard";

interface TodayScheduleProps {
  schedule: ScheduleEntry[];
  today: string;
}

export default function TodaySchedule({ schedule, today }: TodayScheduleProps) {
  return (
    <DashboardCard
      title="Today's Schedule"
      description="Your classes scheduled for today"
    >
      {schedule.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
          <CalendarX2
            className="h-8 w-8 text-muted-foreground"
            aria-hidden="true"
          />
          <p className="text-sm text-muted-foreground">
            No classes scheduled today.
          </p>
        </div>
      ) : (
        <div className="flex flex-col">
          {schedule.map((entry, index) => (
            <div key={entry.batchId}>
              <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium text-foreground">
                      {entry.batchName}
                    </p>
                    <Badge variant="secondary" className="rounded-full">
                      {entry.subject}
                    </Badge>
                    <Badge
                      className={cn(
                        "gap-1 rounded-full border-transparent",
                        entry.isMarked
                          ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "bg-amber-50 text-amber-600 hover:bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400"
                      )}
                    >
                      <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                      {entry.isMarked ? "Marked" : "Not marked"}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {entry.timeLabel}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" aria-hidden="true" />
                      {entry.teacherName}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  {entry.googleMeetLink && (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="h-9 rounded-lg"
                    >
                      <a
                        href={entry.googleMeetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Video className="mr-1.5 h-3.5 w-3.5" />
                        Meet
                      </a>
                    </Button>
                  )}
                  <Button
                    asChild
                    size="sm"
                    className="h-9 rounded-lg"
                  >
                    <Link
                      href={`/dashboard/attendance/mark?batchId=${entry.batchId}&date=${today}`}
                    >
                      Mark Attendance
                    </Link>
                  </Button>
                </div>
              </div>
              {index < schedule.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      )}
    </DashboardCard>
  );
}

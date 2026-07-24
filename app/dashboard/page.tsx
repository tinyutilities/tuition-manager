import { Layers, Users, Wallet, CalendarCheck, ArrowRight, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { PageHeader } from '@/components/layout/page-header'
import { StatCard } from '@/components/dashboard/stat-card'
import { DashboardCard } from '@/components/dashboard/dashboard-card'

const stats = [
  {
    title: 'Total Batches',
    value: 6,
    description: 'Active batches',
    icon: <Layers className="h-5 w-5" />,
    color: 'indigo' as const,
  },
  {
    title: 'Students',
    value: 148,
    description: 'Across all batches',
    icon: <Users className="h-5 w-5" />,
    color: 'blue' as const,
  },
  {
    title: 'Pending Fees',
    value: '₹12,500',
    description: 'Due this month',
    icon: <Wallet className="h-5 w-5" />,
    color: 'amber' as const,
  },
  {
    title: "Today's Classes",
    value: 3,
    description: 'Scheduled today',
    icon: <CalendarCheck className="h-5 w-5" />,
    color: 'green' as const,
  },
]

const recentBatches = [
  { name: 'Mathematics XI', subject: 'Mathematics' },
  { name: 'Physics XII', subject: 'Physics' },
  { name: 'JEE Weekend', subject: 'JEE' },
]

const upcomingClasses = [
  { time: '5:00 PM', batch: 'Mathematics XI' },
  { time: '6:30 PM', batch: 'Physics XII' },
  { time: '8:00 PM', batch: 'JEE Weekend' },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Good Evening, Teacher 👋"
        description="Here's an overview of your tuition classes."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DashboardCard
          title="Recent Batches"
          description="Your most recently active batches"
          action={
            <Button variant="ghost" size="sm">
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          }
        >
          <div className="flex flex-col">
            {recentBatches.map((batch, index) => (
              <div key={batch.name}>
                <div className="flex items-center justify-between rounded-lg px-2 py-3 transition-colors hover:bg-muted/40">
                  <p className="text-sm font-medium text-foreground">
                    {batch.name}
                  </p>
                  <Badge variant="secondary" className="rounded-full">
                    {batch.subject}
                  </Badge>
                </div>
                {index < recentBatches.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard
          title="Upcoming Classes"
          description="Your schedule for today"
          action={
            <Button variant="ghost" size="sm">
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          }
        >
          <div className="flex flex-col">
            {upcomingClasses.map((item, index) => (
              <div key={item.batch}>
                <div className="flex items-center justify-between py-3">
                  <p className="text-sm font-medium text-foreground">
                    {item.batch}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {item.time}
                  </div>
                </div>
                {index < upcomingClasses.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </div>
  )
}
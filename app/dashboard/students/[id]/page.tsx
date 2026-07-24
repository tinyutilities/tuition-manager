import {
  Mail,
  MapPin,
  Phone,
  School,
  User,
  Pencil,
  CalendarCheck,
  ClipboardList,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { PageHeader } from '@/components/layout/page-header'
import { DashboardCard } from '@/components/dashboard/dashboard-card'
import { StatCard } from '@/components/dashboard/stat-card'

const student = {
  name: 'Aarav Sharma',
  rollNumber: 'MX11-01',
  batch: 'Mathematics XI',
  school: 'Delhi Public School',
  parentName: 'Rakesh Sharma',
  parentPhone: '+91 98765 43210',
  studentPhone: '+91 91234 56780',
  email: 'aarav.sharma@example.com',
  address: '24 Lakeview Colony, New Delhi, 110034',
}

const testResults = [
  { test: 'Unit Test 3', date: '18 Jul', marks: '43 / 50', percentage: 86 },
  { test: 'Unit Test 2', date: '02 Jul', marks: '46 / 50', percentage: 92 },
  { test: 'Mid Term', date: '20 Jun', marks: '78 / 100', percentage: 78 },
  { test: 'Unit Test 1', date: '05 Jun', marks: '41 / 50', percentage: 82 },
  { test: 'Diagnostic Test', date: '22 May', marks: '44 / 50', percentage: 88 },
]

const attendanceRecords = [
  { date: '21 Jul', status: 'Present' as const },
  { date: '20 Jul', status: 'Present' as const },
  { date: '19 Jul', status: 'Absent' as const },
  { date: '18 Jul', status: 'Present' as const },
  { date: '17 Jul', status: 'Present' as const },
  { date: '16 Jul', status: 'Present' as const },
  { date: '15 Jul', status: 'Absent' as const },
]

const notes = [
  'Excellent improvement in mathematics.',
  'Needs more practice in Physics numericals.',
  'Parents informed regarding attendance.',
]

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function StudentProfilePage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title={student.name}
        description="Student profile and academic overview."
        action={
          <Button className="h-11 rounded-xl">
            <Pencil className="mr-2 h-4 w-4" />
            Edit Student
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          <DashboardCard title="Student Information">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="bg-indigo-100 text-base font-medium text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                    {getInitials(student.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-sm font-semibold text-foreground">
                    {student.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Roll No. {student.rollNumber}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex flex-col gap-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4 shrink-0 text-slate-400" />
                  <span className="text-foreground">{student.batch}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <School className="h-4 w-4 shrink-0 text-slate-400" />
                  {student.school}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4 shrink-0 text-slate-400" />
                  Parent: {student.parentName}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4 shrink-0 text-slate-400" />
                  {student.parentPhone}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4 shrink-0 text-slate-400" />
                  {student.studentPhone}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4 shrink-0 text-slate-400" />
                  {student.email}
                </div>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                  {student.address}
                </div>
              </div>
            </div>
          </DashboardCard>

          <div className="grid grid-cols-2 gap-4">
            <StatCard
              title="Attendance"
              value="92%"
              icon={<CalendarCheck className="h-5 w-5" />}
              color="green"
            />
            <StatCard
              title="Tests Taken"
              value={18}
              icon={<ClipboardList className="h-5 w-5" />}
              color="blue"
            />
            <StatCard
              title="Average Marks"
              value="87%"
              icon={<ClipboardList className="h-5 w-5" />}
              color="indigo"
            />
            <StatCard
              title="Pending Fees"
              value="₹2,000"
              icon={<ClipboardList className="h-5 w-5" />}
              color="amber"
            />
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <DashboardCard
            title="Recent Test Results"
            description="Latest exam performance"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-xs font-medium uppercase text-muted-foreground dark:border-slate-800">
                    <th className="py-2 pr-4">Test</th>
                    <th className="py-2 pr-4">Date</th>
                    <th className="py-2 pr-4">Marks</th>
                    <th className="py-2">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {testResults.map((result, index) => (
                    <tr
                      key={result.test}
                      className={
                        index < testResults.length - 1
                          ? 'border-b border-slate-100 dark:border-slate-800'
                          : ''
                      }
                    >
                      <td className="py-3 pr-4 font-medium text-foreground">
                        {result.test}
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground">
                        {result.date}
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground">
                        {result.marks}
                      </td>
                      <td className="py-3 text-foreground">
                        {result.percentage}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DashboardCard>

          <DashboardCard
            title="Recent Attendance"
            description="Last 7 recorded sessions"
          >
            <div className="flex flex-col">
              {attendanceRecords.map((record, index) => (
                <div key={record.date + index}>
                  <div className="flex items-center justify-between py-3">
                    <p className="text-sm font-medium text-foreground">
                      {record.date}
                    </p>
                    <Badge
                      className={
                        record.status === 'Present'
                          ? 'rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400'
                          : 'rounded-full bg-rose-50 text-rose-600 hover:bg-rose-50 dark:bg-rose-500/10 dark:text-rose-400'
                      }
                    >
                      {record.status}
                    </Badge>
                  </div>
                  {index < attendanceRecords.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard title="Notes" description="Teacher remarks">
            <ul className="flex flex-col gap-3">
              {notes.map((note, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                  {note}
                </li>
              ))}
            </ul>
          </DashboardCard>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button className="h-11 flex-1 rounded-xl">
              Mark Attendance
            </Button>
            <Button
              variant="outline"
              className="h-11 flex-1 rounded-xl"
            >
              Record Marks
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import * as React from 'react'
import { Search, UserCheck, UserX, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { PageHeader } from '@/components/layout/page-header'
import { StatCard } from '@/components/dashboard/stat-card'

type AttendanceStatus = 'present' | 'absent' | 'late'

interface StudentRow {
  id: string
  name: string
  rollNumber: string
  batch: string
  status: AttendanceStatus
}

const initialStudents: StudentRow[] = [
  { id: '1', name: 'Aarav Sharma', rollNumber: 'MX11-01', batch: 'Mathematics XI', status: 'present' },
  { id: '2', name: 'Diya Verma', rollNumber: 'MX11-02', batch: 'Mathematics XI', status: 'present' },
  { id: '3', name: 'Rohan Iyer', rollNumber: 'PX12-04', batch: 'Physics XII', status: 'absent' },
  { id: '4', name: 'Priya Nair', rollNumber: 'JW-09', batch: 'JEE Weekend', status: 'present' },
  { id: '5', name: 'Karan Mehta', rollNumber: 'CX11-07', batch: 'Chemistry XI', status: 'late' },
  { id: '6', name: 'Ishita Rao', rollNumber: 'PX12-11', batch: 'Physics XII', status: 'present' },
  { id: '7', name: 'Aditya Kapoor', rollNumber: 'MX11-15', batch: 'Mathematics XI', status: 'present' },
  { id: '8', name: 'Sneha Das', rollNumber: 'CX11-03', batch: 'Chemistry XI', status: 'absent' },
  { id: '9', name: 'Vivaan Joshi', rollNumber: 'JW-14', batch: 'JEE Weekend', status: 'present' },
  { id: '10', name: 'Ananya Gupta', rollNumber: 'PX12-08', batch: 'Physics XII', status: 'late' },
]

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function todayFormatted() {
  const today = new Date()
  return today.toISOString().split('T')[0]
}

export default function AttendancePage() {
  const [students, setStudents] = React.useState<StudentRow[]>(initialStudents)
  const [search, setSearch] = React.useState('')
  const [batchFilter, setBatchFilter] = React.useState('all')
  const [statusFilter, setStatusFilter] = React.useState('all')
  const [date, setDate] = React.useState(todayFormatted())

  function updateStatus(id: string, status: AttendanceStatus) {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, status } : student
      )
    )
  }

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(search.toLowerCase())
    const matchesBatch =
      batchFilter === 'all' ||
      student.batch.toLowerCase().replace(/\s+/g, '-') === batchFilter
    const matchesStatus =
      statusFilter === 'all' || student.status === statusFilter

    return matchesSearch && matchesBatch && matchesStatus
  })

  const presentCount = students.filter((s) => s.status === 'present').length
  const absentCount = students.filter((s) => s.status === 'absent').length
  const lateCount = students.filter((s) => s.status === 'late').length

  function handleSave() {
    // No backend logic yet
  }

  function handleCancel() {
    // No backend logic yet
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Attendance"
        description="Mark and review student attendance across all batches."
        action={<Button className="h-11 rounded-xl">Mark Attendance</Button>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Present"
          value={presentCount}
          icon={<UserCheck className="h-5 w-5" />}
          color="green"
        />
        <StatCard
          title="Absent"
          value={absentCount}
          icon={<UserX className="h-5 w-5" />}
          color="rose"
        />
        <StatCard
          title="Late"
          value={lateCount}
          icon={<Clock className="h-5 w-5" />}
          color="amber"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="relative flex-1 sm:min-w-[220px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 rounded-xl pl-9"
          />
        </div>

        <Select value={batchFilter} onValueChange={setBatchFilter}>
          <SelectTrigger className="h-11 w-full rounded-xl sm:w-[200px]">
            <SelectValue placeholder="All Batches" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Batches</SelectItem>
            <SelectItem value="mathematics-xi">Mathematics XI</SelectItem>
            <SelectItem value="physics-xii">Physics XII</SelectItem>
            <SelectItem value="chemistry-xi">Chemistry XI</SelectItem>
            <SelectItem value="jee-weekend">JEE Weekend</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="h-11 w-full rounded-xl sm:w-[180px]"
        />

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-11 w-full rounded-xl sm:w-[160px]">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="present">Present</SelectItem>
            <SelectItem value="absent">Absent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="rounded-2xl border-slate-200 shadow-sm dark:border-slate-800">
        <CardContent className="p-0">
          <div className="flex flex-col">
            {filteredStudents.map((student, index) => (
              <div key={student.id}>
                <div className="flex flex-col gap-4 px-6 py-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-indigo-100 text-sm font-medium text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                        {getInitials(student.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-foreground">
                        {student.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Roll No. {student.rollNumber} · {student.batch}
                      </p>
                    </div>
                  </div>

                  <RadioGroup
                    value={student.status}
                    onValueChange={(value) =>
                      updateStatus(student.id, value as AttendanceStatus)
                    }
                    className="flex items-center gap-4"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem
                        value="present"
                        id={`present-${student.id}`}
                      />
                      <Label
                        htmlFor={`present-${student.id}`}
                        className="text-sm font-normal text-muted-foreground"
                      >
                        Present
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem
                        value="absent"
                        id={`absent-${student.id}`}
                      />
                      <Label
                        htmlFor={`absent-${student.id}`}
                        className="text-sm font-normal text-muted-foreground"
                      >
                        Absent
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="late" id={`late-${student.id}`} />
                      <Label
                        htmlFor={`late-${student.id}`}
                        className="text-sm font-normal text-muted-foreground"
                      >
                        Late
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                {index < filteredStudents.length - 1 && <Separator />}
              </div>
            ))}
          </div>

          <Separator />

          <div className="sticky bottom-0 flex flex-col-reverse gap-3 bg-white px-6 py-4 dark:bg-slate-950 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="h-11 rounded-xl sm:w-auto"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="h-11 rounded-xl sm:w-auto"
              onClick={handleSave}
            >
              Save Attendance
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
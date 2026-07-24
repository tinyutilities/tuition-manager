'use client'

import * as React from 'react'
import { Search, ClipboardList, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PageHeader } from '@/components/layout/page-header'
import { StatCard } from '@/components/dashboard/stat-card'
import { DashboardCard } from '@/components/dashboard/dashboard-card'

type Grade = 'A+' | 'A' | 'B+' | 'B' | 'C'

interface MarksRecord {
  id: string
  name: string
  rollNumber: string
  batch: string
  latestTest: string
  marksObtained: number
  maxMarks: number
  grade: Grade
}

const marksRecords: MarksRecord[] = [
  { id: '1', name: 'Aarav Sharma', rollNumber: 'MX11-01', batch: 'Mathematics XI', latestTest: 'Unit Test 3', marksObtained: 46, maxMarks: 50, grade: 'A+' },
  { id: '2', name: 'Diya Verma', rollNumber: 'MX11-02', batch: 'Mathematics XI', latestTest: 'Unit Test 3', marksObtained: 38, maxMarks: 50, grade: 'B+' },
  { id: '3', name: 'Rohan Iyer', rollNumber: 'PX12-04', batch: 'Physics XII', latestTest: 'Mid Term', marksObtained: 68, maxMarks: 100, grade: 'C' },
  { id: '4', name: 'Priya Nair', rollNumber: 'JW-09', batch: 'JEE Weekend', latestTest: 'Mock Test 5', marksObtained: 92, maxMarks: 100, grade: 'A+' },
  { id: '5', name: 'Karan Mehta', rollNumber: 'CX11-07', batch: 'Chemistry XI', latestTest: 'Unit Test 2', marksObtained: 33, maxMarks: 50, grade: 'B' },
  { id: '6', name: 'Ishita Rao', rollNumber: 'PX12-11', batch: 'Physics XII', latestTest: 'Mid Term', marksObtained: 79, maxMarks: 100, grade: 'B+' },
  { id: '7', name: 'Aditya Kapoor', rollNumber: 'MX11-15', batch: 'Mathematics XI', latestTest: 'Unit Test 3', marksObtained: 41, maxMarks: 50, grade: 'A' },
  { id: '8', name: 'Sneha Das', rollNumber: 'CX11-03', batch: 'Chemistry XI', latestTest: 'Unit Test 2', marksObtained: 45, maxMarks: 50, grade: 'A+' },
  { id: '9', name: 'Vivaan Joshi', rollNumber: 'JW-14', batch: 'JEE Weekend', latestTest: 'Mock Test 5', marksObtained: 61, maxMarks: 100, grade: 'C' },
  { id: '10', name: 'Ananya Gupta', rollNumber: 'PX12-08', batch: 'Physics XII', latestTest: 'Mid Term', marksObtained: 85, maxMarks: 100, grade: 'A' },
]

const recentTests = [
  { test: 'Unit Test 3', batch: 'Mathematics XI', average: '84%', highest: '98%', date: '18 Jul' },
  { test: 'Mock Test 5', batch: 'JEE Weekend', average: '76%', highest: '92%', date: '16 Jul' },
  { test: 'Mid Term', batch: 'Physics XII', average: '77%', highest: '92%', date: '14 Jul' },
  { test: 'Unit Test 2', batch: 'Chemistry XI', average: '81%', highest: '90%', date: '10 Jul' },
  { test: 'Unit Test 1', batch: 'Mathematics XI', average: '80%', highest: '96%', date: '05 Jun' },
  { test: 'Diagnostic Test', batch: 'JEE Weekend', average: '72%', highest: '88%', date: '22 May' },
]

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function gradeBadgeClasses(grade: Grade) {
  switch (grade) {
    case 'A+':
      return 'rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400'
    case 'A':
      return 'rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-50 dark:bg-indigo-500/10 dark:text-indigo-400'
    case 'B+':
      return 'rounded-full bg-blue-50 text-blue-600 hover:bg-blue-50 dark:bg-blue-500/10 dark:text-blue-400'
    case 'B':
      return 'rounded-full bg-amber-50 text-amber-600 hover:bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400'
    case 'C':
      return 'rounded-full bg-rose-50 text-rose-600 hover:bg-rose-50 dark:bg-rose-500/10 dark:text-rose-400'
  }
}

export default function MarksPage() {
  const [search, setSearch] = React.useState('')
  const [batchFilter, setBatchFilter] = React.useState('all')
  const [testFilter, setTestFilter] = React.useState('all')
  const [sort, setSort] = React.useState('latest')

  const filteredRecords = marksRecords.filter((record) => {
    const matchesSearch = record.name
      .toLowerCase()
      .includes(search.toLowerCase())
    const matchesBatch =
      batchFilter === 'all' ||
      record.batch.toLowerCase().replace(/\s+/g, '-') === batchFilter
    const matchesTest =
      testFilter === 'all' ||
      record.latestTest.toLowerCase().replace(/\s+/g, '-') === testFilter

    return matchesSearch && matchesBatch && matchesTest
  })

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Marks"
        description="Record, edit and review student test performance."
        action={<Button className="h-11 rounded-xl">Add Test</Button>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Tests Conducted"
          value={18}
          icon={<ClipboardList className="h-5 w-5" />}
          color="indigo"
        />
        <StatCard
          title="Average Score"
          value="84%"
          icon={<TrendingUp className="h-5 w-5" />}
          color="blue"
        />
        <StatCard
          title="Highest Score"
          value="98%"
          icon={<ArrowUp className="h-5 w-5" />}
          color="green"
        />
        <StatCard
          title="Lowest Score"
          value="42%"
          icon={<ArrowDown className="h-5 w-5" />}
          color="rose"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="relative flex-1 sm:min-w-[220px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search student..."
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

        <Select value={testFilter} onValueChange={setTestFilter}>
          <SelectTrigger className="h-11 w-full rounded-xl sm:w-[180px]">
            <SelectValue placeholder="All Tests" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tests</SelectItem>
            <SelectItem value="unit-test-3">Unit Test 3</SelectItem>
            <SelectItem value="mid-term">Mid Term</SelectItem>
            <SelectItem value="mock-test-5">Mock Test 5</SelectItem>
            <SelectItem value="unit-test-2">Unit Test 2</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="h-11 w-full rounded-xl sm:w-[180px]">
            <SelectValue placeholder="Latest First" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest First</SelectItem>
            <SelectItem value="highest">Highest Score</SelectItem>
            <SelectItem value="lowest">Lowest Score</SelectItem>
            <SelectItem value="name">Name (A-Z)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredRecords.map((record) => {
          const percentage = Math.round(
            (record.marksObtained / record.maxMarks) * 100
          )

          return (
            <DashboardCard
              key={record.id}
              title={record.name}
              description={`Roll No. ${record.rollNumber}`}
              action={
                <Badge className={gradeBadgeClasses(record.grade)}>
                  {record.grade}
                </Badge>
              }
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-indigo-100 text-xs font-medium text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                      {getInitials(record.name)}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm text-muted-foreground">
                    {record.batch}
                  </p>
                </div>

                <div className="flex flex-col gap-2 rounded-xl bg-slate-50 px-3 py-2.5 dark:bg-slate-900">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Latest Test
                    </span>
                    <span className="font-medium text-foreground">
                      {record.latestTest}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Marks Obtained
                    </span>
                    <span className="font-medium text-foreground">
                      {record.marksObtained} / {record.maxMarks}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Percentage
                    </span>
                    <span className="font-medium text-foreground">
                      {percentage}%
                    </span>
                  </div>
                </div>

                <div className="mt-1 flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-xl"
                  >
                    View History
                  </Button>
                  <Button size="sm" className="flex-1 rounded-xl">
                    Edit Marks
                  </Button>
                </div>
              </div>
            </DashboardCard>
          )
        })}
      </div>

      <DashboardCard
        title="Recent Tests"
        description="Overview of the latest tests conducted"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs font-medium uppercase text-muted-foreground dark:border-slate-800">
                <th className="py-2 pr-4">Test Name</th>
                <th className="py-2 pr-4">Batch</th>
                <th className="py-2 pr-4">Average</th>
                <th className="py-2 pr-4">Highest</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentTests.map((test, index) => (
                <tr
                  key={test.test + index}
                  className={
                    index < recentTests.length - 1
                      ? 'border-b border-slate-100 dark:border-slate-800'
                      : ''
                  }
                >
                  <td className="py-3 pr-4 font-medium text-foreground">
                    {test.test}
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">
                    {test.batch}
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">
                    {test.average}
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">
                    {test.highest}
                  </td>
                  <td className="py-3 text-muted-foreground">{test.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </div>
  )
}
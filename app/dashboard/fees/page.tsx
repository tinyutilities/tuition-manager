'use client'

import * as React from 'react'
import { Search, Wallet, CheckCircle2, Clock3, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
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

type FeeStatus = 'Paid' | 'Pending' | 'Partial'

interface FeeRecord {
  id: string
  name: string
  rollNumber: string
  batch: string
  monthlyFee: number
  amountPaid: number
  balanceDue: number
  lastPaymentDate: string
  status: FeeStatus
}

const feeRecords: FeeRecord[] = [
  { id: '1', name: 'Aarav Sharma', rollNumber: 'MX11-01', batch: 'Mathematics XI', monthlyFee: 3500, amountPaid: 3500, balanceDue: 0, lastPaymentDate: '05 Jul', status: 'Paid' },
  { id: '2', name: 'Diya Verma', rollNumber: 'MX11-02', batch: 'Mathematics XI', monthlyFee: 3500, amountPaid: 0, balanceDue: 3500, lastPaymentDate: '—', status: 'Pending' },
  { id: '3', name: 'Rohan Iyer', rollNumber: 'PX12-04', batch: 'Physics XII', monthlyFee: 4000, amountPaid: 2000, balanceDue: 2000, lastPaymentDate: '12 Jul', status: 'Partial' },
  { id: '4', name: 'Priya Nair', rollNumber: 'JW-09', batch: 'JEE Weekend', monthlyFee: 6000, amountPaid: 6000, balanceDue: 0, lastPaymentDate: '02 Jul', status: 'Paid' },
  { id: '5', name: 'Karan Mehta', rollNumber: 'CX11-07', batch: 'Chemistry XI', monthlyFee: 3200, amountPaid: 0, balanceDue: 3200, lastPaymentDate: '—', status: 'Pending' },
  { id: '6', name: 'Ishita Rao', rollNumber: 'PX12-11', batch: 'Physics XII', monthlyFee: 4000, amountPaid: 4000, balanceDue: 0, lastPaymentDate: '08 Jul', status: 'Paid' },
  { id: '7', name: 'Aditya Kapoor', rollNumber: 'MX11-15', batch: 'Mathematics XI', monthlyFee: 3500, amountPaid: 1500, balanceDue: 2000, lastPaymentDate: '15 Jul', status: 'Partial' },
  { id: '8', name: 'Sneha Das', rollNumber: 'CX11-03', batch: 'Chemistry XI', monthlyFee: 3200, amountPaid: 3200, balanceDue: 0, lastPaymentDate: '10 Jul', status: 'Paid' },
  { id: '9', name: 'Vivaan Joshi', rollNumber: 'JW-14', batch: 'JEE Weekend', monthlyFee: 6000, amountPaid: 0, balanceDue: 6000, lastPaymentDate: '—', status: 'Pending' },
  { id: '10', name: 'Ananya Gupta', rollNumber: 'PX12-08', batch: 'Physics XII', monthlyFee: 4000, amountPaid: 4000, balanceDue: 0, lastPaymentDate: '11 Jul', status: 'Paid' },
]

const recentPayments = [
  { student: 'Aditya Kapoor', amount: '₹1,500', date: '15 Jul', method: 'UPI' },
  { student: 'Rohan Iyer', amount: '₹2,000', date: '12 Jul', method: 'Cash' },
  { student: 'Ananya Gupta', amount: '₹4,000', date: '11 Jul', method: 'Bank Transfer' },
  { student: 'Sneha Das', amount: '₹3,200', date: '10 Jul', method: 'UPI' },
  { student: 'Ishita Rao', amount: '₹4,000', date: '08 Jul', method: 'Cash' },
  { student: 'Aarav Sharma', amount: '₹3,500', date: '05 Jul', method: 'UPI' },
]

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function formatCurrency(value: number) {
  return `₹${value.toLocaleString('en-IN')}`
}

function statusBadgeClasses(status: FeeStatus) {
  switch (status) {
    case 'Paid':
      return 'rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400'
    case 'Pending':
      return 'rounded-full bg-rose-50 text-rose-600 hover:bg-rose-50 dark:bg-rose-500/10 dark:text-rose-400'
    case 'Partial':
      return 'rounded-full bg-amber-50 text-amber-600 hover:bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400'
  }
}

export default function FeesPage() {
  const [search, setSearch] = React.useState('')
  const [batchFilter, setBatchFilter] = React.useState('all')
  const [statusFilter, setStatusFilter] = React.useState('all')
  const [monthFilter, setMonthFilter] = React.useState('current')

  const filteredRecords = feeRecords.filter((record) => {
    const matchesSearch = record.name
      .toLowerCase()
      .includes(search.toLowerCase())
    const matchesBatch =
      batchFilter === 'all' ||
      record.batch.toLowerCase().replace(/\s+/g, '-') === batchFilter
    const matchesStatus =
      statusFilter === 'all' || record.status.toLowerCase() === statusFilter

    return matchesSearch && matchesBatch && matchesStatus
  })

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Fees"
        description="Track fee payments, pending dues, and payment history."
        action={<Button className="h-11 rounded-xl">Record Payment</Button>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Collected"
          value="₹2,45,000"
          icon={<Wallet className="h-5 w-5" />}
          color="green"
        />
        <StatCard
          title="Pending Amount"
          value="₹18,500"
          icon={<Clock3 className="h-5 w-5" />}
          color="amber"
        />
        <StatCard
          title="Students Paid"
          value={82}
          icon={<CheckCircle2 className="h-5 w-5" />}
          color="indigo"
        />
        <StatCard
          title="Pending Students"
          value={11}
          icon={<Users className="h-5 w-5" />}
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

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-11 w-full rounded-xl sm:w-[160px]">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="partial">Partial</SelectItem>
          </SelectContent>
        </Select>

        <Select value={monthFilter} onValueChange={setMonthFilter}>
          <SelectTrigger className="h-11 w-full rounded-xl sm:w-[180px]">
            <SelectValue placeholder="Current Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current">Current Month</SelectItem>
            <SelectItem value="last">Last Month</SelectItem>
            <SelectItem value="june">June 2026</SelectItem>
            <SelectItem value="may">May 2026</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredRecords.map((record) => (
          <DashboardCard
            key={record.id}
            title={record.name}
            description={`Roll No. ${record.rollNumber}`}
            action={
              <Badge className={statusBadgeClasses(record.status)}>
                {record.status}
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
                  <span className="text-muted-foreground">Monthly Fee</span>
                  <span className="font-medium text-foreground">
                    {formatCurrency(record.monthlyFee)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Amount Paid</span>
                  <span className="font-medium text-foreground">
                    {formatCurrency(record.amountPaid)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Balance Due</span>
                  <span className="font-medium text-foreground">
                    {formatCurrency(record.balanceDue)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Last Payment
                  </span>
                  <span className="font-medium text-foreground">
                    {record.lastPaymentDate}
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
                  Record Payment
                </Button>
              </div>
            </div>
          </DashboardCard>
        ))}
      </div>

      <DashboardCard
        title="Recent Payments"
        description="The latest fee payments recorded"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs font-medium uppercase text-muted-foreground dark:border-slate-800">
                <th className="py-2 pr-4">Student</th>
                <th className="py-2 pr-4">Amount</th>
                <th className="py-2 pr-4">Date</th>
                <th className="py-2">Payment Method</th>
              </tr>
            </thead>
            <tbody>
              {recentPayments.map((payment, index) => (
                <tr
                  key={payment.student + index}
                  className={
                    index < recentPayments.length - 1
                      ? 'border-b border-slate-100 dark:border-slate-800'
                      : ''
                  }
                >
                  <td className="py-3 pr-4 font-medium text-foreground">
                    {payment.student}
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">
                    {payment.amount}
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">
                    {payment.date}
                  </td>
                  <td className="py-3 text-muted-foreground">
                    {payment.method}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </div>
  )
}
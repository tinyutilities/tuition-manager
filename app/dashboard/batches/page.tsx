'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const daysOfWeek = [
  { id: 'mon', label: 'Monday' },
  { id: 'tue', label: 'Tuesday' },
  { id: 'wed', label: 'Wednesday' },
  { id: 'thu', label: 'Thursday' },
  { id: 'fri', label: 'Friday' },
  { id: 'sat', label: 'Saturday' },
  { id: 'sun', label: 'Sunday' },
]

export default function NewBatchPage() {
  const router = useRouter()

  const [name, setName] = React.useState('')
  const [subject, setSubject] = React.useState('')
  const [level, setLevel] = React.useState('')
  const [batchColor, setBatchColor] = React.useState('#2563eb')
  const [selectedDays, setSelectedDays] = React.useState<string[]>([])
  const [startTime, setStartTime] = React.useState('')
  const [endTime, setEndTime] = React.useState('')
  const [notes, setNotes] = React.useState('')
  const [daysError, setDaysError] = React.useState(false)

  function toggleDay(dayId: string, checked: boolean) {
    setSelectedDays((prev) =>
      checked ? [...prev, dayId] : prev.filter((d) => d !== dayId)
    )
    setDaysError(false)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (selectedDays.length === 0) {
      setDaysError(true)
      return
    }

    // Backend logic to be added later
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Button variant="ghost" size="sm" asChild className="-ml-2 mb-2">
          <Link href="/dashboard/batches">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Batches
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold text-gray-900">Create Batch</h1>
        <p className="mt-1 text-sm text-gray-500">
          Set up a new batch to start adding students.
        </p>
      </div>

      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Batch Details</CardTitle>
          <CardDescription>
            Fill in the information below to create a new batch.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* Class Details */}
            <div className="flex flex-col gap-6">
              <h3 className="text-sm font-semibold text-gray-900">
                Class Details
              </h3>

              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Class Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. Evening Physics Batch"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="subject">
                  Subject <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="subject"
                  placeholder="e.g. Physics"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="level">Level / Standard</Label>
                <Input
                  id="level"
                  placeholder="e.g. Class 10, NEET, JEE, Beginners"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="batchColor">Batch Color</Label>
                <div className="flex items-center gap-3">
                  <input
                    id="batchColor"
                    type="color"
                    value={batchColor}
                    onChange={(e) => setBatchColor(e.target.value)}
                    className="h-10 w-14 cursor-pointer rounded-md border border-gray-200 bg-white p-1"
                  />
                  <span className="text-sm text-gray-600">{batchColor}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Schedule */}
            <div className="flex flex-col gap-6">
              <h3 className="text-sm font-semibold text-gray-900">
                Schedule
              </h3>

              <div className="flex flex-col gap-3">
                <Label>
                  Days <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {daysOfWeek.map((day) => (
                    <div key={day.id} className="flex items-center gap-2">
                      <Checkbox
                        id={day.id}
                        checked={selectedDays.includes(day.id)}
                        onCheckedChange={(checked) =>
                          toggleDay(day.id, checked === true)
                        }
                      />
                      <Label
                        htmlFor={day.id}
                        className="text-sm font-normal text-gray-700"
                      >
                        {day.label}
                      </Label>
                    </div>
                  ))}
                </div>
                {daysError && (
                  <p className="text-sm text-red-500">
                    Please select at least one day.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="startTime">
                    Start Time <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="endTime">
                    End Time <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Notes */}
            <div className="flex flex-col gap-6">
              <h3 className="text-sm font-semibold text-gray-900">Notes</h3>

              <div className="flex flex-col gap-2">
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Optional instructions, classroom details or syllabus coverage."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button type="submit">Create Batch</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/dashboard/batches')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
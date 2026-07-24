'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PageHeader } from '@/components/layout/page-header'

export default function NewBatchPage() {
  const [batchName, setBatchName] = React.useState('')
  const [subject, setSubject] = React.useState('')
  const [teacherName, setTeacherName] = React.useState('')
  const [days, setDays] = React.useState('')
  const [time, setTime] = React.useState('')
  const [maxStudents, setMaxStudents] = React.useState('')
  const [notes, setNotes] = React.useState('')

  function handleCreate() {
    // No backend logic yet
  }

  function handleCancel() {
    // No backend logic yet
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Create Batch"
        description="Create a new tuition batch and start managing students."
      />

      <Card className="rounded-2xl border-slate-200 shadow-sm dark:border-slate-800">
        <CardContent className="p-6 sm:p-8">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleCreate()
            }}
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="batchName">Batch Name</Label>
                <Input
                  id="batchName"
                  placeholder="e.g. Mathematics XI"
                  value={batchName}
                  onChange={(e) => setBatchName(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="e.g. Mathematics"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="teacherName">Teacher Name</Label>
                <Input
                  id="teacherName"
                  placeholder="e.g. Mrs. Sharma"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="days">Days</Label>
                <Select value={days} onValueChange={setDays}>
                  <SelectTrigger id="days" className="h-11 rounded-xl">
                    <SelectValue placeholder="Select days" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mon-wed-fri">Mon, Wed, Fri</SelectItem>
                    <SelectItem value="tue-thu">Tue, Thu</SelectItem>
                    <SelectItem value="mon-fri">Mon - Fri</SelectItem>
                    <SelectItem value="sat">Saturday</SelectItem>
                    <SelectItem value="sun">Sunday</SelectItem>
                    <SelectItem value="weekend">Weekend</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="maxStudents">Maximum Students</Label>
                <Input
                  id="maxStudents"
                  type="number"
                  placeholder="e.g. 25"
                  value={maxStudents}
                  onChange={(e) => setMaxStudents(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Optional instructions, classroom details or syllabus coverage."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="rounded-xl"
              />
            </div>

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-xl sm:w-auto"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button type="submit" className="h-11 rounded-xl sm:w-auto">
                Create Batch
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
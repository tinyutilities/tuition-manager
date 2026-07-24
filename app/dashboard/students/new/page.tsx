'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
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

export default function AddStudentPage() {
  const router = useRouter()

  const [studentName, setStudentName] = React.useState('')
  const [rollNumber, setRollNumber] = React.useState('')
  const [batch, setBatch] = React.useState('')
  const [school, setSchool] = React.useState('')
  const [parentName, setParentName] = React.useState('')
  const [parentPhone, setParentPhone] = React.useState('')
  const [studentPhone, setStudentPhone] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [notes, setNotes] = React.useState('')

  async function handleCreate() {
    // No backend logic yet
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Add Student"
        description="Register a new student into a tuition batch."
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
                <Label htmlFor="studentName">Student Name *</Label>
                <Input
                  id="studentName"
                  name="studentName"
                  placeholder="e.g. Ananya Sharma"
                  autoComplete="name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="rollNumber">Roll Number</Label>
                <Input
                  id="rollNumber"
                  name="rollNumber"
                  placeholder="e.g. MX11-01"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="batch">Batch *</Label>
                <Select value={batch} onValueChange={setBatch} required>
                  <SelectTrigger id="batch" className="h-11 rounded-xl">
                    <SelectValue placeholder="Select a batch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mathematics-xi">
                      Mathematics XI
                    </SelectItem>
                    <SelectItem value="physics-xii">Physics XII</SelectItem>
                    <SelectItem value="chemistry-xi">
                      Chemistry XI
                    </SelectItem>
                    <SelectItem value="jee-weekend">JEE Weekend</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="school">School</Label>
                <Input
                  id="school"
                  name="school"
                  placeholder="e.g. Delhi Public School"
                  autoComplete="organization"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="parentName">Parent Name</Label>
                <Input
                  id="parentName"
                  name="parentName"
                  placeholder="e.g. Rakesh Sharma"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="parentPhone">Parent Phone *</Label>
                <Input
                  id="parentPhone"
                  name="parentPhone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  required
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="studentPhone">Student Phone</Label>
                <Input
                  id="studentPhone"
                  name="studentPhone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                  value={studentPhone}
                  onChange={(e) => setStudentPhone(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="student@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                placeholder="Street, city, and postal code"
                autoComplete="street-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                className="rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Any additional details about this student"
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
                onClick={() => router.push('/dashboard/students')}
              >
                Cancel
              </Button>
              <Button type="submit" className="h-11 rounded-xl sm:w-auto">
                Add Student
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
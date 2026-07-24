"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormSection } from "@/components/forms/form-section";
import type { BatchFormData, BatchStatus, WeekDay } from "@/types/batch";

interface BatchFormProps {
  initialValues?: Partial<BatchFormData>;
  submitLabel: string;
  onSubmit: (data: BatchFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const emptyFormData: BatchFormData = {
  name: "",
  subject: "",
  teacherName: "",
  googleMeetLink: "",
  days: [],
  startTime: "",
  endTime: "",
  capacity: 20,
  status: "active",
};

const DAYS_OF_WEEK: { id: WeekDay; label: string }[] = [
  { id: "mon", label: "Monday" },
  { id: "tue", label: "Tuesday" },
  { id: "wed", label: "Wednesday" },
  { id: "thu", label: "Thursday" },
  { id: "fri", label: "Friday" },
  { id: "sat", label: "Saturday" },
  { id: "sun", label: "Sunday" },
];

type FormErrors = Partial<Record<keyof BatchFormData, string>>;

export default function BatchForm({
  initialValues,
  submitLabel,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: BatchFormProps) {
  const [formData, setFormData] = useState<BatchFormData>({
    ...emptyFormData,
    ...initialValues,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  function updateField<K extends keyof BatchFormData>(
    key: K,
    value: BatchFormData[K]
  ) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function toggleDay(day: WeekDay, checked: boolean) {
    updateField(
      "days",
      checked ? [...formData.days, day] : formData.days.filter((d) => d !== day)
    );
  }

  function validate(): boolean {
    const nextErrors: FormErrors = {};

    if (!formData.name.trim()) nextErrors.name = "Batch name is required.";
    if (!formData.subject.trim())
      nextErrors.subject = "Subject is required.";
    if (!formData.teacherName.trim())
      nextErrors.teacherName = "Teacher name is required.";
    if (formData.days.length === 0)
      nextErrors.days = "Select at least one day.";
    if (!formData.startTime)
      nextErrors.startTime = "Start time is required.";
    if (!formData.endTime) nextErrors.endTime = "End time is required.";
    if (
      formData.startTime &&
      formData.endTime &&
      formData.startTime >= formData.endTime
    ) {
      nextErrors.endTime = "End time must be after start time.";
    }
    if (!formData.capacity || formData.capacity <= 0) {
      nextErrors.capacity = "Capacity must be at least 1.";
    }
    if (formData.googleMeetLink.trim()) {
      try {
        new URL(formData.googleMeetLink.trim());
      } catch {
        nextErrors.googleMeetLink = "Enter a valid URL.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  }

  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm dark:border-slate-800">
      <CardContent className="p-6 sm:p-8">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-8"
        >
          <FormSection
            title="Batch Details"
            description="Basic information about this batch."
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Batch Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g. Evening Physics Batch"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  className="h-11 rounded-xl"
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  placeholder="e.g. Physics"
                  value={formData.subject}
                  onChange={(e) => updateField("subject", e.target.value)}
                  aria-invalid={Boolean(errors.subject)}
                  className="h-11 rounded-xl"
                />
                {errors.subject && (
                  <p className="text-xs text-destructive">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="teacherName">Teacher *</Label>
                <Input
                  id="teacherName"
                  placeholder="e.g. Mrs. Kavita Sharma"
                  value={formData.teacherName}
                  onChange={(e) =>
                    updateField("teacherName", e.target.value)
                  }
                  aria-invalid={Boolean(errors.teacherName)}
                  className="h-11 rounded-xl"
                />
                {errors.teacherName && (
                  <p className="text-xs text-destructive">
                    {errors.teacherName}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    updateField("status", value as BatchStatus)
                  }
                >
                  <SelectTrigger id="status" className="h-11 rounded-xl">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </FormSection>

          <FormSection
            title="Schedule"
            description="When this batch meets each week."
          >
            <div className="flex flex-col gap-3">
              <Label>Days *</Label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {DAYS_OF_WEEK.map((day) => (
                  <div key={day.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`day-${day.id}`}
                      checked={formData.days.includes(day.id)}
                      onCheckedChange={(checked) =>
                        toggleDay(day.id, checked === true)
                      }
                    />
                    <Label
                      htmlFor={`day-${day.id}`}
                      className="text-sm font-normal normal-case"
                    >
                      {day.label}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.days && (
                <p className="text-xs text-destructive">{errors.days}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="startTime">Start Time *</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) =>
                    updateField("startTime", e.target.value)
                  }
                  aria-invalid={Boolean(errors.startTime)}
                  className="h-11 rounded-xl"
                />
                {errors.startTime && (
                  <p className="text-xs text-destructive">
                    {errors.startTime}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="endTime">End Time *</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => updateField("endTime", e.target.value)}
                  aria-invalid={Boolean(errors.endTime)}
                  className="h-11 rounded-xl"
                />
                {errors.endTime && (
                  <p className="text-xs text-destructive">
                    {errors.endTime}
                  </p>
                )}
              </div>
            </div>
          </FormSection>

          <FormSection
            title="Capacity & Access"
            description="Enrollment limit and how students join the class."
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="capacity">Capacity *</Label>
                <Input
                  id="capacity"
                  type="number"
                  min={1}
                  value={formData.capacity}
                  onChange={(e) =>
                    updateField("capacity", Number(e.target.value))
                  }
                  aria-invalid={Boolean(errors.capacity)}
                  className="h-11 rounded-xl"
                />
                {errors.capacity && (
                  <p className="text-xs text-destructive">
                    {errors.capacity}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="googleMeetLink">Google Meet Link</Label>
                <Input
                  id="googleMeetLink"
                  type="url"
                  placeholder="https://meet.google.com/abc-defg-hij"
                  value={formData.googleMeetLink}
                  onChange={(e) =>
                    updateField("googleMeetLink", e.target.value)
                  }
                  aria-invalid={Boolean(errors.googleMeetLink)}
                  className="h-11 rounded-xl"
                />
                {errors.googleMeetLink && (
                  <p className="text-xs text-destructive">
                    {errors.googleMeetLink}
                  </p>
                )}
              </div>
            </div>
          </FormSection>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="h-11 rounded-xl sm:w-auto"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-11 rounded-xl sm:w-auto"
              disabled={isSubmitting}
            >
              {submitLabel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

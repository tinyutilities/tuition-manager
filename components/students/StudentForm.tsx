"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormSection } from "@/components/forms/form-section";
import type { Gender, StudentFormData, StudentStatus } from "@/types/student";
import type { Batch } from "@/types/batch";

interface StudentFormProps {
  batches: Batch[];
  initialValues?: Partial<StudentFormData>;
  submitLabel: string;
  onSubmit: (data: StudentFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const emptyFormData: StudentFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  gender: "male",
  dateOfBirth: "",
  guardianName: "",
  guardianPhone: "",
  address: "",
  batchId: "",
  school: "",
  status: "active",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormErrors = Partial<Record<keyof StudentFormData, string>>;

export default function StudentForm({
  batches,
  initialValues,
  submitLabel,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: StudentFormProps) {
  const [formData, setFormData] = useState<StudentFormData>({
    ...emptyFormData,
    ...initialValues,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  function updateField<K extends keyof StudentFormData>(
    key: K,
    value: StudentFormData[K]
  ) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function validate(): boolean {
    const nextErrors: FormErrors = {};

    if (!formData.firstName.trim())
      nextErrors.firstName = "First name is required.";
    if (!formData.lastName.trim())
      nextErrors.lastName = "Last name is required.";
    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailPattern.test(formData.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!formData.phone.trim())
      nextErrors.phone = "Student phone number is required.";
    if (!formData.dateOfBirth)
      nextErrors.dateOfBirth = "Date of birth is required.";
    if (!formData.guardianName.trim())
      nextErrors.guardianName = "Guardian name is required.";
    if (!formData.guardianPhone.trim())
      nextErrors.guardianPhone = "Guardian phone number is required.";
    if (!formData.address.trim())
      nextErrors.address = "Address is required.";
    if (!formData.batchId) nextErrors.batchId = "Select a batch.";
    if (!formData.school.trim()) nextErrors.school = "School is required.";

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
            title="Personal Information"
            description="Basic details about the student."
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={(e) => updateField("firstName", e.target.value)}
                  aria-invalid={Boolean(errors.firstName)}
                  className="h-11 rounded-xl"
                />
                {errors.firstName && (
                  <p className="text-xs text-destructive">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={(e) => updateField("lastName", e.target.value)}
                  aria-invalid={Boolean(errors.lastName)}
                  className="h-11 rounded-xl"
                />
                {errors.lastName && (
                  <p className="text-xs text-destructive">
                    {errors.lastName}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) =>
                    updateField("gender", value as Gender)
                  }
                >
                  <SelectTrigger id="gender" className="h-11 rounded-xl">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    updateField("dateOfBirth", e.target.value)
                  }
                  aria-invalid={Boolean(errors.dateOfBirth)}
                  className="h-11 rounded-xl"
                />
                {errors.dateOfBirth && (
                  <p className="text-xs text-destructive">
                    {errors.dateOfBirth}
                  </p>
                )}
              </div>
            </div>
          </FormSection>

          <FormSection
            title="Contact Information"
            description="How to reach the student."
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@example.com"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  className="h-11 rounded-xl"
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="phone">Student Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="9876543210"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  className="h-11 rounded-xl"
                />
                {errors.phone && (
                  <p className="text-xs text-destructive">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                placeholder="Street, city, and postal code"
                autoComplete="street-address"
                value={formData.address}
                onChange={(e) => updateField("address", e.target.value)}
                rows={3}
                aria-invalid={Boolean(errors.address)}
                className="rounded-xl"
              />
              {errors.address && (
                <p className="text-xs text-destructive">{errors.address}</p>
              )}
            </div>
          </FormSection>

          <FormSection
            title="Guardian Information"
            description="Primary guardian contact for this student."
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="guardianName">Guardian Name *</Label>
                <Input
                  id="guardianName"
                  autoComplete="name"
                  value={formData.guardianName}
                  onChange={(e) =>
                    updateField("guardianName", e.target.value)
                  }
                  aria-invalid={Boolean(errors.guardianName)}
                  className="h-11 rounded-xl"
                />
                {errors.guardianName && (
                  <p className="text-xs text-destructive">
                    {errors.guardianName}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="guardianPhone">Guardian Phone *</Label>
                <Input
                  id="guardianPhone"
                  type="tel"
                  placeholder="9876500000"
                  autoComplete="tel"
                  value={formData.guardianPhone}
                  onChange={(e) =>
                    updateField("guardianPhone", e.target.value)
                  }
                  aria-invalid={Boolean(errors.guardianPhone)}
                  className="h-11 rounded-xl"
                />
                {errors.guardianPhone && (
                  <p className="text-xs text-destructive">
                    {errors.guardianPhone}
                  </p>
                )}
              </div>
            </div>
          </FormSection>

          <FormSection
            title="Academic Information"
            description="Batch, school and enrollment status."
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="batchId">Batch *</Label>
                <Select
                  value={formData.batchId}
                  onValueChange={(value) => updateField("batchId", value)}
                >
                  <SelectTrigger
                    id="batchId"
                    className="h-11 rounded-xl"
                    aria-invalid={Boolean(errors.batchId)}
                  >
                    <SelectValue placeholder="Select a batch" />
                  </SelectTrigger>
                  <SelectContent>
                    {batches.map((batch) => (
                      <SelectItem key={batch.id} value={batch.id}>
                        {batch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.batchId && (
                  <p className="text-xs text-destructive">
                    {errors.batchId}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="school">School *</Label>
                <Input
                  id="school"
                  placeholder="e.g. Delhi Public School"
                  autoComplete="organization"
                  value={formData.school}
                  onChange={(e) => updateField("school", e.target.value)}
                  aria-invalid={Boolean(errors.school)}
                  className="h-11 rounded-xl"
                />
                {errors.school && (
                  <p className="text-xs text-destructive">{errors.school}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    updateField("status", value as StudentStatus)
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

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FeeRecord, PaymentInput, PaymentMethod } from "@/types/fees";

interface FeeFormProps {
  fee: FeeRecord;
  onSubmit: (input: PaymentInput) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const PAYMENT_METHODS: { value: PaymentMethod; label: string }[] = [
  { value: "cash", label: "Cash" },
  { value: "upi", label: "UPI" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "card", label: "Card" },
  { value: "cheque", label: "Cheque" },
];

function todayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

type FormErrors = Partial<Record<"amount" | "date", string>>;

export default function FeeForm({
  fee,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: FeeFormProps) {
  const remainingBalance = fee.amount - fee.amountPaid;

  const [amount, setAmount] = useState(remainingBalance);
  const [method, setMethod] = useState<PaymentMethod>("upi");
  const [date, setDate] = useState(todayKey());
  const [referenceNumber, setReferenceNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): boolean {
    const nextErrors: FormErrors = {};
    if (!amount || amount <= 0) {
      nextErrors.amount = "Enter an amount greater than zero.";
    }
    if (!date) {
      nextErrors.date = "Payment date is required.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      amount,
      method,
      date,
      referenceNumber: referenceNumber.trim() || undefined,
      notes: notes.trim() || undefined,
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <p className="text-sm text-muted-foreground">
        Remaining balance:{" "}
        <span className="font-medium text-foreground">
          ₹{remainingBalance.toLocaleString("en-IN")}
        </span>
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="payment-amount">Amount *</Label>
          <Input
            id="payment-amount"
            type="number"
            min={1}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            aria-invalid={Boolean(errors.amount)}
            className="h-11 rounded-xl"
          />
          {errors.amount && (
            <p className="text-xs text-destructive">{errors.amount}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="payment-method">Payment Method</Label>
          <Select
            value={method}
            onValueChange={(value) => setMethod(value as PaymentMethod)}
          >
            <SelectTrigger id="payment-method" className="h-11 rounded-xl">
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              {PAYMENT_METHODS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="payment-date">Payment Date *</Label>
          <Input
            id="payment-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-invalid={Boolean(errors.date)}
            className="h-11 rounded-xl"
          />
          {errors.date && (
            <p className="text-xs text-destructive">{errors.date}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="payment-reference">Receipt / Reference No.</Label>
          <Input
            id="payment-reference"
            placeholder="e.g. UPI-2847193"
            value={referenceNumber}
            onChange={(e) => setReferenceNumber(e.target.value)}
            className="h-11 rounded-xl"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="payment-notes">Notes</Label>
        <Textarea
          id="payment-notes"
          placeholder="Optional notes about this payment"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="rounded-xl"
        />
      </div>

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
          Save Payment
        </Button>
      </div>
    </form>
  );
}

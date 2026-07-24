"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  User,
  Building2,
  SlidersHorizontal,
  Bell,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

type SettingsSection =
  | "profile"
  | "institute"
  | "preferences"
  | "notifications"
  | "security";

interface NavItem {
  id: SettingsSection;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "institute", label: "Institute", icon: Building2 },
  { id: "preferences", label: "Preferences", icon: SlidersHorizontal },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: ShieldCheck },
];

interface ProfileForm {
  fullName: string;
  email: string;
  phone: string;
  designation: string;
}

interface InstituteForm {
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  contactNumber: string;
  website: string;
}

interface PreferencesForm {
  darkMode: boolean;
  emailNotifications: boolean;
  feeReminders: boolean;
  attendanceReminders: boolean;
  autoReports: boolean;
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("profile");

  const [profile, setProfile] = useState<ProfileForm>({
    fullName: "",
    email: "",
    phone: "",
    designation: "",
  });

  const [institute, setInstitute] = useState<InstituteForm>({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    contactNumber: "",
    website: "",
  });

  const [preferences, setPreferences] = useState<PreferencesForm>({
    darkMode: false,
    emailNotifications: true,
    feeReminders: true,
    attendanceReminders: true,
    autoReports: false,
  });

  async function handleProfileSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  async function handleInstituteSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  function togglePreference(key: keyof PreferencesForm) {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Settings"
        description="Manage your account and application preferences."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
        <DashboardCard
  title="Settings"
  className="h-fit p-2"
>
          <nav className="flex flex-row gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-slate-100 text-foreground dark:bg-slate-800"
                      : "text-muted-foreground hover:bg-slate-50 hover:text-foreground dark:hover:bg-slate-900"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </DashboardCard>

        <div className="flex flex-col gap-6">
          <DashboardCard
  title="Profile Information"
  description="Update your personal details."
  className="p-6"
>
          
            <form onSubmit={handleProfileSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    autoComplete="name"
                    className="h-11 rounded-xl"
                    value={profile.fullName}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="h-11 rounded-xl"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className="h-11 rounded-xl"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input
                    id="designation"
                    name="designation"
                    autoComplete="organization-title"
                    className="h-11 rounded-xl"
                    value={profile.designation}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        designation: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-200 pt-5 dark:border-slate-800">
                <Button type="button" variant="outline" className="rounded-xl">
                  Cancel
                </Button>
                <Button type="submit" className="rounded-xl">
                  Save Changes
                </Button>
              </div>
            </form>
          </DashboardCard>

          <DashboardCard
  title="Institute Information"
  description="Details shown on receipts and reports."
  className="p-6"
>
            

            <form
              onSubmit={handleInstituteSubmit}
              className="flex flex-col gap-5"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <Label htmlFor="instituteName">Institute Name</Label>
                  <Input
                    id="instituteName"
                    name="instituteName"
                    autoComplete="organization"
                    className="h-11 rounded-xl"
                    value={institute.name}
                    onChange={(e) =>
                      setInstitute((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="flex flex-col gap-2 sm:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    autoComplete="street-address"
                    className="h-11 rounded-xl"
                    value={institute.address}
                    onChange={(e) =>
                      setInstitute((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    autoComplete="address-level2"
                    className="h-11 rounded-xl"
                    value={institute.city}
                    onChange={(e) =>
                      setInstitute((prev) => ({
                        ...prev,
                        city: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    autoComplete="address-level1"
                    className="h-11 rounded-xl"
                    value={institute.state}
                    onChange={(e) =>
                      setInstitute((prev) => ({
                        ...prev,
                        state: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    name="pincode"
                    autoComplete="postal-code"
                    className="h-11 rounded-xl"
                    value={institute.pincode}
                    onChange={(e) =>
                      setInstitute((prev) => ({
                        ...prev,
                        pincode: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    name="contactNumber"
                    type="tel"
                    autoComplete="tel"
                    className="h-11 rounded-xl"
                    value={institute.contactNumber}
                    onChange={(e) =>
                      setInstitute((prev) => ({
                        ...prev,
                        contactNumber: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="flex flex-col gap-2 sm:col-span-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    autoComplete="url"
                    className="h-11 rounded-xl"
                    value={institute.website}
                    onChange={(e) =>
                      setInstitute((prev) => ({
                        ...prev,
                        website: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-200 pt-5 dark:border-slate-800">
                <Button type="button" variant="outline" className="rounded-xl">
                  Cancel
                </Button>
                <Button type="submit" className="rounded-xl">
                  Save Changes
                </Button>
              </div>
            </form>
          </DashboardCard>

          <DashboardCard
  title="Preferences"
  description="Control how the application looks and notifies you."
  className="p-6"
>

            <div className="flex flex-col divide-y divide-slate-200 dark:divide-slate-800">
              <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="flex flex-col gap-0.5">
                  <Label htmlFor="darkMode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Use a dark theme across the application.
                  </p>
                </div>
                <Switch
                  id="darkMode"
                  checked={preferences.darkMode}
                  onCheckedChange={() => togglePreference("darkMode")}
                />
              </div>

              <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="flex flex-col gap-0.5">
                  <Label htmlFor="emailNotifications">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive important updates by email.
                  </p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={preferences.emailNotifications}
                  onCheckedChange={() =>
                    togglePreference("emailNotifications")
                  }
                />
              </div>

              <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="flex flex-col gap-0.5">
                  <Label htmlFor="feeReminders">
                    Fee Reminder Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when fee payments are due.
                  </p>
                </div>
                <Switch
                  id="feeReminders"
                  checked={preferences.feeReminders}
                  onCheckedChange={() => togglePreference("feeReminders")}
                />
              </div>

              <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="flex flex-col gap-0.5">
                  <Label htmlFor="attendanceReminders">
                    Attendance Reminder Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about pending attendance entries.
                  </p>
                </div>
                <Switch
                  id="attendanceReminders"
                  checked={preferences.attendanceReminders}
                  onCheckedChange={() =>
                    togglePreference("attendanceReminders")
                  }
                />
              </div>

              <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="flex flex-col gap-0.5">
                  <Label htmlFor="autoReports">
                    Automatic Report Generation
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Generate monthly reports automatically.
                  </p>
                </div>
                <Switch
                  id="autoReports"
                  checked={preferences.autoReports}
                  onCheckedChange={() => togglePreference("autoReports")}
                />
              </div>
            </div>
          </DashboardCard>

          <DashboardCard
  title="Security"
  description="Manage your password and session."
  className="p-6"
>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="button" variant="outline" className="rounded-xl">
                Change Password
              </Button>
              <Button type="button" variant="outline" className="rounded-xl">
                Sign Out
              </Button>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
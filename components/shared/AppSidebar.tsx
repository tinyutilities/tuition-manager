import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Layers,
  ClipboardCheck,
  Wallet,
  GraduationCap,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  activeItem:
    | "dashboard"
    | "students"
    | "batches"
    | "attendance"
    | "fees"
    | "marks"
    | "settings";
}

interface NavItem {
  id: AppSidebarProps["activeItem"];
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "students",
    label: "Students",
    href: "/dashboard/students",
    icon: Users,
  },
  {
    id: "batches",
    label: "Batches",
    href: "/dashboard/batches",
    icon: Layers,
  },
  {
    id: "attendance",
    label: "Attendance",
    href: "/dashboard/attendance",
    icon: ClipboardCheck,
  },
  {
    id: "fees",
    label: "Fees",
    href: "/dashboard/fees",
    icon: Wallet,
  },
  {
    id: "marks",
    label: "Marks",
    href: "/dashboard/marks",
    icon: GraduationCap,
  },
  {
    id: "settings",
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function AppSidebar({ activeItem }: AppSidebarProps) {
  return (
    <aside className="flex h-screen w-[260px] flex-col border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="border-b border-slate-200 px-6 py-6">
        <h1 className="text-lg font-semibold text-slate-900">
          BatchPilot
        </h1>
        <p className="text-xs text-slate-500">Teacher Portal</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <Link
              key={item.id}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-200 p-4">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
            A
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-slate-900">
              Admin
            </p>
            <p className="text-xs text-slate-500">Administrator</p>
          </div>
        </div>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>

        <p className="mt-4 text-center text-xs text-slate-400">
          BatchPilot v1.0
        </p>
      </div>
    </aside>
  );
}
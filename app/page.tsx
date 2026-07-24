import Link from "next/link";
import {
  Users,
  ClipboardCheck,
  Wallet,
  GraduationCap,
  Layers,
  LayoutDashboard,
  Smartphone,
  Tablet,
  ShieldCheck,
  BookOpen,
} from "lucide-react";

const features = [
  {
    title: "Student Management",
    description:
      "Manage student profiles, contact details and class assignments.",
    icon: Users,
  },
  {
    title: "Attendance Tracking",
    description: "Record attendance quickly for every batch.",
    icon: ClipboardCheck,
  },
  {
    title: "Fee Management",
    description: "Track paid and pending tuition fees.",
    icon: Wallet,
  },
  {
    title: "Marks & Exams",
    description: "Store and review student performance.",
    icon: GraduationCap,
  },
  {
    title: "Batch Management",
    description: "Organize multiple classes with ease.",
    icon: Layers,
  },
  {
    title: "Teacher Dashboard",
    description: "View everything important from one central dashboard.",
    icon: LayoutDashboard,
  },
];

const highlights = [
  { label: "Mobile Friendly", icon: Smartphone },
  { label: "Tablet Optimized", icon: Tablet },
  { label: "Secure Login", icon: ShieldCheck },
  { label: "Designed for Teachers", icon: BookOpen },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <span className="text-lg font-semibold text-slate-900">
            BatchPilot
          </span>
          <Link
            href="/auth/login"
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Manage Your Tuition Classes Smarter
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-600">
            Track students, attendance, batches, fees and exam marks from one
            simple dashboard built specifically for teachers.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/auth/login"
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
            >
              Get Started
            </Link>
            <a
              href="#features"
              className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-medium text-slate-900 hover:bg-slate-50"
            >
              Explore Features
            </a>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-center text-3xl font-bold text-slate-900">
            Everything You Need to Run Your Tuition Classes
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-2xl bg-slate-50 p-8"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                    <Icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="border-t border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="text-center text-3xl font-bold text-slate-900">
              Why Choose BatchPilot
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {highlights.map((highlight) => {
                const Icon = highlight.icon;
                return (
                  <div
                    key={highlight.label}
                    className="flex flex-col items-center rounded-2xl bg-white p-8 text-center"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                      <Icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                    </div>
                    <span className="mt-4 text-sm font-medium text-slate-900">
                      {highlight.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-10 text-center">
          <span className="text-sm font-semibold text-slate-900">
            BatchPilot
          </span>
          <span className="text-sm text-slate-600">© 2026</span>
          <span className="text-sm text-slate-600">Built by Anushka Kar</span>
        </div>
      </footer>
    </div>
  );
}
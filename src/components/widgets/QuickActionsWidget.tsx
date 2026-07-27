import Link from "next/link";
import {
  Bot,
  Building2,
  Calculator,
  Plus,
  Route,
  Search,
  UserRoundSearch,
} from "lucide-react";

const quickActions = [
  {
    label: "Add housing",
    description: "Create a new property listing",
    href: "/housing/add",
    icon: Plus,
  },
  {
    label: "Find housing",
    description: "Browse available properties",
    href: "/housing",
    icon: Search,
  },
  {
    label: "Find roommates",
    description: "Explore compatible matches",
    href: "/roommates",
    icon: UserRoundSearch,
  },
  {
    label: "Add expense",
    description: "Record a relocation expense",
    href: "/expenses",
    icon: Calculator,
  },
  {
    label: "Plan transport",
    description: "Search routes and nearby stations",
    href: "/transport",
    icon: Route,
  },
  {
    label: "Ask AI",
    description: "Get personalized relocation help",
    href: "/ai",
    icon: Bot,
  },
];

export default function QuickActionsWidget() {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF2E4] text-[#6B8E23]">
          <Building2 className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-neutral-900">
            Quick Actions
          </h2>

          <p className="text-sm text-neutral-500">
            Continue your relocation journey
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {quickActions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.label}
              href={action.href}
              className="group rounded-xl border border-neutral-200 p-4 transition hover:border-[#6B8E23] hover:bg-[#FBFAF5]"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 transition group-hover:bg-[#EEF2E4] group-hover:text-[#6B8E23]">
                  <Icon className="h-4 w-4" />
                </div>

                <div>
                  <p className="font-semibold text-neutral-900">
                    {action.label}
                  </p>

                  <p className="mt-1 text-sm leading-5 text-neutral-500">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
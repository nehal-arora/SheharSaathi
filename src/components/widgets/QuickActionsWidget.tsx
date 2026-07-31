import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  Calculator,
  Home,
  MapPinned,
  Plus,
  Route,
  Search,
  UserRoundSearch,
} from "lucide-react";

const quickActions = [
  {
    label: "Add housing",
    description: "Publish a new property listing",
    href: "/housing/add",
    icon: Plus,
    accent: "green",
  },
  {
    label: "Find housing",
    description: "Explore homes that match your needs",
    href: "/housing",
    icon: Search,
    accent: "gold",
  },
  {
    label: "Find roommates",
    description: "Browse compatible roommate profiles",
    href: "/roommates",
    icon: UserRoundSearch,
    accent: "green",
  },
  {
    label: "Add expense",
    description: "Record your latest relocation spending",
    href: "/expenses",
    icon: Calculator,
    accent: "gold",
  },
  {
    label: "Plan transport",
    description: "Review routes and commute options",
    href: "/transport",
    icon: Route,
    accent: "green",
  },
  {
    label: "Ask AI",
    description: "Get personalised relocation guidance",
    href: "/suggestions",
    icon: Bot,
    accent: "gold",
  },
] as const;

export default function QuickActionsWidget() {
  return (
    <section className="relative overflow-hidden rounded-[22px] border border-white/[0.07] bg-gradient-to-br from-[#0F251E] to-[#0B1D18] p-5 shadow-[0_20px_55px_rgba(0,0,0,0.2)] sm:p-6">
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#205C46]/25 blur-[85px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-[#D4A34F]/8 blur-[90px]" />

      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
            <Home className="h-5 w-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <MapPinned className="h-4 w-4 text-[#D4A34F]" />

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#D4A34F]">
                Quick access
              </p>
            </div>

            <h2 className="mt-2 text-xl font-bold tracking-[-0.03em] text-white sm:text-2xl">
              Continue your relocation journey
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/40">
              Jump directly to the tools you use most.
            </p>
          </div>
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/30">
          6 shortcuts
        </p>
      </div>

      <div className="relative mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          const isGold = action.accent === "gold";

          return (
            <Link
              key={action.label}
              href={action.href}
              className="group relative min-h-[158px] overflow-hidden rounded-[18px] border border-white/[0.06] bg-white/[0.025] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#D4A34F]/25 hover:bg-white/[0.04]"
            >
              <div
                className={
                  isGold
                    ? "pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-[#D4A34F]/10 blur-[45px]"
                    : "pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-[#205C46]/30 blur-[45px]"
                }
              />

              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={
                      isGold
                        ? "flex h-11 w-11 items-center justify-center rounded-xl border border-[#D4A34F]/15 bg-[#D4A34F]/10 text-[#F0C86A]"
                        : "flex h-11 w-11 items-center justify-center rounded-xl border border-[#8AB59C]/10 bg-[#205C46]/35 text-[#A5CEB5]"
                    }
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-white/25 transition group-hover:border-[#D4A34F]/20 group-hover:text-[#F0C86A]">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <h3 className="text-base font-bold tracking-[-0.02em] text-white">
                    {action.label}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white/38">
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
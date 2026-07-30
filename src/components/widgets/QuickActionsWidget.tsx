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
    iconClass: "bg-[#6B8E23] text-white",
    cardClass:
      "border-[#D6E2BC] bg-[#F1F6E8] hover:border-[#AFC77B]",
    glowClass: "bg-[#9FC65B]/25",
  },
  {
    label: "Find housing",
    description: "Explore homes that match your needs",
    href: "/housing",
    icon: Search,
    iconClass: "bg-[#B67A2D] text-white",
    cardClass:
      "border-[#ECD8B1] bg-[#FFF6E4] hover:border-[#D6B36D]",
    glowClass: "bg-[#E7B858]/25",
  },
  {
    label: "Find roommates",
    description: "Browse compatible roommate profiles",
    href: "/roommates",
    icon: UserRoundSearch,
    iconClass: "bg-[#7A63A2] text-white",
    cardClass:
      "border-[#DED5EC] bg-[#F5F1FA] hover:border-[#B9A8D1]",
    glowClass: "bg-[#A78BC8]/25",
  },
  {
    label: "Add expense",
    description: "Record your latest relocation spending",
    href: "/expenses",
    icon: Calculator,
    iconClass: "bg-[#C9822B] text-white",
    cardClass:
      "border-[#EED6B7] bg-[#FFF2E7] hover:border-[#D8A46B]",
    glowClass: "bg-[#E9A85B]/25",
  },
  {
    label: "Plan transport",
    description: "Review routes and commute options",
    href: "/transport",
    icon: Route,
    iconClass: "bg-[#4F8099] text-white",
    cardClass:
      "border-[#CFE0E8] bg-[#EDF5F8] hover:border-[#8FB3C4]",
    glowClass: "bg-[#7EABC1]/25",
  },
  {
    label: "Ask AI",
    description: "Get personalised relocation guidance",
    href: "/suggestions",
    icon: Bot,
    iconClass: "bg-[#202918] text-[#C8E894]",
    cardClass:
      "border-[#35422A] bg-[#202918] text-white hover:border-[#7FA33C]",
    glowClass: "bg-[#9FC65B]/20",
    dark: true,
  },
];

export default function QuickActionsWidget() {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-black/[0.06] bg-white/80 p-5 shadow-[0_18px_50px_rgba(39,46,31,0.06)] backdrop-blur sm:p-7">
      <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#A5C866]/10 blur-3xl" />

      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-[#202918] text-[#C8E894] shadow-[0_12px_28px_rgba(32,41,24,0.18)]">
            <Home className="h-5 w-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <MapPinned className="h-4 w-4 text-[#6B8E23]" />

              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#5F7E20]">
                Quick access
              </p>
            </div>

            <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-[#252A20]">
              Continue your relocation journey
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6D7168]">
              Jump directly to the tools you use most.
            </p>
          </div>
        </div>

        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#92978E]">
          6 shortcuts
        </p>
      </div>

      <div className="relative mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {quickActions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.label}
              href={action.href}
              className={`group relative min-h-[170px] overflow-hidden rounded-[26px] border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_rgba(39,46,31,0.1)] ${action.cardClass}`}
            >
              <div
                className={`pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full blur-3xl ${action.glowClass}`}
              />

              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-[18px] shadow-sm ${action.iconClass}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div
                    className={
                      action.dark
                        ? "flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/60 transition group-hover:bg-[#9FC65B] group-hover:text-[#17200F]"
                        : "flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-black/35 transition group-hover:bg-white group-hover:text-[#6B8E23]"
                    }
                  >
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <h3
                    className={
                      action.dark
                        ? "text-lg font-black tracking-[-0.02em] text-white"
                        : "text-lg font-black tracking-[-0.02em] text-[#252A20]"
                    }
                  >
                    {action.label}
                  </h3>

                  <p
                    className={
                      action.dark
                        ? "mt-2 text-sm leading-6 text-white/55"
                        : "mt-2 text-sm leading-6 text-[#6D7168]"
                    }
                  >
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
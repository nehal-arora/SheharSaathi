import Link from "next/link";
import {
  ArrowRight,
  Bot,
  House,
  MapPinned,
  Wallet,
} from "lucide-react";

const actions = [
  {
    title: "Search Housing",
    description:
      "Browse verified PGs, apartments and rentals that match your budget.",
    icon: House,
    href: "/housing",
  },
  {
    title: "Budget Planner",
    description:
      "Plan your monthly relocation expenses and track your spending.",
    icon: Wallet,
    href: "/budget",
  },
  {
    title: "AI Relocation Planner",
    description:
      "Receive personalized recommendations and relocation guidance.",
    icon: Bot,
    href: "/ai-planner",
  },
  {
    title: "Explore Localities",
    description:
      "Compare neighborhoods by safety, commute and affordability.",
    icon: MapPinned,
    href: "/locality",
  },
];

export default function QuickActions() {
  return (
    <section className="mt-10">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-[#333333]">
          Continue Your Journey
        </h2>

        <p className="mt-1 text-gray-500">
          Choose where you'd like to continue.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="group rounded-3xl border border-[#E8DFC8] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#D6C7A1] hover:shadow-lg"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF2E4]">
                <Icon
                  size={28}
                  className="text-[#6B8E23]"
                />
              </div>

              <h3 className="mt-5 text-xl font-semibold text-[#333333]">
                {action.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                {action.description}
              </p>

              <div className="mt-6 flex items-center gap-2 font-semibold text-[#6B8E23]">
                Open

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
import {
  House,
  Users,
  Wallet,
  Bot,
} from "lucide-react";

import StatCard from "./StatCard";

export default function StatsGrid() {
  return (
    <section className="mt-8">

      <div className="mb-5">
        <h2 className="text-2xl font-bold text-[#333333]">
          Quick Overview
        </h2>

        <p className="mt-1 text-gray-500">
          Here's a snapshot of your relocation journey.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Saved Properties"
          value="0"
          subtitle="Start exploring homes"
          icon={House}
          iconBg="#EEF2E4"
          iconColor="#6B8E23"
        />

        <StatCard
          title="Roommate Requests"
          value="0"
          subtitle="No active requests"
          icon={Users}
          iconBg="#F6F0E3"
          iconColor="#8A6A2B"
        />

        <StatCard
          title="Monthly Budget"
          value="₹0"
          subtitle="Create your budget"
          icon={Wallet}
          iconBg="#EEF2E4"
          iconColor="#6B8E23"
        />

        <StatCard
          title="AI Suggestions"
          value="0"
          subtitle="No suggestions yet"
          icon={Bot}
          iconBg="#F6F0E3"
          iconColor="#8A6A2B"
        />

      </div>
    </section>
  );
}
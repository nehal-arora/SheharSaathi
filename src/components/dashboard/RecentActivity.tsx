"use client";

import {
  Clock3,
  House,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";

const upcomingActivities = [
  {
    title: "Browse verified housing",
    description: "Find your first verified property.",
    icon: House,
  },
  {
    title: "Create your monthly budget",
    description: "Plan your relocation expenses.",
    icon: Wallet,
  },
  {
    title: "Discover compatible roommates",
    description: "Connect with people moving to your city.",
    icon: Users,
  },
  {
    title: "Ask the AI Planner",
    description: "Receive personalized relocation guidance.",
    icon: Sparkles,
  },
];

export default function RecentActivity() {
  return (
    <section className="mt-10">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-[#333333]">
          What's Next
        </h2>

        <p className="mt-1 text-gray-500">
          Start exploring these features to make your relocation easier.
        </p>
      </div>

      <div className="rounded-3xl border border-[#E8DFC8] bg-white p-7 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF2E4]">
            <Clock3
              size={24}
              className="text-[#6B8E23]"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#333333]">
              Your Journey Starts Here
            </h3>

            <p className="text-sm text-gray-500">
              Complete these steps to get the best experience.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {upcomingActivities.map((activity) => {
            const Icon = activity.icon;

            return (
              <div
                key={activity.title}
                className="flex items-start gap-4 rounded-2xl bg-[#FBFAF5] p-4 transition hover:bg-[#F5F1E7]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
                  <Icon
                    size={22}
                    className="text-[#6B8E23]"
                  />
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold text-[#333333]">
                    {activity.title}
                  </h4>

                  <p className="mt-1 text-sm text-gray-500">
                    {activity.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
import {
  Bot,
  Calculator,
  Lightbulb,
  MapPinned,
  MessageCircleMore,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import AIFeatureCard from "@/components/ai/AIFeatureCard";
import AIHeader from "@/components/ai/AIHeader";

const aiFeatures = [
  {
    title: "AI Relocation Chat",
    description:
      "Ask questions about housing, localities, transport, budgeting, safety, and the relocation process.",
    href: "/chat",
    icon: MessageCircleMore,
  },
  {
    title: "Locality Recommender",
    description:
      "Discover suitable localities based on your city, budget, workplace, lifestyle, and transport preferences.",
    href: "/locality",
    icon: MapPinned,
  },
  {
    title: "Rental Scam Checker",
    description:
      "Analyse suspicious rental offers, payment demands, owner messages, and property details before taking action.",
    href: "/scam-check",
    icon: ShieldCheck,
  },
  {
    title: "Budget Advisor",
    description:
      "Create a practical monthly relocation budget covering rent, food, travel, utilities, savings, and emergencies.",
    href: "/budget-advisor",
    icon: Calculator,
  },
  {
    title: "Smart Suggestions",
    description:
      "Receive personalised recommendations based on your housing, roommate, expense, and relocation activity.",
    href: "/suggestions",
    icon: Lightbulb,
  },
];

export default function AIPage() {
  return (
    <main className="min-h-screen bg-[#FBFAF5]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AIHeader
          badge="AI Relocation Assistant"
          title="Move to a new city with greater confidence"
          description="Use शहरSaathi AI tools to explore localities, plan your budget, identify suspicious rental offers, and receive personalised relocation guidance."
          icon={<Bot className="h-7 w-7" />}
        />

        <section className="mt-10">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF2E4] text-[#6B8E23]">
              <Sparkles className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                AI-powered tools
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Select a tool based on the guidance you currently need.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {aiFeatures.map((feature) => (
              <AIFeatureCard
                key={feature.href}
                title={feature.title}
                description={feature.description}
                href={feature.href}
                icon={feature.icon}
              />
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-[#D6C7A1]/60 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#6B8E23]">
                <Sparkles className="h-4 w-4" />
                Responsible AI guidance
              </div>

              <h2 className="mt-3 text-2xl font-semibold text-gray-900">
                Use AI recommendations as supportive guidance
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Always verify property ownership, rental documents, payment
                requests, locality conditions, transport routes, and safety
                information independently before making an important decision.
              </p>
            </div>

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-[#EEF2E4] text-[#6B8E23]">
              <ShieldCheck className="h-9 w-9" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
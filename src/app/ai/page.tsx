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
    <main className="min-h-screen bg-[#071512]">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <AIHeader
          badge="AI Relocation Assistant"
          title="Move to a new city with greater confidence"
          description="Use शहरSaathi AI tools to explore localities, plan your budget, identify suspicious rental offers, and receive personalised relocation guidance."
          icon={<Bot className="h-7 w-7" />}
        />

        <section className="mt-10">
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
                <Sparkles className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4A34F]">
                  Intelligent Assistance
                </p>

                <h2 className="mt-1 text-2xl font-bold text-[#FBFAF7]">
                  AI-Powered Tools
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#9EAEA7]">
                  Select a tool based on the relocation guidance you currently
                  need.
                </p>
              </div>
            </div>

            <div className="rounded-full border border-[#205C46]/40 bg-[#0D211B] px-4 py-2 text-sm font-semibold text-[#D6E0DB]">
              {aiFeatures.length} specialised tools
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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

        <section className="relative mt-10 overflow-hidden rounded-[30px] border border-[#205C46]/35 bg-[#0D211B] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)] sm:p-8">
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#D4A34F]/10 blur-3xl" />

          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A34F]/20 bg-[#D4A34F]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#F0C86A]">
                <Sparkles className="h-4 w-4" />
                Responsible AI Guidance
              </div>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#FBFAF7]">
                Use AI recommendations as supportive guidance
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#B8C5BF] sm:text-base">
                Always verify property ownership, rental documents, payment
                requests, locality conditions, transport routes, and safety
                information independently before making an important decision.
              </p>
            </div>

            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[28px] border border-[#D4A34F]/25 bg-[#D4A34F]/10 text-[#F0C86A]">
              <ShieldCheck className="h-10 w-10" />
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
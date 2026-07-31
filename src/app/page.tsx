import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Building2,
  Check,
  ChevronRight,
  CircleCheckBig,
  IndianRupee,
  MapPin,
  Navigation,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  WalletCards,
} from "lucide-react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const features = [
  {
    title: "Verified Housing",
    description:
      "Explore suitable homes with useful property details, filters, availability, and verified listings.",
    href: "/housing",
    icon: Building2,
    label: "Explore homes",
  },
  {
    title: "Compatible Roommates",
    description:
      "Discover roommate profiles based on budget, lifestyle, location, and personal preferences.",
    href: "/roommates",
    icon: Users,
    label: "Find roommates",
  },
  {
    title: "AI-Powered Guidance",
    description:
      "Get smart relocation support, locality recommendations, budget guidance, and useful suggestions.",
    href: "/ai",
    icon: Bot,
    label: "Ask SheharSaathi AI",
  },
  {
    title: "Expense Management",
    description:
      "Track your spending, manage monthly budgets, and understand your relocation expenses clearly.",
    href: "/expenses",
    icon: WalletCards,
    label: "Manage expenses",
  },
  {
    title: "Locality Discovery",
    description:
      "Compare localities and understand what makes an area suitable for your lifestyle and needs.",
    href: "/locality",
    icon: MapPin,
    label: "Discover localities",
  },
  {
    title: "Transport Assistance",
    description:
      "Access helpful transport information and make everyday city travel easier to understand.",
    href: "/transport",
    icon: Navigation,
    label: "Explore transport",
  },
];

const steps = [
  {
    number: "01",
    title: "Tell us what you need",
    description:
      "Share your city, budget, housing needs, lifestyle preferences, and relocation priorities.",
  },
  {
    number: "02",
    title: "Explore personalised options",
    description:
      "Browse housing, roommate matches, locality insights, transport information, and smart suggestions.",
  },
  {
    number: "03",
    title: "Relocate with confidence",
    description:
      "Track expenses, shortlist options, avoid common risks, and manage your move from one platform.",
  },
];

const benefits = [
  "One platform for the complete relocation journey",
  "Designed for students and working professionals",
  "Smart recommendations based on real preferences",
  "Clear, simple, and organised decision-making",
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Navbar />

      <main>
        {/* Hero */}

        <section className="relative isolate overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-[-12rem] top-[-8rem] h-[30rem] w-[30rem] rounded-full bg-primary/10 blur-[110px]" />
            <div className="absolute right-[-10rem] top-[5rem] h-[28rem] w-[28rem] rounded-full bg-[#D8B45A]/10 blur-[120px]" />

            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, currentColor 1px, transparent 1px)",
                backgroundSize: "26px 26px",
              }}
            />
          </div>

          <div className="mx-auto grid min-h-[calc(100vh-76px)] max-w-[1440px] items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-20">
            <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary shadow-sm">
                <Sparkles className="h-4 w-4" />
                AI-powered relocation companion
              </div>

              <h1 className="text-balance text-5xl font-extrabold leading-[1.06] tracking-[-0.055em] text-foreground sm:text-6xl lg:text-[72px]">
                Everything you need for a{" "}
                <span className="relative inline-block text-primary">
                  new city.
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 260 18"
                    className="absolute -bottom-2 left-0 w-full text-primary/25"
                    fill="none"
                  >
                    <path
                      d="M4 12C59 4 178 4 256 10"
                      stroke="currentColor"
                      strokeWidth="7"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-muted-foreground lg:mx-0">
                SheharSaathi helps students and professionals discover housing,
                find compatible roommates, manage expenses, understand
                localities, and relocate with greater confidence.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <Link
                  href="/signup"
                  className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-primary px-7 text-base font-bold text-primary-foreground shadow-[0_14px_38px_rgba(107,142,35,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-primary/90 hover:shadow-[0_18px_44px_rgba(107,142,35,0.3)]"
                >
                  Start your journey
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  href="#features"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-border bg-card px-7 text-base font-bold text-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                >
                  Explore features
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </div>

              <div className="mt-9 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-medium text-muted-foreground lg:justify-start">
                <span className="inline-flex items-center gap-2">
                  <CircleCheckBig className="h-4 w-4 text-primary" />
                  Student-friendly
                </span>

                <span className="inline-flex items-center gap-2">
                  <CircleCheckBig className="h-4 w-4 text-primary" />
                  AI-assisted
                </span>

                <span className="inline-flex items-center gap-2">
                  <CircleCheckBig className="h-4 w-4 text-primary" />
                  All-in-one platform
                </span>
              </div>
            </div>

            {/* Product preview */}

            <div className="relative mx-auto w-full max-w-[650px]">
              <div className="absolute -left-5 top-16 hidden rounded-2xl border border-[#D8C6A6] bg-[#F6ECD8] p-4 shadow-[0_20px_55px_rgba(31,41,55,0.12)] xl:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <BadgeCheck className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      Verified options
                    </p>
                    <p className="text-sm font-black text-[#183126]">
                      Safer decisions
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-3 bottom-24 z-20 hidden rounded-2xl border border-[#D8C6A6] bg-[#F6ECD8] p-4 shadow-[0_20px_55px_rgba(31,41,55,0.12)] sm:block xl:-right-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF5D9] text-[#9B6B00]">
                    <TrendingUp className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      Monthly budget
                    </p>
                    <p className="text-sm font-black text-[#183126]">
                      On track
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[34px] border border-[#D7C5A6]/60 bg-[#EEDFC5] p-3 shadow-[0_35px_100px_rgba(0,0,0,0.22)] sm:p-5">
                <div className="rounded-[26px] border border-[#D7C5A6] bg-[#F6ECD8] p-4 sm:p-6">
                  <div className="flex items-center justify-between border-b border-[#D8C6A6] pb-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                        Your relocation dashboard
                      </p>

                      <h2 className="mt-2 text-xl font-black tracking-tight text-[#183126] sm:text-2xl">
                        Product Preview
                      </h2>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
                      <Sparkles className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <PreviewCard
  label="Housing"
  value="Verified listings"
  icon={Building2}
/>

<PreviewCard
  label="Roommates"
  value="Smart matches"
  icon={Users}
/>

<PreviewCard
  label="Expenses"
  value="Budget tracking"
  icon={IndianRupee}
/>

<PreviewCard
  label="Localities"
  value="Area insights"
  icon={MapPin}
/>
                  </div>

                  <div className="mt-4 rounded-3xl bg-gradient-to-r from-[#20391F] to-[#304A25] p-5 text-white">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#BCD78B]">
                          <Sparkles className="h-4 w-4" />
                          Smart suggestion
                        </div>

                        <h3 className="mt-3 text-lg font-bold">
                          Discover localities that fit your budget and lifestyle.
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-white/65">
                          Based on your budget, commute, and housing
                          preferences.
                        </p>
                      </div>

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-[1.15fr_0.85fr]">
                    <div className="rounded-3xl border border-[#D8C6A6] bg-[#EFE3CC] p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground">
                            Monthly expenses
                          </p>

                          <p className="mt-1 text-xl font-black text-[#183126]">
                            ₹18,450
                          </p>
                        </div>

                        <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                          <WalletCards className="h-5 w-5" />
                        </div>
                      </div>

                      <div className="mt-5 flex h-16 items-end gap-2">
                        {[38, 52, 44, 70, 58, 82, 66].map(
                          (height, index) => (
                            <div
                              key={`${height}-${index}`}
                              className="flex-1 rounded-t-md bg-primary/20"
                              style={{ height: `${height}%` }}
                            />
                          ),
                        )}
                      </div>
                    </div>

                    <div className="rounded-3xl border border-[#D8C6A6] bg-[#EFE3CC] p-5">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-primary" />

                        <p className="text-sm font-black text-[#183126]">
                          Relocation health
                        </p>
                      </div>

                      <div className="mt-5 flex items-end gap-2">
                        <span className="text-3xl font-black text-[#183126]">
                          82
                        </span>

                        <span className="pb-1 text-xs font-semibold text-primary">
                          Excellent
                        </span>
                      </div>

                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                        <div className="h-full w-[82%] rounded-full bg-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust strip */}

        <section className="border-y border-border bg-card">
          <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-8 px-4 py-9 sm:px-6 md:grid-cols-4 lg:px-8">
            <Stat value="6+" label="Relocation modules" />
            <Stat value="AI" label="Personalised assistance" />
            <Stat value="360°" label="Relocation support" />
            <Stat value="1" label="Unified platform" />
          </div>
        </section>

        {/* Features */}

        <section
          id="features"
          className="scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-[1280px]">
            <SectionHeading
              eyebrow="Everything in one place"
              title="Your complete relocation toolkit"
              description="From finding a place to live to managing everyday expenses, SheharSaathi brings the important parts of relocation together."
            />

            <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <Link
                    key={feature.title}
                    href={feature.href}
                    className="group rounded-[28px] border border-border bg-card p-7 shadow-[0_10px_35px_rgba(31,41,55,0.04)] transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-[0_24px_55px_rgba(31,41,55,0.09)]"
                  >
                    <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="mt-7 text-xl font-extrabold tracking-tight text-foreground">
                      {feature.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {feature.description}
                    </p>

                    <div className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-primary">
                      {feature.label}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* How it works */}

        <section className="bg-[#202918] px-4 py-24 text-white sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <div>
                <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#B9D486]">
                  Simple by design
                </span>

                <h2 className="mt-5 text-balance text-4xl font-extrabold tracking-[-0.045em] sm:text-5xl">
                  From uncertainty to clarity in three steps.
                </h2>

                <p className="mt-6 max-w-lg text-base leading-8 text-white/65">
                  Relocation can feel overwhelming. SheharSaathi organises the
                  process so you can focus on making the right decisions.
                </p>

                <Link
                  href="/signup"
                  className="group mt-9 inline-flex min-h-13 items-center gap-2 rounded-2xl bg-[#8DB63E] px-6 font-bold text-[#15200C] transition-all duration-300 hover:-translate-y-1 hover:bg-[#9CC84A]"
                >
                  Get started
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="space-y-4">
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className="grid gap-5 rounded-[28px] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-sm sm:grid-cols-[70px_1fr] sm:p-7"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-sm font-extrabold text-[#C6DF95]">
                      {step.number}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold">{step.title}</h3>

                      <p className="mt-2 leading-7 text-white/60">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About */}

        <section
          id="about"
          className="scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
        >
          <div className="mx-auto grid max-w-[1280px] items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-[42px] bg-primary/10 blur-2xl" />

              <div className="overflow-hidden rounded-[34px] border border-border bg-card p-6 shadow-[0_30px_80px_rgba(31,41,55,0.1)] sm:p-8">
                <div className="rounded-[26px] bg-gradient-to-br from-[#EDF4E4] via-[#F9FAF6] to-[#F2EBD9] p-7 sm:p-9">
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                      <MapPin className="h-7 w-7" />
                    </div>

                    <div className="rounded-full border border-primary/15 bg-card px-4 py-2 text-xs font-bold text-primary shadow-sm">
                      Built for real relocation needs
                    </div>
                  </div>

                  <h3 className="mt-12 max-w-md text-3xl font-extrabold leading-tight tracking-[-0.04em] text-foreground">
                    A smarter companion for every step in a new city.
                  </h3>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {[
                      "Housing",
                      "Roommates",
                      "Expenses",
                      "Localities",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/75 p-4 shadow-sm backdrop-blur"
                      >
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm font-black text-[#183126]">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                Why SheharSaathi
              </span>

              <h2 className="mt-5 text-balance text-4xl font-extrabold tracking-[-0.045em] text-foreground sm:text-5xl">
                Relocation should feel exciting, not exhausting.
              </h2>

              <p className="mt-6 text-base leading-8 text-muted-foreground">
                Moving to a new city often means searching across multiple
                platforms, comparing incomplete information, managing expenses,
                and making important decisions under pressure.
              </p>

              <p className="mt-4 text-base leading-8 text-muted-foreground">
                SheharSaathi brings these decisions together in one organised,
                user-friendly platform built around the needs of students and
                professionals.
              </p>

              <div className="mt-8 space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </div>

                    <p className="font-semibold leading-6 text-foreground">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial-style statement */}

        <section className="px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32">
          <div className="mx-auto max-w-[1100px] rounded-[34px] border border-border bg-card px-6 py-12 text-center shadow-[0_25px_70px_rgba(31,41,55,0.07)] sm:px-12">
            <div className="flex justify-center gap-1 text-[#D7A52B]">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="h-5 w-5 fill-current"
                />
              ))}
            </div>

            <blockquote className="mx-auto mt-6 max-w-3xl text-balance text-2xl font-extrabold leading-relaxed tracking-[-0.025em] text-foreground sm:text-3xl">
              “A new city comes with hundreds of questions. SheharSaathi is
              designed to help you answer them in one place.”
            </blockquote>

            <p className="mt-6 text-sm font-semibold text-muted-foreground">
              Built for students, professionals, and first-time movers
            </p>
          </div>
        </section>

        {/* Final CTA */}

        <section
          id="contact"
          className="scroll-mt-24 px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32"
        >
          <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[38px] bg-primary px-6 py-16 text-center text-primary-foreground shadow-[0_30px_80px_rgba(107,142,35,0.25)] sm:px-10 lg:py-20">
            <div className="absolute -left-20 -top-24 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-28 -right-16 h-72 w-72 rounded-full bg-black/10 blur-2xl" />

            <div className="relative mx-auto max-w-3xl">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                <Sparkles className="h-7 w-7" />
              </div>

              <h2 className="mt-7 text-balance text-4xl font-extrabold tracking-[-0.045em] sm:text-5xl">
                Your new city journey starts here.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/75">
                Create your account and start organising housing, roommates,
                expenses, localities, and everything else that comes with
                relocation.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/signup"
                  className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-white px-7 font-bold text-primary shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-white/90"
                >
                  Create free account
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/login"
                  className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-7 font-bold text-white backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white/15"
                >
                  Login to continue
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

interface PreviewCardProps {
  label: string;
  value: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
}

function PreviewCard({
  label,
  value,
  icon: Icon,
}: PreviewCardProps) {
  return (
    <div className="rounded-2xl border border-[#D8C6A6] bg-[#EFE3CC] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold text-[#64766A] sm:text-xs">
            {label}
          </p>

          <p className="mt-1 text-xl font-black tracking-tight text-[#183126] sm:text-2xl">
            {value}
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-10 sm:w-10">
          <Icon className="h-[18px] w-[18px]" />
        </div>
      </div>
    </div>
  );
}

interface StatProps {
  value: string;
  label: string;
}

function Stat({ value, label }: StatProps) {
  return (
    <div className="text-center">
      <p className="text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
        {value}
      </p>

      <p className="mt-1 text-xs font-semibold text-muted-foreground sm:text-sm">
        {label}
      </p>
    </div>
  );
}

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
        {eyebrow}
      </span>

      <h2 className="mt-5 text-balance text-4xl font-extrabold tracking-[-0.045em] text-foreground sm:text-5xl">
        {title}
      </h2>

      <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
        {description}
      </p>
    </div>
  );
}
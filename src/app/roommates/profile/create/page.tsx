import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  UserRoundPlus,
} from "lucide-react";

import RoommateProfileForm from "@/components/roommates/RoommateProfileForm";

export default function CreateRoommateProfilePage() {
  return (
    <main className="min-h-screen bg-[#071512]">
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <Link
          href="/roommates/profile"
          className="group inline-flex items-center gap-2 rounded-xl px-1 py-2 text-sm font-semibold text-[#D4A34F] transition hover:text-[#F0C86A]"
        >
          <ArrowLeft
            size={18}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to Profile
        </Link>

        <section className="relative mt-6 overflow-hidden rounded-[32px] border border-[#205C46]/35 bg-[#0D211B] p-7 shadow-[0_24px_70px_rgba(0,0,0,0.30)] sm:p-10">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#D4A34F]/10 blur-3xl" />
          <div className="absolute -left-16 bottom-0 h-52 w-52 rounded-full bg-[#205C46]/15 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[24px] border border-[#D4A34F]/20 bg-[#D4A34F]/10">
                <UserRoundPlus
                  size={38}
                  className="text-[#F0C86A]"
                />
              </div>

              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A34F]/20 bg-[#D4A34F]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#F0C86A]">
                  <Sparkles size={15} />
                  AI-Powered Matching
                </div>

                <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#FBFAF7] sm:text-5xl">
                  Create Your
                  <span className="block text-[#F0C86A]">
                    Roommate Profile
                  </span>
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-8 text-[#B8C5BF]">
                  Tell us about your lifestyle,
                  budget, preferred locality, and
                  roommate preferences so our AI can
                  recommend people who are genuinely
                  compatible with you.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:w-[280px]">
              <div className="rounded-2xl border border-[#205C46]/40 bg-[#10271F] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#7F9189]">
                  AI Matching
                </p>

                <p className="mt-2 text-2xl font-bold text-[#F0C86A]">
                  Smart
                </p>
              </div>

              <div className="rounded-2xl border border-[#205C46]/40 bg-[#10271F] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#7F9189]">
                  Profile
                </p>

                <p className="mt-2 text-2xl font-bold text-[#F0C86A]">
                  Complete
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <RoommateProfileForm mode="create" />
        </section>
      </section>
    </main>
  );
}
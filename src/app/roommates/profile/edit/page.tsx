"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  PencilLine,
  Sparkles,
  UserRoundPlus,
} from "lucide-react";
import { toast } from "sonner";

import RoommateProfileForm from "@/components/roommates/RoommateProfileForm";

import { getMyRoommateProfile } from "@/features/roommates/services/roommate.service";

import type { RoommateProfile } from "@/types/roommates";

export default function EditRoommateProfilePage() {
  const [profile, setProfile] =
    useState<RoommateProfile | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getMyRoommateProfile();

        setProfile(data);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Unable to load your roommate profile.";

        toast.error(message);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#071512] px-4 py-12">
        <div className="mx-auto flex min-h-[520px] max-w-5xl items-center justify-center overflow-hidden rounded-[32px] border border-[#205C46]/35 bg-[#0D211B] shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
          <div className="relative text-center">
            <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4A34F]/10 blur-3xl" />

            <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border border-[#D4A34F]/25 bg-[#D4A34F]/10">
              <Loader2
                size={38}
                className="animate-spin text-[#F0C86A]"
              />
            </div>

            <h1 className="mt-6 text-xl font-bold text-[#FBFAF7]">
              Loading your profile
            </h1>

            <p className="mt-2 text-sm text-[#9EAEA7]">
              Preparing your roommate details and preferences...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="min-h-screen bg-[#071512] px-4 py-12">
        <section className="relative mx-auto max-w-3xl overflow-hidden rounded-[32px] border border-[#D4A34F]/20 bg-[#0D211B] p-8 text-center shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:p-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#D4A34F]/10 blur-3xl" />

          <div className="relative">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border border-[#D4A34F]/25 bg-[#D4A34F]/10">
              <UserRoundPlus
                size={34}
                className="text-[#F0C86A]"
              />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-[#D4A34F]">
              Profile required
            </p>

            <h1 className="mt-3 text-3xl font-bold text-[#FBFAF7] sm:text-4xl">
              No Roommate Profile Found
            </h1>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-[#9EAEA7]">
              Create your roommate profile first, then you
              can return here to update your details and
              matching preferences.
            </p>

            <Link
              href="/roommates/profile/create"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D4A34F] px-6 py-3.5 font-bold text-[#071512] shadow-[0_12px_30px_rgba(212,163,79,0.24)] transition hover:bg-[#F0C86A]"
            >
              <UserRoundPlus size={18} />
              Create Profile
            </Link>
          </div>
        </section>
      </main>
    );
  }

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

        <section className="relative mt-6 overflow-hidden rounded-[32px] border border-[#205C46]/35 bg-[#0D211B] p-7 shadow-[0_24px_70px_rgba(0,0,0,0.3)] sm:p-10">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#D4A34F]/10 blur-3xl" />
          <div className="absolute -left-16 bottom-0 h-52 w-52 rounded-full bg-[#205C46]/15 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[24px] border border-[#D4A34F]/20 bg-[#D4A34F]/10">
                <PencilLine
                  size={36}
                  className="text-[#F0C86A]"
                />
              </div>

              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A34F]/20 bg-[#D4A34F]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#F0C86A]">
                  <Sparkles size={15} />
                  Profile Settings
                </div>

                <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#FBFAF7] sm:text-5xl">
                  Edit Your
                  <span className="block text-[#F0C86A]">
                    Roommate Profile
                  </span>
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-8 text-[#B8C5BF]">
                  Keep your lifestyle, budget, location,
                  and roommate preferences up to date to
                  improve the accuracy of your AI-powered
                  recommendations.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:w-[290px]">
              <div className="rounded-2xl border border-[#205C46]/40 bg-[#10271F] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#7F9189]">
                  Profile
                </p>

                <p className="mt-2 text-2xl font-bold text-[#F0C86A]">
                  Active
                </p>
              </div>

              <div className="rounded-2xl border border-[#205C46]/40 bg-[#10271F] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#7F9189]">
                  Matching
                </p>

                <p className="mt-2 text-2xl font-bold text-[#F0C86A]">
                  Smart
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <RoommateProfileForm
            mode="edit"
            initialProfile={profile}
          />
        </section>
      </section>
    </main>
  );
}
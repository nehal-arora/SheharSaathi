"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, PencilLine } from "lucide-react";
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
      <main className="min-h-screen bg-[#FBFAF5] px-4 py-12">
        <div className="mx-auto flex max-w-5xl items-center justify-center rounded-3xl border border-gray-200 bg-white py-24 shadow-sm">
          <div className="text-center">
            <Loader2
              size={38}
              className="mx-auto animate-spin text-[#6B8E23]"
            />

            <p className="mt-4 text-gray-600">
              Loading your roommate profile...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="min-h-screen bg-[#FBFAF5] px-4 py-12">
        <section className="mx-auto max-w-3xl rounded-3xl border border-dashed border-[#D6C7A1] bg-white p-10 text-center shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">
            No Roommate Profile Found
          </h1>

          <p className="mt-3 text-gray-600">
            Create your roommate profile before trying to edit it.
          </p>

          <Link
            href="/roommates/profile/create"
            className="mt-7 inline-flex items-center justify-center rounded-xl bg-[#6B8E23] px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            Create Profile
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FBFAF5]">
      <section className="mx-auto max-w-5xl px-4 py-10 lg:px-8">
        <Link
          href="/roommates/profile"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#6B8E23] transition hover:opacity-75"
        >
          <ArrowLeft size={17} />
          Back to Profile
        </Link>

        <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#EEF2E4] text-[#6B8E23]">
              <PencilLine size={31} />
            </div>

            <div>
              <p className="font-semibold text-[#6B8E23]">
                Profile settings
              </p>

              <h1 className="mt-1 text-3xl font-bold text-gray-900 sm:text-4xl">
                Edit Your Roommate Profile
              </h1>

              <p className="mt-3 max-w-2xl leading-7 text-gray-600">
                Update your details and preferences to improve the
                accuracy of your AI roommate recommendations.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <RoommateProfileForm
            mode="edit"
            initialProfile={profile}
          />
        </div>
      </section>
    </main>
  );
}
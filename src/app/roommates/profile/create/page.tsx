import Link from "next/link";
import { ArrowLeft, Sparkles, UserRoundPlus } from "lucide-react";

import RoommateProfileForm from "@/components/roommates/RoommateProfileForm";

export default function CreateRoommateProfilePage() {
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

        <div className="mt-6 rounded-3xl bg-gradient-to-r from-[#6B8E23] to-[#87A93A] p-7 text-white shadow-lg sm:p-9">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15">
              <UserRoundPlus size={32} />
            </div>

            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-white/90">
                <Sparkles size={17} />
                AI-powered roommate matching
              </div>

              <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                Create Your Roommate Profile
              </h1>

              <p className="mt-3 max-w-2xl leading-7 text-white/90">
                Add your lifestyle, location, budget and roommate
                preferences to receive personalized compatibility matches.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <RoommateProfileForm mode="create" />
        </div>
      </section>
    </main>
  );
}
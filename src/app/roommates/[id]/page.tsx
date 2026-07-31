"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  ArrowLeft,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Heart,
  HeartHandshake,
  Home,
  Languages,
  Loader2,
  MapPin,
  MessageCircle,
  Sparkles,
  UserRound,
  Wallet,
} from "lucide-react";

import { toast } from "sonner";

import CompatibilityBadge from "@/components/roommates/CompatibilityBadge";

import {
  expressInterest,
  getRoommateById,
  toggleFavoriteRoommate,
} from "@/features/roommates/services/roommate.service";

import {
  formatBudget,
  formatLeaseDuration,
  formatMoveInDate,
  getProfileImage,
} from "@/features/roommates/utils/roommate.utils";

import type { RoommateProfile } from "@/types/roommates";

export default function RoommateDetailsPage() {
  const params = useParams<{ id: string }>();

  const roommateId = Number(params.id);

  const [roommate, setRoommate] =
    useState<RoommateProfile | null>(null);

  const [loading, setLoading] = useState(true);

  const [favoriteLoading, setFavoriteLoading] =
    useState(false);

  const [interestLoading, setInterestLoading] =
    useState(false);

  useEffect(() => {
    async function loadRoommate() {
      try {
        setLoading(true);

        if (
          Number.isNaN(roommateId) ||
          roommateId <= 0
        ) {
          throw new Error(
            "Invalid roommate profile ID."
          );
        }

        const data =
          await getRoommateById(roommateId);

        setRoommate(data);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Unable to load roommate profile.";

        toast.error(message);
      } finally {
        setLoading(false);
      }
    }

    loadRoommate();
  }, [roommateId]);

  async function handleFavorite() {
    if (!roommate) {
      return;
    }

    try {
      setFavoriteLoading(true);

      await toggleFavoriteRoommate(roommate.id);

      setRoommate((previous) =>
        previous
          ? {
              ...previous,
              is_favorite:
                !previous.is_favorite,
            }
          : previous
      );

      toast.success(
        roommate.is_favorite
          ? "Removed from favorites."
          : "Added to favorites."
      );
    } catch {
      toast.error(
        "Unable to update favorites."
      );
    } finally {
      setFavoriteLoading(false);
    }
  }

  async function handleInterest() {
    if (!roommate) {
      return;
    }

    try {
      setInterestLoading(true);

      await expressInterest(roommate.id);

      setRoommate((previous) => {
        if (!previous) {
          return previous;
        }

        const updatedProfile: RoommateProfile = {
          ...previous,
          interest_status:
            previous.interest_status === "pending"
              ? undefined
              : "pending",
        };

        return updatedProfile;
      });

      toast.success(
        roommate.interest_status === "pending"
          ? "Interest withdrawn."
          : "Interest sent successfully."
      );
    } catch {
      toast.error(
        "Unable to update interest."
      );
    } finally {
      setInterestLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#071512] px-4 py-12">
        <div className="mx-auto flex min-h-[520px] max-w-6xl items-center justify-center overflow-hidden rounded-[32px] border border-[#205C46]/35 bg-[#0D211B] shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
          <div className="relative text-center">
            <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4A34F]/10 blur-3xl" />

            <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border border-[#D4A34F]/25 bg-[#D4A34F]/10">
              <Loader2
                size={38}
                className="animate-spin text-[#F0C86A]"
              />
            </div>

            <h1 className="mt-6 text-xl font-bold text-[#FBFAF7]">
              Loading roommate profile
            </h1>

            <p className="mt-2 text-sm text-[#9EAEA7]">
              Finding the details of your potential match...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!roommate) {
    return (
      <main className="min-h-screen bg-[#071512] px-4 py-12">
        <section className="relative mx-auto max-w-3xl overflow-hidden rounded-[32px] border border-[#D4A34F]/20 bg-[#0D211B] p-8 text-center shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:p-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#D4A34F]/10 blur-3xl" />

          <div className="relative">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border border-[#D4A34F]/25 bg-[#D4A34F]/10">
              <UserRound
                size={34}
                className="text-[#F0C86A]"
              />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.24em] text-[#D4A34F]">
              Profile unavailable
            </p>

            <h1 className="mt-3 text-3xl font-bold text-[#FBFAF7] sm:text-4xl">
              Roommate Profile Not Found
            </h1>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-[#9EAEA7]">
              The profile may have been removed,
              or the link you followed may be incorrect.
            </p>

            <Link
              href="/roommates"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D4A34F] px-6 py-3.5 font-bold text-[#071512] shadow-[0_12px_30px_rgba(212,163,79,0.24)] transition hover:bg-[#F0C86A]"
            >
              <ArrowLeft size={18} />
              Browse Roommates
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const interestPending =
    roommate.interest_status === "pending";

  const interestAccepted =
    roommate.interest_status === "accepted";

  const sharedPreferences =
    roommate.shared_preferences ?? [];

  const preferenceTags = [
    roommate.food_preference,
    roommate.smoking,
    roommate.sleep_schedule,
    roommate.cleanliness,
    roommate.sharing_type,
  ];

  return (
    <main className="min-h-screen bg-[#071512]">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <Link
          href="/roommates"
          className="group inline-flex items-center gap-2 rounded-xl px-1 py-2 text-sm font-semibold text-[#D4A34F] transition hover:text-[#F0C86A]"
        >
          <ArrowLeft
            size={18}
            className="transition-transform group-hover:-translate-x-1"
          />

          Back to Roommates
        </Link>

        <section className="relative mt-5 overflow-hidden rounded-[32px] border border-[#205C46]/35 bg-[#0D211B] shadow-[0_28px_90px_rgba(0,0,0,0.32)]">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#D4A34F]/10 blur-3xl" />

          <div className="relative grid lg:grid-cols-[400px_1fr] xl:grid-cols-[440px_1fr]">
            <div className="relative min-h-[460px] overflow-hidden bg-[#10271F] lg:min-h-[690px]">
              <Image
                src={getProfileImage(roommate)}
                alt={`${roommate.name}'s roommate profile`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 440px"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071512] via-transparent to-[#071512]/10" />

              <div className="absolute left-5 top-5">
                <CompatibilityBadge
                  score={
                    roommate.compatibility ?? 0
                  }
                  size="lg"
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 lg:hidden">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#F0C86A]">
                  Roommate profile
                </p>

                <h1 className="mt-2 text-4xl font-bold text-[#FBFAF7]">
                  {roommate.name}
                </h1>

                <p className="mt-2 text-[#D6E0DB]">
                  {roommate.age} years •{" "}
                  {roommate.gender}
                </p>
              </div>
            </div>

            <div className="flex flex-col p-6 sm:p-8 lg:p-10">
              <div className="hidden lg:block">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#D4A34F]">
                  Roommate profile
                </p>

                <div className="mt-3 flex items-start justify-between gap-6">
                  <div>
                    <h1 className="text-4xl font-bold tracking-tight text-[#FBFAF7] xl:text-5xl">
                      {roommate.name}
                    </h1>

                    <p className="mt-3 text-[#9EAEA7]">
                      {roommate.age} years •{" "}
                      {roommate.gender}
                    </p>
                  </div>

                  <div className="min-w-[190px] rounded-[24px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 px-5 py-4">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9EAEA7]">
                      Monthly budget
                    </p>

                    <p className="mt-2 text-2xl font-bold text-[#F0C86A]">
                      {formatBudget(
                        roommate.budget
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-2 rounded-[24px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 p-5 lg:hidden">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9EAEA7]">
                  Monthly budget
                </p>

                <p className="mt-2 text-2xl font-bold text-[#F0C86A]">
                  {formatBudget(roommate.budget)}
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <HeaderDetail
                  icon={<Briefcase size={19} />}
                  label="Occupation"
                  value={roommate.occupation}
                />

                <HeaderDetail
                  icon={<Home size={19} />}
                  label="Company or college"
                  value={
                    roommate.company_or_college
                  }
                />

                <HeaderDetail
                  icon={<MapPin size={19} />}
                  label="Preferred locality"
                  value={`${roommate.preferred_locality}, ${roommate.city}`}
                />

                <HeaderDetail
                  icon={<CalendarDays size={19} />}
                  label="Move-in date"
                  value={formatMoveInDate(
                    roommate.move_in_date
                  )}
                />
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {preferenceTags.map((preference) => (
                  <span
                    key={preference}
                    className="rounded-full border border-[#205C46]/50 bg-[#10271F] px-3.5 py-2 text-xs font-semibold text-[#D6E0DB]"
                  >
                    {preference}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
                <button
                  type="button"
                  onClick={handleFavorite}
                  disabled={favoriteLoading}
                  className={[
                    "inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border px-5 py-3.5 font-bold transition-all duration-200",
                    roommate.is_favorite
                      ? "border-rose-400/30 bg-rose-400/10 text-rose-300 hover:bg-rose-400/15"
                      : "border-[#205C46]/50 bg-[#10271F] text-[#D6E0DB] hover:border-rose-400/30 hover:text-rose-300",
                    favoriteLoading
                      ? "cursor-not-allowed opacity-60"
                      : "",
                  ].join(" ")}
                >
                  {favoriteLoading ? (
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                  ) : (
                    <Heart
                      size={18}
                      fill={
                        roommate.is_favorite
                          ? "currentColor"
                          : "none"
                      }
                    />
                  )}

                  {roommate.is_favorite
                    ? "Saved"
                    : "Add to Favorites"}
                </button>

                <button
                  type="button"
                  onClick={handleInterest}
                  disabled={
                    interestLoading ||
                    interestAccepted
                  }
                  className={[
                    "inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-5 py-3.5 font-bold transition-all duration-200",
                    interestAccepted
                      ? "cursor-default border border-emerald-400/25 bg-emerald-400/10 text-emerald-300"
                      : interestPending
                        ? "border border-[#D4A34F]/35 bg-[#D4A34F]/10 text-[#F0C86A] hover:bg-[#D4A34F]/15"
                        : "bg-[#D4A34F] text-[#071512] shadow-[0_12px_30px_rgba(212,163,79,0.22)] hover:bg-[#F0C86A]",
                    interestLoading
                      ? "cursor-not-allowed opacity-60"
                      : "",
                  ].join(" ")}
                >
                  {interestLoading ? (
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                  ) : interestAccepted ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <MessageCircle size={18} />
                  )}

                  {interestLoading
                    ? "Updating..."
                    : interestAccepted
                      ? "Interest Accepted"
                      : interestPending
                        ? "Withdraw Interest"
                        : "Express Interest"}
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-6">
            <ContentSection>
              <SectionHeading
                eyebrow="About"
                title={`About ${roommate.name}`}
              />

              <p className="mt-5 whitespace-pre-line leading-8 text-[#B8C5BF]">
                {roommate.bio}
              </p>
            </ContentSection>

            <section className="relative overflow-hidden rounded-[30px] border border-[#D4A34F]/25 bg-[#12261F] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)] sm:p-8">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#D4A34F]/10 blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#D4A34F]/25 bg-[#D4A34F]/10">
                    <Sparkles
                      size={23}
                      className="text-[#F0C86A]"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4A34F]">
                      AI compatibility insight
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-[#FBFAF7] sm:text-2xl">
                      Why this could be a good match
                    </h2>
                  </div>
                </div>

                <p className="mt-6 leading-8 text-[#B8C5BF]">
                  {roommate.reason ??
                    "Your location, budget and lifestyle preferences show strong compatibility with this roommate."}
                </p>
              </div>
            </section>

            <ContentSection>
              <SectionHeading
                eyebrow="Compatibility"
                title="Lifestyle Preferences"
              />

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <PreferenceCard
                  title="Food preference"
                  value={
                    roommate.food_preference
                  }
                />

                <PreferenceCard
                  title="Smoking"
                  value={roommate.smoking}
                />

                <PreferenceCard
                  title="Drinking"
                  value={roommate.drinking}
                />

                <PreferenceCard
                  title="Pets"
                  value={roommate.pets}
                />

                <PreferenceCard
                  title="Sleep schedule"
                  value={
                    roommate.sleep_schedule
                  }
                />

                <PreferenceCard
                  title="Cleanliness"
                  value={roommate.cleanliness}
                />

                <PreferenceCard
                  title="Guests"
                  value={
                    roommate.guest_preference
                  }
                />

                <PreferenceCard
                  title="Work schedule"
                  value={
                    roommate.work_schedule
                  }
                />
              </div>
            </ContentSection>

            <ContentSection>
              <SectionHeading
                eyebrow="Common ground"
                title="Shared Preferences"
              />

              {sharedPreferences.length > 0 ? (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {sharedPreferences.map(
                    (preference) => (
                      <div
                        key={preference}
                        className="flex items-start gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-emerald-200"
                      >
                        <CheckCircle2
                          size={19}
                          className="mt-0.5 shrink-0"
                        />

                        <span className="font-semibold">
                          {preference}
                        </span>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="mt-5 rounded-2xl border border-[#205C46]/35 bg-[#10271F] p-5">
                  <p className="text-[#9EAEA7]">
                    Shared preference details are
                    not available yet.
                  </p>
                </div>
              )}
            </ContentSection>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <SidebarSection title="Housing Preferences">
              <SidebarDetail
                icon={<Wallet size={19} />}
                label="Budget"
                value={formatBudget(
                  roommate.budget
                )}
              />

              <SidebarDetail
                icon={
                  <HeartHandshake size={19} />
                }
                label="Sharing type"
                value={roommate.sharing_type}
              />

              <SidebarDetail
                icon={<UserRound size={19} />}
                label="Preferred gender"
                value={
                  roommate.preferred_gender
                }
              />

              <SidebarDetail
                icon={
                  <CalendarDays size={19} />
                }
                label="Move-in date"
                value={formatMoveInDate(
                  roommate.move_in_date
                )}
              />

              <SidebarDetail
                icon={<Clock3 size={19} />}
                label="Lease duration"
                value={formatLeaseDuration(
                  roommate.lease_duration
                )}
              />
            </SidebarSection>

            <SidebarSection title="Additional Information">
              <SidebarDetail
                icon={<Clock3 size={19} />}
                label="Wake-up time"
                value={roommate.wake_up_time}
              />

              <SidebarDetail
                icon={<Languages size={19} />}
                label="Languages"
                value={
                  roommate.languages.join(", ") ||
                  "Not provided"
                }
              />

              <SidebarDetail
                icon={<MapPin size={19} />}
                label="City"
                value={roommate.city}
              />
            </SidebarSection>

            <section className="relative overflow-hidden rounded-[28px] border border-[#D4A34F]/25 bg-[#D4A34F]/10 p-6">
              <div className="absolute -bottom-16 -right-16 h-44 w-44 rounded-full bg-[#D4A34F]/10 blur-3xl" />

              <div className="relative">
                <Sparkles
                  size={24}
                  className="text-[#F0C86A]"
                />

                <h3 className="mt-4 text-xl font-bold text-[#FBFAF7]">
                  Found a good match?
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#B8C5BF]">
                  Express your interest to start the
                  conversation and explore compatibility.
                </p>
              </div>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}

interface ContentSectionProps {
  children: React.ReactNode;
}

function ContentSection({
  children,
}: ContentSectionProps) {
  return (
    <section className="rounded-[30px] border border-[#205C46]/35 bg-[#0D211B] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)] sm:p-8">
      {children}
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
}

function SectionHeading({
  eyebrow,
  title,
}: SectionHeadingProps) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4A34F]">
        {eyebrow}
      </p>

      <h2 className="mt-2 text-2xl font-bold text-[#FBFAF7]">
        {title}
      </h2>
    </div>
  );
}

interface HeaderDetailProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function HeaderDetail({
  icon,
  label,
  value,
}: HeaderDetailProps) {
  return (
    <div className="group flex items-start gap-3 rounded-[22px] border border-[#205C46]/35 bg-[#10271F] p-4 transition hover:border-[#D4A34F]/25">
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#205C46]/25 text-[#F0C86A]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7F9189]">
          {label}
        </p>

        <p className="mt-1 break-words font-semibold text-[#FBFAF7]">
          {value}
        </p>
      </div>
    </div>
  );
}

interface PreferenceCardProps {
  title: string;
  value: string;
}

function PreferenceCard({
  title,
  value,
}: PreferenceCardProps) {
  return (
    <div className="rounded-[22px] border border-[#205C46]/30 bg-[#10271F] p-5 transition hover:border-[#D4A34F]/25">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7F9189]">
        {title}
      </p>

      <p className="mt-2 font-semibold text-[#FBFAF7]">
        {value}
      </p>
    </div>
  );
}

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
}

function SidebarSection({
  title,
  children,
}: SidebarSectionProps) {
  return (
    <section className="rounded-[28px] border border-[#205C46]/35 bg-[#0D211B] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-[#D4A34F]" />

        <h2 className="text-lg font-bold text-[#FBFAF7]">
          {title}
        </h2>
      </div>

      <div className="mt-6 space-y-4">
        {children}
      </div>
    </section>
  );
}

interface SidebarDetailProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function SidebarDetail({
  icon,
  label,
  value,
}: SidebarDetailProps) {
  return (
    <div className="flex items-start gap-3 border-b border-[#205C46]/25 pb-4 last:border-0 last:pb-0">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#D4A34F]/15 bg-[#D4A34F]/10 text-[#F0C86A]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7F9189]">
          {label}
        </p>

        <p className="mt-1 break-words font-semibold text-[#FBFAF7]">
          {value}
        </p>
      </div>
    </div>
  );
}
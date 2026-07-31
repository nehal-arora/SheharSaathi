"use client";

import {
  CheckCircle2,
  IndianRupee,
  MapPin,
  ShieldCheck,
  TrainFront,
  TriangleAlert,
  Sparkles,
} from "lucide-react";

import type { LocalityRecommendation } from "@/features/ai/types";

interface RecommendationCardProps {
  recommendation: LocalityRecommendation;
}

function formatCurrency(value?: number): string {
  if (
    typeof value !== "number" ||
    Number.isNaN(value)
  ) {
    return "Not available";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatScore(
  value: number | undefined,
  maximum: number
) {
  if (
    typeof value !== "number" ||
    Number.isNaN(value)
  ) {
    return "N/A";
  }

  return `${value}/${maximum}`;
}

export default function RecommendationCard({
  recommendation,
}: RecommendationCardProps) {
  const pros = recommendation.pros ?? [];
  const cons = recommendation.cons ?? [];
  const reasons =
    recommendation.reasons ?? [];
  const essentials =
    recommendation.nearby_essentials ??
    [];

  const metro =
    recommendation.nearest_metro ??
    recommendation.nearby_metro ??
    "Metro information unavailable";

  const commute =
    typeof recommendation.commute_minutes ===
    "number"
      ? `${recommendation.commute_minutes} mins`
      : recommendation.commute_summary ??
        "Unavailable";

  return (
    <article className="overflow-hidden rounded-[30px] border border-[#205C46]/40 bg-[#0D211B] shadow-2xl">

      {/* Header */}

      <div className="relative overflow-hidden border-b border-[#205C46]/40 bg-gradient-to-r from-[#0D211B] via-[#123126] to-[#0D211B] p-7">

        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#D4A34F]/10 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-6 lg:flex-row">

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A34F]/20 bg-[#D4A34F]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#F0C86A]">
              <Sparkles className="h-4 w-4" />
              AI Recommendation
            </div>

            <p className="mt-4 flex items-center gap-2 text-sm text-[#B8C5BF]">
              <MapPin className="h-4 w-4 text-[#D4A34F]" />
              {recommendation.city}
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              {recommendation.locality}
            </h2>

            {recommendation.match_score && (
              <p className="mt-3 text-[#9FB0A9]">
                {recommendation.match_score}% Compatibility Match
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-[#205C46]/40 bg-[#123126] p-6 text-center">
            <p className="text-xs uppercase tracking-wider text-[#8FA29B]">
              Average Rent
            </p>

            <p className="mt-2 text-2xl font-bold text-[#D4A34F]">
              {formatCurrency(
                recommendation.average_rent
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-7 p-7">

        {/* Scores */}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <ScoreCard
            icon={<ShieldCheck size={18} />}
            title="Safety"
            value={formatScore(
              recommendation.safety_score,
              10
            )}
          />

          <ScoreCard
            icon={<TrainFront size={18} />}
            title="Transport"
            value={formatScore(
              recommendation.transport_score,
              10
            )}
          />

          <ScoreCard
            icon={<IndianRupee size={18} />}
            title="Affordability"
            value={formatScore(
              recommendation.affordability_score,
              10
            )}
          />

          <ScoreCard
            icon={<MapPin size={18} />}
            title="Commute"
            value={commute}
          />

        </div>

        {/* Metro */}

        <div className="rounded-2xl border border-[#205C46]/40 bg-[#123126] p-5">

          <h3 className="font-semibold text-[#F0C86A]">
            Nearest Metro
          </h3>

          <p className="mt-2 text-[#B8C5BF] leading-7">
            {metro}

            {typeof recommendation.distance_to_metro_km ===
              "number" &&
              ` • ${recommendation.distance_to_metro_km} km away`}
          </p>
        </div>

        {/* Why */}

        {reasons.length > 0 && (
          <div>

            <h3 className="mb-4 text-xl font-bold text-white">
              Why AI recommends this locality
            </h3>

            <div className="grid gap-3 md:grid-cols-2">
              {reasons.map((reason, i) => (
                <div
                  key={i}
                  className="flex gap-3 rounded-2xl border border-[#205C46]/40 bg-[#123126] p-4"
                >
                  <CheckCircle2 className="mt-1 h-5 w-5 text-[#D4A34F]" />

                  <span className="text-[#B8C5BF]">
                    {reason}
                  </span>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* Pros Cons */}

        <div className="grid gap-6 lg:grid-cols-2">

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6">

            <h3 className="flex items-center gap-2 font-bold text-emerald-300">
              <CheckCircle2 />
              Advantages
            </h3>

            <ul className="mt-4 space-y-3">
              {pros.length ? (
                pros.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-[#CDE7DB]"
                  >
                    • {item}
                  </li>
                ))
              ) : (
                <li className="text-[#CDE7DB]">
                  No advantages available.
                </li>
              )}
            </ul>

          </div>

          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-6">

            <h3 className="flex items-center gap-2 font-bold text-amber-300">
              <TriangleAlert />
              Things to Consider
            </h3>

            <ul className="mt-4 space-y-3">
              {cons.length ? (
                cons.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-[#FFE7B3]"
                  >
                    • {item}
                  </li>
                ))
              ) : (
                <li className="text-[#FFE7B3]">
                  No concerns available.
                </li>
              )}
            </ul>

          </div>

        </div>

        {/* Essentials */}

        {essentials.length > 0 && (
          <div>

            <h3 className="mb-4 text-xl font-bold text-white">
              Nearby Essentials
            </h3>

            <div className="flex flex-wrap gap-3">
              {essentials.map(
                (item, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-[#205C46]/40 bg-[#123126] px-4 py-2 text-sm font-medium text-[#D4A34F]"
                  >
                    {item}
                  </span>
                )
              )}
            </div>

          </div>
        )}

      </div>
    </article>
  );
}

function ScoreCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[#205C46]/40 bg-[#123126] p-5">

      <div className="flex items-center gap-2 text-[#D4A34F]">
        {icon}

        <span className="text-sm font-semibold">
          {title}
        </span>
      </div>

      <p className="mt-4 text-2xl font-bold text-white">
        {value}
      </p>

    </div>
  );
}
import {
  CheckCircle2,
  IndianRupee,
  MapPin,
  ShieldCheck,
  TrainFront,
  TriangleAlert,
} from "lucide-react";

import type { LocalityRecommendation } from "@/features/ai/types";

interface RecommendationCardProps {
  recommendation: LocalityRecommendation;
}

function formatCurrency(value?: number): string {
  if (typeof value !== "number" || Number.isNaN(value)) {
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
): string {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "Not available";
  }

  return `${value}/${maximum}`;
}

export default function RecommendationCard({
  recommendation,
}: RecommendationCardProps) {
  const pros = Array.isArray(recommendation.pros)
    ? recommendation.pros
    : [];

  const cons = Array.isArray(recommendation.cons)
    ? recommendation.cons
    : [];

  const reasons = Array.isArray(recommendation.reasons)
    ? recommendation.reasons
    : [];

  const nearbyEssentials = Array.isArray(
    recommendation.nearby_essentials
  )
    ? recommendation.nearby_essentials
    : [];

  const metroName =
    recommendation.nearest_metro ??
    recommendation.nearby_metro ??
    "Metro information unavailable";

  const commuteText =
    typeof recommendation.commute_minutes === "number"
      ? `${recommendation.commute_minutes} minutes`
      : recommendation.commute_summary ??
        "Commute information unavailable";

  return (
    <article className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 bg-[#FBFAF5] p-6">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-[#6B8E23]">
              <MapPin className="h-4 w-4" />
              {recommendation.city || "City unavailable"}
            </div>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              {recommendation.locality || "Locality unavailable"}
            </h2>

            {typeof recommendation.match_score === "number" && (
              <p className="mt-2 text-sm text-gray-500">
                {recommendation.match_score}% match for your preferences
              </p>
            )}
          </div>

          <div className="rounded-2xl bg-[#EEF2E4] px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Average monthly rent
            </p>

            <p className="mt-1 text-xl font-bold text-[#6B8E23]">
              {formatCurrency(recommendation.average_rent)}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <ShieldCheck className="h-4 w-4 text-[#6B8E23]" />
              Safety
            </div>

            <p className="mt-2 text-lg font-semibold text-gray-900">
              {formatScore(recommendation.safety_score, 10)}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <TrainFront className="h-4 w-4 text-[#6B8E23]" />
              Transport
            </div>

            <p className="mt-2 text-lg font-semibold text-gray-900">
              {formatScore(recommendation.transport_score, 10)}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <IndianRupee className="h-4 w-4 text-[#6B8E23]" />
              Affordability
            </div>

            <p className="mt-2 text-lg font-semibold text-gray-900">
              {formatScore(
                recommendation.affordability_score,
                10
              )}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <MapPin className="h-4 w-4 text-[#6B8E23]" />
              Commute
            </div>

            <p className="mt-2 text-sm font-semibold text-gray-900">
              {commuteText}
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-[#D6C7A1] bg-[#FBFAF5] p-5">
          <div className="flex items-start gap-3">
            <TrainFront className="mt-0.5 h-5 w-5 shrink-0 text-[#6B8E23]" />

            <div>
              <h3 className="font-semibold text-gray-900">
                Nearby metro
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-600">
                {metroName}

                {typeof recommendation.distance_to_metro_km ===
                  "number" &&
                  ` • ${recommendation.distance_to_metro_km} km away`}
              </p>
            </div>
          </div>
        </div>

        {reasons.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold text-gray-900">
              Why this locality matches
            </h3>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {reasons.map((reason, index) => (
                <div
                  key={`${reason}-${index}`}
                  className="flex items-start gap-2 rounded-xl bg-[#EEF2E4] px-4 py-3 text-sm text-gray-700"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#6B8E23]" />

                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-green-100 bg-green-50 p-5">
            <h3 className="flex items-center gap-2 font-semibold text-green-800">
              <CheckCircle2 className="h-5 w-5" />
              Advantages
            </h3>

            {pros.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {pros.map((pro, index) => (
                  <li
                    key={`${pro}-${index}`}
                    className="flex items-start gap-2 text-sm leading-6 text-green-700"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-green-700">
                No specific advantages were returned.
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
            <h3 className="flex items-center gap-2 font-semibold text-amber-800">
              <TriangleAlert className="h-5 w-5" />
              Things to consider
            </h3>

            {cons.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {cons.map((con, index) => (
                  <li
                    key={`${con}-${index}`}
                    className="flex items-start gap-2 text-sm leading-6 text-amber-700"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-amber-700">
                No major concerns were returned.
              </p>
            )}
          </div>
        </div>

        {nearbyEssentials.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold text-gray-900">
              Nearby essentials
            </h3>

            <div className="mt-3 flex flex-wrap gap-2">
              {nearbyEssentials.map((essential, index) => (
                <span
                  key={`${essential}-${index}`}
                  className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700"
                >
                  {essential}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
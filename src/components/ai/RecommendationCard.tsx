import {
  BadgeIndianRupee,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Train,
  XCircle,
} from "lucide-react";

import type { LocalityRecommendation } from "@/features/ai/types";

interface RecommendationCardProps {
  recommendation: LocalityRecommendation;
}

export default function RecommendationCard({
  recommendation,
}: RecommendationCardProps) {
  return (
    <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-[#6B8E23]">
            <MapPin className="h-4 w-4" />
            {recommendation.city}
          </div>

          <h3 className="mt-2 text-2xl font-semibold text-gray-900">
            {recommendation.locality}
          </h3>

          <p className="mt-2 max-w-xl text-sm leading-6 text-gray-600">
            {recommendation.commute_summary}
          </p>
        </div>

        <div className="rounded-2xl bg-[#EEF2E4] px-4 py-3 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Safety score
          </p>

          <p className="mt-1 text-2xl font-bold text-[#6B8E23]">
            {recommendation.safety_score}/100
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-[#FBFAF5] p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <BadgeIndianRupee className="h-4 w-4 text-[#6B8E23]" />
            Average rent
          </div>

          <p className="mt-2 text-xl font-bold text-gray-900">
            ₹{recommendation.average_rent.toLocaleString("en-IN")}
            <span className="ml-1 text-sm font-normal text-gray-500">
              /month
            </span>
          </p>
        </div>

        <div className="rounded-2xl bg-[#FBFAF5] p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <Train className="h-4 w-4 text-[#6B8E23]" />
            Nearby metro
          </div>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            {recommendation.nearby_metro}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div>
          <h4 className="flex items-center gap-2 font-semibold text-gray-900">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            Pros
          </h4>

          <ul className="mt-3 space-y-2">
            {recommendation.pros.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm leading-6 text-gray-600"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="flex items-center gap-2 font-semibold text-gray-900">
            <XCircle className="h-5 w-5 text-amber-600" />
            Cons
          </h4>

          <ul className="mt-3 space-y-2">
            {recommendation.cons.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm leading-6 text-gray-600"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-100 pt-5">
        <h4 className="flex items-center gap-2 font-semibold text-gray-900">
          <ShieldCheck className="h-5 w-5 text-[#6B8E23]" />
          Nearby essentials
        </h4>

        <div className="mt-3 flex flex-wrap gap-2">
          {recommendation.nearby_essentials.map((item) => (
            <span
              key={item}
              className="rounded-full bg-[#EEF2E4] px-3 py-1.5 text-xs font-medium text-[#58751d]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
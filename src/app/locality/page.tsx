"use client";

import { useState } from "react";
import {
  BriefcaseBusiness,
  IndianRupee,
  MapPinned,
  TrainFront,
} from "lucide-react";
import { toast } from "sonner";

import AIErrorState from "@/components/ai/AIErrorState";
import AIHeader from "@/components/ai/AIHeader";
import AILoadingState from "@/components/ai/AILoadingState";
import RecommendationCard from "@/components/ai/RecommendationCard";

import { getLocalityRecommendations } from "@/features/ai/services/ai.service";

import type {
  LocalityRecommendation,
  LocalityRecommendationRequest,
} from "@/features/ai/types";

const initialForm: LocalityRecommendationRequest = {
  city: "",
  budget: 15000,
  occupation: "",
  transport: "",
};

export default function LocalityPage() {
  const [form, setForm] =
    useState<LocalityRecommendationRequest>(initialForm);

  const [recommendations, setRecommendations] = useState<
    LocalityRecommendation[]
  >([]);

  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField(
    field: keyof LocalityRecommendationRequest,
    value: string | number
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function loadRecommendations() {
    const response = await getLocalityRecommendations(form);

    const receivedRecommendations = Array.isArray(
      response.recommendations
    )
      ? response.recommendations
      : [];

    setRecommendations(receivedRecommendations);
    setSummary(response.summary ?? "");

    if (receivedRecommendations.length === 0) {
      toast.info(
        "No suitable localities were found for the selected preferences."
      );
    }
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      await loadRecommendations();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to generate locality recommendations.";

      setError(message);
      setSummary("");
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleRetry() {
    try {
      setLoading(true);
      setError("");

      await loadRecommendations();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to generate locality recommendations."
      );

      setSummary("");
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FBFAF5]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AIHeader
          badge="AI Locality Recommender"
          title="Find localities that match your lifestyle"
          description="Tell शहरSaathi about your city, monthly rent budget, occupation, and preferred transport. The AI will suggest suitable localities with rent, safety, commute, and nearby essentials."
          icon={<MapPinned className="h-7 w-7" />}
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-[380px_1fr]">
          <section className="h-fit rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Your locality preferences
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Provide the details below to receive personalised locality
                recommendations.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-5"
            >
              <div>
                <label
                  htmlFor="city"
                  className="text-sm font-medium text-gray-700"
                >
                  Preferred city
                </label>

                <div className="relative mt-2">
                  <MapPinned className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gray-400" />

                  <input
                    id="city"
                    type="text"
                    value={form.city}
                    onChange={(event) =>
                      updateField("city", event.target.value)
                    }
                    placeholder="For example, Delhi"
                    className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-[#6B8E23] focus:ring-2 focus:ring-[#EEF2E4]"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="budget"
                  className="text-sm font-medium text-gray-700"
                >
                  Monthly rent budget
                </label>

                <div className="relative mt-2">
                  <IndianRupee className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gray-400" />

                  <input
                    id="budget"
                    type="number"
                    min={1000}
                    value={form.budget}
                    onChange={(event) =>
                      updateField(
                        "budget",
                        Number(event.target.value)
                      )
                    }
                    className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-[#6B8E23] focus:ring-2 focus:ring-[#EEF2E4]"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="occupation"
                  className="text-sm font-medium text-gray-700"
                >
                  Occupation
                </label>

                <div className="relative mt-2">
                  <BriefcaseBusiness className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gray-400" />

                  <input
                    id="occupation"
                    type="text"
                    value={form.occupation}
                    onChange={(event) =>
                      updateField(
                        "occupation",
                        event.target.value
                      )
                    }
                    placeholder="Student, software engineer, etc."
                    className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-[#6B8E23] focus:ring-2 focus:ring-[#EEF2E4]"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="transport"
                  className="text-sm font-medium text-gray-700"
                >
                  Preferred transport
                </label>

                <div className="relative mt-2">
                  <TrainFront className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gray-400" />

                  <select
                    id="transport"
                    value={form.transport}
                    onChange={(event) =>
                      updateField(
                        "transport",
                        event.target.value
                      )
                    }
                    className="h-11 w-full appearance-none rounded-xl border border-gray-200 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-[#6B8E23] focus:ring-2 focus:ring-[#EEF2E4]"
                    required
                  >
                    <option value="">
                      Select transport preference
                    </option>
                    <option value="Metro">Metro</option>
                    <option value="Bus">Bus</option>
                    <option value="Personal Vehicle">
                      Personal vehicle
                    </option>
                    <option value="Walking and Cycling">
                      Walking and cycling
                    </option>
                    <option value="Any">Any</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#6B8E23] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#58751d] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <MapPinned className="h-4 w-4" />

                {loading
                  ? "Finding localities..."
                  : "Get recommendations"}
              </button>
            </form>
          </section>

          <section>
            {loading ? (
              <AILoadingState
                title="Finding suitable localities"
                description="शहरSaathi is comparing rent, transport, safety, and nearby essentials based on your preferences."
              />
            ) : error ? (
              <AIErrorState
                title="Unable to recommend localities"
                message={error}
                onRetry={handleRetry}
                retrying={loading}
              />
            ) : recommendations.length > 0 ? (
              <div className="space-y-5">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Recommended localities
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {summary ||
                      "These suggestions are based on your current preferences."}
                  </p>
                </div>

                {recommendations.map(
                  (recommendation, index) => (
                    <RecommendationCard
                      key={`${recommendation.id}-${index}`}
                      recommendation={recommendation}
                    />
                  )
                )}
              </div>
            ) : (
              <div className="flex min-h-[430px] flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EEF2E4] text-[#6B8E23]">
                  <MapPinned className="h-7 w-7" />
                </div>

                <h2 className="mt-5 text-xl font-semibold text-gray-900">
                  Your recommendations will appear here
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                  Fill in your city, rent budget, occupation, and
                  transport preference to discover suitable localities.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
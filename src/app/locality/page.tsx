"use client";

import { useState } from "react";
import {
  BriefcaseBusiness,
  IndianRupee,
  MapPinned,
  Sparkles,
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
    <main className="min-h-screen bg-[#071512]">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <AIHeader
          badge="AI Locality Recommender"
          title="Find localities that match your lifestyle"
          description="Tell शहरSaathi about your city, monthly rent budget, occupation, and preferred transport. The AI will suggest suitable localities with rent, safety, commute, and nearby essentials."
          icon={<MapPinned className="h-7 w-7" />}
        />

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[400px_minmax(0,1fr)]">
          <section className="relative overflow-hidden rounded-[30px] border border-[#205C46]/40 bg-[#0D211B] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)] lg:sticky lg:top-6">
            <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#D4A34F]/8 blur-3xl" />

            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
                  <MapPinned className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4A34F]">
                    Locality Preferences
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-[#FBFAF7]">
                    Tell Us What You Need
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#9EAEA7]">
                    Add your location, budget, occupation and transport
                    preference.
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-7 space-y-5"
              >
                <FormField
                  id="city"
                  label="Preferred city"
                  icon={<MapPinned className="h-4 w-4" />}
                >
                  <input
                    id="city"
                    type="text"
                    value={form.city}
                    onChange={(event) =>
                      updateField("city", event.target.value)
                    }
                    placeholder="For example, Delhi"
                    className={inputClasses}
                    required
                  />
                </FormField>

                <FormField
                  id="budget"
                  label="Monthly rent budget"
                  icon={<IndianRupee className="h-4 w-4" />}
                >
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
                    className={inputClasses}
                    required
                  />
                </FormField>

                <FormField
                  id="occupation"
                  label="Occupation"
                  icon={
                    <BriefcaseBusiness className="h-4 w-4" />
                  }
                >
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
                    className={inputClasses}
                    required
                  />
                </FormField>

                <FormField
                  id="transport"
                  label="Preferred transport"
                  icon={<TrainFront className="h-4 w-4" />}
                >
                  <select
                    id="transport"
                    value={form.transport}
                    onChange={(event) =>
                      updateField(
                        "transport",
                        event.target.value
                      )
                    }
                    className={selectClasses}
                    required
                  >
                    <option value="">
                      Select transport preference
                    </option>

                    <option value="Metro">
                      Metro
                    </option>

                    <option value="Bus">
                      Bus
                    </option>

                    <option value="Personal Vehicle">
                      Personal vehicle
                    </option>

                    <option value="Walking and Cycling">
                      Walking and cycling
                    </option>

                    <option value="Any">
                      Any
                    </option>
                  </select>
                </FormField>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#D4A34F] px-5 font-bold text-[#071512] shadow-[0_12px_30px_rgba(212,163,79,0.22)] transition hover:bg-[#F0C86A] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <MapPinned className="h-4 w-4" />

                  {loading
                    ? "Finding localities..."
                    : "Get Recommendations"}
                </button>
              </form>
            </div>
          </section>

          <section className="min-w-0">
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
              <div className="space-y-6">
                <section className="relative overflow-hidden rounded-[26px] border border-[#205C46]/35 bg-[#0D211B] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
                  <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#D4A34F]/8 blur-3xl" />

                  <div className="relative">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A34F]/20 bg-[#D4A34F]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#F0C86A]">
                      <Sparkles className="h-4 w-4" />
                      AI Results
                    </div>

                    <h2 className="mt-4 text-3xl font-bold text-[#FBFAF7]">
                      Recommended Localities
                    </h2>

                    <p className="mt-3 max-w-3xl text-sm leading-7 text-[#9EAEA7]">
                      {summary ||
                        "These suggestions are based on your current preferences."}
                    </p>

                    <div className="mt-5 inline-flex rounded-full border border-[#205C46]/40 bg-[#10271F] px-4 py-2 text-sm font-semibold text-[#D6E0DB]">
                      {recommendations.length}{" "}
                      {recommendations.length === 1
                        ? "match found"
                        : "matches found"}
                    </div>
                  </div>
                </section>

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
              <section className="relative flex min-h-[500px] flex-col items-center justify-center overflow-hidden rounded-[30px] border border-dashed border-[#D4A34F]/25 bg-[#0D211B] px-6 py-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
                <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4A34F]/5 blur-3xl" />

                <div className="relative flex flex-col items-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-[28px] border border-[#D4A34F]/25 bg-[#D4A34F]/10 text-[#F0C86A]">
                    <MapPinned className="h-10 w-10" />
                  </div>

                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#D4A34F]">
                    AI Locality Discovery
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-[#FBFAF7]">
                    Your Recommendations Will Appear Here
                  </h2>

                  <p className="mt-4 max-w-lg text-sm leading-7 text-[#9EAEA7] sm:text-base">
                    Fill in your city, rent budget, occupation and
                    transport preference to discover suitable
                    localities.
                  </p>

                  <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#205C46]/40 bg-[#10271F] px-4 py-2 text-sm font-semibold text-[#D6E0DB]">
                    <Sparkles className="h-4 w-4 text-[#F0C86A]" />
                    Smart locality matching
                  </div>
                </div>
              </section>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}

const inputClasses =
  "h-12 w-full rounded-[18px] border border-[#205C46]/40 bg-[#10271F] pl-11 pr-4 text-sm text-[#FBFAF7] outline-none transition placeholder:text-[#6F8179] hover:border-[#205C46]/70 focus:border-[#D4A34F] focus:ring-4 focus:ring-[#D4A34F]/10";

const selectClasses =
  "h-12 w-full appearance-none rounded-[18px] border border-[#205C46]/40 bg-[#10271F] pl-11 pr-4 text-sm text-[#FBFAF7] outline-none transition hover:border-[#205C46]/70 focus:border-[#D4A34F] focus:ring-4 focus:ring-[#D4A34F]/10";

interface FormFieldProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function FormField({
  id,
  label,
  icon,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-[#D6E0DB]"
      >
        {label}
      </label>

      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#F0C86A]">
          {icon}
        </span>

        {children}
      </div>
    </div>
  );
}
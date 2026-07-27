"use client";

import { useState } from "react";
import { ShieldAlert } from "lucide-react";

import AIErrorState from "@/components/ai/AIErrorState";
import AIHeader from "@/components/ai/AIHeader";
import AILoadingState from "@/components/ai/AILoadingState";
import AIResultCard from "@/components/ai/AIResultCard";
import RiskMeter from "@/components/ai/RiskMeter";

import { checkScam } from "@/features/ai/services/ai.service";

import type {
  ScamCheckRequest,
  ScamCheckResponse,
} from "@/features/ai/types";

export default function ScamCheckPage() {
  const [form, setForm] = useState<ScamCheckRequest>({
    content: "",
  });

  const [result, setResult] =
    useState<ScamCheckResponse | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await checkScam(form);

      setResult(response);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to analyze content."
      );
    } finally {
      setLoading(false);
    }
  }

  async function retry() {
    try {
      setLoading(true);
      setError("");

      const response = await checkScam(form);

      setResult(response);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to analyze content."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FBFAF5]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <AIHeader
          badge="Rental Scam Checker"
          title="Detect suspicious rental listings"
          description="Paste property descriptions, WhatsApp chats, emails or payment requests. AI will estimate the scam risk and explain why."
          icon={<ShieldAlert className="h-7 w-7" />}
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-[380px_1fr]">
          <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
              Analyze Content
            </h2>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-5"
            >
              <textarea
                rows={12}
                value={form.content}
                onChange={(e) =>
                  setForm({
                    content: e.target.value,
                  })
                }
                placeholder="Paste rental listing, owner chat, payment request or advertisement..."
                className="w-full rounded-2xl border border-gray-200 p-4 text-sm outline-none focus:border-[#6B8E23]"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#6B8E23] py-3 font-semibold text-white hover:bg-[#58751d]"
              >
                {loading
                  ? "Analyzing..."
                  : "Check Scam Risk"}
              </button>
            </form>
          </section>

          <section>
            {loading ? (
              <AILoadingState
                title="Analyzing rental details"
                description="AI is checking for suspicious patterns and fraud indicators."
              />
            ) : error ? (
              <AIErrorState
                title="Analysis failed"
                message={error}
                onRetry={retry}
                retrying={loading}
              />
            ) : result ? (
              <AIResultCard
                title="Scam Analysis"
                description="Review the risk assessment before making any payment."
                icon={<ShieldAlert className="h-5 w-5" />}
              >
                <RiskMeter
                  risk={result.risk}
                  score={result.score}
                />

                <div className="mt-8">
                  <h3 className="font-semibold text-lg">
                    Why this risk was assigned
                  </h3>

                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-600">
                    {result.reasons.map((reason) => (
                      <li key={reason}>{reason}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <h3 className="font-semibold text-lg">
                    Safety Tips
                  </h3>

                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-600">
                    {result.safety_tips.map((tip) => (
                      <li key={tip}>{tip}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 rounded-2xl bg-[#EEF2E4] p-4">
                  <h3 className="font-semibold">
                    AI Summary
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-700">
                    {result.summary}
                  </p>
                </div>
              </AIResultCard>
            ) : (
              <div className="flex min-h-[450px] items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white text-center">
                <div>
                  <ShieldAlert className="mx-auto h-14 w-14 text-[#6B8E23]" />

                  <h2 className="mt-4 text-xl font-semibold">
                    No analysis yet
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Paste any rental conversation or listing to
                    receive an AI scam assessment.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
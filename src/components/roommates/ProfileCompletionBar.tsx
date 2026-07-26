import { CheckCircle2, CircleAlert } from "lucide-react";

interface ProfileCompletionBarProps {
  percentage: number;
  missingFields?: string[];
}

export default function ProfileCompletionBar({
  percentage,
  missingFields = [],
}: ProfileCompletionBarProps) {
  const safePercentage = Math.min(
    100,
    Math.max(0, Math.round(percentage))
  );

  const isComplete = safePercentage === 100;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            {isComplete ? (
              <CheckCircle2
                size={20}
                className="text-green-600"
              />
            ) : (
              <CircleAlert
                size={20}
                className="text-[#6B8E23]"
              />
            )}

            <h2 className="font-semibold text-gray-900">
              Profile Completion
            </h2>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            {isComplete
              ? "Your roommate profile is complete."
              : "Complete your profile to improve your recommendations."}
          </p>
        </div>

        <div className="text-2xl font-bold text-[#6B8E23]">
          {safePercentage}%
        </div>
      </div>

      <div
        className="mt-4 h-3 overflow-hidden rounded-full bg-gray-100"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safePercentage}
        aria-label="Roommate profile completion"
      >
        <div
          className="h-full rounded-full bg-[#6B8E23] transition-all duration-500"
          style={{
            width: `${safePercentage}%`,
          }}
        />
      </div>

      {!isComplete && missingFields.length > 0 && (
        <div className="mt-4 rounded-xl bg-[#FBFAF5] p-4">
          <p className="text-sm font-semibold text-gray-800">
            Missing information
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {missingFields.slice(0, 6).map((field) => (
              <span
                key={field}
                className="rounded-full border border-[#D6C7A1] bg-white px-3 py-1 text-xs text-gray-700"
              >
                {field}
              </span>
            ))}
          </div>

          {missingFields.length > 6 && (
            <p className="mt-3 text-xs text-gray-500">
              +{missingFields.length - 6} more fields
            </p>
          )}
        </div>
      )}
    </section>
  );
}
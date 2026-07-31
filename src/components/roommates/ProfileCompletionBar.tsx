import {
  CheckCircle2,
  CircleAlert,
  Sparkles,
} from "lucide-react";

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
    <section className="relative overflow-hidden rounded-[28px] border border-[#205C46]/40 bg-[#0D211B] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#D4A34F]/10 blur-3xl" />

      <div className="relative">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                  isComplete
                    ? "border-[#4C8C68]/40 bg-[#205C46]/25 text-[#A8E6BD]"
                    : "border-[#D4A34F]/35 bg-[#D4A34F]/12 text-[#F0C86A]"
                }`}
              >
                {isComplete ? (
                  <CheckCircle2 size={20} />
                ) : (
                  <CircleAlert size={20} />
                )}
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9EAEA7]">
                  Roommate Profile
                </p>

                <h2 className="mt-1 text-lg font-bold text-[#FBFAF7]">
                  Profile Completion
                </h2>
              </div>
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#AEBDB6]">
              {isComplete
                ? "Your roommate profile is complete and ready for better matches."
                : "Complete your profile to improve recommendation quality and compatibility scores."}
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-[#D4A34F]/25 bg-[#D4A34F]/10 px-5 py-3">
            <Sparkles
              size={18}
              className="text-[#F0C86A]"
            />

            <span className="text-2xl font-bold text-[#F0C86A]">
              {safePercentage}%
            </span>
          </div>
        </div>

        <div
          className="mt-6 h-3 overflow-hidden rounded-full border border-[#205C46]/30 bg-[#071512]"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={safePercentage}
          aria-label="Roommate profile completion"
        >
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isComplete
                ? "bg-gradient-to-r from-[#205C46] to-[#4C8C68]"
                : "bg-gradient-to-r from-[#B27B2D] via-[#D4A34F] to-[#F0C86A]"
            }`}
            style={{
              width: `${safePercentage}%`,
            }}
          />
        </div>

        {!isComplete && missingFields.length > 0 && (
          <div className="mt-6 rounded-2xl border border-[#205C46]/35 bg-[#10271F] p-5">
            <p className="text-sm font-semibold text-[#FBFAF7]">
              Missing information
            </p>

            <p className="mt-1 text-xs text-[#9EAEA7]">
              Add these details to strengthen your profile.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {missingFields.slice(0, 6).map((field) => (
                <span
                  key={field}
                  className="rounded-full border border-[#D4A34F]/25 bg-[#D4A34F]/8 px-3 py-1.5 text-xs font-medium text-[#E7D4A3]"
                >
                  {field}
                </span>
              ))}
            </div>

            {missingFields.length > 6 && (
              <p className="mt-4 text-xs text-[#9EAEA7]">
                +{missingFields.length - 6} more fields
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
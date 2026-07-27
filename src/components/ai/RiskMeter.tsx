import type { ScamRiskLevel } from "@/features/ai/types";

interface RiskMeterProps {
  risk: ScamRiskLevel;
  score: number;
}

function getRiskStyles(risk: ScamRiskLevel) {
  if (risk === "High") {
    return {
      label: "High risk",
      text: "text-red-700",
      background: "bg-red-100",
      bar: "bg-red-500",
    };
  }

  if (risk === "Medium") {
    return {
      label: "Medium risk",
      text: "text-amber-700",
      background: "bg-amber-100",
      bar: "bg-amber-500",
    };
  }

  return {
    label: "Low risk",
    text: "text-green-700",
    background: "bg-green-100",
    bar: "bg-green-500",
  };
}

export default function RiskMeter({
  risk,
  score,
}: RiskMeterProps) {
  const safeScore = Math.min(Math.max(score, 0), 100);
  const styles = getRiskStyles(risk);

  return (
    <div className="rounded-2xl border border-gray-200 bg-[#FBFAF5] p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">
            Scam risk assessment
          </p>

          <p className={`mt-1 text-2xl font-bold ${styles.text}`}>
            {styles.label}
          </p>
        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-full ${styles.background}`}
        >
          <span className={`text-lg font-bold ${styles.text}`}>
            {safeScore}%
          </span>
        </div>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full rounded-full transition-all duration-500 ${styles.bar}`}
          style={{
            width: `${safeScore}%`,
          }}
        />
      </div>

      <div className="mt-3 flex justify-between text-xs font-medium text-gray-400">
        <span>Low</span>
        <span>Medium</span>
        <span>High</span>
      </div>
    </div>
  );
}
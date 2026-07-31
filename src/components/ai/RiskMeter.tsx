import {
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";

import type { ScamRiskLevel } from "@/features/ai/types";

interface RiskMeterProps {
  risk: ScamRiskLevel;
  score: number;
}

function getRiskStyles(risk: ScamRiskLevel) {
  if (risk === "High") {
    return {
      label: "High Risk",
      eyebrow: "Immediate caution recommended",
      text: "text-red-300",
      border: "border-red-400/25",
      background: "bg-red-400/10",
      iconBackground: "bg-red-400/10",
      icon: ShieldAlert,
      bar: "bg-gradient-to-r from-red-600 to-red-400",
      glow: "bg-red-400/10",
    };
  }

  if (risk === "Medium") {
    return {
      label: "Medium Risk",
      eyebrow: "Verify the offer carefully",
      text: "text-amber-300",
      border: "border-amber-400/25",
      background: "bg-amber-400/10",
      iconBackground: "bg-amber-400/10",
      icon: AlertTriangle,
      bar: "bg-gradient-to-r from-amber-500 to-[#F0C86A]",
      glow: "bg-amber-400/10",
    };
  }

  return {
    label: "Low Risk",
    eyebrow: "No major warning signs detected",
    text: "text-emerald-300",
    border: "border-emerald-400/25",
    background: "bg-emerald-400/10",
    iconBackground: "bg-emerald-400/10",
    icon: CheckCircle2,
    bar: "bg-gradient-to-r from-emerald-500 to-emerald-300",
    glow: "bg-emerald-400/10",
  };
}

export default function RiskMeter({
  risk,
  score,
}: RiskMeterProps) {
  const safeScore = Math.min(
    Math.max(score, 0),
    100
  );

  const styles = getRiskStyles(risk);
  const StatusIcon = styles.icon;

  return (
    <section
      className={`relative overflow-hidden rounded-[28px] border bg-[#0D211B] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)] ${styles.border}`}
    >
      <div
        className={`absolute -right-16 -top-16 h-52 w-52 rounded-full blur-3xl ${styles.glow}`}
      />

      <div className="relative">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] border ${styles.border} ${styles.iconBackground} ${styles.text}`}
            >
              <StatusIcon size={26} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7F9189]">
                Scam Risk Assessment
              </p>

              <h2
                className={`mt-2 text-3xl font-bold ${styles.text}`}
              >
                {styles.label}
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#9EAEA7]">
                {styles.eyebrow}
              </p>
            </div>
          </div>

          <div
            className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-full border ${styles.border} ${styles.background}`}
          >
            <div className="text-center">
              <p
                className={`text-2xl font-bold ${styles.text}`}
              >
                {safeScore}%
              </p>

              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#9EAEA7]">
                Risk Score
              </p>
            </div>
          </div>
        </div>

        <div className="mt-7 rounded-[22px] border border-[#205C46]/30 bg-[#10271F] p-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-[#D6E0DB]">
              Risk intensity
            </p>

            <p className={`text-sm font-bold ${styles.text}`}>
              {safeScore} out of 100
            </p>
          </div>

          <div
            className="h-3 overflow-hidden rounded-full bg-[#071512]"
            role="progressbar"
            aria-label="Scam risk score"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={safeScore}
          >
            <div
              className={`h-full rounded-full transition-all duration-700 ${styles.bar}`}
              style={{
                width: `${safeScore}%`,
              }}
            />
          </div>

          <div className="mt-3 flex justify-between text-[11px] font-bold uppercase tracking-[0.12em] text-[#6F8179]">
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
          </div>
        </div>
      </div>
    </section>
  );
}
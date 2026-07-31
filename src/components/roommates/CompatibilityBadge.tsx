import { Sparkles } from "lucide-react";

import {
  getCompatibilityLabel,
  getCompatibilityStyles,
} from "@/features/roommates/utils/roommate.utils";

interface CompatibilityBadgeProps {
  score: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function CompatibilityBadge({
  score,
  showLabel = true,
  size = "md",
  className = "",
}: CompatibilityBadgeProps) {
  const safeScore = Math.min(
    100,
    Math.max(0, Math.round(score))
  );

  const label = getCompatibilityLabel(safeScore);

  const sizeClasses = {
    sm: {
      wrapper: "px-2.5 py-1 text-[11px]",
      icon: 12,
    },
    md: {
      wrapper: "px-3.5 py-1.5 text-xs",
      icon: 14,
    },
    lg: {
      wrapper: "px-4 py-2 text-sm",
      icon: 16,
    },
  };

  let ring =
    "border-[#205C46]/50 bg-[#10271F]/90 text-[#D6E0DB]";

  if (safeScore >= 85) {
    ring =
      "border-[#D4A34F]/50 bg-[#D4A34F]/15 text-[#F0C86A]";
  } else if (safeScore >= 70) {
    ring =
      "border-[#4C8C68]/50 bg-[#205C46]/20 text-[#D8F2E2]";
  } else if (safeScore >= 50) {
    ring =
      "border-[#9A7A42]/45 bg-[#9A7A42]/15 text-[#F3D99A]";
  }

  return (
    <div
      className={[
        "inline-flex items-center gap-1.5 rounded-full border backdrop-blur-md font-semibold shadow-lg",
        ring,
        sizeClasses[size].wrapper,
        className,
      ].join(" ")}
      aria-label={`${safeScore}% compatibility, ${label}`}
    >
      <Sparkles
        size={sizeClasses[size].icon}
        className="text-current"
        aria-hidden="true"
      />

      <span>{safeScore}%</span>

      {showLabel && (
        <>
          <span className="opacity-50">•</span>
          <span>{label}</span>
        </>
      )}
    </div>
  );
}
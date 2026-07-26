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
  const styles = getCompatibilityStyles(safeScore);

  const sizeClasses = {
    sm: "gap-1 px-2 py-1 text-xs",
    md: "gap-1.5 px-3 py-1.5 text-sm",
    lg: "gap-2 px-4 py-2 text-base",
  };

  const iconSizes = {
    sm: 13,
    md: 15,
    lg: 18,
  };

  return (
    <div
      className={[
        "inline-flex items-center rounded-full border font-semibold",
        styles.badge,
        sizeClasses[size],
        className,
      ].join(" ")}
      aria-label={`${safeScore}% compatibility, ${label}`}
    >
      <Sparkles
        size={iconSizes[size]}
        aria-hidden="true"
      />

      <span>{safeScore}%</span>

      {showLabel && (
        <>
          <span aria-hidden="true">•</span>
          <span>{label}</span>
        </>
      )}
    </div>
  );
}
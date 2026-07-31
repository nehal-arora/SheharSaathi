import type { LucideIcon } from "lucide-react";

interface AnalyticsCardProps {
  title: string;
  value: string;
  description?: string;
  icon: LucideIcon;
}

export default function AnalyticsCard({
  title,
  value,
  description,
  icon: Icon,
}: AnalyticsCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[28px] border border-[#205C46]/35 bg-[#0D211B] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A34F]/35 hover:shadow-[0_28px_80px_rgba(0,0,0,0.32)]">
      {/* Glow */}

      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#D4A34F]/10 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between gap-5">
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8FA59B]">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#FBFAF7]">
            {value}
          </h2>

          {description && (
            <p className="mt-4 max-w-xs text-sm leading-6 text-[#A9B9B2]">
              {description}
            </p>
          )}
        </div>

        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#D4A34F]/20">
          <Icon size={24} />
        </div>
      </div>

      {/* Bottom Accent */}

      <div className="mt-6 h-[2px] w-full overflow-hidden rounded-full bg-[#163329]">
        <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-[#D4A34F] to-[#F0C86A]" />
      </div>
    </article>
  );
}
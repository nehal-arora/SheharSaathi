import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";

interface AIHeaderProps {
  title: string;
  description: string;
  badge?: string;
  icon?: ReactNode;
}

export default function AIHeader({
  title,
  description,
  badge,
  icon,
}: AIHeaderProps) {
  return (
    <section className="relative overflow-hidden rounded-[36px] border border-[#205C46]/40 bg-gradient-to-br from-[#0D211B] via-[#123126] to-[#071512] px-8 py-10 shadow-[0_26px_80px_rgba(0,0,0,0.32)] lg:px-10 lg:py-12">
      {/* Background Glow */}

      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#D4A34F]/10 blur-3xl" />

      <div className="absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-[#205C46]/20 blur-3xl" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          {badge && (
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A34F]/25 bg-[#D4A34F]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#F0C86A]">
              <Sparkles className="h-4 w-4" />
              {badge}
            </div>
          )}

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-[#FBFAF7] sm:text-5xl">
            {title}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-[#B8C5BF]">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="rounded-full border border-[#205C46]/40 bg-[#0F251E]/70 px-4 py-2 text-sm font-semibold text-[#D4A34F]">
              AI Powered
            </div>

            <div className="rounded-full border border-[#205C46]/40 bg-[#0F251E]/70 px-4 py-2 text-sm font-semibold text-[#D4A34F]">
              Smart Recommendations
            </div>

            <div className="rounded-full border border-[#205C46]/40 bg-[#0F251E]/70 px-4 py-2 text-sm font-semibold text-[#D4A34F]">
              Safe Relocation
            </div>
          </div>
        </div>

        {icon && (
          <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-[30px] border border-[#D4A34F]/25 bg-[#D4A34F]/10 text-[#F0C86A] shadow-[0_0_35px_rgba(212,163,79,0.15)]">
            {icon}
          </div>
        )}
      </div>
    </section>
  );
}
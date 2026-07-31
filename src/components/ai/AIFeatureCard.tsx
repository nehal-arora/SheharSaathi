import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

interface AIFeatureCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export default function AIFeatureCard({
  title,
  description,
  href,
  icon: Icon,
  badge,
}: AIFeatureCardProps) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-[28px] border border-[#205C46]/40 bg-[#0D211B] p-7 shadow-[0_18px_45px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-2 hover:border-[#D4A34F]/40 hover:shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
    >
      {/* Background Glow */}

      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#D4A34F]/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A] transition group-hover:scale-110">
            <Icon className="h-7 w-7" />
          </div>

          {badge && (
            <span className="rounded-full border border-[#205C46]/40 bg-[#123126] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#D4A34F]">
              {badge}
            </span>
          )}
        </div>

        <div className="mt-7">
          <h2 className="text-2xl font-bold text-[#FBFAF7] transition-colors group-hover:text-[#F0C86A]">
            {title}
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#B8C5BF]">
            {description}
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-[#205C46]/40 pt-5">
          <span className="text-sm font-semibold text-[#D4A34F]">
            Launch Tool
          </span>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4A34F]/10 text-[#F0C86A] transition-all group-hover:translate-x-1 group-hover:bg-[#D4A34F] group-hover:text-[#071512]">
            <ArrowRight className="h-5 w-5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
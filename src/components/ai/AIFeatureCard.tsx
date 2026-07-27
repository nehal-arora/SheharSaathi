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
      className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#6B8E23]/40 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF2E4] text-[#6B8E23]">
          <Icon className="h-6 w-6" />
        </div>

        {badge ? (
          <span className="rounded-full bg-[#FBFAF5] px-3 py-1 text-xs font-medium text-[#6B8E23]">
            {badge}
          </span>
        ) : null}
      </div>

      <div className="mt-5">
        <h2 className="text-xl font-semibold text-gray-900">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          {description}
        </p>
      </div>

      <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#6B8E23]">
        Open feature
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
import type { ReactNode } from "react";

interface AIResultCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
}

export default function AIResultCard({
  title,
  description,
  icon,
  children,
}: AIResultCardProps) {
  return (
    <section className="relative overflow-hidden rounded-[30px] border border-[#205C46]/40 bg-[#0D211B] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
      {/* Background Glow */}

      <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#D4A34F]/10 blur-3xl" />

      <div className="relative">
        <div className="flex items-start gap-5">
          {icon && (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
              {icon}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4A34F]">
              AI Result
            </p>

            <h2 className="mt-2 text-2xl font-bold text-[#FBFAF7]">
              {title}
            </h2>

            {description && (
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#B8C5BF]">
                {description}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-[#205C46]/40 bg-[#071512]/60 p-6">
          {children}
        </div>
      </div>
    </section>
  );
}
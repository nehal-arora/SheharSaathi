interface ProfileSkeletonProps {
  count?: number;
}

function SingleProfileSkeleton() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-[#205C46]/40 bg-[#0D211B] shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
      {/* Image */}
      <div className="relative h-64 w-full overflow-hidden">
        <div className="h-full w-full animate-pulse bg-[#18352B]" />

        <div className="absolute left-4 top-4 h-8 w-24 animate-pulse rounded-full bg-[#205C46]" />
        <div className="absolute right-4 top-4 h-8 w-20 animate-pulse rounded-full bg-[#D4A34F]/30" />

        <div className="absolute bottom-5 left-5">
          <div className="mb-3 h-8 w-40 animate-pulse rounded bg-[#205C46]" />
          <div className="h-4 w-36 animate-pulse rounded bg-[#18352B]" />
        </div>
      </div>

      <div className="space-y-5 p-5">
        {/* Cards */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#205C46]/30 bg-[#10271F] p-4">
            <div className="mb-3 h-3 w-20 animate-pulse rounded bg-[#205C46]" />
            <div className="h-5 w-32 animate-pulse rounded bg-[#18352B]" />
          </div>

          <div className="rounded-2xl border border-[#D4A34F]/25 bg-[#D4A34F]/10 p-4">
            <div className="mb-3 h-3 w-24 animate-pulse rounded bg-[#D4A34F]/25" />
            <div className="h-6 w-24 animate-pulse rounded bg-[#D4A34F]/35" />
          </div>
        </div>

        {/* Lifestyle Chips */}
        <div>
          <div className="mb-3 h-3 w-28 animate-pulse rounded bg-[#205C46]" />

          <div className="flex gap-2">
            <div className="h-8 w-24 animate-pulse rounded-full bg-[#18352B]" />
            <div className="h-8 w-28 animate-pulse rounded-full bg-[#18352B]" />
            <div className="h-8 w-24 animate-pulse rounded-full bg-[#18352B]" />
          </div>
        </div>

        {/* AI Insight */}
        <div className="rounded-2xl border border-[#D4A34F]/25 bg-[#D4A34F]/8 p-4">
          <div className="mb-3 h-4 w-36 animate-pulse rounded bg-[#D4A34F]/25" />

          <div className="space-y-2">
            <div className="h-3 w-full animate-pulse rounded bg-[#205C46]" />
            <div className="h-3 w-5/6 animate-pulse rounded bg-[#205C46]" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-[#205C46]" />
          </div>
        </div>

        {/* Shared Preferences */}
        <div>
          <div className="mb-3 h-3 w-32 animate-pulse rounded bg-[#205C46]" />

          <div className="flex gap-2">
            <div className="h-7 w-20 animate-pulse rounded-full bg-[#D4A34F]/20" />
            <div className="h-7 w-24 animate-pulse rounded-full bg-[#D4A34F]/20" />
            <div className="h-7 w-20 animate-pulse rounded-full bg-[#D4A34F]/20" />
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <div className="h-12 animate-pulse rounded-2xl bg-[#18352B]" />
          <div className="h-12 animate-pulse rounded-2xl bg-[#D4A34F]/30" />
        </div>

        <div className="h-12 animate-pulse rounded-2xl bg-[#18352B]" />
      </div>
    </div>
  );
}

export default function ProfileSkeleton({
  count = 6,
}: ProfileSkeletonProps) {
  return (
    <div
      className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3"
      aria-label="Loading roommate profiles"
      aria-busy="true"
    >
      {Array.from({ length: count }).map((_, index) => (
        <SingleProfileSkeleton key={index} />
      ))}
    </div>
  );
}
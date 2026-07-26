interface ProfileSkeletonProps {
  count?: number;
}

function SingleProfileSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="h-60 w-full animate-pulse bg-gray-200" />

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <div className="h-6 w-2/3 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200" />

        <div className="h-4 w-3/5 animate-pulse rounded bg-gray-200" />

        <div className="h-16 w-full animate-pulse rounded-xl bg-[#EEF2E4]" />

        <div className="flex gap-2">
          <div className="h-7 w-24 animate-pulse rounded-full bg-gray-200" />
          <div className="h-7 w-28 animate-pulse rounded-full bg-gray-200" />
          <div className="h-7 w-20 animate-pulse rounded-full bg-gray-200" />
        </div>

        <div className="h-24 w-full animate-pulse rounded-xl bg-[#FBFAF5]" />

        <div className="flex gap-2">
          <div className="h-11 flex-1 animate-pulse rounded-xl bg-gray-200" />
          <div className="h-11 flex-1 animate-pulse rounded-xl bg-gray-200" />
        </div>

        <div className="h-11 w-full animate-pulse rounded-xl bg-gray-200" />
      </div>
    </div>
  );
}

export default function ProfileSkeleton({
  count = 6,
}: ProfileSkeletonProps) {
  return (
    <div
      className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
      aria-label="Loading roommate profiles"
      aria-busy="true"
    >
      {Array.from({ length: count }).map((_, index) => (
        <SingleProfileSkeleton key={index} />
      ))}
    </div>
  );
}
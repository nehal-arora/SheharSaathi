export default function ExpenseSkeleton() {
  return (
    <div className="rounded-2xl border border-[#E7E2D5] bg-white p-5 shadow-sm animate-pulse">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          {/* Icon */}
          <div className="h-11 w-11 rounded-xl bg-gray-200" />

          <div className="flex-1 space-y-3">
            {/* Category */}
            <div className="h-5 w-32 rounded bg-gray-200" />

            {/* Description */}
            <div className="h-4 w-56 rounded bg-gray-200" />

            <div className="h-4 w-40 rounded bg-gray-200" />
          </div>
        </div>

        {/* Amount */}
        <div className="h-6 w-24 rounded bg-gray-200" />
      </div>

      <div className="mt-5 border-t border-[#EEEADD] pt-4">
        <div className="flex justify-end gap-2">
          <div className="h-9 w-20 rounded-md bg-gray-200" />
          <div className="h-9 w-24 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
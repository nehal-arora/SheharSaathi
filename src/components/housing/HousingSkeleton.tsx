"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function HousingSkeleton() {
  return (
    <Card className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      {/* Image */}
      <Skeleton className="h-60 w-full" />

      <CardContent className="space-y-5 p-5">
        {/* Title */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Location */}
        <Skeleton className="h-4 w-1/2" />

        {/* Rent */}
        <div className="grid grid-cols-2 gap-4 rounded-xl bg-[#EEF2E4] p-4">
          <div className="space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-24" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-24" />
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-lg border p-3 space-y-2"
            >
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="rounded-xl border p-4 space-y-2">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-5 w-36" />
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Skeleton className="h-11 w-full rounded-lg" />
          <Skeleton className="h-11 w-full rounded-lg" />
        </div>
      </CardContent>
    </Card>
  );
}
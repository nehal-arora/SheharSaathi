"use client";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

export default function HousingSkeleton() {
  return (
    <Card className="overflow-hidden rounded-3xl border border-[#D4A34F]/15 bg-[#0D211B] shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
      <div className="relative h-64 w-full overflow-hidden bg-[#071512]">
        <Skeleton className="h-full w-full rounded-none bg-[#18382E]" />

        <div className="absolute left-4 top-4">
          <Skeleton className="h-8 w-24 rounded-full bg-[#24483C]" />
        </div>

        <div className="absolute right-4 top-4">
          <Skeleton className="h-8 w-20 rounded-full bg-[#24483C]" />
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-3 w-24 bg-[#24483C]" />
            <Skeleton className="h-7 w-32 bg-[#315044]" />
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#071512]/60 p-3">
            <Skeleton className="h-3 w-14 bg-[#24483C]" />
            <Skeleton className="mt-2 h-4 w-20 bg-[#315044]" />
          </div>
        </div>
      </div>

      <CardContent className="space-y-5 p-5 sm:p-6">
        <div className="space-y-3">
          <Skeleton className="h-6 w-3/4 bg-[#315044]" />

          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full bg-[#24483C]" />
            <Skeleton className="h-4 w-1/2 bg-[#24483C]" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-[#24483C]" />
            <Skeleton className="h-4 w-5/6 bg-[#24483C]" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-2xl border border-[#D4A34F]/10 bg-[#122A22] p-3"
            >
              <Skeleton className="h-9 w-9 shrink-0 rounded-xl bg-[#24483C]" />

              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-3 w-16 bg-[#24483C]" />
                <Skeleton className="h-4 w-full bg-[#315044]" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-[#D4A34F]/10 bg-[#122A22] px-4 py-3">
          <Skeleton className="h-4 w-28 bg-[#24483C]" />
          <Skeleton className="h-7 w-20 rounded-full bg-[#315044]" />
        </div>

        <div className="rounded-2xl border border-[#D4A34F]/15 bg-[#071512]/50 p-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-xl bg-[#24483C]" />

            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-28 bg-[#24483C]" />
              <Skeleton className="h-5 w-36 bg-[#315044]" />
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="grid grid-cols-1 gap-3 p-5 pt-0 sm:grid-cols-2 sm:p-6 sm:pt-0">
        <Skeleton className="h-11 w-full rounded-xl bg-[#D4A34F]/20" />
        <Skeleton className="h-11 w-full rounded-xl bg-[#24483C]" />
      </CardFooter>
    </Card>
  );
}
"use client";

import type { RoommateProfile } from "@/types/roommates";

import RoommateCard from "./RoommateCard";
import RoommateEmptyState from "./RoommateEmptyState";

interface RoommateGridProps {
  roommates: RoommateProfile[];
  onFavorite?: (id: number) => void;
  onInterest?: (id: number) => void;
  emptyTitle?: string;
  emptyDescription?: string;
}

export default function RoommateGrid({
  roommates,
  onFavorite,
  onInterest,
  emptyTitle = "No roommate profiles found",
  emptyDescription = "Try changing your search or filter preferences.",
}: RoommateGridProps) {
  if (roommates.length === 0) {
    return (
      <RoommateEmptyState
        title={emptyTitle}
        description={emptyDescription}
      />
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
      {roommates.map((roommate) => (
        <RoommateCard
          key={roommate.id}
          roommate={roommate}
          onFavorite={onFavorite}
          onInterest={onInterest}
        />
      ))}
    </div>
  );
}
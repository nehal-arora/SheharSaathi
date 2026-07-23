"use client";

import HousingCard from "@/components/housing/HousingCard";
import HousingSkeleton from "@/components/housing/HousingSkeleton";
import HousingEmpty from "@/components/housing/HousingEmpty";

import type { Housing } from "@/types/housing";

interface HousingGridProps {
  listings: Housing[];
  loading?: boolean;
  error?: boolean;
}

export default function HousingGrid({
  listings,
  loading = false,
  error = false,
}: HousingGridProps) {
  // Loading State
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <HousingSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <HousingEmpty
        title="Something went wrong"
        description="We couldn't load the housing listings. Please refresh the page and try again."
        showAddButton={false}
      />
    );
  }

  // Empty State
  if (listings.length === 0) {
    return (
      <HousingEmpty
        title="No Listings Found"
        description="Try changing your search filters or add a new property."
      />
    );
  }

  // Listings Grid
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {listings.map((housing) => (
        <HousingCard
          key={housing.id}
          housing={housing}
        />
      ))}
    </div>
  );
}
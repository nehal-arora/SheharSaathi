"use client";

import Link from "next/link";
import { Home } from "lucide-react";

import { Button } from "@/components/ui/button";

interface HousingEmptyProps {
  title?: string;
  description?: string;
  showAddButton?: boolean;
}

export default function HousingEmpty({
  title = "No Housing Found",
  description = "No listings are available right now.",
  showAddButton = true,
}: HousingEmptyProps) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        bg-white
        p-10
        text-center
      "
    >
      <div className="mb-4 rounded-full bg-[#EEF2E4] p-4">
        <Home className="h-8 w-8 text-[#6B8E23]" />
      </div>


      <h3 className="text-xl font-semibold text-[#333333]">
        {title}
      </h3>


      <p className="mt-2 max-w-md text-sm text-gray-600">
        {description}
      </p>


      {showAddButton && (
        <Link
          href="/housing/add"
          className="mt-6"
        >
          <Button
            className="
              bg-[#6B8E23]
              text-white
              hover:bg-[#5A781D]
            "
          >
            Add Listing
          </Button>
        </Link>
      )}

    </div>
  );
}
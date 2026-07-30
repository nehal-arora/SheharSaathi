"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Bookmark,
  Building2,
  CheckCircle2,
  MapPin,
} from "lucide-react";

import type {
  DashboardHousingSummary,
} from "@/features/dashboard/types/dashboard.types";

interface Props {
  housing: DashboardHousingSummary;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function HousingWidget({
  housing,
}: Props) {
  return (
    <section className="overflow-hidden rounded-[34px] border border-black/5 bg-white shadow-[0_25px_70px_rgba(35,42,30,.08)]">

      {/* Banner */}

      <div className="relative h-60">

        <Image
          src="/images/dashboard/property-placeholder.jpg"
          alt="Property"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        <div className="absolute left-6 bottom-6 right-6">

          <div className="inline-flex rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-bold text-white">
            Featured Property
          </div>

          {housing.recent_listing ? (
            <>
              <h2 className="mt-3 text-3xl font-black text-white">

                {housing.recent_listing.title}

              </h2>

              <div className="mt-2 flex items-center gap-2 text-white/80">

                <MapPin className="h-4 w-4"/>

                {housing.recent_listing.locality},{" "}
                {housing.recent_listing.city}

              </div>

            </>
          ) : (
            <>
              <h2 className="mt-3 text-3xl font-black text-white">

                No listing yet

              </h2>

              <p className="mt-2 text-white/70">

                Publish your first property.

              </p>
            </>
          )}

        </div>

      </div>

      {/* Content */}

      <div className="p-6">

        {housing.recent_listing && (

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-neutral-500">

                Monthly Rent

              </p>

              <h3 className="mt-1 text-3xl font-black text-[#6B8E23]">

                {formatCurrency(housing.recent_listing.rent)}

              </h3>

            </div>

            <Link
              href={`/housing/${housing.recent_listing.id}`}
              className="rounded-xl bg-[#202918] px-5 py-3 text-sm font-bold text-white transition hover:scale-[1.03]"
            >
              View Listing
            </Link>

          </div>

        )}

        <div className="mt-7 grid grid-cols-3 gap-4">

          <Stat
            icon={<Building2 size={18}/>}
            label="Listings"
            value={housing.total_listings}
          />

          <Stat
            icon={<CheckCircle2 size={18}/>}
            label="Active"
            value={housing.active_listings}
          />

          <Stat
            icon={<Bookmark size={18}/>}
            label="Saved"
            value={housing.saved_listings}
          />

        </div>

      </div>

    </section>
  );
}

function Stat({
  icon,
  label,
  value,
}:{
  icon:React.ReactNode;
  label:string;
  value:number;
}){

  return(

<div className="rounded-2xl bg-[#F7F7F4] p-5">

<div className="flex items-center gap-2 text-[#6B8E23]">

{icon}

<span className="text-xs font-bold uppercase">

{label}

</span>

</div>

<p className="mt-3 text-3xl font-black">

{value}

</p>

</div>

  )

}
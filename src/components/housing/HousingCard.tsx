"use client";

import Image from "next/image";
import Link from "next/link";

import {
  MapPin,
  BedDouble,
  IndianRupee,
  Calendar,
  ShieldCheck,
  Sofa,
  Users,
  Phone,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { Housing } from "@/types/housing";

import {
  formatCurrency,
  formatDate,
  getPrimaryImage,
  getFurnishedLabel,
  getAvailabilityStatus,
} from "@/features/housing/utils/housing.utils";


interface HousingCardProps {
  housing: Housing;
}


export default function HousingCard({
  housing,
}: HousingCardProps) {

  const image = getPrimaryImage(housing);


  return (
    <Card
      className="
        overflow-hidden
        rounded-2xl
        border
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >

      {/* IMAGE */}

      <div className="relative h-60 w-full overflow-hidden">

        <Image
          src={image}
          alt={housing.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />


        {housing.verified && (
          <Badge
            className="
              absolute
              left-3
              top-3
              gap-1
              rounded-full
              bg-green-600
              px-3
              py-1
              text-white
            "
          >
            <ShieldCheck className="h-4 w-4" />

            Verified
          </Badge>
        )}


        <Badge
          className={`
            absolute
            right-3
            top-3
            rounded-full
            px-3
            py-1

            ${
              housing.available
                ? "bg-emerald-600 text-white"
                : "bg-red-600 text-white"
            }
          `}
        >
          {getAvailabilityStatus(housing.available)}
        </Badge>


      </div>


      <CardContent className="space-y-5 p-5">


        {/* TITLE */}

        <div className="space-y-2">

          <h3 className="line-clamp-1 text-xl font-bold text-[#333333]">
            {housing.title}
          </h3>


          <p className="line-clamp-2 text-sm leading-6 text-gray-600">
            {housing.description}
          </p>

        </div>
                {/* LOCATION */}

        <div className="flex items-center gap-2 text-sm text-gray-600">

          <MapPin className="h-4 w-4 text-[#6B8E23]" />

          <span>
            {housing.locality}, {housing.city}
          </span>

        </div>



        {/* RENT + DEPOSIT */}

        <div className="grid grid-cols-2 gap-4 rounded-xl bg-[#EEF2E4] p-4">

          <div>

            <p className="text-xs uppercase tracking-wide text-gray-500">
              Monthly Rent
            </p>


            <div className="mt-1 flex items-center gap-1 font-bold text-[#6B8E23]">

              <IndianRupee className="h-4 w-4" />

              {formatCurrency(housing.rent)}

            </div>

          </div>



          <div>

            <p className="text-xs uppercase tracking-wide text-gray-500">
              Deposit
            </p>


            <div className="mt-1 flex items-center gap-1 font-bold text-[#333333]">

              <IndianRupee className="h-4 w-4" />

              {formatCurrency(housing.deposit)}

            </div>

          </div>


        </div>




        {/* PROPERTY DETAILS */}


        <div className="grid grid-cols-2 gap-3">


          <div className="flex items-center gap-2 rounded-lg border p-3">

            <BedDouble className="h-4 w-4 text-[#6B8E23]" />


            <div>

              <p className="text-xs text-gray-500">
                House Type
              </p>


              <p className="text-sm font-medium">
                {housing.house_type}
              </p>

            </div>

          </div>




          <div className="flex items-center gap-2 rounded-lg border p-3">

            <Users className="h-4 w-4 text-[#6B8E23]" />


            <div>

              <p className="text-xs text-gray-500">
                Sharing
              </p>


              <p className="text-sm font-medium">
                {housing.sharing_type}
              </p>

            </div>

          </div>





          <div className="flex items-center gap-2 rounded-lg border p-3">

            <Sofa className="h-4 w-4 text-[#6B8E23]" />


            <div>

              <p className="text-xs text-gray-500">
                Furnishing
              </p>


              <p className="text-sm font-medium">
                {getFurnishedLabel(housing.is_furnished)}
              </p>

            </div>

          </div>





          <div className="flex items-center gap-2 rounded-lg border p-3">

            <Calendar className="h-4 w-4 text-[#6B8E23]" />


            <div>

              <p className="text-xs text-gray-500">
                Available From
              </p>


              <p className="text-sm font-medium">
                {formatDate(housing.available_from)}
              </p>

            </div>

          </div>



        </div>
                {/* GENDER PREFERENCE */}

        <div className="flex items-center justify-between rounded-lg border bg-[#FBFAF5] px-4 py-3">

          <span className="text-sm text-gray-500">
            Gender Preference
          </span>


          <Badge variant="secondary">
            {housing.gender_preference}
          </Badge>

        </div>



        {/* CONTACT */}

        <div className="rounded-xl border border-[#D6C7A1] bg-[#FBFAF5] p-4">

          <div className="flex items-center gap-2">

            <Phone className="h-4 w-4 text-[#6B8E23]" />

            <span className="text-sm text-gray-500">
              Contact Number
            </span>

          </div>


          <p className="mt-2 text-base font-semibold tracking-wide text-[#333333]">
            {housing.contact_number}
          </p>


        </div>



      </CardContent>



      {/* ACTION BUTTONS */}

      <CardFooter className="flex flex-col gap-3 p-5 pt-0 sm:flex-row">


        <Link
          href={`/housing/${housing.id}`}
          className="w-full"
        >

          <Button
            className="
              w-full
              bg-[#6B8E23]
              text-white
              hover:bg-[#5A781D]
            "
          >
            View Details
          </Button>


        </Link>



        <a
          href={`tel:${housing.contact_number}`}
          className="w-full"
        >

          <Button
            variant="outline"
            className="
              w-full
              border-[#6B8E23]
              text-[#6B8E23]
              hover:bg-[#EEF2E4]
            "
          >
            Call Owner
          </Button>


        </a>


      </CardFooter>


    </Card>
  );
}
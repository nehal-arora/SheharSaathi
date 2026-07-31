"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  Calendar,
  Home,
  MapPin,
  Phone,
  Star,
} from "lucide-react";

export default function HousingDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <main className="min-h-screen bg-[#071512] px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/housing"
          className="mb-8 inline-flex items-center gap-2 rounded-xl border border-[#D4A34F]/20 bg-[#0D211B] px-4 py-2 text-sm font-semibold text-[#F0C86A] transition hover:bg-[#122A22]"
        >
          <ArrowLeft size={18} />
          Back to Listings
        </Link>

        {/* Hero */}
        <div className="overflow-hidden rounded-[32px] border border-[#D4A34F]/15 bg-[#0D211B] shadow-[0_25px_70px_rgba(0,0,0,0.35)]">
          <div className="relative h-[320px] bg-gradient-to-br from-[#205C46] via-[#143126] to-[#071512]">
            <div className="absolute inset-0 flex items-center justify-center">
              <Home
                size={90}
                className="text-[#D4A34F]/40"
              />
            </div>

            <div className="absolute left-8 top-8 rounded-full border border-[#D4A34F]/20 bg-[#071512]/60 px-4 py-2 text-sm font-semibold text-[#F0C86A] backdrop-blur">
              Listing #{id}
            </div>

            <div className="absolute right-8 top-8 flex items-center gap-2 rounded-full bg-[#D4A34F] px-4 py-2 font-semibold text-[#10251D]">
              <BadgeCheck size={18} />
              Premium Listing
            </div>

            <div className="absolute bottom-8 left-8">
              <h1 className="text-4xl font-bold text-[#FBFAF7]">
                Housing Details
              </h1>

              <p className="mt-2 text-[#C8D4CF]">
                View complete property information.
              </p>
            </div>
          </div>

          <div className="grid gap-8 p-8 lg:grid-cols-3">
            {/* Left */}
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-3xl border border-[#D4A34F]/10 bg-[#122A22] p-6">
                <h2 className="mb-5 text-2xl font-bold text-[#FBFAF7]">
                  Property Overview
                </h2>

                <p className="leading-8 text-[#B6C3BE]">
                  Backend integration is pending. Once connected,
                  this section will automatically display the
                  complete housing details including title,
                  description, rent, location, amenities,
                  availability, images and owner information.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl border border-[#D4A34F]/10 bg-[#122A22] p-5">
                  <Building2 className="mb-3 text-[#D4A34F]" />

                  <h3 className="font-semibold text-[#FBFAF7]">
                    Property Type
                  </h3>

                  <p className="mt-2 text-[#92A39C]">
                    Available after backend integration
                  </p>
                </div>

                <div className="rounded-2xl border border-[#D4A34F]/10 bg-[#122A22] p-5">
                  <MapPin className="mb-3 text-[#D4A34F]" />

                  <h3 className="font-semibold text-[#FBFAF7]">
                    Location
                  </h3>

                  <p className="mt-2 text-[#92A39C]">
                    City & locality will appear here
                  </p>
                </div>

                <div className="rounded-2xl border border-[#D4A34F]/10 bg-[#122A22] p-5">
                  <Calendar className="mb-3 text-[#D4A34F]" />

                  <h3 className="font-semibold text-[#FBFAF7]">
                    Availability
                  </h3>

                  <p className="mt-2 text-[#92A39C]">
                    Available date will appear here
                  </p>
                </div>

                <div className="rounded-2xl border border-[#D4A34F]/10 bg-[#122A22] p-5">
                  <Phone className="mb-3 text-[#D4A34F]" />

                  <h3 className="font-semibold text-[#FBFAF7]">
                    Contact
                  </h3>

                  <p className="mt-2 text-[#92A39C]">
                    Owner contact will appear here
                  </p>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-[#D4A34F]/15 bg-[#122A22] p-6">
                <p className="text-sm uppercase tracking-[0.14em] text-[#D4A34F]">
                  Monthly Rent
                </p>

                <h2 className="mt-3 text-4xl font-bold text-[#FBFAF7]">
                  ₹ ----
                </h2>

                <p className="mt-2 text-[#92A39C]">
                  Price will appear after integration.
                </p>
              </div>

              <div className="rounded-3xl border border-[#D4A34F]/15 bg-[#122A22] p-6">
                <h3 className="mb-4 flex items-center gap-2 font-bold text-[#FBFAF7]">
                  <Star
                    size={18}
                    className="text-[#D4A34F]"
                  />
                  Amenities
                </h3>

                <div className="flex flex-wrap gap-2">
                  {[
                    "WiFi",
                    "Parking",
                    "Security",
                    "Lift",
                    "Kitchen",
                    "Power Backup",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#D4A34F]/20 bg-[#071512] px-3 py-2 text-sm text-[#F0C86A]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-[#D4A34F]/15 bg-gradient-to-br from-[#205C46] to-[#143126] p-6">
                <h3 className="text-xl font-bold text-white">
                  Listing ID
                </h3>

                <p className="mt-3 text-3xl font-bold text-[#F0C86A]">
                  #{id}
                </p>

                <p className="mt-4 text-[#D7E2DD]">
                  This ID uniquely identifies the property.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
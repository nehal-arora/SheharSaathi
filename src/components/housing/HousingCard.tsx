"use client";

import Image from "next/image";
import Link from "next/link";

import {
  BedDouble,
  Calendar,
  IndianRupee,
  MapPin,
  Phone,
  ShieldCheck,
  Sofa,
  Users,
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
  getAvailabilityStatus,
  getFurnishedLabel,
  getPrimaryImage,
} from "@/features/housing/utils/housing.utils";

interface HousingCardProps {
  housing: Housing;
}

export default function HousingCard({
  housing,
}: HousingCardProps) {
  const image = getPrimaryImage(housing);

  return (
    <Card className="group overflow-hidden rounded-3xl border border-[#D4A34F]/15 bg-[#0D211B] shadow-[0_20px_60px_rgba(0,0,0,0.24)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D4A34F]/35 hover:shadow-[0_28px_80px_rgba(0,0,0,0.34)]">
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={image}
          alt={housing.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#071512]/85 via-transparent to-[#071512]/10" />

        <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
          {housing.verified && (
            <Badge className="gap-1.5 rounded-full border border-[#D4A34F]/30 bg-[#071512]/80 px-3 py-1.5 text-[#F0C86A] shadow-lg backdrop-blur-md">
              <ShieldCheck className="h-4 w-4" />
              Verified
            </Badge>
          )}
        </div>

        <Badge
          className={`absolute right-4 top-4 rounded-full border px-3 py-1.5 shadow-lg backdrop-blur-md ${
            housing.available
              ? "border-emerald-400/30 bg-emerald-500/20 text-emerald-200"
              : "border-red-400/30 bg-red-500/20 text-red-200"
          }`}
        >
          {getAvailabilityStatus(housing.available)}
        </Badge>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D4A34F]">
                Monthly rent
              </p>

              <div className="mt-1 flex items-center text-2xl font-extrabold text-[#FBFAF7]">
                <IndianRupee className="h-5 w-5" />
                {formatCurrency(housing.rent)}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#071512]/70 px-3 py-2 text-right backdrop-blur-md">
              <p className="text-[10px] uppercase tracking-[0.12em] text-[#9EAEA7]">
                Deposit
              </p>

              <p className="mt-0.5 text-sm font-bold text-[#F0C86A]">
                {formatCurrency(housing.deposit)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="space-y-5 p-5 sm:p-6">
        <div>
          <h3 className="line-clamp-1 text-xl font-bold text-[#FBFAF7]">
            {housing.title}
          </h3>

          <div className="mt-2 flex items-start gap-2 text-sm text-[#9EAEA7]">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D4A34F]" />

            <span className="line-clamp-1">
              {housing.locality}, {housing.city}
            </span>
          </div>

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#9EAEA7]">
            {housing.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <DetailItem
            icon={BedDouble}
            label="House type"
            value={housing.house_type}
          />

          <DetailItem
            icon={Users}
            label="Sharing"
            value={housing.sharing_type}
          />

          <DetailItem
            icon={Sofa}
            label="Furnishing"
            value={getFurnishedLabel(
              housing.is_furnished
            )}
          />

          <DetailItem
            icon={Calendar}
            label="Available from"
            value={formatDate(
              housing.available_from
            )}
          />
        </div>

        <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#D4A34F]/12 bg-[#122A22] px-4 py-3">
          <span className="text-sm text-[#9EAEA7]">
            Gender preference
          </span>

          <Badge className="rounded-full border border-[#D4A34F]/20 bg-[#D4A34F]/10 px-3 py-1 text-[#F0C86A]">
            {housing.gender_preference}
          </Badge>
        </div>

        <div className="rounded-2xl border border-[#D4A34F]/15 bg-[#071512]/50 p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#205C46]/40 text-[#A6CEB5]">
              <Phone className="h-4 w-4" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-[#9EAEA7]">
                Contact number
              </p>

              <p className="mt-1 text-base font-bold tracking-wide text-[#FBFAF7]">
                {housing.contact_number}
              </p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="grid grid-cols-1 gap-3 p-5 pt-0 sm:grid-cols-2 sm:p-6 sm:pt-0">
        <Link
  href={`/housing/${housing.id}`}
  className="w-full"
>
  <Button
    className="h-11 w-full rounded-xl bg-[#D4A34F] font-bold text-[#10251D] shadow-[0_10px_28px_rgba(212,163,79,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E5B65B]"
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
    className="h-11 w-full rounded-xl border-[#D4A34F]/30 bg-transparent font-semibold text-[#F0C86A] transition-colors hover:bg-[#D4A34F]/10 hover:text-[#F0C86A]"
  >
    Call Owner
  </Button>
</a>
      </CardFooter>
    </Card>
  );
}

interface DetailItemProps {
  icon: React.ComponentType<{
    className?: string;
  }>;
  label: string;
  value: string;
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: DetailItemProps) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-[#D4A34F]/10 bg-[#122A22] p-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#205C46]/40 text-[#A6CEB5]">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-[0.1em] text-[#9EAEA7]">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-semibold text-[#FBFAF7]">
          {value}
        </p>
      </div>
    </div>
  );
}
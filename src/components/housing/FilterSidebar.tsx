"use client";

import {
  Building2,
  IndianRupee,
  MapPin,
  RotateCcw,
  SlidersHorizontal,
  Sofa,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { HousingFilters } from "@/types/housing";

interface FilterSidebarProps {
  filters: HousingFilters;
  onChange: (filters: HousingFilters) => void;
}

const HOUSE_TYPES = [
  "Apartment",
  "PG",
  "Hostel",
  "Flat",
  "Villa",
];

const SHARING_TYPES = [
  "Single",
  "Double",
  "Triple",
];

const GENDER_OPTIONS = [
  "Any",
  "Male",
  "Female",
];

export default function FilterSidebar({
  filters,
  onChange,
}: FilterSidebarProps) {
  const updateFilter = <K extends keyof HousingFilters>(
    key: K,
    value: HousingFilters[K]
  ) => {
    onChange({
      ...filters,
      [key]: value,
    });
  };

  const resetFilters = () => {
    onChange({});
  };

  return (
    <aside className="rounded-[22px] bg-[#0D211B] p-5 sm:p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#F0C86A]">
            <SlidersHorizontal className="h-4 w-4" />

            <span className="text-xs font-bold uppercase tracking-[0.16em]">
              Refine search
            </span>
          </div>

          <h2 className="mt-2 text-xl font-bold text-[#FBFAF7]">
            Filters
          </h2>

          <p className="mt-1 text-sm leading-6 text-[#9EAEA7]">
            Narrow listings based on your preferences.
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          className="shrink-0 rounded-xl px-3 text-[#F0C86A] hover:bg-[#D4A34F]/10 hover:text-[#F0C86A]"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>

      <div className="space-y-6">
        <FilterGroup
          icon={MapPin}
          label="City"
        >
          <Input
            value={filters.city ?? ""}
            onChange={(event) =>
              updateFilter(
                "city",
                event.target.value
              )
            }
            placeholder="Enter city"
            className="
              h-11
              rounded-xl
              border-[#D4A34F]/15
              bg-[#071512]/65
              px-4
              text-[#FBFAF7]
              placeholder:text-[#66766F]
              focus-visible:border-[#D4A34F]/45
              focus-visible:ring-[#D4A34F]/20
            "
          />
        </FilterGroup>

        <FilterGroup
          icon={IndianRupee}
          label="Maximum Rent"
        >
          <Input
            type="number"
            min={0}
            value={filters.max_rent ?? ""}
            onChange={(event) =>
              updateFilter(
                "max_rent",
                event.target.value
                  ? Number(event.target.value)
                  : undefined
              )
            }
            placeholder="15000"
            className="
              h-11
              rounded-xl
              border-[#D4A34F]/15
              bg-[#071512]/65
              px-4
              text-[#FBFAF7]
              placeholder:text-[#66766F]
              focus-visible:border-[#D4A34F]/45
              focus-visible:ring-[#D4A34F]/20
            "
          />
        </FilterGroup>

        <FilterGroup
          icon={Building2}
          label="House Type"
        >
          <select
            value={filters.house_type ?? ""}
            onChange={(event) =>
              updateFilter(
                "house_type",
                event.target.value as HousingFilters["house_type"]
              )
            }
            className="
              h-11
              w-full
              rounded-xl
              border
              border-[#D4A34F]/15
              bg-[#071512]/65
              px-4
              text-sm
              text-[#FBFAF7]
              outline-none
              transition
              focus:border-[#D4A34F]/45
              focus:ring-2
              focus:ring-[#D4A34F]/10
            "
          >
            <option
              value=""
              className="bg-[#0D211B] text-[#FBFAF7]"
            >
              All house types
            </option>

            {HOUSE_TYPES.map((type) => (
              <option
                key={type}
                value={type}
                className="bg-[#0D211B] text-[#FBFAF7]"
              >
                {type}
              </option>
            ))}
          </select>
        </FilterGroup>

        <FilterGroup
          icon={Users}
          label="Sharing"
        >
          <select
            value={filters.sharing_type ?? ""}
            onChange={(event) =>
              updateFilter(
                "sharing_type",
                event.target.value as HousingFilters["sharing_type"]
              )
            }
            className="
              h-11
              w-full
              rounded-xl
              border
              border-[#D4A34F]/15
              bg-[#071512]/65
              px-4
              text-sm
              text-[#FBFAF7]
              outline-none
              transition
              focus:border-[#D4A34F]/45
              focus:ring-2
              focus:ring-[#D4A34F]/10
            "
          >
            <option
              value=""
              className="bg-[#0D211B] text-[#FBFAF7]"
            >
              All sharing types
            </option>

            {SHARING_TYPES.map((type) => (
              <option
                key={type}
                value={type}
                className="bg-[#0D211B] text-[#FBFAF7]"
              >
                {type}
              </option>
            ))}
          </select>
        </FilterGroup>

        <FilterGroup
          icon={Users}
          label="Gender Preference"
        >
          <select
            value={filters.gender_preference ?? ""}
            onChange={(event) =>
              updateFilter(
                "gender_preference",
                event.target.value as HousingFilters["gender_preference"]
              )
            }
            className="
              h-11
              w-full
              rounded-xl
              border
              border-[#D4A34F]/15
              bg-[#071512]/65
              px-4
              text-sm
              text-[#FBFAF7]
              outline-none
              transition
              focus:border-[#D4A34F]/45
              focus:ring-2
              focus:ring-[#D4A34F]/10
            "
          >
            <option
              value=""
              className="bg-[#0D211B] text-[#FBFAF7]"
            >
              All preferences
            </option>

            {GENDER_OPTIONS.map((gender) => (
              <option
                key={gender}
                value={gender}
                className="bg-[#0D211B] text-[#FBFAF7]"
              >
                {gender}
              </option>
            ))}
          </select>
        </FilterGroup>

        <div className="space-y-3 border-t border-[#D4A34F]/10 pt-5">
          <ToggleFilter
            icon={Building2}
            label="Available Only"
            description="Show properties ready to move into."
            checked={filters.available ?? false}
            onChange={(checked) =>
              updateFilter(
                "available",
                checked
              )
            }
          />

          <ToggleFilter
            icon={Sofa}
            label="Furnished Only"
            description="Show homes with furnishing included."
            checked={filters.is_furnished ?? false}
            onChange={(checked) =>
              updateFilter(
                "is_furnished",
                checked
              )
            }
          />
        </div>
      </div>
    </aside>
  );
}

interface FilterGroupProps {
  icon: React.ComponentType<{
    className?: string;
  }>;
  label: string;
  children: React.ReactNode;
}

function FilterGroup({
  icon: Icon,
  label,
  children,
}: FilterGroupProps) {
  return (
    <div>
      <label className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-[#D7DEDA]">
        <Icon className="h-4 w-4 text-[#D4A34F]" />
        {label}
      </label>

      {children}
    </div>
  );
}

interface ToggleFilterProps {
  icon: React.ComponentType<{
    className?: string;
  }>;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function ToggleFilter({
  icon: Icon,
  label,
  description,
  checked,
  onChange,
}: ToggleFilterProps) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[#D4A34F]/10 bg-[#071512]/45 p-3.5 transition hover:border-[#D4A34F]/25 hover:bg-[#071512]/70">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) =>
          onChange(event.target.checked)
        }
        className="
          mt-1
          h-4
          w-4
          shrink-0
          cursor-pointer
          rounded
          border-[#D4A34F]/35
          bg-[#071512]
          accent-[#D4A34F]
        "
      />

      <div className="flex min-w-0 flex-1 items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#205C46]/35 text-[#A6CEB5]">
          <Icon className="h-4 w-4" />
        </div>

        <div>
          <p className="text-sm font-semibold text-[#FBFAF7]">
            {label}
          </p>

          <p className="mt-1 text-xs leading-5 text-[#82928B]">
            {description}
          </p>
        </div>
      </div>
    </label>
  );
}
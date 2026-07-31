"use client";

import {
  RotateCcw,
  SlidersHorizontal,
  X,
} from "lucide-react";

import type {
  CleanlinessLevel,
  DrinkingPreference,
  FoodPreference,
  Gender,
  PetPreference,
  RoommateFilters,
  SharingType,
  SleepSchedule,
  SmokingPreference,
  WorkSchedule,
} from "@/types/roommates";

/* ---------- Types ---------- */

interface RoommateFilterSidebarProps {
  filters: RoommateFilters;
  onChange: (filters: RoommateFilters) => void;
  onClear: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

/* ---------- Options ---------- */

const genders: Gender[] = [
  "Male",
  "Female",
  "Other",
];

const foodPreferences: FoodPreference[] = [
  "Vegetarian",
  "Non-Vegetarian",
  "Vegan",
  "Eggetarian",
  "No Preference",
];

const smokingPreferences: SmokingPreference[] = [
  "Non-Smoker",
  "Occasionally",
  "Regularly",
];

const drinkingPreferences: DrinkingPreference[] = [
  "Non-Drinker",
  "Occasionally",
  "Regularly",
];

const petPreferences: PetPreference[] = [
  "Have Pets",
  "Comfortable With Pets",
  "Not Comfortable With Pets",
  "No Preference",
];

const sleepSchedules: SleepSchedule[] = [
  "Early Sleeper",
  "Night Owl",
  "Flexible",
];

const cleanlinessLevels: CleanlinessLevel[] = [
  "Very Clean",
  "Moderately Clean",
  "Relaxed",
];

const workSchedules: WorkSchedule[] = [
  "Day Shift",
  "Night Shift",
  "Hybrid",
  "Remote",
  "Student",
  "Flexible",
];

const sharingTypes: SharingType[] = [
  "Single Room",
  "Double Sharing",
  "Triple Sharing",
  "Any",
];

export default function RoommateFilterSidebar({
  filters,
  onChange,
  onClear,
  isOpen = true,
  onClose,
}: RoommateFilterSidebarProps) {
  function updateFilter<K extends keyof RoommateFilters>(
    key: K,
    value: RoommateFilters[K]
  ) {
    onChange({
      ...filters,
      [key]: value,
      page: 1,
    });
  }

  const sidebarClasses = [
    "rounded-[28px] border border-[#205C46]/40 bg-[#0D211B] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.24)]",
    "lg:sticky lg:top-24",
    isOpen
      ? "fixed inset-y-0 left-0 z-50 w-[88%] max-w-sm overflow-y-auto rounded-none lg:relative lg:inset-auto lg:z-auto lg:w-full lg:max-w-none lg:rounded-[28px]"
      : "hidden lg:block",
  ].join(" ");

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close filter overlay"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside className={sidebarClasses}>
        <div className="mb-7 flex items-center justify-between border-b border-[#205C46]/30 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D4A34F]/12">
              <SlidersHorizontal
                size={20}
                className="text-[#F0C86A]"
              />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#9EAEA7]">
                Smart Filters
              </p>

              <h2 className="text-xl font-bold text-[#FBFAF7]">
                Find Better Matches
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-[#9EAEA7] transition hover:bg-[#205C46]/20 hover:text-[#FBFAF7] lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          <FilterInput
            label="City"
            value={filters.city ?? ""}
            placeholder="Delhi"
            onChange={(value) =>
              updateFilter(
                "city",
                value || undefined
              )
            }
          />

          <FilterInput
            label="Preferred locality"
            value={filters.preferred_locality ?? ""}
            placeholder="Saket, Dwarka..."
            onChange={(value) =>
              updateFilter(
                "preferred_locality",
                value || undefined
              )
            }
          />

          <div>
            <FilterLabel>Monthly Budget</FilterLabel>

            <div className="grid grid-cols-2 gap-3">
              <NumberInput
                label="Minimum budget"
                value={filters.min_budget}
                placeholder="Min"
                onChange={(value) =>
                  updateFilter("min_budget", value)
                }
              />

              <NumberInput
                label="Maximum budget"
                value={filters.max_budget}
                placeholder="Max"
                onChange={(value) =>
                  updateFilter("max_budget", value)
                }
              />
            </div>
          </div>

          <FilterSelect
            label="Gender"
            value={filters.gender ?? ""}
            options={genders}
            onChange={(value) =>
              updateFilter(
                "gender",
                (value || undefined) as
                  | Gender
                  | undefined
              )
            }
          />

          <FilterSelect
            label="Preferred Gender"
            value={filters.preferred_gender ?? ""}
            options={["Any", ...genders]}
            onChange={(value) =>
              updateFilter(
                "preferred_gender",
                (value || undefined) as
                  | Gender
                  | "Any"
                  | undefined
              )
            }
          />

          <FilterSelect
            label="Food Preference"
            value={filters.food_preference ?? ""}
            options={foodPreferences}
            onChange={(value) =>
              updateFilter(
                "food_preference",
                (value || undefined) as
                  | FoodPreference
                  | undefined
              )
            }
          />

          <FilterSelect
            label="Smoking"
            value={filters.smoking ?? ""}
            options={smokingPreferences}
            onChange={(value) =>
              updateFilter(
                "smoking",
                (value || undefined) as
                  | SmokingPreference
                  | undefined
              )
            }
          />

          <FilterSelect
            label="Drinking"
            value={filters.drinking ?? ""}
            options={drinkingPreferences}
            onChange={(value) =>
              updateFilter(
                "drinking",
                (value || undefined) as
                  | DrinkingPreference
                  | undefined
              )
            }
          />

          <FilterSelect
            label="Pets"
            value={filters.pets ?? ""}
            options={petPreferences}
            onChange={(value) =>
              updateFilter(
                "pets",
                (value || undefined) as
                  | PetPreference
                  | undefined
              )
            }
          />

          <FilterSelect
            label="Sleep Schedule"
            value={filters.sleep_schedule ?? ""}
            options={sleepSchedules}
            onChange={(value) =>
              updateFilter(
                "sleep_schedule",
                (value || undefined) as
                  | SleepSchedule
                  | undefined
              )
            }
          />

          <FilterSelect
            label="Cleanliness"
            value={filters.cleanliness ?? ""}
            options={cleanlinessLevels}
            onChange={(value) =>
              updateFilter(
                "cleanliness",
                (value || undefined) as
                  | CleanlinessLevel
                  | undefined
              )
            }
          />

          <FilterSelect
            label="Work Schedule"
            value={filters.work_schedule ?? ""}
            options={workSchedules}
            onChange={(value) =>
              updateFilter(
                "work_schedule",
                (value || undefined) as
                  | WorkSchedule
                  | undefined
              )
            }
          />

          <FilterSelect
            label="Sharing Type"
            value={filters.sharing_type ?? ""}
            options={sharingTypes}
            onChange={(value) =>
              updateFilter(
                "sharing_type",
                (value || undefined) as
                  | SharingType
                  | undefined
              )
            }
          />

          <div>
            <FilterLabel>Move-in By</FilterLabel>

            <input
              type="date"
              value={filters.move_in_date ?? ""}
              onChange={(e) =>
                updateFilter(
                  "move_in_date",
                  e.target.value || undefined
                )
              }
              className="w-full rounded-2xl border border-[#205C46]/40 bg-[#10271F] px-4 py-3 text-sm text-[#FBFAF7] outline-none transition focus:border-[#D4A34F] focus:ring-4 focus:ring-[#D4A34F]/10"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D4A34F] px-4 py-3 font-semibold text-[#071512] transition hover:bg-[#F0C86A]"
        >
          <RotateCcw size={18} />
          Clear All Filters
        </button>
      </aside>
    </>
  );
}

interface FilterLabelProps {
  children: React.ReactNode;
}

function FilterLabel({
  children,
}: FilterLabelProps) {
  return (
    <label className="mb-2.5 block text-sm font-semibold text-[#D6E0DB]">
      {children}
    </label>
  );
}

interface FilterInputProps {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

function FilterInput({
  label,
  value,
  placeholder,
  onChange,
}: FilterInputProps) {
  return (
    <div>
      <FilterLabel>{label}</FilterLabel>

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-2xl border border-[#205C46]/40 bg-[#10271F] px-4 py-3 text-sm text-[#FBFAF7] outline-none transition placeholder:text-[#6F8179] hover:border-[#205C46]/70 focus:border-[#D4A34F] focus:ring-4 focus:ring-[#D4A34F]/10"
      />
    </div>
  );
}

interface NumberInputProps {
  label: string;
  value?: number;
  placeholder: string;
  onChange: (value: number | undefined) => void;
}

function NumberInput({
  label,
  value,
  placeholder,
  onChange,
}: NumberInputProps) {
  return (
    <input
      type="number"
      min={0}
      aria-label={label}
      value={value ?? ""}
      placeholder={placeholder}
      onChange={(event) => {
        const inputValue = event.target.value;

        onChange(
          inputValue
            ? Number(inputValue)
            : undefined
        );
      }}
      className="w-full rounded-2xl border border-[#205C46]/40 bg-[#10271F] px-4 py-3 text-sm text-[#FBFAF7] outline-none transition placeholder:text-[#6F8179] hover:border-[#205C46]/70 focus:border-[#D4A34F] focus:ring-4 focus:ring-[#D4A34F]/10"
    />
  );
}

interface FilterSelectProps {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: FilterSelectProps) {
  return (
    <div>
      <FilterLabel>{label}</FilterLabel>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full cursor-pointer rounded-2xl border border-[#205C46]/40 bg-[#10271F] px-4 py-3 text-sm text-[#FBFAF7] outline-none transition hover:border-[#205C46]/70 focus:border-[#D4A34F] focus:ring-4 focus:ring-[#D4A34F]/10"
      >
        <option
          value=""
          className="bg-[#10271F] text-[#FBFAF7]"
        >
          All
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-[#10271F] text-[#FBFAF7]"
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
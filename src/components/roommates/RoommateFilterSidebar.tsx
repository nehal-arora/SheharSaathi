"use client";

import { RotateCcw, SlidersHorizontal, X } from "lucide-react";

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

interface RoommateFilterSidebarProps {
  filters: RoommateFilters;
  onChange: (filters: RoommateFilters) => void;
  onClear: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

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
    "rounded-2xl border border-gray-200 bg-white p-5 shadow-sm",
    "lg:sticky lg:top-24",
    isOpen
      ? "fixed inset-y-0 left-0 z-50 w-[88%] max-w-sm overflow-y-auto rounded-none lg:relative lg:inset-auto lg:z-auto lg:w-full lg:max-w-none lg:rounded-2xl"
      : "hidden lg:block",
  ].join(" ");

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close filter overlay"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside className={sidebarClasses}>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal
              size={20}
              className="text-[#6B8E23]"
            />

            <h2 className="text-lg font-bold text-gray-900">
              Filters
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 lg:hidden"
            aria-label="Close filters"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5">
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
            <FilterLabel>Monthly budget</FilterLabel>

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
            label="Preferred gender"
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
            label="Food preference"
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
            label="Sleep schedule"
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
            label="Work schedule"
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
            label="Sharing type"
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
            <FilterLabel>Move-in by</FilterLabel>

            <input
              type="date"
              value={filters.move_in_date ?? ""}
              onChange={(event) =>
                updateFilter(
                  "move_in_date",
                  event.target.value || undefined
                )
              }
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#6B8E23] focus:ring-4 focus:ring-[#EEF2E4]"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-[#6B8E23] px-4 py-3 font-semibold text-[#6B8E23] transition hover:bg-[#EEF2E4]"
        >
          <RotateCcw size={17} />
          Clear all filters
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
    <label className="mb-2 block text-sm font-semibold text-gray-700">
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
        className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#6B8E23] focus:ring-4 focus:ring-[#EEF2E4]"
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
      className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#6B8E23] focus:ring-4 focus:ring-[#EEF2E4]"
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
        className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#6B8E23] focus:ring-4 focus:ring-[#EEF2E4]"
      >
        <option value="">All</option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
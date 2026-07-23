"use client";

import { RotateCcw } from "lucide-react";

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

    <aside
      className="
        rounded-2xl
        border
        bg-white
        p-6
        shadow-sm
      "
    >


      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-lg font-semibold">
          Filters
        </h2>


        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
        >

          <RotateCcw className="mr-2 h-4 w-4" />

          Reset

        </Button>


      </div>



      <div className="space-y-5">


        {/* CITY */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            City
          </label>


          <Input
            value={filters.city ?? ""}
            onChange={(e) =>
              updateFilter(
                "city",
                e.target.value
              )
            }
            placeholder="Delhi"
          />


        </div>




        {/* RENT */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Maximum Rent
          </label>


          <Input

            type="number"

            value={filters.max_rent ?? ""}

            onChange={(e) =>
              updateFilter(
                "max_rent",
                e.target.value
                  ? Number(e.target.value)
                  : undefined
              )
            }

            placeholder="15000"

          />


        </div>





        {/* HOUSE TYPE */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            House Type
          </label>


          <select

            value={filters.house_type ?? ""}

            onChange={(e) =>
              updateFilter(
                "house_type",
                e.target.value as HousingFilters["house_type"]
              )
            }

            className="w-full rounded-lg border p-2"

          >

            <option value="">
              All
            </option>


            {HOUSE_TYPES.map((type) => (

              <option
                key={type}
                value={type}
              >

                {type}

              </option>

            ))}


          </select>


        </div>





        {/* SHARING TYPE */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Sharing
          </label>


          <select

            value={filters.sharing_type ?? ""}

            onChange={(e) =>
              updateFilter(
                "sharing_type",
                e.target.value as HousingFilters["sharing_type"]
              )
            }

            className="w-full rounded-lg border p-2"

          >

            <option value="">
              All
            </option>


            {SHARING_TYPES.map((type) => (

              <option
                key={type}
                value={type}
              >

                {type}

              </option>

            ))}


          </select>


        </div>





        {/* GENDER */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Gender Preference
          </label>


          <select

            value={filters.gender_preference ?? ""}

            onChange={(e) =>
              updateFilter(
                "gender_preference",
                e.target.value as HousingFilters["gender_preference"]
              )
            }

            className="w-full rounded-lg border p-2"

          >

            <option value="">
              All
            </option>


            {GENDER_OPTIONS.map((gender) => (

              <option
                key={gender}
                value={gender}
              >

                {gender}

              </option>

            ))}


          </select>


        </div>





        {/* AVAILABLE */}

        <label className="flex items-center gap-3">

          <input

            type="checkbox"

            checked={filters.available ?? false}

            onChange={(e) =>
              updateFilter(
                "available",
                e.target.checked
              )
            }

          />


          <span>
            Available Only
          </span>


        </label>






        {/* FURNISHED */}

        <label className="flex items-center gap-3">


          <input

            type="checkbox"

            checked={filters.is_furnished ?? false}

            onChange={(e) =>
              updateFilter(
                "is_furnished",
                e.target.checked
              )
            }

          />


          <span>
            Furnished Only
          </span>


        </label>



      </div>


    </aside>

  );

}
"use client";

import { useEffect, useState } from "react";

import {
  HousingFilters,
  HousingListing,
} from "@/types/housing";

import { getHousing } from "@/services/housing";

import HousingGrid from "@/components/housing/HousingGrid";
import HousingSkeleton from "@/components/housing/HousingSkeleton";
import HousingEmpty from "@/components/housing/HousingEmpty";
import SearchBar from "@/components/housing/SearchBar";
import FilterSidebar from "@/components/housing/FilterSidebar";
import Pagination from "@/components/housing/Pagination";


export default function HousingPage() {

  const [listings, setListings] = useState<HousingListing[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [filters, setFilters] = useState<HousingFilters>({});

  const [page, setPage] = useState<number>(1);

  const [totalPages, setTotalPages] = useState<number>(1);



  async function fetchHousing() {

    try {

      setLoading(true);

      const response = await getHousing({
        ...filters,
        page,
        page_size: 8,
      });


      setListings(response.items);

      setTotalPages(response.total_pages ?? 1);


    } catch (error) {

      console.error(
        "Failed to fetch housing:",
        error
      );

    } finally {

      setLoading(false);

    }

  }



  useEffect(() => {

    fetchHousing();

  }, [filters, page]);




  function handleSearch(value: string) {

    setFilters((previous) => ({
      ...previous,
      city: value,
    }));

    setPage(1);

  }





  return (

    <main
      className="
      min-h-screen
      bg-white
      px-5
      py-10
      sm:px-8
      lg:px-12
      "
    >

      <div
        className="
        mx-auto
        max-w-7xl
        "
      >


        <section className="mb-10">

          <h1
            className="
            text-4xl
            font-bold
            tracking-tight
            text-[#333333]
            "
          >
            Find Your Perfect Home
          </h1>


          <p
            className="
            mt-3
            max-w-2xl
            text-gray-500
            "
          >
            Discover verified rentals, PGs and shared spaces around your city.
          </p>


        </section>



        <div>
  SEARCH TEST
</div>



        <div
          className="
          mt-10
          grid
          gap-8
          lg:grid-cols-[280px_1fr]
          "
        >


        <div>
 FILTER TEST
</div>



          <section>


            {
              loading ? (

                <HousingSkeleton />

              ) : listings.length === 0 ? (

                <HousingEmpty />

              ) : (

                <div>
  TEST HOUSING PAGE
</div>

              )
            }



          <div>
 PAGINATION TEST
</div>


          </section>


        </div>


      </div>


    </main>

  );

}
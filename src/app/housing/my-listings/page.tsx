"use client";

import { Home } from "lucide-react";

export default function MyListingsPage() {

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
        max-w-5xl
        rounded-3xl
        border
        border-[#EEF2E4]
        bg-[#FBFAF5]
        p-10
        "
      >

        <div
          className="
          flex
          flex-col
          items-center
          justify-center
          text-center
          "
        >

          <div
            className="
            rounded-full
            bg-[#EEF2E4]
            p-5
            text-[#6B8E23]
            "
          >

            <Home size={40}/>

          </div>


          <h1
            className="
            mt-5
            text-3xl
            font-bold
            text-[#333333]
            "
          >
            My Listings
          </h1>


          <p className="mt-3 text-gray-500">
            Your uploaded properties will appear here.
          </p>


        </div>


      </div>


    </main>

  );

}
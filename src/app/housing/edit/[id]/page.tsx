"use client";

import { useParams } from "next/navigation";
import Link from "next/link";


export default function HousingDetailsPage() {

  const params = useParams();

  const id = params.id;


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
        max-w-4xl
        rounded-3xl
        border
        border-[#EEF2E4]
        bg-[#FBFAF5]
        p-10
        "
      >

        <h1
          className="
          text-3xl
          font-bold
          text-[#333333]
          "
        >
          Housing Details
        </h1>


        <p
          className="
          mt-4
          text-gray-600
          "
        >
          Listing ID: {id}
        </p>


        <Link
          href="/housing"
          className="
          mt-8
          inline-block
          rounded-xl
          bg-[#6B8E23]
          px-6
          py-3
          text-white
          "
        >
          Back to Housing
        </Link>


      </div>

    </main>

  );

}
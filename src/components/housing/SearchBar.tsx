"use client";

import { Search } from "lucide-react";
import { useState } from "react";


interface SearchBarProps {
  onSearch: (value: string) => void;
}


export default function SearchBar({
  onSearch,
}: SearchBarProps) {

  const [value,setValue] = useState("");


  function handleSubmit(
    e: React.FormEvent
  ){

    e.preventDefault();

    onSearch(value);

  }


  return (

    <form
      onSubmit={handleSubmit}
      className="
        flex
        w-full
        items-center
        gap-3
        rounded-2xl
        border
        border-[#EEF2E4]
        bg-white
        p-3
        shadow-sm
      "
    >

      <Search
        size={22}
        className="
          text-[#6B8E23]
        "
      />


      <input

        value={value}

        onChange={(e)=>
          setValue(e.target.value)
        }

        placeholder="
          Search city, locality or area...
        "

        className="
          flex-1
          bg-transparent
          outline-none
          text-[#333333]
          placeholder:text-gray-400
        "

      />


      <button
        type="submit"
        className="
          rounded-xl
          bg-[#6B8E23]
          px-6
          py-3
          font-medium
          text-white
          transition
          hover:bg-[#58751d]
        "
      >
        Search
      </button>


    </form>

  );
}
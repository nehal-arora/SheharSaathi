"use client";


import { useEffect, useState } from "react";

import housingService from "@/features/housing/services/housing.service";

import type {
  Housing,
  CreateHousingRequest,
} from "@/types/housing";



export function useHousing(){

  const [housing,setHousing] = useState<Housing[]>([]);

  const [loading,setLoading] = useState(true);



  const fetchHousing = async()=>{

    setLoading(true);

    const response =
      await housingService.getAll();


    setHousing(response.items);

    setLoading(false);

  };



  useEffect(()=>{

    fetchHousing();

  },[]);




  const createHousing = async(
    data:CreateHousingRequest
  )=>{

    const created =
      await housingService.create(data);


    setHousing(prev=>[
      ...prev,
      created
    ]);

  };




  const deleteHousing = async(
    id:string
  )=>{

    await housingService.delete(id);


    setHousing(prev=>
      prev.filter(
        item=>item.id!==id
      )
    );

  };



  return {

    housing,

    loading,

    fetchHousing,

    createHousing,

    deleteHousing,

  };

}
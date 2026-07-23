import type {
  Housing,
  HousingListResponse,
  CreateHousingRequest,
  UpdateHousingRequest,
} from "@/types/housing";

import { mockHousing } from "@/features/housing/mock/housing";


const housingService = {

  getAll: async (): Promise<HousingListResponse> => {
    return {
      items: mockHousing,
      total: mockHousing.length,
    };
  },


  getById: async (
    id: string
  ): Promise<Housing | undefined> => {

    return mockHousing.find(
      (item) => item.id === id
    );

  },


  search: async (
    query: string
  ): Promise<Housing[]> => {

    return mockHousing.filter(
      (item) =>
        item.city
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        item.locality
          .toLowerCase()
          .includes(query.toLowerCase())
    );

  },


  getMyListings: async (
    ownerId: string
  ): Promise<Housing[]> => {

    return mockHousing.filter(
      (item) =>
        item.owner_id === ownerId
    );

  },


  create: async (
    data: CreateHousingRequest
  ): Promise<Housing> => {

    const newHousing: Housing = {

      id: crypto.randomUUID(),

      owner_id: "demo-user",

      created_at: new Date().toISOString(),

      updated_at: new Date().toISOString(),

      available: true,

      verified: false,

      ...data,

    };


    mockHousing.push(newHousing);

    return newHousing;

  },


  update: async (
    id: string,
    data: UpdateHousingRequest
  ): Promise<Housing | undefined> => {


    const index = mockHousing.findIndex(
      (item) => item.id === id
    );


    if(index === -1){
      return undefined;
    }


    mockHousing[index] = {
      ...mockHousing[index],
      ...data,
      updated_at:new Date().toISOString(),
    };


    return mockHousing[index];

  },


  delete: async (
    id:string
  ):Promise<boolean>=>{


    const index = mockHousing.findIndex(
      item=>item.id===id
    );


    if(index===-1){
      return false;
    }


    mockHousing.splice(index,1);

    return true;

  },

  };


export const getAll = housingService.getAll;

export const getById = housingService.getById;

export const search = housingService.search;

export const getMyListings = housingService.getMyListings;

export const createHousing = housingService.create;

export const updateHousing = housingService.update;

export const deleteHousing = housingService.delete;


export default housingService;
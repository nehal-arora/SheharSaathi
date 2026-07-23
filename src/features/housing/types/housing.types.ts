import type {
  Housing,
  HousingFilters,
  CreateHousingRequest,
  UpdateHousingRequest,
} from "@/types/housing";


export type {
  Housing,
  HousingFilters,
  CreateHousingRequest,
  UpdateHousingRequest,
};



export type HouseType =
  | "Apartment"
  | "PG"
  | "Hostel"
  | "Flat"
  | "Villa";


export type SharingType =
  | "Single"
  | "Double"
  | "Triple";


export type GenderPreference =
  | "Any"
  | "Male"
  | "Female";



export interface HousingListResponse {
  data: Housing[];
  total?: number;
}
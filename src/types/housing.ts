export interface Housing {
  id: string;

  owner_id: string;

  created_at: string;

  updated_at: string;

  title: string;

  description: string;

  rent: number;

  deposit: number;

  city: string;

  locality: string;

  address: string;

  latitude?: number;

  longitude?: number;

  house_type: string;

  sharing_type: string;

  gender_preference: string;

  is_furnished: boolean;

  available_from: string;

  available: boolean;

  verified: boolean;

  contact_number: string;

  images: string[];
}



export interface HousingFilters {

  city?: string;

  locality?: string;

  max_rent?: number;

  house_type?: string;

  sharing_type?: string;

  gender_preference?: string;

  available?: boolean;

  is_furnished?: boolean;

}



export interface CreateHousingRequest {

  title: string;

  description: string;

  rent: number;

  deposit: number;

  city: string;

  locality: string;

  address: string;

  house_type: string;

  sharing_type: string;

  gender_preference: string;

  is_furnished: boolean;

  available_from: string;

  contact_number: string;

  images: string[];

}



export interface UpdateHousingRequest {

  title?: string;

  description?: string;

  rent?: number;

  deposit?: number;

  city?: string;

  locality?: string;

  address?: string;

  house_type?: string;

  sharing_type?: string;

  gender_preference?: string;

  is_furnished?: boolean;

  available_from?: string;

  contact_number?: string;

  images?: string[];

}



export interface HousingResponse {

  data: Housing;

}



export interface HousingListResponse {

  items: Housing[];

  total?: number;

  total_pages?: number;

}

export type HousingListing = Housing;
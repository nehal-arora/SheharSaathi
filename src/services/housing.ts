import type {
  Housing,
  HousingFilters,
  HousingListResponse,
} from "@/types/housing";

import housingService from "@/features/housing/services/housing.service";


export async function getHousing(
  filters?: HousingFilters & {
    page?: number;
    page_size?: number;
  }
): Promise<HousingListResponse> {


  let data: Housing[] = [];


  if (!filters) {

    const response = await housingService.getAll();

    return {
  ...response,
  total_pages: Math.ceil(response.items.length / 8),
};

  }


  const query =
    filters.city ||
    filters.locality ||
    "";


  if (query) {

    data = await housingService.search(query);

  } else {

    const response = await housingService.getAll();

    data = response.items;

  }


  if (filters.max_rent) {

    data = data.filter(
      (item) =>
        item.rent <= filters.max_rent!
    );

  }


  if (filters.house_type) {

    data = data.filter(
      (item) =>
        item.house_type === filters.house_type
    );

  }


  if (filters.sharing_type) {

    data = data.filter(
      (item) =>
        item.sharing_type === filters.sharing_type
    );

  }


  if (filters.gender_preference) {

    data = data.filter(
      (item) =>
        item.gender_preference === filters.gender_preference
    );

  }


  if (filters.available !== undefined) {

    data = data.filter(
      (item) =>
        item.available === filters.available
    );

  }


  if (filters.is_furnished !== undefined) {

    data = data.filter(
      (item) =>
        item.is_furnished === filters.is_furnished
    );

  }


  return {
  items: data,
  total: data.length,
  total_pages: Math.ceil(data.length / 8),
};

}



export async function getHousingDetails(
  id: string
): Promise<Housing | undefined> {

  return await housingService.getById(id);

}
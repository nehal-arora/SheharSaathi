import type { Housing } from "@/types/housing";


export function formatCurrency(
  amount: number
): string {

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

}



export function formatDate(
  date: string
): string {

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

}



export function getPrimaryImage(
  housing: Housing
): string {

  if (
    housing.images &&
    housing.images.length > 0
  ) {
    return housing.images[0];
  }


  return "/placeholder-house.jpg";

}

export function getFurnishedLabel(
  isFurnished: boolean
): string {

  return isFurnished
    ? "Furnished"
    : "Unfurnished";

}



export function getAvailabilityStatus(
  available: boolean
): string {

  return available
    ? "Available"
    : "Not Available";

}
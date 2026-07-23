import type { Housing } from "@/types/housing";

export const mockHousingListings: Housing[] = [
  {
    id: "1",
    owner_id: "user-1",

    title: "Modern 2BHK Near University",
    description:
      "Fully furnished 2BHK apartment with good connectivity and nearby facilities.",

    rent: 18000,
    deposit: 36000,

    city: "Delhi",
    locality: "North Campus",
    address: "University Road, Delhi",

    latitude: 28.6139,
    longitude: 77.2090,

    house_type: "2BHK",
    sharing_type: "Private",
    gender_preference: "Any",

    available_from: "2026-08-01",

    is_furnished: true,
    available: true,

    verified: true,

    contact_number: "9876543210",

    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    ],

    created_at: "2026-07-23",
    updated_at: "2026-07-23",
  },


  {
    id: "2",
    owner_id: "user-2",

    title: "Affordable PG for Students",
    description:
      "Clean PG with meals, WiFi and easy transport access.",

    rent: 9000,
    deposit: 10000,

    city: "Bangalore",
    locality: "Koramangala",
    address: "5th Block Koramangala",

    latitude: 12.9352,
    longitude: 77.6245,

    house_type: "PG",
    sharing_type: "Shared",
    gender_preference: "Female",

    available_from: "2026-08-15",

    is_furnished: true,
    available: true,

    verified: true,

    contact_number: "9123456789",

    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    ],

    created_at: "2026-07-23",
    updated_at: "2026-07-23",
  },
];

export const mockHousing = mockHousingListings;
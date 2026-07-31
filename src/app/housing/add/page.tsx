"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import {
  ArrowLeft,
  BadgeIndianRupee,
  Building2,
  CalendarDays,
  Check,
  Home,
  ImagePlus,
  Loader2,
  MapPin,
  Phone,
  Plus,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import api from "@/lib/api";

interface HousingFormData {
  title: string;
  description: string;
  rent: string;
  deposit: string;
  city: string;
  locality: string;
  address: string;
  house_type: string;
  sharing_type: string;
  gender_preference: string;
  is_furnished: boolean;
  available_from: string;
  contact_number: string;
  images: string;
}

const initialFormData: HousingFormData = {
  title: "",
  description: "",
  rent: "",
  deposit: "",
  city: "",
  locality: "",
  address: "",
  house_type: "",
  sharing_type: "",
  gender_preference: "",
  is_furnished: false,
  available_from: "",
  contact_number: "",
  images: "",
};

const inputClassName =
  "h-12 w-full rounded-2xl border border-[#D4A34F]/15 bg-[#071512] px-4 text-[#FBFAF7] outline-none transition placeholder:text-[#66766F] focus:border-[#D4A34F]/50 focus:ring-2 focus:ring-[#D4A34F]/10";

const textareaClassName =
  "w-full resize-none rounded-2xl border border-[#D4A34F]/15 bg-[#071512] px-4 py-3 text-[#FBFAF7] outline-none transition placeholder:text-[#66766F] focus:border-[#D4A34F]/50 focus:ring-2 focus:ring-[#D4A34F]/10";

const labelClassName = "mb-2 block text-sm font-semibold text-[#FBFAF7]";

export default function AddHousingPage() {
  const router = useRouter();

  const [formData, setFormData] =
    useState<HousingFormData>(initialFormData);

  const [loading, setLoading] = useState(false);

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleCheckboxChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: checked,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const token = localStorage.getItem("access_token");

    if (!token) {
      toast.error("Please log in before adding a listing.");
      router.push("/login");
      return;
    }

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.rent ||
      !formData.city.trim() ||
      !formData.locality.trim() ||
      !formData.address.trim() ||
      !formData.house_type ||
      !formData.contact_number.trim()
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const rent = Number(formData.rent);
    const deposit = Number(formData.deposit || 0);

    if (Number.isNaN(rent) || rent <= 0) {
      toast.error("Please enter a valid rent amount.");
      return;
    }

    if (Number.isNaN(deposit) || deposit < 0) {
      toast.error("Please enter a valid deposit amount.");
      return;
    }

    const imageUrls = formData.images
      .split(",")
      .map((image) => image.trim())
      .filter(Boolean);

    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      rent,
      deposit,
      city: formData.city.trim(),
      locality: formData.locality.trim(),
      address: formData.address.trim(),
      house_type: formData.house_type,
      sharing_type: formData.sharing_type || "Not specified",
      gender_preference: formData.gender_preference || "Any",
      is_furnished: formData.is_furnished,
      available_from: formData.available_from || null,
      contact_number: formData.contact_number.trim(),
      images: imageUrls,
    };

    try {
      setLoading(true);

      const response = await api.post("/housing/", payload);

      toast.success("Housing listing created successfully.");

      const listingId = response.data?.id;

      if (listingId) {
        router.push(`/housing/${listingId}`);
      } else {
        router.push("/housing");
      }

      router.refresh();
    } catch (error) {
      console.error("Create housing error:", error);

      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const detail = error.response?.data?.detail;

        if (status === 401) {
          localStorage.removeItem("access_token");
          toast.error("Your session has expired. Please log in again.");
          router.push("/login");
          return;
        }

        if (status === 422) {
          toast.error(
            typeof detail === "string"
              ? detail
              : "Some listing details are invalid."
          );
          return;
        }

        toast.error(
          typeof detail === "string"
            ? detail
            : "Unable to create the listing."
        );

        return;
      }

      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#071512] px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-7 inline-flex items-center gap-2 rounded-xl border border-[#D4A34F]/20 bg-[#0D211B] px-4 py-2.5 text-sm font-semibold text-[#F0C86A] transition hover:border-[#D4A34F]/40 hover:bg-[#122A22]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to listings
        </button>

        <div className="overflow-hidden rounded-[32px] border border-[#D4A34F]/15 bg-[#0D211B] shadow-[0_28px_80px_rgba(0,0,0,0.35)]">
          <header className="relative overflow-hidden border-b border-[#D4A34F]/10 bg-gradient-to-br from-[#0D211B] via-[#143126] to-[#205C46] px-6 py-10 sm:px-10 lg:px-12">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#D4A34F]/10 blur-3xl" />
            <div className="absolute -bottom-28 left-1/3 h-56 w-56 rounded-full bg-[#2D7A5E]/20 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_320px] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A34F]/25 bg-[#071512]/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#F0C86A]">
                  <Sparkles className="h-4 w-4" />
                  New property
                </div>

                <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#FBFAF7] sm:text-5xl">
                  Add a housing listing
                </h1>

                <p className="mt-4 max-w-2xl text-base leading-7 text-[#B8C5C0]">
                  Share accurate property details so students and professionals
                  can confidently discover their next home.
                </p>
              </div>

              <div className="rounded-3xl border border-[#D4A34F]/15 bg-[#071512]/55 p-6 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#D4A34F]">
                  Better listing checklist
                </p>

                <div className="mt-4 space-y-3">
                  {[
                    "Use a clear and specific title",
                    "Mention nearby landmarks",
                    "Add genuine property images",
                  ].map((tip) => (
                    <div key={tip} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D4A34F]/15 text-[#F0C86A]">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-sm text-[#C7D2CD]">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8 p-5 sm:p-8 lg:p-10">
            <section className="rounded-3xl border border-[#D4A34F]/10 bg-[#122A22] p-5 sm:p-7">
              <div className="mb-7 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#205C46]/45 text-[#F0C86A]">
                  <Home className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D4A34F]">
                    Section 01
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-[#FBFAF7]">
                    Property details
                  </h2>
                  <p className="mt-1 text-sm text-[#92A39C]">
                    Describe the home and who it is suitable for.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className={labelClassName}>
                    Listing title *
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Furnished 1 BHK near Metro"
                    required
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label htmlFor="description" className={labelClassName}>
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the property, nearby facilities and suitable tenants."
                    required
                    rows={5}
                    className={textareaClassName}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="house_type" className={labelClassName}>
                      House type *
                    </label>
                    <select
                      id="house_type"
                      name="house_type"
                      value={formData.house_type}
                      onChange={handleChange}
                      required
                      className={inputClassName}
                    >
                      <option value="">Select house type</option>
                      <option value="1 RK">1 RK</option>
                      <option value="1 BHK">1 BHK</option>
                      <option value="2 BHK">2 BHK</option>
                      <option value="3 BHK">3 BHK</option>
                      <option value="PG">PG</option>
                      <option value="Hostel">Hostel</option>
                      <option value="Independent House">Independent House</option>
                      <option value="Apartment">Apartment</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="sharing_type" className={labelClassName}>
                      Sharing type
                    </label>
                    <select
                      id="sharing_type"
                      name="sharing_type"
                      value={formData.sharing_type}
                      onChange={handleChange}
                      className={inputClassName}
                    >
                      <option value="">Select sharing type</option>
                      <option value="Private">Private</option>
                      <option value="Single Sharing">Single Sharing</option>
                      <option value="Double Sharing">Double Sharing</option>
                      <option value="Triple Sharing">Triple Sharing</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="gender_preference" className={labelClassName}>
                      Gender preference
                    </label>
                    <select
                      id="gender_preference"
                      name="gender_preference"
                      value={formData.gender_preference}
                      onChange={handleChange}
                      className={inputClassName}
                    >
                      <option value="">Select preference</option>
                      <option value="Any">Any</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Family">Family</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="available_from" className={labelClassName}>
                      Available from
                    </label>
                    <div className="relative">
                      <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D4A34F]" />
                      <input
                        id="available_from"
                        name="available_from"
                        type="date"
                        value={formData.available_from}
                        onChange={handleChange}
                        className={`${inputClassName} pl-11`}
                      />
                    </div>
                  </div>
                </div>

                <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-[#D4A34F]/12 bg-[#071512] px-5 py-4 transition hover:border-[#D4A34F]/30">
                  <div>
                    <p className="font-semibold text-[#FBFAF7]">Furnished property</p>
                    <p className="mt-1 text-sm text-[#7F9189]">
                      Select this when essential furniture is included.
                    </p>
                  </div>
                  <input
                    name="is_furnished"
                    type="checkbox"
                    checked={formData.is_furnished}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 shrink-0 accent-[#D4A34F]"
                  />
                </label>
              </div>
            </section>

            <section className="rounded-3xl border border-[#D4A34F]/10 bg-[#122A22] p-5 sm:p-7">
              <div className="mb-7 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#205C46]/45 text-[#F0C86A]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D4A34F]">
                    Section 02
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-[#FBFAF7]">
                    Rent and location
                  </h2>
                  <p className="mt-1 text-sm text-[#92A39C]">
                    Add pricing and precise location information.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="rent" className={labelClassName}>
                      Monthly rent *
                    </label>
                    <div className="relative">
                      <BadgeIndianRupee className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D4A34F]" />
                      <input
                        id="rent"
                        name="rent"
                        type="number"
                        min="1"
                        value={formData.rent}
                        onChange={handleChange}
                        placeholder="15000"
                        required
                        className={`${inputClassName} pl-11`}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="deposit" className={labelClassName}>
                      Security deposit
                    </label>
                    <div className="relative">
                      <ShieldCheck className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D4A34F]" />
                      <input
                        id="deposit"
                        name="deposit"
                        type="number"
                        min="0"
                        value={formData.deposit}
                        onChange={handleChange}
                        placeholder="30000"
                        className={`${inputClassName} pl-11`}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="city" className={labelClassName}>
                      City *
                    </label>
                    <div className="relative">
                      <Building2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D4A34F]" />
                      <input
                        id="city"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Delhi"
                        required
                        className={`${inputClassName} pl-11`}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="locality" className={labelClassName}>
                      Locality *
                    </label>
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D4A34F]" />
                      <input
                        id="locality"
                        name="locality"
                        type="text"
                        value={formData.locality}
                        onChange={handleChange}
                        placeholder="Pitampura"
                        required
                        className={`${inputClassName} pl-11`}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className={labelClassName}>
                    Complete address *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Near Pitampura Metro Station, Delhi"
                    required
                    rows={3}
                    className={textareaClassName}
                  />
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-[#D4A34F]/10 bg-[#122A22] p-5 sm:p-7">
              <div className="mb-7 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#205C46]/45 text-[#F0C86A]">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D4A34F]">
                    Section 03
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-[#FBFAF7]">
                    Contact and images
                  </h2>
                  <p className="mt-1 text-sm text-[#92A39C]">
                    Help interested users contact you and view the property.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="contact_number" className={labelClassName}>
                    Contact number *
                  </label>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D4A34F]" />
                    <input
                      id="contact_number"
                      name="contact_number"
                      type="tel"
                      value={formData.contact_number}
                      onChange={handleChange}
                      placeholder="9876543210"
                      required
                      className={`${inputClassName} pl-11`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="images" className={labelClassName}>
                    Image URLs
                  </label>
                  <div className="rounded-2xl border border-dashed border-[#D4A34F]/25 bg-[#071512]/60 p-4">
                    <div className="mb-3 flex items-center gap-3 text-[#F0C86A]">
                      <ImagePlus className="h-5 w-5" />
                      <span className="text-sm font-semibold">Property gallery</span>
                    </div>
                    <textarea
                      id="images"
                      name="images"
                      value={formData.images}
                      onChange={handleChange}
                      placeholder="Paste image URLs separated by commas"
                      rows={4}
                      className={textareaClassName}
                    />
                    <p className="mt-3 text-xs leading-5 text-[#7F9189]">
                      For multiple images, separate every URL with a comma.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <div className="flex flex-col-reverse gap-3 border-t border-[#D4A34F]/10 pt-8 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => router.push("/housing")}
                disabled={loading}
                className="rounded-2xl border border-[#D4A34F]/20 bg-[#071512] px-6 py-3 font-semibold text-[#C7D2CD] transition hover:border-[#D4A34F]/40 hover:bg-[#122A22] hover:text-[#FBFAF7] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D4A34F] px-7 py-3 font-semibold text-[#10251D] shadow-[0_12px_30px_rgba(212,163,79,0.22)] transition hover:-translate-y-0.5 hover:bg-[#E5B65B] disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Creating listing...
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5" />
                    Create listing
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  CalendarDays,
  ImageIcon,
  Loader2,
  MapPin,
  Save,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

import {
  getHousingDetails,
  updateHousing,
} from "@/services/housing";

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
  available: boolean;
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
  available: true,
};

function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const detail = error.response?.data?.detail;

    if (typeof detail === "string") {
      return detail;
    }

    if (error.response?.status === 401) {
      return "Your session has expired. Please log in again.";
    }

    if (error.response?.status === 403) {
      return "You are not allowed to edit this listing.";
    }

    if (error.response?.status === 404) {
      return "Housing listing not found.";
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong.";
}

const inputClassName =
  "h-12 w-full rounded-2xl border border-[#D4A34F]/15 bg-[#071512] px-4 text-[#FBFAF7] outline-none transition placeholder:text-[#66766F] focus:border-[#D4A34F]/50 focus:ring-2 focus:ring-[#D4A34F]/10";

const textareaClassName =
  "w-full resize-none rounded-2xl border border-[#D4A34F]/15 bg-[#071512] px-4 py-3 text-[#FBFAF7] outline-none transition placeholder:text-[#66766F] focus:border-[#D4A34F]/50 focus:ring-2 focus:ring-[#D4A34F]/10";

const labelClassName =
  "mb-2 block text-sm font-semibold text-[#FBFAF7]";

export default function EditHousingPage() {
  const params = useParams();
  const router = useRouter();

  const id = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const [formData, setFormData] =
    useState<HousingFormData>(initialFormData);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadListing() {
      const token = localStorage.getItem("access_token");

      if (!token) {
        toast.error("Please log in to edit this listing.");
        router.push("/login");
        return;
      }

      if (!id) {
        setError("Invalid listing ID.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const listing = await getHousingDetails(id);

        setFormData({
          title: listing.title ?? "",
          description: listing.description ?? "",
          rent: String(listing.rent ?? ""),
          deposit: String(listing.deposit ?? ""),
          city: listing.city ?? "",
          locality: listing.locality ?? "",
          address: listing.address ?? "",
          house_type: listing.house_type ?? "",
          sharing_type: listing.sharing_type ?? "",
          gender_preference:
            listing.gender_preference ?? "",
          is_furnished: Boolean(listing.is_furnished),
          available_from:
            listing.available_from?.slice(0, 10) ?? "",
          contact_number: listing.contact_number ?? "",
          images: Array.isArray(listing.images)
            ? listing.images.join(", ")
            : "",
          available: Boolean(listing.available),
        });
      } catch (loadError) {
        const message = getErrorMessage(loadError);

        setError(message);

        if (
          axios.isAxiosError(loadError) &&
          loadError.response?.status === 401
        ) {
          localStorage.removeItem("access_token");
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    }

    void loadListing();
  }, [id, router]);

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
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

    if (!id) {
      toast.error("Invalid listing ID.");
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
      sharing_type:
        formData.sharing_type || "Not specified",
      gender_preference:
        formData.gender_preference || "Any",
      is_furnished: formData.is_furnished,
      available_from:
        formData.available_from || null,
      contact_number:
        formData.contact_number.trim(),
      images: imageUrls,
      available: formData.available,
    };

    try {
      setSaving(true);

      await updateHousing(id, payload);

      toast.success("Listing updated successfully.");

      router.push(`/housing/${id}`);
      router.refresh();
    } catch (updateError) {
      const message = getErrorMessage(updateError);

      toast.error(message);

      if (
        axios.isAxiosError(updateError) &&
        updateError.response?.status === 401
      ) {
        localStorage.removeItem("access_token");
        router.push("/login");
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#071512] px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto flex min-h-[520px] max-w-5xl items-center justify-center rounded-[32px] border border-[#D4A34F]/15 bg-[#0D211B] shadow-[0_25px_70px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D4A34F]/20 bg-[#122A22]">
              <Loader2 className="h-8 w-8 animate-spin text-[#F0C86A]" />
            </div>

            <div>
              <p className="text-lg font-semibold text-[#FBFAF7]">
                Loading listing details
              </p>

              <p className="mt-1 text-sm text-[#9EAEA7]">
                Preparing your property information...
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#071512] px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto flex min-h-[520px] max-w-5xl items-center justify-center rounded-[32px] border border-red-400/20 bg-[#0D211B] p-8 shadow-[0_25px_70px_rgba(0,0,0,0.35)]">
          <div className="max-w-md text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-red-400/20 bg-red-400/10">
              <ShieldCheck className="h-8 w-8 text-red-300" />
            </div>

            <h1 className="mt-5 text-2xl font-bold text-[#FBFAF7]">
              Unable to edit listing
            </h1>

            <p className="mt-3 text-[#9EAEA7]">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                router.push("/housing/my-listings")
              }
              className="mt-7 rounded-2xl bg-[#D4A34F] px-6 py-3 font-semibold text-[#10251D] transition hover:bg-[#E5B65B]"
            >
              Back to My Listings
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#071512] px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-8 inline-flex items-center gap-2 rounded-xl border border-[#D4A34F]/20 bg-[#0D211B] px-4 py-2 text-sm font-semibold text-[#F0C86A] transition hover:bg-[#122A22]"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="overflow-hidden rounded-[32px] border border-[#D4A34F]/15 bg-[#0D211B] shadow-[0_25px_70px_rgba(0,0,0,0.35)]">
          <div className="border-b border-[#D4A34F]/10 bg-gradient-to-r from-[#0D211B] via-[#143126] to-[#205C46] px-6 py-9 sm:px-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A34F]/20 bg-[#071512]/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#F0C86A]">
                  <BadgeCheck size={14} />
                  Listing #{id}
                </div>

                <h1 className="mt-4 text-3xl font-bold text-[#FBFAF7] sm:text-4xl">
                  Edit Housing Listing
                </h1>

                <p className="mt-3 max-w-2xl text-[#B6C3BE]">
                  Update your property information and keep your listing accurate.
                </p>
              </div>

              <div className="rounded-3xl border border-[#D4A34F]/15 bg-[#071512]/55 p-5 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D4A34F]">
                  Listing Status
                </p>

                <p className="mt-2 text-lg font-semibold text-[#FBFAF7]">
                  {formData.available ? "Available" : "Unavailable"}
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-8 p-6 sm:p-10"
          >
            <section className="rounded-3xl border border-[#D4A34F]/10 bg-[#122A22] p-6 sm:p-7">
              <div className="mb-7 flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#205C46]/40 text-[#F0C86A]">
                  <Building2 className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D4A34F]">
                    Section 01
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-[#FBFAF7]">
                    Property Details
                  </h2>

                  <p className="mt-1 text-sm text-[#92A39C]">
                    Update the main details people see first.
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

                    <input
                      id="available_from"
                      name="available_from"
                      type="date"
                      value={formData.available_from}
                      onChange={handleChange}
                      className={inputClassName}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#D4A34F]/12 bg-[#071512] px-4 py-4">
                    <input
                      name="is_furnished"
                      type="checkbox"
                      checked={formData.is_furnished}
                      onChange={handleCheckboxChange}
                      className="h-5 w-5 accent-[#D4A34F]"
                    />

                    <span className="text-sm font-semibold text-[#FBFAF7]">
                      Furnished property
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#D4A34F]/12 bg-[#071512] px-4 py-4">
                    <input
                      name="available"
                      type="checkbox"
                      checked={formData.available}
                      onChange={handleCheckboxChange}
                      className="h-5 w-5 accent-[#D4A34F]"
                    />

                    <span className="text-sm font-semibold text-[#FBFAF7]">
                      Listing available
                    </span>
                  </label>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-[#D4A34F]/10 bg-[#122A22] p-6 sm:p-7">
              <div className="mb-7 flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#205C46]/40 text-[#F0C86A]">
                  <MapPin className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D4A34F]">
                    Section 02
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-[#FBFAF7]">
                    Rent and Location
                  </h2>

                  <p className="mt-1 text-sm text-[#92A39C]">
                    Keep pricing and address details accurate.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="rent" className={labelClassName}>
                      Monthly rent *
                    </label>

                    <input
                      id="rent"
                      name="rent"
                      type="number"
                      min="1"
                      value={formData.rent}
                      onChange={handleChange}
                      required
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label htmlFor="deposit" className={labelClassName}>
                      Security deposit
                    </label>

                    <input
                      id="deposit"
                      name="deposit"
                      type="number"
                      min="0"
                      value={formData.deposit}
                      onChange={handleChange}
                      className={inputClassName}
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="city" className={labelClassName}>
                      City *
                    </label>

                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label htmlFor="locality" className={labelClassName}>
                      Locality *
                    </label>

                    <input
                      id="locality"
                      name="locality"
                      type="text"
                      value={formData.locality}
                      onChange={handleChange}
                      required
                      className={inputClassName}
                    />
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
                    required
                    rows={3}
                    className={textareaClassName}
                  />
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-[#D4A34F]/10 bg-[#122A22] p-6 sm:p-7">
              <div className="mb-7 flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#205C46]/40 text-[#F0C86A]">
                  <ImageIcon className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D4A34F]">
                    Section 03
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-[#FBFAF7]">
                    Contact and Images
                  </h2>

                  <p className="mt-1 text-sm text-[#92A39C]">
                    Update owner contact details and listing photos.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="contact_number" className={labelClassName}>
                    Contact number *
                  </label>

                  <input
                    id="contact_number"
                    name="contact_number"
                    type="tel"
                    value={formData.contact_number}
                    onChange={handleChange}
                    required
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label htmlFor="images" className={labelClassName}>
                    Image URLs
                  </label>

                  <textarea
                    id="images"
                    name="images"
                    value={formData.images}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Separate multiple URLs with commas"
                    className={textareaClassName}
                  />

                  <p className="mt-2 text-xs text-[#7F9088]">
                    Separate multiple image URLs using commas.
                  </p>
                </div>
              </div>
            </section>

            <div className="flex flex-col-reverse gap-3 border-t border-[#D4A34F]/10 pt-8 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() =>
                  router.push("/housing/my-listings")
                }
                disabled={saving}
                className="rounded-2xl border border-[#D4A34F]/20 bg-[#071512] px-6 py-3 font-semibold text-[#FBFAF7] transition hover:bg-[#122A22] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D4A34F] px-7 py-3 font-semibold text-[#10251D] shadow-[0_12px_30px_rgba(212,163,79,0.22)] transition hover:-translate-y-0.5 hover:bg-[#E5B65B] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <Loader2 size={19} className="animate-spin" />
                    Saving changes...
                  </>
                ) : (
                  <>
                    <Save size={19} />
                    Save Changes
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
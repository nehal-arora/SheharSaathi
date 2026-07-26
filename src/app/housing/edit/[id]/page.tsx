"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { ArrowLeft, Loader2, Save } from "lucide-react";
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
      <main className="min-h-screen bg-white px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto flex min-h-[500px] max-w-4xl items-center justify-center rounded-3xl border border-[#EEF2E4] bg-[#FBFAF5]">
          <div className="flex flex-col items-center gap-4">
            <Loader2
              size={38}
              className="animate-spin text-[#6B8E23]"
            />

            <p className="font-medium text-gray-500">
              Loading listing details...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto flex min-h-[500px] max-w-4xl items-center justify-center rounded-3xl border border-red-100 bg-[#FBFAF5] p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#333333]">
              Unable to edit listing
            </h1>

            <p className="mt-3 text-gray-500">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                router.push("/housing/my-listings")
              }
              className="mt-6 rounded-xl bg-[#6B8E23] px-5 py-3 font-semibold text-white"
            >
              Back to My Listings
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#6B8E23] transition hover:opacity-75"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="rounded-3xl border border-[#EEF2E4] bg-[#FBFAF5] p-6 shadow-sm sm:p-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#333333]">
              Edit Listing
            </h1>

            <p className="mt-3 text-gray-500">
              Update your housing listing information.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <section className="space-y-5">
              <h2 className="text-xl font-semibold text-[#333333]">
                Property details
              </h2>

              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-semibold text-[#333333]"
                >
                  Listing title *
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#D6C7A1] bg-white px-4 py-3 text-[#333333] outline-none focus:border-[#6B8E23] focus:ring-2 focus:ring-[#EEF2E4]"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-semibold text-[#333333]"
                >
                  Description *
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full resize-none rounded-xl border border-[#D6C7A1] bg-white px-4 py-3 text-[#333333] outline-none focus:border-[#6B8E23] focus:ring-2 focus:ring-[#EEF2E4]"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="house_type"
                    className="mb-2 block text-sm font-semibold text-[#333333]"
                  >
                    House type *
                  </label>

                  <select
                    id="house_type"
                    name="house_type"
                    value={formData.house_type}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-[#D6C7A1] bg-white px-4 py-3 text-[#333333] outline-none focus:border-[#6B8E23] focus:ring-2 focus:ring-[#EEF2E4]"
                  >
                    <option value="">Select house type</option>
                    <option value="1 RK">1 RK</option>
                    <option value="1 BHK">1 BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                    <option value="PG">PG</option>
                    <option value="Hostel">Hostel</option>
                    <option value="Independent House">
                      Independent House
                    </option>
                    <option value="Apartment">
                      Apartment
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="sharing_type"
                    className="mb-2 block text-sm font-semibold text-[#333333]"
                  >
                    Sharing type
                  </label>

                  <select
                    id="sharing_type"
                    name="sharing_type"
                    value={formData.sharing_type}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#D6C7A1] bg-white px-4 py-3 text-[#333333] outline-none focus:border-[#6B8E23] focus:ring-2 focus:ring-[#EEF2E4]"
                  >
                    <option value="">
                      Select sharing type
                    </option>
                    <option value="Private">Private</option>
                    <option value="Single Sharing">
                      Single Sharing
                    </option>
                    <option value="Double Sharing">
                      Double Sharing
                    </option>
                    <option value="Triple Sharing">
                      Triple Sharing
                    </option>
                  </select>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="gender_preference"
                    className="mb-2 block text-sm font-semibold text-[#333333]"
                  >
                    Gender preference
                  </label>

                  <select
                    id="gender_preference"
                    name="gender_preference"
                    value={
                      formData.gender_preference
                    }
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#D6C7A1] bg-white px-4 py-3 text-[#333333] outline-none focus:border-[#6B8E23] focus:ring-2 focus:ring-[#EEF2E4]"
                  >
                    <option value="">
                      Select preference
                    </option>
                    <option value="Any">Any</option>
                    <option value="Male">Male</option>
                    <option value="Female">
                      Female
                    </option>
                    <option value="Family">
                      Family
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="available_from"
                    className="mb-2 block text-sm font-semibold text-[#333333]"
                  >
                    Available from
                  </label>

                  <input
                    id="available_from"
                    name="available_from"
                    type="date"
                    value={formData.available_from}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#D6C7A1] bg-white px-4 py-3 text-[#333333] outline-none focus:border-[#6B8E23] focus:ring-2 focus:ring-[#EEF2E4]"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#D6C7A1] bg-white px-4 py-3">
                  <input
                    name="is_furnished"
                    type="checkbox"
                    checked={formData.is_furnished}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 accent-[#6B8E23]"
                  />

                  <span className="text-sm font-semibold text-[#333333]">
                    Furnished property
                  </span>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#D6C7A1] bg-white px-4 py-3">
                  <input
                    name="available"
                    type="checkbox"
                    checked={formData.available}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 accent-[#6B8E23]"
                  />

                  <span className="text-sm font-semibold text-[#333333]">
                    Listing available
                  </span>
                </label>
              </div>
            </section>

            <section className="space-y-5 border-t border-[#EEF2E4] pt-8">
              <h2 className="text-xl font-semibold text-[#333333]">
                Rent and location
              </h2>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="rent"
                    className="mb-2 block text-sm font-semibold text-[#333333]"
                  >
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
                    className="w-full rounded-xl border border-[#D6C7A1] bg-white px-4 py-3 text-[#333333] outline-none focus:border-[#6B8E23] focus:ring-2 focus:ring-[#EEF2E4]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="deposit"
                    className="mb-2 block text-sm font-semibold text-[#333333]"
                  >
                    Security deposit
                  </label>

                  <input
                    id="deposit"
                    name="deposit"
                    type="number"
                    min="0"
                    value={formData.deposit}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#D6C7A1] bg-white px-4 py-3 text-[#333333] outline-none focus:border-[#6B8E23] focus:ring-2 focus:ring-[#EEF2E4]"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="city"
                    className="mb-2 block text-sm font-semibold text-[#333333]"
                  >
                    City *
                  </label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-[#D6C7A1] bg-white px-4 py-3 text-[#333333] outline-none focus:border-[#6B8E23] focus:ring-2 focus:ring-[#EEF2E4]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="locality"
                    className="mb-2 block text-sm font-semibold text-[#333333]"
                  >
                    Locality *
                  </label>

                  <input
                    id="locality"
                    name="locality"
                    type="text"
                    value={formData.locality}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-[#D6C7A1] bg-white px-4 py-3 text-[#333333] outline-none focus:border-[#6B8E23] focus:ring-2 focus:ring-[#EEF2E4]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm font-semibold text-[#333333]"
                >
                  Complete address *
                </label>

                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full resize-none rounded-xl border border-[#D6C7A1] bg-white px-4 py-3 text-[#333333] outline-none focus:border-[#6B8E23] focus:ring-2 focus:ring-[#EEF2E4]"
                />
              </div>
            </section>

            <section className="space-y-5 border-t border-[#EEF2E4] pt-8">
              <h2 className="text-xl font-semibold text-[#333333]">
                Contact and images
              </h2>

              <div>
                <label
                  htmlFor="contact_number"
                  className="mb-2 block text-sm font-semibold text-[#333333]"
                >
                  Contact number *
                </label>

                <input
                  id="contact_number"
                  name="contact_number"
                  type="tel"
                  value={formData.contact_number}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#D6C7A1] bg-white px-4 py-3 text-[#333333] outline-none focus:border-[#6B8E23] focus:ring-2 focus:ring-[#EEF2E4]"
                />
              </div>

              <div>
                <label
                  htmlFor="images"
                  className="mb-2 block text-sm font-semibold text-[#333333]"
                >
                  Image URLs
                </label>

                <textarea
                  id="images"
                  name="images"
                  value={formData.images}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Separate multiple URLs with commas"
                  className="w-full resize-none rounded-xl border border-[#D6C7A1] bg-white px-4 py-3 text-[#333333] outline-none focus:border-[#6B8E23] focus:ring-2 focus:ring-[#EEF2E4]"
                />
              </div>
            </section>

            <div className="flex flex-col-reverse gap-3 border-t border-[#EEF2E4] pt-8 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() =>
                  router.push(
                    "/housing/my-listings"
                  )
                }
                disabled={saving}
                className="rounded-xl border border-[#D6C7A1] bg-white px-6 py-3 font-semibold text-[#333333] transition hover:bg-[#EEF2E4] disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6B8E23] px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <Loader2
                      size={19}
                      className="animate-spin"
                    />
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
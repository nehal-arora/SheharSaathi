"use client";

import { useEffect, useState } from "react";
import {
  Clock3,
  Loader2,
  MapPin,
  Search,
  TrainFront,
  BusFront,
  Navigation,
} from "lucide-react";

import {
  getNearbyTransport,
  searchTransportRoute,
} from "@/features/transport/services/transport.service";

import type {
  NearbyTransport,
  TransportRoute,
} from "@/features/transport/types/transport.types";

export default function TransportPage() {
  const [city, setCity] = useState("Delhi");
  const [from, setFrom] = useState("Mukherjee Nagar");
  const [to, setTo] = useState("Noida");

  const [loading, setLoading] = useState(false);

  const [route, setRoute] =
    useState<TransportRoute | null>(null);

  const [nearby, setNearby] = useState<
    NearbyTransport[]
  >([]);

  const [error, setError] = useState("");

  async function handleSearch() {
    setLoading(true);
    setError("");

    try {
      const routeResult =
        await searchTransportRoute({
          city,
          from,
          to,
        });

      const nearbyResult =
        await getNearbyTransport(city, from);

      setRoute(routeResult);
      setNearby(nearbyResult);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void handleSearch();
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Transport Planner
        </h1>

        <p className="mt-2 text-neutral-500">
          Find the best metro and bus routes for your
          daily commute.
        </p>
      </div>

      <div className="grid gap-4 rounded-2xl border bg-white p-6 md:grid-cols-4">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          className="rounded-lg border p-3"
        />

        <input
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="From"
          className="rounded-lg border p-3"
        />

        <input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="Destination"
          className="rounded-lg border p-3"
        />

        <button
          onClick={handleSearch}
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#6B8E23] p-3 font-medium text-white"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Search className="h-5 w-5" />
          )}

          Search
        </button>
      </div>

      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {route && (
        <div className="mt-8 rounded-2xl border bg-white p-6">
          <h2 className="mb-5 text-xl font-semibold">
            Best Route
          </h2>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-xl bg-neutral-50 p-4">
              <TrainFront className="mb-3 h-6 w-6 text-[#6B8E23]" />

              <p className="text-sm text-neutral-500">
                Metro
              </p>

              <p className="font-semibold">
                {route.metro}
              </p>
            </div>

            <div className="rounded-xl bg-neutral-50 p-4">
              <BusFront className="mb-3 h-6 w-6 text-[#6B8E23]" />

              <p className="text-sm text-neutral-500">
                Bus
              </p>

              <p className="font-semibold">
                {route.bus}
              </p>
            </div>

            <div className="rounded-xl bg-neutral-50 p-4">
              <Clock3 className="mb-3 h-6 w-6 text-[#6B8E23]" />

              <p className="text-sm text-neutral-500">
                Estimated Time
              </p>

              <p className="font-semibold">
                {route.estimatedTime}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 rounded-2xl border bg-white p-6">
        <h2 className="mb-5 text-xl font-semibold">
          Nearby Transport
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {nearby.map((stop) => (
            <div
              key={stop.id}
              className="rounded-xl border p-4"
            >
              <div className="flex items-center gap-3">
                {stop.type === "Metro" ? (
                  <TrainFront className="h-6 w-6 text-[#6B8E23]" />
                ) : (
                  <Navigation className="h-6 w-6 text-[#6B8E23]" />
                )}

                <div>
                  <h3 className="font-semibold">
                    {stop.name}
                  </h3>

                  <p className="text-sm text-neutral-500">
                    {stop.type}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-neutral-500">
                <MapPin className="h-4 w-4" />
                {stop.distance}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
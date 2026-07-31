"use client";

import { useEffect, useState } from "react";
import {
  BusFront,
  Clock3,
  Loader2,
  MapPin,
  Navigation,
  Search,
  Sparkles,
  TrainFront,
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
  const [from, setFrom] = useState(
    "Mukherjee Nagar"
  );
  const [to, setTo] = useState("Noida");

  const [loading, setLoading] =
    useState(false);

  const [route, setRoute] =
    useState<TransportRoute | null>(null);

  const [nearby, setNearby] = useState<
    NearbyTransport[]
  >([]);

  const [error, setError] = useState("");

  async function handleSearch() {
    const trimmedCity = city.trim();
    const trimmedFrom = from.trim();
    const trimmedTo = to.trim();

    if (
      !trimmedCity ||
      !trimmedFrom ||
      !trimmedTo
    ) {
      setError(
        "Enter the city, starting point and destination."
      );

      return;
    }

    try {
      setLoading(true);
      setError("");

      const [routeResult, nearbyResult] =
        await Promise.all([
          searchTransportRoute({
            city: trimmedCity,
            from: trimmedFrom,
            to: trimmedTo,
          }),

          getNearbyTransport(
            trimmedCity,
            trimmedFrom
          ),
        ]);

      setRoute(routeResult);
      setNearby(nearbyResult);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load transport information."
      );

      setRoute(null);
      setNearby([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void handleSearch();
  }, []);

  return (
    <main className="min-h-screen bg-[#071512]">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* Hero */}

        <section className="relative overflow-hidden rounded-[36px] border border-[#205C46]/40 bg-gradient-to-br from-[#0D211B] via-[#123126] to-[#071512] p-7 shadow-[0_26px_80px_rgba(0,0,0,0.32)] sm:p-9 lg:p-10">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#D4A34F]/10 blur-3xl" />

          <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[#205C46]/20 blur-3xl" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A34F]/25 bg-[#D4A34F]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#F0C86A]">
                <Sparkles className="h-4 w-4" />
                Smart Transport Planning
              </div>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#FBFAF7] sm:text-5xl lg:text-6xl">
                Plan Your
                <span className="block text-[#F0C86A]">
                  Daily Commute
                </span>
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-[#B8C5BF] sm:text-lg">
                Search metro and bus options,
                compare your best route and discover
                nearby transport facilities from your
                starting location.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <FeatureBadge
                  icon={
                    <TrainFront className="h-4 w-4" />
                  }
                  label="Metro Routes"
                />

                <FeatureBadge
                  icon={
                    <BusFront className="h-4 w-4" />
                  }
                  label="Bus Options"
                />

                <FeatureBadge
                  icon={
                    <MapPin className="h-4 w-4" />
                  }
                  label="Nearby Stops"
                />
              </div>
            </div>

            <div className="grid w-full gap-4 sm:grid-cols-2 lg:w-auto lg:min-w-[360px]">
              <HeroStat
                icon={
                  <Navigation className="h-5 w-5" />
                }
                value={
                  route
                    ? `${from} → ${to}`
                    : "Route Search"
                }
                label="Current Journey"
              />

              <HeroStat
                icon={
                  <Clock3 className="h-5 w-5" />
                }
                value={
                  route?.estimatedTime ??
                  "Calculating"
                }
                label="Estimated Time"
              />
            </div>
          </div>
        </section>

        {/* Search Panel */}

        <section className="relative mt-8 overflow-hidden rounded-[30px] border border-[#205C46]/40 bg-[#0D211B] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)] sm:p-7">
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#D4A34F]/8 blur-3xl" />

          <div className="relative">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
                <Search className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4A34F]">
                  Route Search
                </p>

                <h2 className="mt-1 text-2xl font-bold text-[#FBFAF7]">
                  Find the Best Transport Route
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#9EAEA7]">
                  Enter your city, starting point and
                  destination to explore available
                  transport options.
                </p>
              </div>
            </div>

            <form
              className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-[1fr_1.25fr_1.25fr_auto]"
              onSubmit={(event) => {
                event.preventDefault();
                void handleSearch();
              }}
            >
              <TransportField
                id="transport-city"
                label="City"
                icon={
                  <MapPin className="h-4 w-4" />
                }
              >
                <input
                  id="transport-city"
                  type="text"
                  value={city}
                  onChange={(event) =>
                    setCity(event.target.value)
                  }
                  placeholder="Enter city"
                  className={inputClasses}
                  disabled={loading}
                  required
                />
              </TransportField>

              <TransportField
                id="transport-from"
                label="Starting point"
                icon={
                  <Navigation className="h-4 w-4" />
                }
              >
                <input
                  id="transport-from"
                  type="text"
                  value={from}
                  onChange={(event) =>
                    setFrom(event.target.value)
                  }
                  placeholder="Where are you starting?"
                  className={inputClasses}
                  disabled={loading}
                  required
                />
              </TransportField>

              <TransportField
                id="transport-to"
                label="Destination"
                icon={
                  <MapPin className="h-4 w-4" />
                }
              >
                <input
                  id="transport-to"
                  type="text"
                  value={to}
                  onChange={(event) =>
                    setTo(event.target.value)
                  }
                  placeholder="Where do you want to go?"
                  className={inputClasses}
                  disabled={loading}
                  required
                />
              </TransportField>

              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[18px] bg-[#D4A34F] px-6 font-bold text-[#071512] shadow-[0_12px_30px_rgba(212,163,79,0.22)] transition hover:-translate-y-0.5 hover:bg-[#F0C86A] disabled:cursor-not-allowed disabled:opacity-60 xl:w-auto"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Search className="h-5 w-5" />
                  )}

                  {loading
                    ? "Searching..."
                    : "Find Route"}
                </button>
              </div>
            </form>
          </div>
        </section>
                {/* Error State */}

        {error && (
          <section className="mt-6 flex items-start gap-4 rounded-[22px] border border-red-400/20 bg-red-400/10 p-5 text-red-200">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-400/20 bg-red-400/10">
              <Navigation className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-bold text-red-200">
                Unable to load transport details
              </h2>

              <p className="mt-1 text-sm leading-6 text-red-200/80">
                {error}
              </p>
            </div>
          </section>
        )}

        {/* Loading State */}

        {loading && (
          <section className="relative mt-8 flex min-h-[360px] items-center justify-center overflow-hidden rounded-[30px] border border-[#205C46]/40 bg-[#0D211B] shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4A34F]/8 blur-3xl" />

            <div className="relative flex flex-col items-center text-center">
              <div className="relative flex h-24 w-24 items-center justify-center rounded-[28px] border border-[#D4A34F]/25 bg-[#D4A34F]/10 text-[#F0C86A]">
                <TrainFront className="h-10 w-10" />

                <Loader2 className="absolute -right-3 -top-3 h-8 w-8 animate-spin rounded-full bg-[#10271F] p-1.5 text-[#F0C86A]" />
              </div>

              <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#D4A34F]">
                Searching Transport Network
              </p>

              <h2 className="mt-3 text-2xl font-bold text-[#FBFAF7]">
                Finding Your Best Route
              </h2>

              <p className="mt-3 max-w-md text-sm leading-7 text-[#9EAEA7]">
                शहरSaathi is checking metro, bus and nearby
                transport options for your journey.
              </p>

              <div className="mt-7 flex items-center gap-2">
                <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#D4A34F] [animation-delay:-0.3s]" />

                <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#D4A34F] [animation-delay:-0.15s]" />

                <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#D4A34F]" />
              </div>
            </div>
          </section>
        )}

        {/* Route Results */}

        {!loading && route && (
          <>
            {/* Route Overview */}

            <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <TransportStatCard
                icon={
                  <Clock3 className="h-6 w-6" />
                }
                label="Estimated Time"
                value={
                  route.estimatedTime ||
                  "Not available"
                }
                description="Expected journey duration"
              />

              <TransportStatCard
                icon={
                  <TrainFront className="h-6 w-6" />
                }
                label="Metro Route"
                value={
                  route.metro ||
                  "Not available"
                }
                description="Recommended metro option"
              />

              <TransportStatCard
                icon={
                  <BusFront className="h-6 w-6" />
                }
                label="Bus Route"
                value={
                  route.bus ||
                  "Not available"
                }
                description="Recommended bus option"
              />

              <TransportStatCard
                icon={
                  <Navigation className="h-6 w-6" />
                }
                label="Journey"
                value={`${from} → ${to}`}
                description={`Route within ${city}`}
              />
            </section>

            {/* Best Route */}

            <section className="relative mt-8 overflow-hidden rounded-[32px] border border-[#205C46]/40 bg-[#0D211B] p-6 shadow-[0_22px_70px_rgba(0,0,0,0.27)] sm:p-8">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#D4A34F]/8 blur-3xl" />

              <div className="relative">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
                      <Navigation className="h-6 w-6" />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4A34F]">
                        Recommended Journey
                      </p>

                      <h2 className="mt-1 text-2xl font-bold text-[#FBFAF7]">
                        Best Available Route
                      </h2>

                      <p className="mt-2 text-sm leading-6 text-[#9EAEA7]">
                        Compare the metro and bus options
                        suggested for your selected route.
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">
                    <Clock3 className="h-4 w-4" />

                    {route.estimatedTime ||
                      "Time unavailable"}
                  </div>
                </div>

                {/* Journey Timeline */}

                <div className="mt-8 rounded-[26px] border border-[#205C46]/35 bg-[#10271F] p-5 sm:p-6">
                  <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center">
                    <RoutePoint
                      icon={
                        <MapPin className="h-5 w-5" />
                      }
                      label="Starting point"
                      value={from}
                    />

                    <RouteConnector />

                    <RoutePoint
                      icon={
                        <TrainFront className="h-5 w-5" />
                      }
                      label="Metro option"
                      value={
                        route.metro ||
                        "Metro route unavailable"
                      }
                    />

                    <RouteConnector />

                    <RoutePoint
                      icon={
                        <MapPin className="h-5 w-5" />
                      }
                      label="Destination"
                      value={to}
                    />
                  </div>
                </div>

                {/* Route Options */}

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <RouteOptionCard
                    icon={
                      <TrainFront className="h-7 w-7" />
                    }
                    eyebrow="Metro Option"
                    title={
                      route.metro ||
                      "Metro information unavailable"
                    }
                    description="Use this metro recommendation when it is the most convenient option for your journey."
                  />

                  <RouteOptionCard
                    icon={
                      <BusFront className="h-7 w-7" />
                    }
                    eyebrow="Bus Option"
                    title={
                      route.bus ||
                      "Bus information unavailable"
                    }
                    description="Consider this bus route based on transport availability between the selected locations."
                  />
                </div>

                <div className="mt-6 rounded-[22px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
                      <Sparkles className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="font-bold text-[#FBFAF7]">
                        Smart Commute Tip
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-[#B8C5BF]">
                        Compare the suggested metro and bus
                        routes before leaving. Travel time may
                        vary depending on traffic, waiting time,
                        route changes and peak-hour conditions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* No Route State */}

        {!loading && !route && !error && (
          <section className="relative mt-8 flex min-h-[420px] flex-col items-center justify-center overflow-hidden rounded-[30px] border border-dashed border-[#D4A34F]/25 bg-[#0D211B] px-6 py-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4A34F]/5 blur-3xl" />

            <div className="relative flex flex-col items-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-[28px] border border-[#D4A34F]/25 bg-[#D4A34F]/10 text-[#F0C86A]">
                <Navigation className="h-10 w-10" />
              </div>

              <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#D4A34F]">
                Transport Planner
              </p>

              <h2 className="mt-3 text-3xl font-bold text-[#FBFAF7]">
                Search for a Route
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-[#9EAEA7] sm:text-base">
                Enter your city, starting point and
                destination to receive metro, bus and
                nearby transport suggestions.
              </p>
            </div>
          </section>
        )}

        {/* Nearby Transport */}

        {!loading && (
          <section className="relative mt-8 overflow-hidden rounded-[32px] border border-[#205C46]/40 bg-[#0D211B] p-6 shadow-[0_22px_70px_rgba(0,0,0,0.27)] sm:p-8">
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#D4A34F]/8 blur-3xl" />

            <div className="relative">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
                    <MapPin className="h-6 w-6" />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4A34F]">
                      Around Your Starting Point
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-[#FBFAF7]">
                      Nearby Transport
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-[#9EAEA7]">
                      Explore available transport stops
                      near {from || "your location"}.
                    </p>
                  </div>
                </div>

                <div className="inline-flex w-fit items-center rounded-full border border-[#205C46]/40 bg-[#10271F] px-4 py-2 text-sm font-semibold text-[#D6E0DB]">
                  {nearby.length}{" "}
                  {nearby.length === 1
                    ? "option found"
                    : "options found"}
                </div>
              </div>

              {nearby.length > 0 ? (
                <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {nearby.map((stop) => (
                    <NearbyTransportCard
                      key={stop.id}
                      stop={stop}
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-7 rounded-[24px] border border-dashed border-[#205C46]/40 bg-[#10271F] p-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[20px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
                    <MapPin className="h-7 w-7" />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-[#FBFAF7]">
                    No Nearby Transport Found
                  </h3>

                  <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#9EAEA7]">
                    Nearby transport information was not
                    returned for this location. Try entering
                    a more specific area or landmark.
                  </p>
                </div>
              )}
            </div>
          </section>
        )}
                {/* Travel Guidance */}

        {!loading && route && (
          <section className="relative mt-8 overflow-hidden rounded-[32px] border border-[#205C46]/40 bg-[#0D211B] p-6 shadow-[0_22px_70px_rgba(0,0,0,0.27)] sm:p-8">
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#D4A34F]/8 blur-3xl" />

            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
                  <Sparkles className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4A34F]">
                    Travel Guidance
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-[#FBFAF7]">
                    Before You Start Your Journey
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#9EAEA7]">
                    Keep these practical checks in mind for a smoother and
                    safer commute.
                  </p>
                </div>
              </div>

              <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <TravelTipCard
                  icon={<Clock3 className="h-6 w-6" />}
                  title="Check Peak Hours"
                  description="Travel time may increase during morning and evening office hours."
                />

                <TravelTipCard
                  icon={<TrainFront className="h-6 w-6" />}
                  title="Verify Metro Timing"
                  description="Confirm the first and last metro timings before planning an early or late journey."
                />

                <TravelTipCard
                  icon={<BusFront className="h-6 w-6" />}
                  title="Keep a Backup Route"
                  description="Save an alternative bus or metro option in case of delays or route closures."
                />

                <TravelTipCard
                  icon={<Navigation className="h-6 w-6" />}
                  title="Use Live Navigation"
                  description="Check current traffic and transport updates before leaving your location."
                />
              </div>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

const inputClasses =
  "h-12 w-full rounded-[18px] border border-[#205C46]/40 bg-[#10271F] pl-11 pr-4 text-sm text-[#FBFAF7] outline-none transition placeholder:text-[#6F8179] hover:border-[#205C46]/70 focus:border-[#D4A34F] focus:ring-4 focus:ring-[#D4A34F]/10 disabled:cursor-not-allowed disabled:opacity-50";

interface FeatureBadgeProps {
  icon: React.ReactNode;
  label: string;
}

function FeatureBadge({
  icon,
  label,
}: FeatureBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#205C46]/40 bg-[#0F251E]/70 px-4 py-2 text-sm font-semibold text-[#D6E0DB] backdrop-blur">
      <span className="text-[#F0C86A]">
        {icon}
      </span>

      {label}
    </div>
  );
}

interface HeroStatProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

function HeroStat({
  icon,
  value,
  label,
}: HeroStatProps) {
  return (
    <article className="rounded-[24px] border border-[#205C46]/40 bg-[#0F251E]/75 p-5 backdrop-blur">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
        {icon}
      </div>

      <p className="mt-4 line-clamp-2 break-words text-lg font-bold text-[#FBFAF7]">
        {value}
      </p>

      <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-[#7F9189]">
        {label}
      </p>
    </article>
  );
}

interface TransportFieldProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function TransportField({
  id,
  label,
  icon,
  children,
}: TransportFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-[#D6E0DB]"
      >
        {label}
      </label>

      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#F0C86A]">
          {icon}
        </span>

        {children}
      </div>
    </div>
  );
}

interface TransportStatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
}

function TransportStatCard({
  icon,
  label,
  value,
  description,
}: TransportStatCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[26px] border border-[#205C46]/35 bg-[#0D211B] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A34F]/30">
      <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#D4A34F]/8 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />

      <div className="relative">
        <div className="flex h-12 w-12 items-center justify-center rounded-[16px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
          {icon}
        </div>

        <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-[#7F9189]">
          {label}
        </p>

        <p className="mt-2 line-clamp-2 break-words text-xl font-bold text-[#FBFAF7]">
          {value}
        </p>

        <p className="mt-3 text-xs leading-5 text-[#9EAEA7]">
          {description}
        </p>
      </div>
    </article>
  );
}

interface RoutePointProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function RoutePoint({
  icon,
  label,
  value,
}: RoutePointProps) {
  return (
    <div className="rounded-[20px] border border-[#205C46]/35 bg-[#0D211B] p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
        {icon}
      </div>

      <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-[#7F9189]">
        {label}
      </p>

      <p className="mt-2 break-words text-base font-bold leading-6 text-[#FBFAF7]">
        {value}
      </p>
    </div>
  );
}

function RouteConnector() {
  return (
    <div className="flex items-center justify-center">
      <div className="hidden items-center gap-2 lg:flex">
        <span className="h-2 w-2 rounded-full bg-[#D4A34F]" />

        <span className="h-px w-10 bg-gradient-to-r from-[#D4A34F] to-[#205C46]" />

        <Navigation className="h-4 w-4 rotate-90 text-[#F0C86A]" />
      </div>

      <div className="flex flex-col items-center gap-2 lg:hidden">
        <span className="h-2 w-2 rounded-full bg-[#D4A34F]" />

        <span className="h-8 w-px bg-gradient-to-b from-[#D4A34F] to-[#205C46]" />

        <Navigation className="h-4 w-4 text-[#F0C86A]" />
      </div>
    </div>
  );
}

interface RouteOptionCardProps {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
}

function RouteOptionCard({
  icon,
  eyebrow,
  title,
  description,
}: RouteOptionCardProps) {
  return (
    <article className="rounded-[24px] border border-[#205C46]/35 bg-[#10271F] p-5 transition hover:border-[#D4A34F]/25">
      <div className="flex h-14 w-14 items-center justify-center rounded-[18px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
        {icon}
      </div>

      <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-[#D4A34F]">
        {eyebrow}
      </p>

      <h3 className="mt-2 break-words text-xl font-bold leading-7 text-[#FBFAF7]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-[#9EAEA7]">
        {description}
      </p>
    </article>
  );
}

interface NearbyTransportCardProps {
  stop: NearbyTransport;
}

function NearbyTransportCard({
  stop,
}: NearbyTransportCardProps) {
  const isMetro = stop.type === "Metro";

  return (
    <article className="group relative overflow-hidden rounded-[24px] border border-[#205C46]/35 bg-[#10271F] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A34F]/30">
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#D4A34F]/8 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />

      <div className="relative">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
            {isMetro ? (
              <TrainFront className="h-6 w-6" />
            ) : (
              <Navigation className="h-6 w-6" />
            )}
          </div>

          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#7F9189]">
              {stop.type}
            </p>

            <h3 className="mt-1 break-words text-lg font-bold text-[#FBFAF7]">
              {stop.name}
            </h3>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-[18px] border border-[#205C46]/30 bg-[#0D211B] px-4 py-3">
          <MapPin className="h-4 w-4 shrink-0 text-[#F0C86A]" />

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-[#7F9189]">
              Distance
            </p>

            <p className="mt-1 text-sm font-semibold text-[#D6E0DB]">
              {stop.distance}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

interface TravelTipCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function TravelTipCard({
  icon,
  title,
  description,
}: TravelTipCardProps) {
  return (
    <article className="rounded-[24px] border border-[#205C46]/35 bg-[#10271F] p-5 transition hover:border-[#D4A34F]/25">
      <div className="flex h-12 w-12 items-center justify-center rounded-[16px] border border-[#D4A34F]/20 bg-[#D4A34F]/10 text-[#F0C86A]">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-bold text-[#FBFAF7]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-[#9EAEA7]">
        {description}
      </p>
    </article>
  );
}
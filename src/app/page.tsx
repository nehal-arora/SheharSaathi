import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="bg-[#FBFAF5]">
        <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col items-center justify-center px-6 text-center">

          <span className="mb-5 rounded-full bg-[#EEF2E4] px-5 py-2 text-sm font-medium text-[#6B8E23]">
            AI Powered Smart Relocation Assistant
          </span>

          <h1 className="max-w-4xl text-5xl font-extrabold leading-tight text-[#333333] md:text-7xl">
            Move to a New City
            <br />
            <span className="text-[#6B8E23]">Without the Stress.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-600">
            शहरSaathi helps students and professionals find verified housing,
            compatible roommates, manage expenses, discover localities, and
            relocate confidently—all in one platform.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <a
              href="/signup"
              className="rounded-xl bg-[#6B8E23] px-8 py-4 font-semibold text-white transition hover:bg-[#556B1F]"
            >
              Get Started
            </a>

            <a
              href="#features"
              className="rounded-xl border border-[#6B8E23] px-8 py-4 font-semibold text-[#6B8E23] transition hover:bg-[#EEF2E4]"
            >
              Explore Features
            </a>

          </div>

        </section>
      </main>
    </>
  );
}
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import SearchBar from "../ui/SearchBar";

export default function HeroSection() {
  const router = useRouter();

  const handleSearch = (search: string, location: string) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (location) params.set("location", location);

    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <section className="bg-[#F8F8FD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left column: text + search + popular tags */}
          <div className="relative">
            <h1 className="text-[64px] lg:text-[72px] font-extrabold text-[#1D1D1F] leading-[1.1] mb-6">
              Discover <br />
              more than{" "}
              <span className="text-accent relative inline-block">
                5000+ Jobs
                <svg
                  className="absolute -bottom-3 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8 C80 2, 200 2, 298 8"
                    stroke="#26A4FF"
                    strokeWidth="4"
                    strokeLinecap="butt"
                  />
                </svg>
                <svg
                  className="absolute -bottom-5 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8 C80 2, 200 2, 298 8"
                    stroke="#26A4FF"
                    strokeWidth="4"
                    strokeLinecap="butt"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-gray-500 text-lg max-w-lg mb-8">
              Great platform for the job seeker that searching for new career
              heights and passionate about startups.
            </p>

            {/* SearchBar with required onSearch prop */}
            <div className="relative z-20 -mr-20">
              <SearchBar onSearch={handleSearch} />
            </div>

            {/* Popular tags */}
            <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
              <span className="font-medium">Popular :</span>
              <span className="text-gray-500">
                UI Designer, UX Researcher, Android, Admin
              </span>
            </div>
          </div>

          {/* Right column */}
          <div className="hidden lg:flex justify-end relative -ml-20 z-10">
            <div className="relative w-[501px] h-[707px]">
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-4 left-4 w-[480px] h-[690px] border border-[#26A4FF]" />
                <div className="absolute top-12 left-12 w-[468px] h-[674px] border border-[#26A4FF] opacity-50" />
                <div className="absolute top-20 left-20 w-[456px] h-[658px] border border-[#26A4FF] opacity-30" />
              </div>

              {/* Hero Image */}
              <Image
                src="/hero.png"
                alt="Jobs illustration"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 501px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

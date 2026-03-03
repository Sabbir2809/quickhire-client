import CategoriesSection from "@/components/home/CategoriesSection";
import CompaniesSection from "@/components/home/CompaniesSection";
import CTASection from "@/components/home/CTASection";
import FeaturedJobsSection from "@/components/home/FeaturedJobsSection";
import HeroSection from "@/components/home/HeroSection";
import LatestJobsSection from "@/components/home/LatestJobsSection";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <CompaniesSection />
      <CategoriesSection />
      <CTASection />
      {/* Featured Jobs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-10">
          <h2 className="section-title flex items-center gap-2">
            Featured <span className="text-primary">jobs</span>
          </h2>
          <Link
            href="/jobs?featured=true"
            className="text-primary font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all group"
          >
            Show all jobs
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <FeaturedJobsSection />
      </section>
      {/* Latest Jobs Section */}
      <section className="bg-[#F8F8FD] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex justify-between items-center mb-10">
            <h2 className="section-title flex items-center gap-2">
              Latest <span className="text-primary">jobs open</span>
            </h2>
            <Link
              href="/jobs"
              className="text-primary font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all group"
            >
              Show all jobs
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <LatestJobsSection />
        </div>
      </section>
    </main>
  );
}

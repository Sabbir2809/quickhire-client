import CategoriesSection from "@/components/home/CategoriesSection";
import CompaniesSection from "@/components/home/CompaniesSection";
import CTASection from "@/components/home/CTASection";
import HeroSection from "@/components/home/HeroSection";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <CompaniesSection />
      <CategoriesSection />
      <CTASection />
    </main>
  );
}

import CategoriesSection from "@/components/home/CategoriesSection";
import CompaniesSection from "@/components/home/CompaniesSection";
import HeroSection from "@/components/home/HeroSection";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <CompaniesSection />
      <CategoriesSection />
    </main>
  );
}

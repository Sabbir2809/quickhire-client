import CompaniesSection from "@/components/home/CompaniesSection";
import HeroSection from "@/components/home/HeroSection";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CompaniesSection />
    </div>
  );
}

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import type { ReactNode } from "react";

export const metadata = {
  title: "QuickHire - Login / Register",
  description: "Great platform for job seekers passionate about startups.",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

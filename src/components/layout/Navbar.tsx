"use client";

import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const { isAdmin, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="bg-[#F8F8FD] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Links */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1">
              <Image
                src="/logo.svg"
                alt="QuickHire Logo"
                width={32}
                height={32}
              />
              <span className="font-bold text-xl text-gray-900">QuickHire</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/jobs"
                className="text-gray-600 hover:text-primary font-medium text-sm transition-colors"
              >
                Find Jobs
              </Link>
              <Link
                href="/jobs?featured=true"
                className="text-gray-600 hover:text-primary font-medium text-sm transition-colors"
              >
                Browse Companies
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="text-gray-600 hover:text-primary font-medium text-sm transition-colors"
                >
                  Admin
                </Link>
              )}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAdmin ? (
              <>
                <Link
                  href="/admin"
                  className="text-gray-600 hover:text-primary font-medium text-sm"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn-outline text-sm py-2 px-4"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/admin/login"
                  className="font-semibold text-primary hover:font-bold transition-colors"
                >
                  Login
                </Link>

                <div className="w-px h-8 bg-gray-300" />

                <Link
                  href="/admin/register"
                  className="btn-primary text-sm py-2.5 px-5"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 flex flex-col gap-2">
            <Link
              href="/jobs"
              className="text-gray-600 hover:text-primary font-medium text-sm"
            >
              Find Jobs
            </Link>
            <Link
              href="/jobs?featured=true"
              className="text-gray-600 hover:text-primary font-medium text-sm"
            >
              Browse Companies
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                className="text-gray-600 hover:text-primary font-medium text-sm"
              >
                Admin
              </Link>
            )}
            {isAdmin ? (
              <button
                onClick={handleLogout}
                className="btn-outline text-sm py-2 px-4"
              >
                Logout
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/admin/login"
                  className="font-semibold text-primary hover:font-bold transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/admin/login"
                  className="btn-primary text-sm py-2.5 px-5"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

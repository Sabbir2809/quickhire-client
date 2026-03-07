"use client";

import Image from "next/image";
import { FiBriefcase, FiFileText, FiGrid } from "react-icons/fi";
import AdminBottomActions from "./AdminBottomActions";
import AdminNavItem from "./AdminNavItem";

export default function AdminSidebar() {
  const NAV_ITEMS = [
    { href: "/admin", label: "Dashboard", icon: FiGrid, exact: true },
    { href: "/admin/jobs", label: "Manage Jobs", icon: FiBriefcase },
    { href: "/admin/applications", label: "Applications", icon: FiFileText },
  ];

  return (
    <aside className="w-64 bg-[#0F172A] text-white flex flex-col fixed top-0 left-0 h-full z-40 shadow-2xl">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        <div className="w-9 h-9 bg-indigo-500 rounded-lg flex items-center justify-center shrink-0">
          <Image src="/logo.svg" alt="QuickHire" width={22} height={22} />
        </div>

        <div>
          <p className="font-bold text-base text-white leading-tight">
            QuickHire
          </p>
          <p className="text-[11px] text-slate-400 font-medium tracking-wide uppercase">
            Admin Panel
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-0.5">
        {NAV_ITEMS.map((item) => (
          <AdminNavItem key={item.href} {...item} />
        ))}
      </nav>

      <AdminBottomActions />
    </aside>
  );
}

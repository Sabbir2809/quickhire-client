"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  label: string;
  icon: any;
  exact?: boolean;
};

export default function AdminNavItem({
  href,
  label,
  icon: Icon,
  exact,
}: Props) {
  const pathname = usePathname();

  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
        isActive
          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/50"
          : "text-slate-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      <Icon
        size={17}
        className={`shrink-0 ${
          isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"
        }`}
      />
      {label}
    </Link>
  );
}

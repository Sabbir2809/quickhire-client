"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiExternalLink, FiLogOut } from "react-icons/fi";

export default function AdminBottomActions() {
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <div className="px-3 pb-5 space-y-0.5 border-t border-white/10 pt-4">
      <Link
        href="/"
        target="_blank"
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-all"
      >
        <FiExternalLink size={17} />
        View Site
      </Link>

      <button
        onClick={() => {
          logout();
          router.push("/");
        }}
        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-500/15 hover:text-red-400 transition-all"
      >
        <FiLogOut size={17} />
        Logout
      </button>
    </div>
  );
}

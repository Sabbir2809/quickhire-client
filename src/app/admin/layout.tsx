import AdminSidebar from "@/components/admin/AdminSidebar";
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F5F7FA]">
      <AdminSidebar />

      <main className="flex-1 ml-64 min-h-screen">{children}</main>
    </div>
  );
}

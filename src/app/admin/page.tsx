"use client";

import DashboardStats from "@/components/admin/DashboardStats";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useAuth } from "@/hooks/useAuth";
import { dashboardServices } from "@/services/dashboardServices";
import { Stats } from "@/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FiBriefcase,
  FiCheckCircle,
  FiFileText,
  FiStar,
  FiTrendingUp,
  FiXCircle,
} from "react-icons/fi";

export default function AdminDashboard() {
  const { isAdmin, loading: authLoading } = useAuth();
  const [statsData, setStatsData] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    setLoading(true);
    try {
      const response = await dashboardServices.getStats();
      setStatsData(response.data.data);
    } catch {
      toast.error("Failed to load dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) return <LoadingSpinner />;
  if (!isAdmin) return null;

  const applicationsByStatus = statsData?.applicationsByStatus || {
    pending: 0,
    reviewed: 0,
    accepted: 0,
    rejected: 0,
  };

  const stats = [
    {
      label: "Total Jobs",
      value: statsData?.totalJobs || 0,
      icon: FiBriefcase,
      color: "bg-blue-50 text-blue-600",
      accent: "border-blue-200",
      href: "/admin/jobs",
    },
    {
      label: "Featured Jobs",
      value: statsData?.featuredJobs || 0,
      icon: FiStar,
      color: "bg-amber-50 text-amber-600",
      accent: "border-amber-200",
      href: "/admin/jobs",
    },
    {
      label: "Total Applications",
      value: statsData?.totalApplications || 0,
      icon: FiFileText,
      color: "bg-emerald-50 text-emerald-600",
      accent: "border-emerald-200",
      href: "/admin/applications",
    },
    {
      label: "Pending",
      value: applicationsByStatus.pending,
      icon: FiTrendingUp,
      color: "bg-purple-50 text-purple-600",
      accent: "border-purple-200",
      href: "/admin/applications",
    },
    {
      label: "Reviewed",
      value: applicationsByStatus.reviewed,
      icon: FiCheckCircle,
      color: "bg-sky-50 text-sky-600",
      accent: "border-sky-200",
      href: "/admin/applications",
    },
    {
      label: "Accepted",
      value: applicationsByStatus.accepted,
      icon: FiCheckCircle,
      color: "bg-green-50 text-green-600",
      accent: "border-green-200",
      href: "/admin/applications",
    },
    {
      label: "Rejected",
      value: applicationsByStatus.rejected,
      icon: FiXCircle,
      color: "bg-red-50 text-red-600",
      accent: "border-red-200",
      href: "/admin/applications",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="mb-8 text-2xl font-bold text-gray-900">Dashboard</h1>
      <DashboardStats stats={stats} />
    </div>
  );
}

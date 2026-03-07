"use client";

import DashboardStats from "@/components/admin/DashboardStats";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useAuth } from "@/hooks/useAuth";
import { applicationServices } from "@/services/applicationsServices";
import { jobServices } from "@/services/jobsServices";
import { Application, Job } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiBriefcase, FiFileText, FiStar, FiTrendingUp } from "react-icons/fi";

export default function AdminDashboard() {
  const { isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAdmin) router.push("/login");
  }, [isAdmin, authLoading, router]);

  useEffect(() => {
    if (isAdmin) fetchData();
  }, [isAdmin]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [jobsRes, appsRes] = await Promise.all([
        jobServices.getAll({ limit: 100 }),
        applicationServices.getAll({ limit: 100 }),
      ]);
      setJobs(jobsRes.data.data || []);
      setApplications(appsRes.data.data || []);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) return <LoadingSpinner />;
  if (!isAdmin) return null;

  const stats = [
    {
      label: "Total Jobs",
      value: jobs.length,
      icon: FiBriefcase,
      color: "bg-blue-50 text-blue-600",
      accent: "border-blue-200",
      href: "/admin/jobs",
    },
    {
      label: "Applications",
      value: applications.length,
      icon: FiFileText,
      color: "bg-emerald-50 text-emerald-600",
      accent: "border-emerald-200",
      href: "/admin/applications",
    },
    {
      label: "Featured Jobs",
      value: jobs.filter((j) => j.isFeatured).length,
      icon: FiStar,
      color: "bg-amber-50 text-amber-600",
      accent: "border-amber-200",
      href: "/admin/jobs",
    },
    {
      label: "Pending Review",
      value: applications.filter((a) => a.status === "pending").length,
      icon: FiTrendingUp,
      color: "bg-purple-50 text-purple-600",
      accent: "border-purple-200",
      href: "/admin/applications",
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <DashboardStats stats={stats} />
    </div>
  );
}

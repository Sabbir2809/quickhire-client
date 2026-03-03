"use client";

import AddJobForm from "@/components/admin/AddJobForm";
import ApplicationsTab from "@/components/admin/ApplicationsTab";
import JobsTab from "@/components/admin/JobsTab";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useAuth } from "@/hooks/useAuth";
import { applicationServices } from "@/services/applicationsServices";
import { jobServices } from "@/services/jobsServices";
import { Application, Job } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBriefcase, FaClipboardList, FaStar } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

export default function AdminDashboard() {
  const { isAdmin, loading: authLoading, logout } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"jobs" | "applications" | "add">(
    "jobs"
  );
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    featured: 0,
  });

  const statsData = [
    {
      label: "Total Jobs",
      value: stats.totalJobs,
      icon: <FaBriefcase />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Applications",
      value: stats.totalApplications,
      icon: <FaClipboardList />,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Featured Jobs",
      value: stats.featured,
      icon: <FaStar />,
      color: "bg-yellow-50 text-yellow-600",
    },
  ];

  // Redirect non-admins
  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push("/admin/login");
    }
  }, [isAdmin, authLoading, router]);

  // Fetch data when admin
  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [jobsRes, appsRes] = await Promise.all([
        jobServices.getAll({ limit: 100 }),
        applicationServices.getAll({ limit: 100 }),
      ]);

      const jobsData = jobsRes.data.data || [];
      const appsData = appsRes.data.data || [];

      setJobs(jobsData);
      setApplications(appsData);

      setStats({
        totalJobs: jobsRes.data.meta?.total || jobsData.length,
        totalApplications: appsRes.data.meta?.total || appsData.length,
        featured: jobsData.filter((j: Job) => j.isFeatured).length,
      });
    } catch (err: any) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    try {
      await jobServices.delete(id);
      toast.success("Job deleted successfully");
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (authLoading) return <LoadingSpinner />;
  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-1">
                <Image
                  src="/logo.svg"
                  alt="QuickHire Logo"
                  width={32}
                  height={32}
                />
                <span className="font-bold text-xl text-gray-900">
                  QuickHire
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex">
                <Link
                  href="/"
                  className="text-sm text-gray-500 hover:text-primary transition-colors"
                >
                  View Site
                </Link>
                <FiArrowRight />
              </div>
              <button
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="btn-outline text-sm py-2 px-4"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statsData.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-lg border border-gray-100 p-6 flex items-center gap-4"
            >
              <div
                className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center text-2xl`}
              >
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-extrabold text-gray-900">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
          {[
            { key: "jobs", label: "Manage Jobs" },
            { key: "applications", label: "Applications" },
            { key: "add", label: "Post New Job" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-5 py-2 rounded-md text-sm font-semibold transition-colors ${
                activeTab === tab.key
                  ? "bg-white text-primary shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {loading && activeTab !== "add" ? (
          <LoadingSpinner />
        ) : (
          <>
            {activeTab === "jobs" && (
              <JobsTab jobs={jobs} onDelete={handleDeleteJob} />
            )}
            {activeTab === "applications" && (
              <ApplicationsTab applications={applications} />
            )}
            {activeTab === "add" && (
              <AddJobForm
                onSuccess={() => {
                  fetchData();
                  setActiveTab("jobs");
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

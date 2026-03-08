"use client";

import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { JOB_CATEGORIES, JOB_TYPES } from "@/config/constants";
import { useAuth } from "@/hooks/useAuth";
import { jobServices } from "@/services/jobsServices";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FiArrowLeft,
  FiBriefcase,
  FiDollarSign,
  FiLink,
  FiList,
  FiMapPin,
  FiStar,
  FiTag,
} from "react-icons/fi";

type JobFormData = {
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  category: string;
  type: string;
  description: string;
  salary: string;
  tags: string;
  requirements: string;
  isFeatured: boolean;
};

export default function PostJobPage() {
  const { isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JobFormData>({
    defaultValues: {
      category: JOB_CATEGORIES[0] || "Technology",
      type: JOB_TYPES[0] || "Full Time",
      isFeatured: false,
    },
  });

  const onSubmit = async (data: JobFormData) => {
    try {
      const payload = {
        ...data,
        tags: data.tags
          ? data.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
        requirements: data.requirements
          ? data.requirements
              .split("\n")
              .map((r) => r.trim())
              .filter(Boolean)
          : [],
        companyLogo: data.companyLogo || undefined,
        salary: data.salary || undefined,
      };
      await jobServices.create(payload);
      toast.success("Job posted successfully!");
      router.push("/admin/jobs");
    } catch (err: any) {
      toast.error(err.message || "Failed to create job");
    }
  };

  if (authLoading) return <LoadingSpinner />;
  if (!isAdmin) return null;

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/jobs"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-4 transition-colors"
        >
          <FiArrowLeft size={15} /> Back to Jobs
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Post a New Job</h1>
        <p className="text-sm text-gray-500 mt-1">
          Fill in the details below to publish a new job listing.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {/* Section: Basic Info */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-5 flex items-center gap-2">
              <FiBriefcase size={15} /> Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("title", { required: "Job title is required" })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
                  placeholder="e.g. Senior React Developer"
                />
                {errors.title && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Company <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("company", { required: "Company is required" })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
                  placeholder="e.g. Acme Corp"
                />
                {errors.company && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.company.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                  <FiLink size={13} /> Company Logo URL
                </label>
                <input
                  {...register("companyLogo")}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                  <FiMapPin size={13} /> Location{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("location", {
                    required: "Location is required",
                  })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
                  placeholder="e.g. New York, NY or Remote"
                />
                {errors.location && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Section: Job Details */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-5 flex items-center gap-2">
              <FiList size={15} /> Job Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("category")}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition bg-white"
                >
                  {JOB_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Job Type <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("type")}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition bg-white"
                >
                  {JOB_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                  <FiDollarSign size={13} /> Salary Range
                </label>
                <input
                  {...register("salary")}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
                  placeholder="e.g. $80k – $120k"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 items-center gap-1">
                  <FiTag size={13} /> Tags (comma-separated)
                </label>
                <input
                  {...register("tags")}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
                  placeholder="e.g. React, TypeScript, Remote"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Job Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  rows={6}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition resize-none"
                  placeholder="Describe the role, responsibilities, and what makes it great..."
                />
                {errors.description && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Requirements (one per line)
                </label>
                <textarea
                  {...register("requirements")}
                  rows={4}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition resize-none"
                  placeholder={
                    "3+ years of React experience\nStrong TypeScript skills\nExperience with REST APIs"
                  }
                />
              </div>
            </div>
          </section>

          {/* Section: Options */}
          <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4 flex items-center gap-2">
              <FiStar size={15} /> Options
            </h2>
            <label className="flex items-center gap-3 cursor-pointer w-fit group">
              <div className="relative">
                <input
                  type="checkbox"
                  {...register("isFeatured")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-checked:bg-indigo-600 rounded-full transition-colors"></div>
                <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5"></div>
              </div>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                Mark as Featured Job ⭐
              </span>
            </label>
          </section>

          {/* Actions */}
          <div className="flex gap-3 pb-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
            >
              {isSubmitting ? "Posting..." : "Post Job"}
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
            >
              Clear Form
            </button>
            <Link
              href="/admin/jobs"
              className="inline-flex items-center gap-2 text-sm text-gray-500 font-medium px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

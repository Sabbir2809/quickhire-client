"use client";

import { JOB_CATEGORIES, JOB_TYPES } from "@/config/constants";
import { jobServices } from "@/services/jobsServices";
import { Job, JobFormData } from "@/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FiBriefcase,
  FiDollarSign,
  FiLink,
  FiList,
  FiMapPin,
  FiTag,
} from "react-icons/fi";

type EditJobModalProps = {
  job: Job;
  onClose: () => void;
  onUpdated: () => void;
};

export default function EditJobModal({
  job,
  onClose,
  onUpdated,
}: EditJobModalProps) {
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, reset } = useForm<JobFormData>({
    defaultValues: {
      title: job.title || "",
      company: job.company || "",
      companyLogo: job.companyLogo || "",
      location: job.location || "",
      category: job.category || JOB_CATEGORIES[0],
      type: job.type || JOB_TYPES[0],
      description: job.description || "",
      salary: job.salary || "",
      tags: job.tags?.join(", ") || "",
      requirements: job.requirements?.join("\n") || "",
      isFeatured: job.isFeatured || false,
    },
  });

  const onSubmit = async (data: JobFormData) => {
    setSubmitting(true);
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
      };
      await jobServices.update(job._id, payload);
      toast.success("Job updated successfully!");
      onUpdated();
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Failed to update job");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-lg overflow-y-auto max-h-[90vh]">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Edit Job</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 font-bold text-lg"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Info */}
            <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-5 flex items-center gap-2">
                <FiBriefcase size={15} /> Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Job Title *
                  </label>
                  <input
                    {...register("title", { required: true })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Company *
                  </label>
                  <input
                    {...register("company", { required: true })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                    <FiLink size={13} /> Company Logo URL
                  </label>
                  <input
                    {...register("companyLogo")}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                    <FiMapPin size={13} /> Location *
                  </label>
                  <input
                    {...register("location", { required: true })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
                  />
                </div>
              </div>
            </section>

            {/* Job Details */}
            <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-5 flex items-center gap-2">
                <FiList size={15} /> Job Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Category *
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
                    Job Type *
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
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                    <FiDollarSign size={13} /> Salary
                  </label>
                  <input
                    {...register("salary")}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                    <FiTag size={13} /> Tags
                  </label>
                  <input
                    {...register("tags")}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Job Description *
                  </label>
                  <textarea
                    {...register("description")}
                    rows={5}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition resize-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Requirements (one per line)
                  </label>
                  <textarea
                    {...register("requirements")}
                    rows={4}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition resize-none"
                  />
                </div>
              </div>
            </section>

            {/* Options */}
            <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
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
            <div className="flex gap-3 pb-4 flex-wrap">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
              >
                {submitting ? "Updating..." : "Update Job"}
              </button>
              <button
                type="button"
                onClick={() => reset()}
                className="inline-flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-2 text-sm text-gray-500 font-medium px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

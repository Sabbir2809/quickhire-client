// components/admin/AddJobForm.tsx
"use client";

import { jobServices } from "@/services/jobsServices";
import { JOB_CATEGORIES, JOB_TYPES } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";

interface AddJobFormProps {
  onSuccess: () => void;
}

export default function AddJobForm({ onSuccess }: AddJobFormProps) {
  const [form, setForm] = useState({
    title: "",
    company: "",
    companyLogo: "",
    location: "",
    category: JOB_CATEGORIES[0] || "Technology",
    type: JOB_TYPES[0] || "Full Time",
    description: "",
    salary: "",
    tags: "",
    requirements: "",
    isFeatured: false,
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [target.name]: target.type === "checkbox" ? target.checked : target.value,
    }));
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        tags: form.tags
          ? form.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
        requirements: form.requirements
          ? form.requirements
              .split("\n")
              .map((r) => r.trim())
              .filter(Boolean)
          : [],
        companyLogo: form.companyLogo || undefined,
        salary: form.salary || undefined,
      };

      await jobServices.create(payload);
      toast.success("Job posted successfully!");
      onSuccess();
    } catch (err: any) {
      toast.error(err.message || "Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  // Clear form
  const clearForm = () => {
    setForm({
      title: "",
      company: "",
      companyLogo: "",
      location: "",
      category: JOB_CATEGORIES[0] || "Technology",
      type: JOB_TYPES[0] || "Full Time",
      description: "",
      salary: "",
      tags: "",
      requirements: "",
      isFeatured: false,
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Post a New Job</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Job Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Job Title *
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="e.g. Senior React Developer"
            />
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Company *
            </label>
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="e.g. Acme Corp"
            />
          </div>

          {/* Company Logo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Company Logo URL
            </label>
            <input
              name="companyLogo"
              value={form.companyLogo}
              onChange={handleChange}
              className="input-field"
              placeholder="https://..."
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Location *
            </label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="e.g. New York, NY or Remote"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="input-field"
            >
              {JOB_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Job Type *
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="input-field"
            >
              {JOB_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Salary Range
            </label>
            <input
              name="salary"
              value={form.salary}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g. $80k - $120k"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tags (comma-separated)
            </label>
            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g. React, TypeScript, Remote"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Job Description *
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={6}
              className="input-field resize-none"
              placeholder="Describe the role, responsibilities, and what makes it great..."
            />
          </div>

          {/* Requirements */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Requirements (one per line)
            </label>
            <textarea
              name="requirements"
              value={form.requirements}
              onChange={handleChange}
              rows={4}
              className="input-field resize-none"
              placeholder="3+ years of React experience&#10;Strong TypeScript skills&#10;Experience with REST APIs"
            />
          </div>

          {/* Featured Checkbox */}
          <div className="flex items-center gap-3 md:col-span-2">
            <input
              type="checkbox"
              name="isFeatured"
              id="isFeatured"
              checked={form.isFeatured}
              onChange={handleChange}
              className="w-4 h-4 text-primary rounded"
            />
            <label
              htmlFor="isFeatured"
              className="text-sm font-semibold text-gray-700"
            >
              Mark as Featured Job ⭐
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-8">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-60 px-8"
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
          <button
            type="button"
            onClick={clearForm}
            className="btn-outline px-8"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

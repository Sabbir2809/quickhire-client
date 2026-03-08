"use client";

import EditJobModal from "@/components/admin/EditJobModal";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { jobServices } from "@/services/jobsServices";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FiBriefcase,
  FiChevronLeft,
  FiChevronRight,
  FiEdit,
  FiEye,
  FiPlusCircle,
  FiStar,
  FiTrash2,
} from "react-icons/fi";

const PAGE_SIZE = 10;

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [editJob, setEditJob] = useState<any>(null);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await jobServices.getAll({ page, limit: PAGE_SIZE });
      setJobs(res.data.data || []);
      setTotal(res.data.meta?.total || 0);
    } catch {
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    try {
      await jobServices.delete(id);
      toast.success("Job deleted");
      fetchJobs();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete job");
    }
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Jobs</h1>
          <p className="text-sm text-gray-500 mt-1">
            {total} total job listings
          </p>
        </div>
        <Link
          href="/admin/jobs/new"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <FiPlusCircle size={16} /> Post New Job
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-20 flex justify-center">
            <LoadingSpinner />
          </div>
        ) : jobs.length === 0 ? (
          <div className="py-20 text-center">
            <div className="text-5xl mb-4">💼</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No jobs yet
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Post your first job listing to get started
            </p>
            <Link
              href="/admin/jobs/new"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors"
            >
              <FiPlusCircle size={16} /> Post a Job
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {[
                      "Job",
                      "Location",
                      "Type",
                      "Category",
                      "Featured",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {jobs.map((job) => (
                    <tr
                      key={job._id}
                      className="hover:bg-gray-50/60 transition-colors"
                    >
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                          <FiBriefcase size={16} className="text-indigo-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            {job.title}
                          </p>
                          <p className="text-xs text-gray-400">{job.company}</p>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {job.location}
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                          {job.type}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {job.category}
                      </td>

                      <td className="px-6 py-4">
                        {job.isFeatured ? (
                          <span className="inline-flex items-center gap-1 text-amber-500 text-xs font-semibold">
                            <FiStar size={13} fill="currentColor" /> Yes
                          </span>
                        ) : (
                          <span className="text-gray-300 text-xs">—</span>
                        )}
                      </td>

                      <td className="px-6 py-4 flex items-center gap-3">
                        <button
                          onClick={() => setEditJob(job)}
                          className="inline-flex items-center gap-1 text-xs text-indigo-600 font-semibold hover:underline"
                        >
                          <FiEdit size={13} /> Edit
                        </button>

                        <Link
                          href={`/jobs/${job._id}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-xs text-indigo-600 font-semibold hover:underline"
                        >
                          <FiEye size={13} /> View
                        </Link>

                        <button
                          onClick={() => handleDelete(job._id)}
                          className="inline-flex items-center gap-1 text-xs text-red-500 font-semibold hover:underline"
                        >
                          <FiTrash2 size={13} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  Showing {(page - 1) * PAGE_SIZE + 1}–
                  {Math.min(page * PAGE_SIZE, total)} of {total}
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <FiChevronLeft size={15} />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${
                          p === page
                            ? "bg-indigo-600 text-white"
                            : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}

                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <FiChevronRight size={15} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Edit Job Modal */}
      {editJob && (
        <EditJobModal
          job={editJob}
          onClose={() => setEditJob(null)}
          onUpdated={fetchJobs}
        />
      )}
    </div>
  );
}

"use client";

import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { STATUS_STYLES, STATUSES } from "@/config/constants";
import { useAuth } from "@/hooks/useAuth";
import { applicationServices } from "@/services/applicationsServices";
import { Application } from "@/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FiChevronLeft,
  FiChevronRight,
  FiExternalLink,
  FiFileText,
  FiTrash2,
} from "react-icons/fi";

const PAGE_SIZE = 10;

export default function ApplicationsPage() {
  const { isAdmin, loading: authLoading } = useAuth();

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchApplications();
  }, [page]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const params = { page, limit: PAGE_SIZE };
      const res = await applicationServices.getAll(params);

      setApplications(res.data.data || []);
      setTotal(res.data.meta?.total || 0);
    } catch {
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (app: Application, newStatus: string) => {
    try {
      await applicationServices.updateStatus(app._id, newStatus);
      toast.success(`Status updated to ${newStatus}`);
      fetchApplications();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (app: Application) => {
    if (!confirm("Are you sure you want to delete this application?")) return;

    try {
      await applicationServices.delete(app._id);
      toast.success("Application deleted");
      fetchApplications();
    } catch {
      toast.error("Failed to delete application");
    }
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  if (authLoading) return <LoadingSpinner />;
  if (!isAdmin) return null;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
        <p className="text-sm text-gray-500 mt-1">{total} total applications</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-20 flex justify-center">
            <LoadingSpinner />
          </div>
        ) : applications.length === 0 ? (
          <div className="py-20 text-center">
            <div className="text-5xl mb-4">📋</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No applications found
            </h3>
            <p className="text-gray-500 text-sm">
              Applications will appear here when candidates apply
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {[
                      "Applicant",
                      "Job",
                      "Resume",
                      "Status",
                      "Applied",
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
                  {applications.map((app) => (
                    <tr
                      key={app._id}
                      className="hover:bg-gray-50/60 transition-colors"
                    >
                      {/* Applicant */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                            {app.name?.charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <p className="font-semibold text-gray-900 text-sm">
                              {app.name}
                            </p>
                            <p className="text-xs text-gray-400">{app.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Job */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <FiFileText size={13} className="text-gray-300" />
                          <span className="text-sm text-gray-600">
                            {typeof app.jobId === "object"
                              ? (app.jobId as any).title
                              : "Job"}
                          </span>
                        </div>
                      </td>

                      {/* Resume */}
                      <td className="px-6 py-4">
                        <a
                          href={app.resumeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-indigo-600 font-semibold hover:underline"
                        >
                          <FiExternalLink size={12} />
                          View Resume
                        </a>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <select
                          value={app.status}
                          onChange={(e) =>
                            handleStatusChange(app, e.target.value)
                          }
                          className={`text-xs font-semibold px-2 py-1 rounded ${
                            STATUS_STYLES[app.status] ||
                            "bg-gray-50 text-gray-600"
                          }`}
                        >
                          {STATUSES.map((status) => (
                            <option key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-xs text-gray-400">
                        {new Date(app.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={() => handleDelete(app)}
                          className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                        >
                          <FiTrash2 size={16} />
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
                    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40"
                  >
                    <FiChevronLeft size={15} />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-8 h-8 rounded-lg text-xs font-semibold ${
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
                    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40"
                  >
                    <FiChevronRight size={15} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

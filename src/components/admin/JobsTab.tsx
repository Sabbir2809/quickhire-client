"use client";

import { Job } from "@/types";
import Link from "next/link";

interface JobsTabProps {
  jobs: Job[];
  onDelete: (id: string) => void;
}

export default function JobsTab({ jobs, onDelete }: JobsTabProps) {
  if (!jobs.length)
    return (
      <div className="bg-white rounded-lg border border-gray-100 p-12 text-center">
        <div className="text-5xl mb-4">💼</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No jobs yet</h3>
        <p className="text-gray-500">
          Post your first job listing to get started
        </p>
      </div>
    );

  return (
    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Job
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Featured
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {jobs.map((job) => (
              <tr key={job._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-semibold text-gray-900 text-sm">
                    {job.title}
                  </p>
                  <p className="text-xs text-gray-500">{job.company}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {job.location}
                </td>
                <td className="px-6 py-4">
                  <span className="badge bg-green-50 text-green-700 text-xs">
                    {job.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {job.category}
                </td>
                <td className="px-6 py-4">
                  {job.isFeatured ? (
                    <span className="text-yellow-500 text-sm">⭐ Yes</span>
                  ) : (
                    <span className="text-gray-400 text-sm">No</span>
                  )}
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <Link
                    href={`/jobs/${job._id}`}
                    className="text-xs text-primary font-medium hover:underline"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => onDelete(job._id)}
                    className="text-xs text-red-500 font-medium hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

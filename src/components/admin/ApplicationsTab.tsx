"use client";

import { Application } from "@/types";

interface ApplicationsTabProps {
  applications: Application[];
}

export default function ApplicationsTab({
  applications,
}: ApplicationsTabProps) {
  if (!applications.length)
    return (
      <div className="bg-white rounded-lg border border-gray-100 p-12 text-center">
        <div className="text-5xl mb-4">📋</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          No applications yet
        </h3>
        <p className="text-gray-500">
          Applications will appear here when candidates apply
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
                Applicant
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Job
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Resume
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Applied
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {applications.map((app) => (
              <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-semibold text-gray-900 text-sm">
                    {app.name}
                  </p>
                  <p className="text-xs text-gray-500">{app.email}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {typeof app.jobId === "object"
                    ? (app.jobId as any).title
                    : "Job"}
                </td>
                <td className="px-6 py-4">
                  <a
                    href={app.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary font-medium hover:underline"
                  >
                    View Resume →
                  </a>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`badge text-xs ${
                      app.status === "accepted"
                        ? "bg-green-50 text-green-700"
                        : app.status === "rejected"
                        ? "bg-red-50 text-red-700"
                        : app.status === "reviewed"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-gray-500">
                  {new Date(app.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

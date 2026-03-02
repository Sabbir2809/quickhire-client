"use client";

import JobCard from "@/components/jobs/JobCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Job } from "@/types";
import JobsEmptyState from "./JobsEmptyState";

interface JobsGridProps {
  jobs: Job[];
  loading: boolean;
  total: number;
  hasActiveFilters: boolean;
  searchQuery: string;
  location: string;
  category: string;
  type: string;
}

export default function JobsGrid({
  jobs,
  loading,
  total,
  hasActiveFilters,
  searchQuery,
  location,
  category,
  type,
}: JobsGridProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (jobs.length === 0) {
    return <JobsEmptyState hasActiveFilters={hasActiveFilters} />;
  }

  return (
    <>
      <div className="bg-white p-4 rounded-md mb-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-700 font-semibold">{total} jobs found</p>
            {hasActiveFilters && (
              <p className="text-sm text-gray-500 mt-1">
                {[
                  searchQuery && `"${searchQuery}"`,
                  category,
                  type,
                  location && `in ${location}`,
                ]
                  .filter(Boolean)
                  .join(" • ")}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </>
  );
}

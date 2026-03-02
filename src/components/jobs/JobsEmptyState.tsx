"use client";

interface JobsEmptyStateProps {
  hasActiveFilters: boolean;
}

export default function JobsEmptyState({
  hasActiveFilters,
}: JobsEmptyStateProps) {
  return (
    <div className="text-center py-20 bg-white rounded-lg border border-gray-100">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">No jobs found</h3>
      <p className="text-gray-500">
        {hasActiveFilters
          ? "Try adjusting your search or filters"
          : "Check back later for new opportunities"}
      </p>
    </div>
  );
}

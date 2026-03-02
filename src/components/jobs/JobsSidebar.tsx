"use client";

import JobFilters from "@/components/jobs/JobFilters";

interface JobsSidebarProps {
  onFilter: (filters: {
    category?: string;
    type?: string;
    location?: string;
  }) => void;
  initialFilters: {
    category: string;
    type: string;
    location: string;
  };
}

export default function JobsSidebar({
  onFilter,
  initialFilters,
}: JobsSidebarProps) {
  return (
    <aside className="lg:w-64 flex-shrink-0">
      <JobFilters onFilter={onFilter} initialFilters={initialFilters} />
    </aside>
  );
}

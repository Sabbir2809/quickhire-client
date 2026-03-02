"use client";

import JobsGrid from "@/components/jobs/JobsGrid";
import JobsPagination from "@/components/jobs/JobsPagination";
import JobsSidebar from "@/components/jobs/JobsSidebar";
import { jobsApi } from "@/services/jobsServices";
import { Job } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function JobsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const search = searchParams.get("search") || "";
  const location = searchParams.get("location") || "";
  const category = searchParams.get("category") || "";
  const type = searchParams.get("type") || "";
  const featured = searchParams.get("featured") || "";

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const params: any = { page, limit: 12 };
      if (search) params.search = search;
      if (location) params.location = location;
      if (category) params.category = category;
      if (type) params.type = type;
      if (featured) params.featured = featured;

      const res = await jobsApi.getAll(params);
      setJobs(res.data.data || []);
      setTotal(res.data.meta?.total || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search, location, category, type, featured, page]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    params.delete("page");
    setPage(1);
    router.push(`/jobs?${params.toString()}`);
  };

  const handleFilter = (filters: {
    category?: string;
    type?: string;
    location?: string;
  }) => {
    updateParams({
      category: filters.category || "",
      type: filters.type || "",
      location: filters.location || location,
    });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = Math.ceil(total / 12);
  const hasActiveFilters = !!(search || category || type || location);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <JobsSidebar
            onFilter={handleFilter}
            initialFilters={{ category, type, location }}
          />

          <main className="flex-1">
            <JobsGrid
              jobs={jobs}
              loading={loading}
              total={total}
              hasActiveFilters={hasActiveFilters}
              searchQuery={search}
              location={location}
              category={category}
              type={type}
            />

            {!loading && jobs.length > 0 && totalPages > 1 && (
              <JobsPagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

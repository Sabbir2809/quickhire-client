import { API_BASE_URL } from "@/config";
import JobCard from "../jobs/JobCard";
import EmptyPlaceholder from "../ui/EmptyPlaceholder";

export default async function FeaturedJobsSection() {
  try {
    const res = await fetch(`${API_BASE_URL}/jobs?featured=true&limit=8`, {
      next: { revalidate: 60 },
    });

    const data = await res.json();
    const jobs = data.data || [];

    if (!jobs.length) {
      return <EmptyPlaceholder message="No featured jobs yet." />;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {jobs.map((job: any) => (
          <JobCard key={job._id} job={job} variant="grid" />
        ))}
      </div>
    );
  } catch {
    return <EmptyPlaceholder message="Could not load featured jobs." />;
  }
}

import { API_BASE_URL } from "@/config";
import JobCard from "../jobs/JobCard";
import EmptyPlaceholder from "../ui/EmptyPlaceholder";

export default async function LatestJobsSection() {
  try {
    const res = await fetch(`${API_BASE_URL}/jobs?limit=6`, {
      next: { revalidate: 30 },
    });

    const data = await res.json();
    const jobs = data.data || [];

    if (!jobs.length) {
      return <EmptyPlaceholder message="No jobs available yet." />;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job: any) => (
          <JobCard key={job._id} job={job} variant="list" />
        ))}
      </div>
    );
  } catch {
    return <EmptyPlaceholder message="Could not load latest jobs." />;
  }
}

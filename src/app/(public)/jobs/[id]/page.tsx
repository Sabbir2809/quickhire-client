import Breadcrumb from "@/components/jobs/jobDetails/Breadcrumb";
import JobDescription from "@/components/jobs/jobDetails/JobDescription";
import JobHeader from "@/components/jobs/jobDetails/JobHeader";
import JobRequirements from "@/components/jobs/jobDetails/JobRequirements";
import JobSidebar from "@/components/jobs/jobDetails/JobSidebar";
import { API_BASE_URL } from "@/config";
import Link from "next/link";

async function getJob(id: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch {
    return null;
  }
}

export default async function JobDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const job = await getJob(params.id);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Job Not Found
          </h1>
          <p className="text-gray-500 mb-6">
            This job listing may have been removed or doesn't exist.
          </p>
          <Link href="/jobs" className="btn-primary">
            Browse All Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Breadcrumb jobTitle={job.title} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <JobHeader job={job} />
          <JobDescription description={job.description} />
          <JobRequirements requirements={job.requirements} />
        </div>
        <JobSidebar job={job} />
      </div>
    </div>
  );
}

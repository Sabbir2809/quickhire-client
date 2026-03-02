import ApplyForm from "./ApplyForm";

export default function JobSidebar({ job }: { job: any }) {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg border border-gray-100 p-6 sticky top-24">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Apply Now</h2>
        <p className="text-sm text-gray-500 mb-6">
          Complete the form below to apply for this position.
        </p>
        <ApplyForm jobId={job._id} jobTitle={job.title} />
      </div>
    </div>
  );
}

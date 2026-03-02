import { Job } from "@/types";
import Image from "next/image";
import Link from "next/link";
import Badge from "../ui/Badge";

type JobCardProps = {
  job: Job;
  variant?: "grid" | "list";
};

const typeColors: Record<string, string> = {
  "Full Time": "bg-blue-50 text-blue-600 border-blue-200",
  "Part Time": "bg-orange-50 text-orange-600 border-orange-200",
  Remote: "bg-blue-50 text-blue-600 border-blue-200",
};

export default function JobCard({ job, variant = "grid" }: JobCardProps) {
  const logoUrl = job.companyLogo;

  if (variant === "grid") {
    return (
      <Link href={`/jobs/${job._id}`}>
        <div className="p-6 border hover:border-primary/30 hover:shadow-md transition-all bg-white h-full flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 overflow-hidden bg-gray-50 border">
              <Image
                src={logoUrl}
                alt={job.company}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>

            <Badge label={job.type} colorClass={typeColors[job.type]} />
          </div>

          <h3 className="font-bold text-gray-900 mb-1 text-sm">{job.title}</h3>
          <p className="text-xs text-gray-500">
            {job.company} • {job.location}
          </p>
          <p className="text-sm text-gray-500 line-clamp-2 my-4">
            {job.description}
          </p>

          <div className="flex flex-wrap gap-1 mt-auto">
            {job.tags?.slice(0, 2).map((tag: string, i: number) => (
              <span
                key={tag}
                className={`badge text-xs rounded-full ${
                  ["bg-yellow-50 text-yellow-700", "bg-blue-50 text-blue-700"][
                    i % 2
                  ]
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/jobs/${job._id}`}>
      <div className="flex items-center gap-4 p-6 border border-gray-100 hover:border-primary/30 hover:shadow-sm transition-all bg-white">
        <div className="w-12 h-12 overflow-hidden bg-gray-50 border flex-shrink-0">
          <Image
            src={logoUrl}
            alt={job.company}
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-sm truncate">
            {job.title}
          </h3>

          <p className="text-xs text-gray-500 my-2">
            {job.company} • {job.location}
          </p>

          <div className="flex flex-wrap gap-1">
            <Badge label={job.type} colorClass={typeColors[job.type]} />

            {job.tags?.slice(0, 2).map((tag: string, i: number) => (
              <span
                key={tag}
                className={`badge text-xs rounded-full ${
                  ["bg-yellow-50 text-yellow-700", "bg-blue-50 text-blue-700"][
                    i % 2
                  ]
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

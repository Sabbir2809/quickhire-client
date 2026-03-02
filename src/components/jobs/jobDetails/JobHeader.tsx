import {
  FaCalendarAlt,
  FaDollarSign,
  FaMapMarkerAlt,
  FaTag,
} from "react-icons/fa";

const typeColors: Record<string, string> = {
  "Full Time": "bg-green-50 text-green-600 border-green-200",
  "Part Time": "bg-orange-50 text-orange-600 border-orange-200",
  Remote: "bg-blue-50 text-blue-600 border-blue-200",
  Contract: "bg-purple-50 text-purple-600 border-purple-200",
  Internship: "bg-yellow-50 text-yellow-600 border-yellow-200",
};

export default function JobHeader({ job }: any) {
  const postedDate = new Date(job.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-8 mb-6">
      <div className="flex items-start gap-6">
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
          <img
            src={job.companyLogo}
            alt={job.company}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between flex-wrap gap-2">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 mb-1">
                {job.title}
              </h1>
              <p className="text-gray-600 font-medium">{job.company}</p>
            </div>
            <span
              className={`badge border ${
                typeColors[job.type] ||
                "bg-gray-100 text-gray-600 border-gray-200"
              }`}
            >
              {job.type}
            </span>
          </div>

          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <FaMapMarkerAlt className="w-4 h-4" /> {job.location}
            </span>
            <span className="flex items-center gap-1.5">
              <FaTag className="w-4 h-4" /> {job.category}
            </span>
            {job.salary && (
              <span className="flex items-center gap-1.5">
                <FaDollarSign className="w-4 h-4" /> {job.salary}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <FaCalendarAlt className="w-4 h-4" /> Posted {postedDate}
            </span>
          </div>

          {job.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {job.tags.map((tag: string, i: number) => (
                <span
                  key={tag}
                  className={`badge ${
                    [
                      "bg-yellow-50 text-yellow-700",
                      "bg-blue-50 text-blue-700",
                      "bg-green-50 text-green-700",
                    ][i % 3]
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

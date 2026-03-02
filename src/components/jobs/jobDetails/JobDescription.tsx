export default function JobDescription({
  description,
}: {
  description: string;
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-100 p-8 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
      <div className="prose text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
        {description}
      </div>
    </div>
  );
}

export default function JobRequirements({
  requirements,
}: {
  requirements: string[];
}) {
  if (!requirements?.length) return null;
  return (
    <div className="bg-white rounded-lg border border-gray-100 p-8 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Requirements</h2>
      <ul className="space-y-3">
        {requirements.map((req, i) => (
          <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5">
              ✓
            </span>
            {req}
          </li>
        ))}
      </ul>
    </div>
  );
}

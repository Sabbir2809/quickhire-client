type JobBadgeProps = {
  label: string;
  colorClass?: string;
};

export default function Badge({ label, colorClass }: JobBadgeProps) {
  const baseClasses = "badge text-xs rounded-full px-2 py-1";
  return (
    <span
      className={`${baseClasses} ${
        colorClass || "bg-gray-100 text-gray-600 border-gray-200"
      }`}
    >
      {label}
    </span>
  );
}

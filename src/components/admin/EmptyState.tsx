import { STATUS_STYLES } from "@/config/constants";

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const classes =
    STATUS_STYLES[status] ?? "bg-gray-50 text-gray-600 border-gray-100";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold border ${classes}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

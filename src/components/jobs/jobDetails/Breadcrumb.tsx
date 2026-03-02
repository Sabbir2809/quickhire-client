import Link from "next/link";

export default function Breadcrumb({ jobTitle }: { jobTitle: string }) {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/jobs" className="hover:text-primary transition-colors">
            Jobs
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{jobTitle}</span>
        </nav>
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function CategoriesSection() {
  const JOB_CATEGORIES = [
    { name: "Design", icon: "/icons/design.svg" },
    { name: "Sales", icon: "/icons/sales.svg" },
    { name: "Marketing", icon: "/icons/marketing.svg" },
    { name: "Finance", icon: "/icons/finance.svg" },
    { name: "Technology", icon: "/icons/technology.svg" },
    { name: "Engineering", icon: "/icons/engineering.svg" },
    { name: "Business", icon: "/icons/business.svg" },
    { name: "Human Resource", icon: "/icons/hr.svg" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex justify-between items-center mb-10">
        <h2 className="section-title">
          Explore by <span className="text-accent">category</span>
        </h2>
        <Link
          href="/jobs"
          className="text-primary font-semibold text-sm flex items-center gap-1 transition-all"
        >
          Show all jobs <FaArrowRight />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {JOB_CATEGORIES.map((cat, i) => (
          <Link
            href={`/jobs?category=${encodeURIComponent(cat.name)}`}
            key={cat.name + i}
            className="p-6 border bg-white text-gray-900 transition-all hover:shadow-md hover:border-primary/30 group cursor-pointer flex flex-col"
          >
            <div className="w-10 h-10 mb-4">
              <Image
                src={cat.icon}
                alt={cat.name}
                className="w-full h-full object-contain"
                width={40}
                height={40}
              />
            </div>
            <h3 className="font-bold my-2">{cat.name}</h3>
            <div className="flex items-center gap-4 text-gray-500 text-sm">
              <p>Browse jobs</p>
              <FaArrowRight className="w-3 h-3" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

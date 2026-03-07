"use client";

import Link from "next/link";
import { IconType } from "react-icons";
import { FiArrowRight } from "react-icons/fi";

type Stat = {
  label: string;
  value: number | string;
  href: string;
  icon: IconType;
  color: string;
  accent: string;
};

type Props = {
  stats: Stat[];
};

export default function DashboardStats({ stats }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {stats.map((stat) => (
        <Link
          key={stat.label}
          href={stat.href}
          className={`bg-white rounded-2xl border ${stat.accent} p-5 flex items-center gap-4 hover:shadow-md transition-all group`}
        >
          <div
            className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center shrink-0`}
          >
            <stat.icon size={22} />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-2xl font-extrabold text-gray-900">
              {stat.value}
            </p>
            <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
          </div>

          <FiArrowRight
            size={16}
            className="text-gray-300 group-hover:text-gray-500 transition-colors"
          />
        </Link>
      ))}
    </div>
  );
}

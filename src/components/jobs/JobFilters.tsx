"use client";

import { JOB_CATEGORIES, JOB_TYPES } from "@/types";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface FiltersProps {
  onFilter: (filters: {
    category?: string;
    type?: string;
    location?: string;
  }) => void;
  initialFilters?: { category?: string; type?: string; location?: string };
}

export default function JobFilters({
  onFilter,
  initialFilters = {},
}: FiltersProps) {
  const [category, setCategory] = useState(initialFilters.category || "");
  const [type, setType] = useState(initialFilters.type || "");
  const [location, setLocation] = useState(initialFilters.location || "");

  const [openCategory, setOpenCategory] = useState(true);
  const [openType, setOpenType] = useState(true);
  const [openLocation, setOpenLocation] = useState(true);

  // Instant filter whenever selection changes
  useEffect(() => {
    onFilter({
      category: category || undefined,
      type: type || undefined,
      location: location || undefined,
    });
  }, [category, type, location, onFilter]);

  const handleClear = () => {
    setCategory("");
    setType("");
    setLocation("");
  };

  const DropdownHeader = ({
    title,
    isOpen,
    toggle,
  }: {
    title: string;
    isOpen: boolean;
    toggle: () => void;
  }) => (
    <div
      className="flex justify-between items-center cursor-pointer py-2 px-1 border-b border-gray-200"
      onClick={toggle}
    >
      <span className="font-semibold text-blue-600 text-sm">{title}</span>
      {isOpen ? (
        <FaChevronUp className="text-gray-500" />
      ) : (
        <FaChevronDown className="text-gray-500" />
      )}
    </div>
  );

  return (
    <div className="bg-white border border-gray-100 rounded-lg p-4">
      <h3 className="font-bold text-gray-900 mb-4">Filter Jobs</h3>

      {/* Category Dropdown */}
      <div className="mb-3">
        <DropdownHeader
          title="Category"
          isOpen={openCategory}
          toggle={() => setOpenCategory(!openCategory)}
        />
        {openCategory && (
          <div className="space-y-2 mt-2">
            {JOB_CATEGORIES.map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={category === cat}
                  onChange={(e) => setCategory(e.target.value)}
                  className="text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-600">{cat}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Job Type Dropdown */}
      <div className="mb-3">
        <DropdownHeader
          title="Job Type"
          isOpen={openType}
          toggle={() => setOpenType(!openType)}
        />
        {openType && (
          <div className="space-y-2 mt-2">
            {JOB_TYPES.map((t) => (
              <label key={t} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value={t}
                  checked={type === t}
                  onChange={(e) => setType(e.target.value)}
                  className="text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-600">{t}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Location Dropdown */}
      <div className="mb-3">
        <DropdownHeader
          title="Location"
          isOpen={openLocation}
          toggle={() => setOpenLocation(!openLocation)}
        />
        {openLocation && (
          <div className="mt-2">
            <input
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        )}
      </div>

      {/* Clear All */}
      <button
        onClick={handleClear}
        className="btn-outline w-full text-sm py-2.5 mt-3"
      >
        Clear All
      </button>
    </div>
  );
}

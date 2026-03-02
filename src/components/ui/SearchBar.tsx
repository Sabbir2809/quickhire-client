import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";

const locations = [
  "Dhaka, Bangladesh",
  "Chittagong, Bangladesh",
  "Sylhet, Bangladesh",
  "Khulna, Bangladesh",
  "Rajshahi, Bangladesh",
  "Barisal, Bangladesh",
  "Rangpur, Bangladesh",
  "Mymensingh, Bangladesh",
  "Comilla, Bangladesh",
  "Narayanganj, Bangladesh",
];

export default function SearchBar() {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Dhaka, Bangladesh");

  return (
    <div className="w-full max-w-[1024px] bg-white p-4 border border-gray-200 flex items-center gap-3 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-shadow duration-300">
      {/* Job title or keyword */}
      <div className="flex-1 flex items-center gap-2 px-3 py-2 border-r border-gray-300">
        <HiOutlineSearch className="w-5 h-5 text-gray-600 flex-shrink-0" />
        <input
          type="text"
          placeholder="Job title or keyword"
          className="w-full outline-none text-gray-700 placeholder-gray-400 text-sm"
        />
      </div>

      {/* Location with dropdown */}
      <div className="relative flex-1">
        <div
          className="flex items-center gap-2 px-3 py-2 border-r border-gray-300 cursor-pointer"
          onClick={() => setIsLocationOpen(!isLocationOpen)}
        >
          <IoLocationOutline className="w-5 h-5 text-gray-600 flex-shrink-0" />
          <input
            type="text"
            value={selectedLocation}
            readOnly
            className="w-full outline-none text-gray-700 cursor-pointer bg-transparent text-sm"
          />
          <MdKeyboardArrowDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
        </div>

        {isLocationOpen && (
          <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 shadow-lg max-h-60 overflow-y-auto z-20">
            {locations.map((location, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700 text-sm"
                onClick={() => {
                  setSelectedLocation(location);
                  setIsLocationOpen(false);
                }}
              >
                {location}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search button */}
      <button className="bg-[#1D4ED8] hover:bg-[#1E3A8A] text-white font-medium px-8 py-2.5 transition-colors whitespace-nowrap text-sm">
        Search my job
      </button>
    </div>
  );
}

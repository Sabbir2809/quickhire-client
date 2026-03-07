export const JOB_CATEGORIES = [
  "Design",
  "Sales",
  "Marketing",
  "Finance",
  "Technology",
  "Engineering",
  "Business",
  "Human Resource",
  "Other",
] as const;

export const JOB_TYPES = [
  "Full Time",
  "Part Time",
  "Remote",
  "Contract",
  "Internship",
] as const;

export const LOCATIONS = [
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
] as const;

export const ADMIN_TOKEN = "adminToken";

export const STATUS_STYLES: Record<string, string> = {
  accepted: "bg-green-50 text-green-700 border-green-100",
  rejected: "bg-red-50 text-red-700 border-red-100",
  reviewed: "bg-blue-50 text-blue-700 border-blue-100",
  pending: "bg-yellow-50 text-yellow-700 border-yellow-100",
  "Full Time": "bg-violet-50 text-violet-700 border-violet-100",
  "Part Time": "bg-orange-50 text-orange-700 border-orange-100",
  Remote: "bg-teal-50 text-teal-700 border-teal-100",
  Contract: "bg-pink-50 text-pink-700 border-pink-100",
  Internship: "bg-indigo-50 text-indigo-700 border-indigo-100",
};

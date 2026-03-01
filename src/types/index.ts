export interface Job {
  _id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  category: string;
  type: string;
  description: string;
  requirements?: string[];
  salary?: string;
  tags?: string[];
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  _id: string;
  jobId: string | Job;
  name: string;
  email: string;
  resumeLink: string;
  coverNote?: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  meta?: { page: number; limit: number; total: number };
  data?: T;
}

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

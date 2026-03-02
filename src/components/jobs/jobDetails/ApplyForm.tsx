"use client";

import { applicationsServices } from "@/services/applicationsServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  resumeLink: z.string().url("Please enter a valid URL"),
  coverNote: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface ApplyFormProps {
  jobId: string;
  jobTitle: string;
}

export default function ApplyForm({ jobId, jobTitle }: ApplyFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      await applicationsServices.create({ ...data, jobId });
      setSubmitted(true);
      reset();
      toast.success("Application submitted successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="font-bold text-xl text-gray-900 mb-2">
          Application Submitted!
        </h3>
        <p className="text-gray-600 mb-4">
          Your application for <span className="font-semibold">{jobTitle}</span>{" "}
          has been submitted successfully.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="btn-outline text-sm py-2"
        >
          Apply Again
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Full Name *
        </label>
        <input
          {...register("name")}
          className="input-field"
          placeholder="Sabbir"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Email Address *
        </label>
        <input
          {...register("email")}
          type="email"
          className="input-field"
          placeholder="sabbir@gmail.com"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Resume Link *
        </label>
        <input
          {...register("resumeLink")}
          className="input-field"
          placeholder="https://drive.google.com/..."
        />
        {errors.resumeLink && (
          <p className="text-red-500 text-xs mt-1">
            {errors.resumeLink.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Cover Note
        </label>
        <textarea
          {...register("coverNote")}
          rows={5}
          className="input-field resize-none"
          placeholder="Tell us why you're a great fit for this role..."
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}

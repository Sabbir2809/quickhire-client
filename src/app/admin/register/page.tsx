"use client";

import { authServices } from "@/services/authServices";
import {
  RegisterFormValues,
  registerSchema,
} from "@/validations/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEnvelope, FaEye, FaEyeSlash, FaKey, FaLock } from "react-icons/fa";

export default function AdminRegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await authServices.register(values);
      toast.success("Admin account created! Please login.");
      router.push("/admin/login");
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Create Admin Account
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Register a new administrator
          </p>
        </div>

        <div className="bg-white border border-gray-200 shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="admin@quickhire.com"
                  {...register("email")}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
                />
              </div>

              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  {...register("password")}
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Admin Secret */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Admin Secret Key
              </label>

              <div className="relative">
                <FaKey className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showSecret ? "text" : "password"}
                  placeholder="Enter admin secret key"
                  {...register("adminSecret")}
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowSecret(!showSecret)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showSecret ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {errors.adminSecret && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.adminSecret.message}
                </p>
              )}

              <p className="text-xs text-gray-400 mt-2">
                Contact your system administrator for the secret key
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-60"
            >
              {isSubmitting ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/admin/login"
                className="text-blue-600 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

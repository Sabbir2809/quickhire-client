import Image from "next/image";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#4640DE] text-white mx-auto px-4 sm:px-6 lg:px-8 h-[414px]">
        <div className="grid md:grid-cols-2 gap-12 items-center h-full">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-extrabold mb-4 leading-tight">
              Start posting jobs today
            </h2>
            <p className="text-[#E0E7FF] text-xl mb-8">
              Start posting jobs for only{" "}
              <span className="text-white font-semibold">$10</span>
            </p>

            <Link
              href="/admin/login"
              className="inline-block bg-white text-[#4640DE] hover:bg-gray-100 font-semibold px-6 py-3 transition-colors duration-200"
            >
              Sign Up For Free
            </Link>
          </div>

          {/* Right Content */}
          <div className="relative w-full h-full">
            <Image
              src="/dashboard.svg"
              alt="QuickHire Dashboard Preview"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#4640DE] text-white px-6 sm:px-10 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
              Start posting jobs today
            </h2>

            <p className="text-[#E0E7FF] text-lg sm:text-xl mb-8">
              Start posting jobs for only{" "}
              <span className="text-white font-semibold">$10</span>
            </p>

            <Link
              href="/login"
              className="inline-block bg-white text-[#4640DE] hover:bg-gray-100 font-semibold px-6 py-3 transition-colors duration-200"
            >
              Sign Up For Free
            </Link>
          </div>

          {/* Right Content */}
          <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
            <Image
              src="/dashboard.svg"
              alt="QuickHire Dashboard Preview"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

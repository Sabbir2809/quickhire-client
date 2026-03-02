export default function CompaniesSection() {
  const companies = ["Vodafone", "Intel", "Tesla", "AMD", "Talkit"];
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <p className="text-gray-500 mb-6 font-medium">Companies we helped grow</p>
      <div className="flex flex-wrap items-center justify-between gap-10 md:gap-16">
        {companies.map((c) => (
          <span
            key={c}
            className="text-4xl font-bold text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            {c}
          </span>
        ))}
      </div>
    </section>
  );
}

'use client';

export default function CarePackagesSection({ section }) {
  const sectionData = section || {};
  const enabled = sectionData.enabled !== false;
  const heading = sectionData.heading || "Explore Bangalore Care Packages";
  const packages = sectionData.packagesList || [];

  if (!enabled) return null;

  return (
    <section className="py-16 bg-gradient-to-b from-rose-50/60 via-blue-50/40 to-white overflow-hidden">
      {/* Heading centered */}
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          {heading}
        </h2>
      </div>

      {/* Cards Container */}
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-6">
        {packages.map((item, index) => (
          <div
            key={index}
            className="w-full sm:w-[380px] bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md hover:border-rose-200 transition-all duration-300 group"
          >
            {/* Icon / Avatar - Larger default size with zoom on hover */}
            <div className="w-24 h-24 rounded-full bg-rose-50/50 flex items-center justify-center mb-5 p-2 border border-rose-100/60 group-hover:scale-110 transition-transform duration-300">
              <img 
                src={item.iconSrc} 
                alt={item.title} 
                className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300" 
              />
            </div>

            {/* Title */}
            <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-[#DB5070] transition-colors">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              {item.description}
            </p>

            {/* Action Link Button */}
            <a
              href={item.url || "#"}
              className="inline-flex items-center text-[#DB5070] font-semibold text-sm hover:opacity-80 transition-colors group-hover:translate-x-1 duration-300"
            >
              {item.buttonLabel || "Explore packages"} 
              <span className="ml-1 text-base">→</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
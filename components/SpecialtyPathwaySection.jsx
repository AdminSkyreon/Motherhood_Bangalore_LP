'use client';

export default function SpecialtyPathwaySection({ pathway }) {
  if (!pathway) return null;

  return (
    <section className="py-10 bg-gradient-to-r from-rose-50/70 via-blue-50/50 to-rose-50/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-md py-5 px-6 sm:px-8 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6 border-l-8 border-l-[#DB5070] group">
          
          {/* Left Side: Icon & Content */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6 text-center sm:text-left w-full">
            {/* Icon/Image Container with Larger Size & Zoom Animation */}
            {pathway.iconSrc && (
              <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-rose-50/60 rounded-full flex items-center justify-center p-3 border border-rose-100 shadow-sm overflow-hidden">
                <img
                  src={pathway.iconSrc}
                  alt={pathway.title || "Specialty Icon"}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            )}

            {/* Text Content */}
            <div className="flex-1">
              {pathway.subtitle && (
                <span className="text-[#DB5070] font-bold text-xs sm:text-sm tracking-wider uppercase block mb-1">
                  {pathway.subtitle}
                </span>
              )}
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 leading-tight">
                {pathway.title}
              </h2>
              {pathway.description && (
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-3xl">
                  {pathway.description}
                </p>
              )}
            </div>
          </div>

          {/* Right Side: Action Button with Hover Up Animation */}
          {pathway.button && (
            <div className="w-full lg:w-auto flex-shrink-0 flex justify-center">
              <a
                href={pathway.button.link || "#"}
                className="bg-[#DB5070] hover:bg-[#c44563] text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base whitespace-nowrap text-center w-full sm:w-auto"
              >
                {pathway.button.label}
              </a>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
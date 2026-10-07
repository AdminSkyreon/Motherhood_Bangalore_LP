'use client';

import { useState } from 'react';

export default function HospitalLocationsSection({ section }) {
  if (!section || !section.enabled) return null;

  const [showAll, setShowAll] = useState(false);
  const hospitals = section.hospitals || [];
  const displayedHospitals = showAll ? hospitals : hospitals.slice(0, 4);

  return (
    <section className="w-full bg-gradient-to-r from-rose-50/70 via-blue-50/50 to-rose-50/70 py-12 px-4 sm:px-6 lg:px-8 my-0">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          {section.title && (
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
              {section.title}
            </h2>
          )}
          {section.viewAllLocationsUrl && (
            <a
              href={section.viewAllLocationsUrl}
              className="text-[#0057A4] hover:text-[#004080] font-semibold text-sm sm:text-base inline-flex items-center gap-1 group transition"
            >
              View all locations 
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          )}
        </div>

        {/* Hospitals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedHospitals.map((hospital, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-rose-100/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Hospital Image - Height reduced */}
                {hospital.imageSrc && (
                  <div className="h-36 w-full overflow-hidden bg-gray-100">
                    <img
                      src={hospital.imageSrc}
                      alt={hospital.name}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                  </div>
                )}

                <div className="p-4">
                  {/* Hospital Name */}
                  <h3 className="font-bold text-base text-slate-900 mb-1.5 leading-snug min-h-[48px]">
                    {hospital.name}
                  </h3>

                  {/* Ratings */}
                  {hospital.rating && (
                    <div className="flex items-center gap-1.5 text-sm mb-2">
                      <span className="text-amber-400">★ {hospital.rating}</span>
                      {hospital.reviewsCount && (
                        <span className="text-gray-500 text-xs">({hospital.reviewsCount})</span>
                      )}
                    </div>
                  )}

                  {/* Address */}
                  {hospital.address && (
                    <div className="flex items-start gap-1.5 text-gray-600 text-xs mb-3">
                      <span className="text-[#DB5070] mt-0.5 flex-shrink-0">📍</span>
                      <p className="leading-relaxed line-clamp-2">{hospital.address}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-4 pt-0 mt-auto">
                {/* View Hospital Link */}
                {hospital.viewHospitalUrl && (
                  <div className="pb-3 mb-3 border-b border-gray-100 text-center">
                    <a
                      href={hospital.viewHospitalUrl}
                      className="text-[#DB5070] hover:text-[#c44563] font-bold text-xs sm:text-sm inline-flex items-center gap-1 group transition"
                    >
                      View Hospital 
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </a>
                  </div>
                )}

                {/* Call & Get Directions Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${hospital.phoneTel || ''}`}
                    className="bg-[#DB5070] hover:bg-[#c44563] text-white font-medium text-xs py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 transition shadow-sm"
                  >
                    <svg className="w-3.5 h-3.5 text-white fill-current" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    <span>Call</span>
                  </a>
                  <a
                    href={hospital.directionUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-[#0057A4]/30 hover:bg-blue-50 text-[#0057A4] font-medium text-xs py-2 px-2 rounded-lg flex items-center justify-center gap-1 transition whitespace-nowrap"
                  >
                    <span className="transform -rotate-45">➤</span>
                    <span>Get Direction</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More / View Less Toggle Button */}
        {hospitals.length > 4 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="border border-[#DB5070]/30 bg-white hover:bg-rose-50 text-[#DB5070] font-bold px-6 py-2.5 rounded-full text-sm transition inline-flex items-center gap-2 shadow-sm"
            >
              {showAll ? "View Less Locations" : "View More Locations"}
              <span className={`transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
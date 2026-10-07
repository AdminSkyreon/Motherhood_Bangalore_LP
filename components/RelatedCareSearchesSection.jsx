'use client';

import React, { useState } from 'react';

export default function RelatedCareSearchesSection({ section }) {
  const sectionData = section || {};
  if (sectionData.enabled === false) return null;

  const heading = sectionData.heading || "Related Care Searches in Bangalore";
  const categories = sectionData.categoriesList || [];

  // Track which accordion item is open (by index)
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10 bg-gradient-to-tr from-rose-50/40 via-blue-50/30 to-rose-50/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2b4c] tracking-tight">
          {heading}
        </h2>
      </div>

      {/* Added items-start so boxes manage their own height independently */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        {categories.map((cat, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-300 shadow-2xs overflow-hidden ${
                isOpen ? 'bg-[#FDF3F6] border-rose-200 shadow-sm' : 'bg-white border-gray-200'
              }`}
            >
              <div className={`p-3.5 sm:p-4 ${isOpen ? 'pb-2' : ''}`}>
                {/* Header / Clickable Toggle Bar */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between text-left focus:outline-none gap-4"
                >
                  <span className="font-bold text-base sm:text-lg text-[#0057A4]">
                    {cat.title}
                  </span>
                  <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center border transition-colors ${
                    isOpen ? 'border-rose-200 text-[#DB5070] bg-rose-50/50' : 'border-blue-200 text-[#0057A4] bg-blue-50/30'
                  }`}>
                    <span className="text-base font-medium leading-none">
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>
                </button>
              </div>

              {/* Smooth Animated Accordion Content Area */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-4 pt-1 sm:px-5 sm:pb-5 flex flex-wrap gap-2 border-t border-rose-100/60">
                    {cat.items?.map((item, itemIdx) => (
                      <a
                        key={itemIdx}
                        href={item.url || '#'}
                        className="inline-block px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-blue-100 bg-[#F4F8FB] text-[#0057A4] hover:bg-[#DB5070] hover:text-white hover:border-[#DB5070] transition-all shadow-2xs"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
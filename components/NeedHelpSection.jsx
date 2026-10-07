'use client';

import React from 'react';

export default function NeedHelpSection({ section }) {
  const sectionData = section || {};
  if (sectionData.enabled === false) return null;

  const headingPart1 = sectionData.headingPart1 || "Need Help Choosing the";
  const headingHighlight = sectionData.headingHighlight || "Right Care";
  const headingPart2 = sectionData.headingPart2 || "in City Name?";
  const subtitle = sectionData.subtitle || "Start with the hospital, specialty or doctor pathway above, or contact Motherhood Hospitals for appointment assistance.";
  
  const bookAppointmentUrl = sectionData.bookAppointmentUrl || "#";
  const phoneText = sectionData.phoneText || "Call 96203 96203";
  const phoneTel = sectionData.phoneTel || "9620396203";

  return (
    <section className="py-12 bg-gradient-to-r from-pink-50/70 via-rose-50/40 to-blue-50/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm py-6 px-8 sm:py-8 sm:px-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Side: Icon, Heading & Subtitle */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-6 w-full lg:w-auto">
            {/* Inline SVG Headphone Icon inside Rose Circle with Zoom Hover Animation */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-rose-50/80 border border-rose-100 flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-110">
              <svg 
                className="w-8 h-8 sm:w-10 sm:h-10 text-[#DB5070] transition-transform duration-300 hover:scale-110" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.8" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M19 14.5A7.5 7.5 0 0011.5 7v0a7.5 7.5 0 00-7.5 7.5v2a2 2 0 002 2h2a2 2 0 002-2v-4a2 2 0 00-2-2H5m14 0v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2" 
                />
              </svg>
            </div>

            {/* Text Content */}
            <div className="flex flex-col items-center sm:items-start">
              <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-[#1a2b4c] tracking-tight leading-snug">
                {headingPart1}{' '}
                <br className="hidden lg:block" />
                <span className="text-[#DB5070]">{headingHighlight}</span>{' '}
                {headingPart2}
              </h2>
              <p className="mt-2 text-gray-500 text-sm sm:text-base max-w-2xl">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Right Side: Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto shrink-0">
            {/* Book Appointment Button */}
            <a
              href={bookAppointmentUrl}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full text-white font-semibold text-center transition shadow-md text-sm sm:text-base"
              style={{ backgroundColor: '#DB5070' }}
            >
              Book an Appointment
            </a>

            {/* Call Button */}
            <a
              href={`tel:${phoneTel}`}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full text-white font-semibold text-center transition shadow-md text-sm sm:text-base flex items-center justify-center gap-2"
              style={{ backgroundColor: '#0057A4' }}
            >
              {phoneText}
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
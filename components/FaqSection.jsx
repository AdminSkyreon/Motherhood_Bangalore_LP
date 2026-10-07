'use client';

import React, { useState } from 'react';

export default function FaqSection({ section }) {
  const sectionData = section || {};
  if (sectionData.enabled === false) return null;

  const heading = sectionData.heading || "Frequently Asked Questions About Motherhood Hospitals";
  const tabs = sectionData.tabsList || [];

  // Active tab index
  const [activeTab, setActiveTab] = useState(0);
  // Open accordion item index within the active tab
  const [openIndex, setOpenIndex] = useState(null);

  const handleTabChange = (index) => {
    setActiveTab(index);
    setOpenIndex(null); // Reset open accordion when switching tabs
  };

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const currentTab = tabs[activeTab] || {};

  return (
    <section className="py-10 bg-gradient-to-tr from-rose-50/40 via-blue-50/30 to-rose-50/20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2b4c] tracking-tight">
          {heading}
        </h2>
      </div>

      {/* Tabs Header */}
      <div className="max-w-5xl mx-auto px-6 mb-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
          {tabs.map((tab, index) => {
            const isActive = activeTab === index;
            return (
              <button
                key={index}
                onClick={() => handleTabChange(index)}
                className={`py-4 px-3 text-xs sm:text-sm font-semibold transition-all duration-300 text-center relative flex items-center justify-center ${
                  isActive
                    ? 'bg-[#FDF1F4] text-[#DB5070]'
                    : 'text-[#0057A4] hover:bg-gray-50/50 hover:text-[#DB5070]'
                }`}
              >
                <span className="leading-snug">{tab.tabName}</span>
                {/* Patli patti (Bottom indicator line) for active tab */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#DB5070]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Accordion Container with Smooth Tab Transition */}
      <div className="max-w-5xl mx-auto px-6 space-y-3 transition-all duration-300 ease-in-out">
        {currentTab.questions?.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-xl border transition-all duration-300 shadow-2xs overflow-hidden ${
                isOpen ? 'bg-[#FDF3F6] border-rose-200 shadow-sm' : 'bg-white border-gray-200'
              }`}
            >
              <div className={`p-3.5 sm:p-4 ${isOpen ? 'pb-2' : ''}`}>
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between text-left focus:outline-none gap-4"
                >
                  <span className="font-semibold text-sm sm:text-base text-[#0057A4]">
                    {item.question}
                  </span>
                  <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center border transition-colors ${
                    isOpen ? 'border-rose-200 text-[#DB5070] bg-rose-50/50' : 'border-gray-200 text-gray-500 bg-gray-50'
                  }`}>
                    <span className="text-base font-medium leading-none">
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>
                </button>
              </div>

              {/* Smooth Animated Accordion Content */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-4 pt-1 sm:px-5 sm:pb-5 text-[#4A5A70] text-xs sm:text-sm leading-relaxed border-t border-rose-100/60">
                    {item.answer}
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
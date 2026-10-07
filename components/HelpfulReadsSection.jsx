'use client';

import React from 'react';

export default function HelpfulReadsSection({ section }) {
  const sectionData = section || {};
  if (sectionData.enabled === false) return null;

  const heading = sectionData.heading || "Helpful Reads for Women, Parents & Families";
  const viewAllUrl = sectionData.viewAllUrl || "#";
  const blogs = sectionData.blogsList || [];

  return (
    <section className="py-16 bg-gradient-to-tr from-rose-50/40 via-blue-50/30 to-rose-50/25 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3">
          {heading}
        </h2>
        <a 
          href={viewAllUrl}
          className="inline-flex items-center text-sm font-semibold text-[#0057A4] hover:text-[#DB5070] transition-colors"
        >
          View all blogs <span className="ml-1">→</span>
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogs.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </div>
    </section>
  );
}

function BlogCard({ blog }) {
  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md hover:border-rose-200 hover:-translate-y-1.5 transition-all duration-300 group">
      <div>
        {/* Image / Placeholder Container */}
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-rose-50/40 to-indigo-50/20 mb-4 flex items-center justify-center">
          {blog.imageSrc ? (
            <img
              src={blog.imageSrc}
              alt={blog.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <svg className="w-10 h-10 text-rose-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          )}
        </div>

        {/* Content Info */}
        <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#DB5070] mb-2 transition-colors">
          {blog.title}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed mb-4">
          {blog.description}
        </p>
      </div>

      {/* Read Article Link */}
      <div>
        <a 
          href={blog.articleUrl || "#"}
          className="inline-flex items-center text-xs font-bold text-[#0057A4] hover:text-[#DB5070] transition-colors"
        >
          Read article <span className="ml-1">→</span>
        </a>
      </div>
    </div>
  );
}
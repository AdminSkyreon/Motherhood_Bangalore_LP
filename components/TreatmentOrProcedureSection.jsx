'use client';
import { useRef, useEffect } from 'react';

export default function TreatmentOrProcedureSection({ data }) {
  const sectionData = data?.sections?.treatmentOrProcedureSection || {};
  const heading = sectionData.heading || "Find Care by Treatment or Procedure";
  const items = sectionData.itemsList || [];

  const scrollRef = useRef(null);

  // Auto-scroll effect with increased speed & mobile touch compatibility
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId;
    let scrollSpeed = 1.8;
    let isHovered = false;

    const autoScroll = () => {
      if (scrollContainer && !isHovered) {
        scrollContainer.scrollLeft += scrollSpeed;
        // Seamless infinite loop reset
        if (scrollContainer.scrollLeft >= (scrollContainer.scrollWidth / 2)) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);

    const handleMouseEnter = () => { isHovered = true; };
    const handleMouseLeave = () => { isHovered = false; };
    const handleTouchStart = () => { isHovered = true; };
    const handleTouchEnd = () => { isHovered = false; };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    scrollContainer.addEventListener('touchstart', handleTouchStart);
    scrollContainer.addEventListener('touchend', handleTouchEnd);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
        scrollContainer.removeEventListener('touchstart', handleTouchStart);
        scrollContainer.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, []);

  const duplicatedItems = [...items, ...items];

  return (
    <section className="py-16 bg-gradient-to-r from-rose-50/70 via-blue-50/50 to-rose-50/70 overflow-hidden">
      {/* Heading centered */}
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          {heading}
        </h2>
      </div>

      {/* Moving & Scrollable Container */}
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto px-6 pb-6 pt-2 scroll-smooth select-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {duplicatedItems.map((item, index) => (
          <a
            key={index}
            href={item.url || "#"}
            className="min-w-[240px] sm:min-w-[260px] max-w-[260px] bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md hover:border-rose-200 hover:-translate-y-1.5 transition-all duration-300 shrink-0 group"
          >
            <div>
              {/* Icon with minimal vertical spacing */}
              <div className="h-14 flex items-center justify-center mb-1">
                <img 
                  src={item.iconSrc} 
                  alt={item.title} 
                  className="h-12 w-12 object-contain group-hover:scale-110 transition-transform duration-300" 
                />
              </div>

              {/* Title & Description with tight spacing */}
              <h3 className="font-bold text-base text-gray-900 text-center mb-0.5 group-hover:text-[#DB5070] transition-colors leading-tight">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500 text-center line-clamp-2 min-h-[24px] mb-1">
                {item.description}
              </p>
            </div>

            {/* Bottom Badge with exact color */}
            <div className="mt-1 pt-2 border-t border-gray-100 text-center">
              <span className="text-[10px] font-bold tracking-wider text-[#DB5070] uppercase">
                {item.badgeText}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
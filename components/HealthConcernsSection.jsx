'use client';
import { useRef, useEffect } from 'react';

export default function HealthConcernsSection({ data }) {
  const sectionData = data?.sections?.healthConcernsSection || {};
  const heading = sectionData.heading || "Explore Common Health Concerns by Specialty";
  const concerns = sectionData.concernsList || [];

  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || concerns.length === 0) return;

    let animationFrameId;
    let scrollSpeed = 1.0; // Smooth movement speed
    let isInteracting = false;
    let timeoutId;

    // Pehle render par scroll position ko beech wale set me set kar rahe hain
    // taaki left/right dono taraf infinite range mile
    const singleSetWidth = scrollContainer.scrollWidth / 3;
    if (scrollContainer.scrollLeft === 0) {
      scrollContainer.scrollLeft = singleSetWidth;
    }

    const autoScroll = () => {
      if (scrollContainer) {
        const setWidth = scrollContainer.scrollWidth / 3;

        // Dynamic seamless reset (Jab end ya start tak pahunch jaye)
        if (scrollContainer.scrollLeft >= setWidth * 2) {
          scrollContainer.scrollLeft -= setWidth;
        } else if (scrollContainer.scrollLeft <= 2) {
          scrollContainer.scrollLeft += setWidth;
        }

        // Auto move jab user drag na kar raha ho
        if (!isInteracting) {
          scrollContainer.scrollLeft += scrollSpeed;
        }
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);

    const handleInteractionStart = () => {
      isInteracting = true;
      if (timeoutId) clearTimeout(timeoutId);
    };

    const handleInteractionEnd = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        isInteracting = false;
      }, 1200);
    };

    // Continuous scroll check jab user manually drag kar raha ho
    const handleScroll = () => {
      if (!scrollContainer) return;
      const setWidth = scrollContainer.scrollWidth / 3;
      if (scrollContainer.scrollLeft >= setWidth * 2) {
        scrollContainer.scrollLeft -= setWidth;
      } else if (scrollContainer.scrollLeft <= 2) {
        scrollContainer.scrollLeft += setWidth;
      }
    };

    scrollContainer.addEventListener('mouseenter', handleInteractionStart);
    scrollContainer.addEventListener('mouseleave', handleInteractionEnd);
    scrollContainer.addEventListener('touchstart', handleInteractionStart, { passive: true });
    scrollContainer.addEventListener('touchend', handleInteractionEnd, { passive: true });
    scrollContainer.addEventListener('mousedown', handleInteractionStart);
    scrollContainer.addEventListener('mouseup', handleInteractionEnd);
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (timeoutId) clearTimeout(timeoutId);
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleInteractionStart);
        scrollContainer.removeEventListener('mouseleave', handleInteractionEnd);
        scrollContainer.removeEventListener('touchstart', handleInteractionStart);
        scrollContainer.removeEventListener('touchend', handleInteractionEnd);
        scrollContainer.removeEventListener('mousedown', handleInteractionStart);
        scrollContainer.removeEventListener('mouseup', handleInteractionEnd);
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Triple duplication infinite loop ke liye
  const duplicatedConcerns = [...concerns, ...concerns, ...concerns];

  return (
    <section className="pt-2 sm:pt-4 pb-2 bg-gradient-to-r from-rose-50/70 via-blue-50/50 to-rose-50/70 overflow-hidden">
      {/* Heading centered */}
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          {heading}
        </h2>
      </div>

      {/* Moving & Scrollable Container - Note: scroll-smooth removed to fix jump lag */}
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto px-6 pb-2 pt-2 select-none"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none', 
          WebkitOverflowScrolling: 'touch' 
        }}
      >
        {duplicatedConcerns.map((item, index) => (
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
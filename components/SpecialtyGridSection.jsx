export default function SpecialtyGridSection({ section }) {
  if (!section || !section.enabled) return null;

  return (
    <section className="w-full bg-gradient-to-r from-rose-50/70 via-blue-50/50 to-rose-50/70 py-12 px-4 sm:px-6 lg:px-8 my-0">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        {section.title && (
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-slate-900 mb-8 sm:mb-12">
            {section.title}
          </h2>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-7xl mx-auto">
          {section.cards?.map((card, idx) => {
            const isMiddle = idx === 1;
            const accentColor = isMiddle ? '#4A31BD' : '#DB5070';
            
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl border ${
                  card.highlightBorder || (isMiddle ? 'border-indigo-200' : 'border-rose-200')
                } shadow-sm hover:shadow-md transition p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden`}
              >
                {/* Top Patli Patti */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1.5 w-full"
                  style={{ backgroundColor: accentColor }}
                />

                <div>
                  {/* Top Row: Icon Left & Heading + Description Right */}
                  <div className="flex items-start gap-3 mb-3">
                    {card.iconSrc && (
                      <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 flex items-center justify-center">
                        <img
                          src={card.iconSrc}
                          alt={card.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold text-base sm:text-lg text-slate-900 leading-snug mb-1">
                        {card.title}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-[13px] leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>

                  {/* Tags/Badges (Pills) - Forced Single Line */}
                  {card.tags && card.tags.length > 0 && (
                    <div className="flex items-center gap-1 mb-3 whitespace-nowrap overflow-hidden">
                      {card.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className={`text-[9px] sm:text-[10px] font-medium px-2 py-0.5 rounded-full border inline-block ${
                            isMiddle 
                              ? 'bg-indigo-50 text-[#4A31BD] border-indigo-100' 
                              : 'bg-rose-50 text-[#DB5070] border-rose-100'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Link Button */}
                {card.linkButton && (
                  <div className="pt-3 border-t border-gray-100 mt-auto">
                    <a
                      href={card.linkButton.url || "#"}
                      className="font-bold text-xs sm:text-sm flex items-center gap-1.5 group"
                      style={{ color: accentColor }}
                    >
                      {card.linkButton.label}
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
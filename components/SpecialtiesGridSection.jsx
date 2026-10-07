'use client';

export default function SpecialtiesGridSection({ section }) {
  if (!section || !section.enabled) return null;

  return (
    <section className="py-12 bg-gradient-to-r from-rose-50/70 via-blue-50/50 to-rose-50/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {section.title && (
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 mb-8 tracking-tight">
            {section.title}
          </h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {section.cards?.map((card, idx) => {
            // Diagonal/Alternate pattern matching original design (Img 2)
            // Row 1: Pink, Blue, Pink, Blue -> indices 0, 1, 2, 3
            // Row 2: Blue, Pink, Blue, Pink -> indices 4, 5, 6, 7
            const row = Math.floor(idx / 4);
            const col = idx % 4;
            const isPink = (row + col) % 2 === 0;

            const cardBg = isPink 
              ? 'bg-rose-50/40 border-rose-100/80' 
              : 'bg-blue-50/30 border-blue-100/80';

            return (
              <a
                key={idx}
                href={card.url || "#"}
                className={`${cardBg} backdrop-blur-sm rounded-2xl border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 py-2.5 px-3.5 flex items-center gap-3.5 group`}
              >
                {card.iconSrc && (
                  <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 flex items-center justify-center p-1 group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={card.iconSrc}
                      alt={card.title}
                      className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                    />
                  </div>
                )}
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug group-hover:text-[#DB5070] transition-colors">
                  {card.title}
                </h3>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
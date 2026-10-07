'use client';

export default function LandingCardsSection({ cards }) {
  if (!cards || cards.length === 0) return null;

  // Background colors aur styles ke liye array taaki har card thoda alag lage
  const cardStyles = [
    {
      bg: "bg-rose-50/50",
      border: "border-rose-100",
      iconBg: "bg-rose-100 text-rose-700",
    },
    {
      bg: "bg-purple-50/50",
      border: "border-purple-100",
      iconBg: "bg-purple-100 text-purple-700",
    },
    {
      bg: "bg-rose-50/50",
      border: "border-rose-100",
      iconBg: "bg-rose-100 text-rose-700",
    },
  ];

  return (
    <section className="py-10 bg-gradient-to-r from-rose-50/70 via-blue-50/50 to-rose-50/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {cards.map((card, idx) => {
            const style = cardStyles[idx % cardStyles.length];
            return (
              <div
                key={idx}
                className={`relative overflow-hidden p-5 sm:p-6 rounded-2xl border ${style.bg} ${style.border} shadow-sm transition hover:shadow-md flex items-start gap-4 bg-white/80 backdrop-blur-sm`}
              >
                {/* Optional Icon/Badge - Circular Container */}
                {card.icon && (
                  <div className={`p-3 rounded-full ${style.iconBg} flex items-center justify-center flex-shrink-0 w-12 h-12`}>
                    <span className="text-xl font-bold">{card.icon}</span>
                  </div>
                )}

                {/* Card Content */}
                <div>
                  <h3 className="font-bold text-lg text-slate-900 mb-1">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Decorative Background Blob/Curve */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/40 rounded-full blur-xl pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
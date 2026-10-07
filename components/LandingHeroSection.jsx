export default function LandingHeroSection({ banner }) {
  return (
    <section className="bg-gradient-to-r from-rose-50/70 via-blue-50/50 to-rose-50/70 py-4 sm:py-8 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 items-center">
        
        {/* Left Content */}
        <div>
          {banner.subtitle && (
            <span className="text-[#DB5070] font-semibold text-xs sm:text-sm tracking-wider uppercase">
              {banner.subtitle}
            </span>
          )}
          
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#0057A4] mt-1 mb-2.5 leading-snug sm:leading-tight">
            {banner.taglineLines && banner.taglineLines[0]} <br />
            <span className="text-[#0057A4]">
              {banner.taglineLines && banner.taglineLines[1]}
            </span>
          </h1>

          {banner.description && (
            <p className="text-gray-600 text-sm sm:text-base mb-4 leading-relaxed">
              {banner.description}
            </p>
          )}

          {/* Buttons Layout */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            {banner.buttons?.map((btn, idx) => {
              const isFindHospital = btn.primary || btn.label?.toLowerCase().includes('hospital');
              const isHighlight = btn.highlight || btn.label?.toLowerCase().includes('doctor') || btn.label?.toLowerCase().includes('appointment');

              let btnClass = 'border border-[#0057A4] text-[#0057A4] hover:bg-blue-50 text-center';
              
              if (isFindHospital) {
                btnClass = 'bg-[#0057A4] hover:bg-[#004482] text-white';
              } else if (isHighlight) {
                btnClass = 'bg-[#DB5070] hover:bg-[#c44563] text-white';
              }

              return (
                <a
                  key={idx}
                  href={btn.link || "#"}
                  className={`font-medium px-6 py-2.5 sm:py-3 rounded-full flex items-center justify-center gap-2 shadow-sm hover:shadow-lg hover:-translate-y-1 text-sm sm:text-base w-full sm:w-auto transition-all duration-300 ${btnClass}`}
                >
                  {btn.label}
                </a>
              );
            })}
          </div>
        </div>

        {/* Right Image with Exact Correct Curve */}
        <div className="relative mt-2 lg:mt-0">
          <div className="overflow-hidden rounded-t-[100px] lg:rounded-l-[200px] lg:rounded-r-3xl shadow-lg bg-rose-50 h-[240px] sm:h-[360px]">
            <img
              src={banner.heroImage || '/hero-img.png'}
              alt="Hero Mother and Child"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
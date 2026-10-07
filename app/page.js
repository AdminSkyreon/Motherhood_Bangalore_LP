import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md flex items-center justify-between px-4 sm:px-8 py-3 border-b border-gray-100 shadow-sm">
        <div className="flex items-center">
          <img src="/motherhood-logo.png" alt="Logo" className="h-10 sm:h-14 w-auto object-contain" />
        </div>
        <button className="bg-rose-500 hover:bg-rose-600 text-white font-medium text-xs sm:text-base px-3 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-sm transition whitespace-nowrap">
          Book Appointment
        </button>
      </header>

      {/* Hero Section */}
      <main className="px-4 sm:px-8 py-4 sm:py-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 items-center">
          {/* Left Content */}
          <div>
            <span className="text-rose-700 font-semibold text-xs sm:text-sm tracking-wider uppercase">
              MOTHERHOOD HOSPITALS, BANGALORE
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mt-1 mb-2.5 leading-snug sm:leading-tight">
              Women & Child Care Hospitals in Bangalore
            </h1>
            <p className="text-gray-600 text-sm sm:text-base mb-4 leading-relaxed">
              Explore Motherhood Hospitals across Bangalore for maternity, pregnancy and birthing care, gynaecology, paediatrics, neonatology and other specialist services. Use this city hub to find the right hospital, speciality, doctor or care pathway for your needs.
            </p>
            
            {/* Buttons Layout */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <button className="bg-blue-900 hover:bg-blue-800 text-white font-medium px-6 py-2.5 sm:py-3 rounded-full flex items-center justify-center gap-2 shadow-sm text-sm sm:text-base w-full sm:w-auto">
                Find a Hospital →
              </button>
              <button className="border border-blue-900 text-blue-900 hover:bg-blue-50 font-medium px-6 py-2.5 sm:py-3 rounded-full transition text-sm sm:text-base w-full sm:w-auto text-center">
                Explore Specialties
              </button>
              <button className="bg-rose-500 hover:bg-rose-600 text-white font-medium px-6 py-2.5 sm:py-3 rounded-full shadow-sm text-sm sm:text-base w-full sm:w-auto text-center">
                Find a Doctor
              </button>
            </div>
          </div>

          {/* Right Image with Responsive Curve */}
          <div className="relative mt-2 lg:mt-0">
            <div className="overflow-hidden rounded-t-[100px] lg:rounded-l-[200px] lg:rounded-r-3xl shadow-lg bg-rose-50 h-[240px] sm:h-[360px]">
              <img
                src="/hero-img.png"
                alt="Hero Mother and Child"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bottom Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-2 sm:mt-4">
          <div className="bg-rose-50/50 p-5 sm:p-6 rounded-2xl border border-rose-100 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 mb-1">City Hub</h3>
            <p className="text-gray-600 text-sm">One Bangalore parent page</p>
          </div>
          <div className="bg-purple-50/50 p-5 sm:p-6 rounded-2xl border border-purple-100 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 mb-1">Priority Care</h3>
            <p className="text-gray-600 text-sm">Maternity, Gynae, Paediatrics</p>
          </div>
          <div className="bg-rose-50/50 p-5 sm:p-6 rounded-2xl border border-rose-100 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 mb-1">Local Access</h3>
            <p className="text-gray-600 text-sm">Hospitals and clinics by area</p>
          </div>
        </div>
      </main>
    </div>
  );
}
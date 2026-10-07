'use client';
import { useState } from 'react';

export default function DoctorsDirectoryClient({ data, slug }) {
  const findDoctorsSec = data.sections?.findDoctorsSection || {};
  const doctors = findDoctorsSec.hospitalsDoctors || [];
  const site = data.sections?.site || {};

  const specialties = findDoctorsSec.specialtiesList && findDoctorsSec.specialtiesList.length > 0 
    ? findDoctorsSec.specialtiesList 
    : [...new Set(doctors.map(d => d.specialty))].filter(Boolean);

  const locations = findDoctorsSec.locationsList && findDoctorsSec.locationsList.length > 0 
    ? findDoctorsSec.locationsList 
    : [...new Set(doctors.map(d => d.location))].filter(Boolean);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  // Advanced smart filtering logic for mismatched dropdown names
  const filteredDoctors = doctors.filter(doc => {
    const matchesName = searchTerm === '' || doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesSpecialty = true;
    if (selectedSpecialty !== '') {
      const docSpec = doc.specialty ? doc.specialty.toLowerCase() : '';
      const selSpec = selectedSpecialty.toLowerCase();

      if (selSpec.includes('obstetrics') || selSpec.includes('gynaecology') || selSpec.includes('gynecology')) {
        matchesSpecialty = docSpec.includes('obstetric') || docSpec.includes('gynaec') || docSpec.includes('gynec') || docSpec.includes('reproduc');
      } else if (selSpec.includes('paediatric') || selSpec.includes('pediatric')) {
        matchesSpecialty = docSpec.includes('paediatric') || docSpec.includes('pediatric');
      } else {
        const keywords = selSpec.split(/[\s&,-]+/).filter(w => w.length > 2);
        matchesSpecialty = keywords.some(keyword => docSpec.includes(keyword)) || docSpec.includes(selSpec);
      }
    }
    
    const matchesLocation = selectedLocation === '' || 
      (doc.location && doc.location.toLowerCase().includes(selectedLocation.toLowerCase()));

    return matchesName && matchesSpecialty && matchesLocation;
  });

  return (
    <main className="min-h-screen bg-white font-sans text-gray-800">
      {/* Header with Logo and Book Appointment Button */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md flex items-center justify-between px-6 py-4 shadow-sm">
        <img src={site.assets?.logoSrc || '/motherhood-logo.png'} alt="Logo" className="h-10 object-contain" />
        <a 
          href={site.bookAppointmentUrl || "#"} 
          className="bg-[#DB5070] hover:bg-[#c44563] text-white font-medium px-5 py-2.5 rounded-full text-sm shadow-sm transition"
        >
          Book Appointment
        </a>
      </header>

      {/* Hero Banner */}
      <div className="bg-rose-50/50 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Back Link */}
          <a href={`/${slug}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-[#DB5070] mb-6 transition">
            {findDoctorsSec.backButtonText || `← Back to ${slug}`}
          </a>

          <p className="text-xs uppercase font-bold tracking-widest text-[#DB5070] mb-2">
            {findDoctorsSec.directoryHeaderTitle || `${slug.toUpperCase()} DIRECTORY`}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            {findDoctorsSec.directoryMainHeading || `All Doctors in ${slug}`}
          </h1>
          {/* Automatically shows total count of doctors from the array */}
          <p className="text-gray-600">
            Showing all {doctors.length} doctors available across our locations.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md border border-rose-100 grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Doctor Name Search */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 pointer-events-none">
              <svg className="w-4 h-4 text-[#DB5070]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search by doctor name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DB5070] text-sm"
            />
          </div>

          {/* Specialty Dropdown */}
          <div className="relative">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DB5070] text-sm text-gray-700"
            >
              <option value="">Specialty</option>
              {specialties.map((spec, idx) => (
                <option key={idx} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          {/* Location Dropdown */}
          <div className="relative">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DB5070] text-sm text-gray-700"
            >
              <option value="">Hospital / Location</option>
              {locations.map((loc, idx) => (
                <option key={idx} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Find Doctors Button */}
          <button 
            type="button"
            className="bg-[#DB5070] hover:bg-[#c44563] text-white font-medium py-3 px-6 rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span>Find Doctors</span>
          </button>
        </div>
      </div>

      {/* Doctors Grid / Horizontal Scroll for Mobile */}
      <div className="max-w-7xl mx-auto py-12 px-6">
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto sm:overflow-x-visible pb-4 sm:pb-0 snap-x snap-mandatory">
          {filteredDoctors.map((doc, idx) => (
            <div key={idx} className="min-w-[280px] sm:min-w-0 bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col justify-between hover:shadow-lg transition snap-start">
              <div>
                <div className="bg-gray-100 h-48 relative overflow-hidden flex items-center justify-center">
                  <img src={doc.imageSrc} alt={doc.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-base text-gray-900">{doc.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{doc.qualification}</p>
                  <p className="text-xs font-semibold text-[#DB5070] mt-1">{doc.specialty}</p>

                  <div className="mt-3 pt-3 border-t border-gray-100 text-left space-y-1.5 text-xs text-gray-600">
                    <p className="flex items-start gap-1.5">
                      <svg className="w-3.5 h-3.5 text-[#DB5070] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path>
                        <circle cx="12" cy="9" r="2.5"></circle>
                      </svg>
                      <span>{doc.location}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-[#DB5070] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span>Experience - {doc.experience}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0">
                <a href={doc.bookUrl || "#"} className="w-full bg-[#DB5070] hover:bg-[#c44563] text-white font-medium py-2 rounded-xl transition text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm">
                  <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>Book Appointment</span>
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {filteredDoctors.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">No doctors found matching your criteria.</p>
          </div>
        )}
      </div>
    </main>
  );
}
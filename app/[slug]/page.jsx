import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import LandingHeroSection from '@/components/LandingHeroSection';
import LandingCardsSection from '@/components/LandingCardsSection';
import SpecialtyPathwaySection from '@/components/SpecialtyPathwaySection';
import SpecialtyGridSection from '@/components/SpecialtyGridSection';
import SpecialtiesGridSection from '@/components/SpecialtiesGridSection';
import HospitalLocationsSection from '@/components/HospitalLocationsSection';
import FindDoctorsSection from '@/components/FindDoctorsSection';
import HealthConcernsSection from '@/components/HealthConcernsSection';
import TreatmentOrProcedureSection from '@/components/TreatmentOrProcedureSection';
import CarePackagesSection from '@/components/CarePackagesSection';
import StoriesVideoSection from '@/components/StoriesVideoSection';
import HelpfulReadsSection from '@/components/HelpfulReadsSection';
import RelatedCareSearchesSection from '@/components/RelatedCareSearchesSection';
import FaqSection from '@/components/FaqSection';
import NeedHelpSection from '@/components/NeedHelpSection';

// Static export ke liye dynamic slugs generate karne ke liye yeh function zaroori hai
export async function generateStaticParams() {
  try {
    const dataDir = path.join(process.cwd(), 'data', 'hospitals');
    if (!fs.existsSync(dataDir)) return [];
    
    const filenames = fs.readdirSync(dataDir);
    return filenames
      .filter((file) => file.endsWith('.json'))
      .map((file) => ({
        slug: file.replace(/\.json$/, ''),
      }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

async function getHospitalData(slug) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'hospitals', `${slug}.json`);
    if (!fs.existsSync(filePath)) return null;
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error loading data:", error);
    return null;
  }
}

export default async function Page({ params }) {
  const { slug } = await params;
  const data = await getHospitalData(slug);

  if (!data) {
    notFound();
  }

  const site = data.sections?.site || {};
  const banner = data.sections?.banner || {};
  const cardsSection = data.sections?.cardsSection || {};
  const specialtyPathway = data.sections?.specialtyPathway || {};
  const specialtyGridSection = data.sections?.specialtyGridSection || {};
  const specialtiesGridSection = data.sections?.specialtiesGridSection || {};
  const hospitalLocationsSection = data.sections?.hospitalLocationsSection || {};
  const findDoctorsSection = data.sections?.findDoctorsSection || {};
  const healthConcernsSection = data.sections?.healthConcernsSection || {};
  const treatmentOrProcedureSection = data.sections?.treatmentOrProcedureSection || {};
  const carePackagesSection = data.sections?.carePackagesSection || {};
  const storiesVideoSection = data.sections?.storiesVideoSection || {};
  const helpfulReadsSection = data.sections?.helpfulReadsSection || {};
  const relatedCareSearchesSection = data.sections?.relatedCareSearchesSection || {};
  const faqSection = data.sections?.faqSection || {};
  const needHelpSection = data.sections?.needHelpSection || {};

  return (
    <main className="min-h-screen bg-white font-sans text-gray-800">
      
      {/* Header Navbar */}
      {site.enabled !== false && (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md flex items-center justify-between px-6 py-4 shadow-sm">
          <img 
            src={site.assets?.logoSrc || '/motherhood-logo.png'} 
            alt={site.hospitalName || 'Hospital'} 
            className="h-10 sm:h-12 object-contain" 
          />
          <a 
            href={site.bookAppointmentUrl || `tel:${site.phone?.tel || ''}`} 
            className="bg-[#DB5070] hover:bg-[#c44563] text-white font-medium px-5 py-2.5 rounded-full transition-all duration-300 text-sm sm:text-base shadow-md hover:shadow-lg hover:-translate-y-1"
          >
            Book Appointment
          </a>
        </header>
      )}

      {/* Hero Section Component */}
      {banner.enabled && (
        <LandingHeroSection banner={banner} />
      )}

      {/* Cards Section Component */}
      {cardsSection.enabled && (
        <LandingCardsSection cards={cardsSection.cards} />
      )}

      {/* Specialty Pathway Section Component */}
      {specialtyPathway.enabled && (
        <SpecialtyPathwaySection pathway={specialtyPathway} />
      )}

      {/* Specialty Grid Section Component */}
      {specialtyGridSection.enabled && (
        <SpecialtyGridSection section={specialtyGridSection} />
      )}

      {/* 8 Specialties Grid Section Component */}
      {specialtiesGridSection.enabled && (
        <SpecialtiesGridSection section={specialtiesGridSection} />
      )}

      {/* Hospital Locations Section Component */}
      {hospitalLocationsSection.enabled && (
        <HospitalLocationsSection section={hospitalLocationsSection} />
      )}

      {/* Find Doctors Section Component */}
      {findDoctorsSection.enabled && (
        <FindDoctorsSection section={findDoctorsSection} slug={slug} />
      )}

      {/* Health Concerns Section Component */}
      {healthConcernsSection.enabled && (
        <HealthConcernsSection data={data} />
      )}

      {/* Treatment or Procedure Section Component */}
      {treatmentOrProcedureSection.enabled !== false && (
        <TreatmentOrProcedureSection data={data} />
      )}

      {/* Care Packages Section Component */}
      {carePackagesSection.enabled && (
        <CarePackagesSection section={carePackagesSection} />
      )}

      {/* Stories Video Section Component */}
      {storiesVideoSection.enabled && (
        <StoriesVideoSection section={storiesVideoSection} />
      )}

      {/* Helpful Reads Section Component */}
      {helpfulReadsSection.enabled && (
        <HelpfulReadsSection section={helpfulReadsSection} />
      )}

      {/* Related Care Searches Section Component */}
      {relatedCareSearchesSection.enabled && (
        <RelatedCareSearchesSection section={relatedCareSearchesSection} />
      )}

      {/* FAQ Section Component */}
      {faqSection.enabled && (
        <FaqSection section={faqSection} />
      )}

      {/* Need Help Section Component */}
      {needHelpSection.enabled && (
        <NeedHelpSection section={needHelpSection} />
      )}

    </main>
  );
}
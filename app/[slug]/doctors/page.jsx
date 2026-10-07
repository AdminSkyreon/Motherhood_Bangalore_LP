import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import DoctorsDirectoryClient from '@/components/DoctorsDirectoryClient';

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
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    return null;
  }
}

export default async function AllDoctorsPage({ params }) {
  const { slug } = await params;
  const data = await getHospitalData(slug);

  if (!data) notFound();

  return <DoctorsDirectoryClient data={data} slug={slug} />;
}
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import DoctorsDirectoryClient from '@/components/DoctorsDirectoryClient';

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
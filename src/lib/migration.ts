"use server"

import * as XLSX from 'xlsx';
import * as path from 'path';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function migrateExcelToFirestore() {
  try {
    const filePath = path.join(process.cwd(), 'dokumen/Katalog_Parfum_Lokal_Lengkap.xlsx');
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data: any[] = XLSX.utils.sheet_to_json(worksheet);

    let count = 0;
    for (const item of data) {
      const perfume = {
        brand: item['Brand'],
        name: item['Perfume Name'],
        notes: [
          ...(item['Top Notes'] ? item['Top Notes'].split(',').map((s: string) => s.trim()) : []),
          ...(item['Heart Notes'] ? item['Heart Notes'].split(',').map((s: string) => s.trim()) : []),
          ...(item['Base Notes'] ? item['Base Notes'].split(',').map((s: string) => s.trim()) : [])
        ],
        occasionTag: 'daylight', // Default tag
        avgRating: 9.0,
        imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600', // Placeholder
        price: item['Price (IDR)'],
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'perfumes'), perfume);
      count++;
    }

    return { success: true, count };
  } catch (error: any) {
    console.error("Migration error:", error);
    return { success: false, error: error.message };
  }
}

// scripts/bulk-upload-images.ts
// Usage: npm run upload:images
//
// Upload semua images dari public/images/{vehicles,packages} ke Supabase Storage
// dan update image_url + gallery di table vehicles/packages.
//
// Cara kerja:
// 1. List local files di public/images/vehicles/*.webp
// 2. Upload ke bucket 'vehicles' di Supabase Storage
// 3. Get public URL Supabase
// 4. Update vehicles table: image_url + gallery
//
// Sama untuk packages.
//
// Setup:
// 1. .env.local harus ada:
//    - NEXT_PUBLIC_SUPABASE_URL
//    - NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY  (anon key, untuk RLS public read)
//    - SUPABASE_SERVICE_ROLE_KEY              (service role, untuk bypass RLS saat upload)
// 2. Pastikan migration 002 + 003 + 004 sudah jalan (tables + storage policies)
// 3. Pastikan bucket 'vehicles' & 'packages' sudah dibuat di Storage (Public)
// 4. npm run upload:images

import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { readdir, readFile } from 'fs/promises';
import { join, extname } from 'path';
import { config } from 'dotenv';

config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local');
  process.exit(1);
}

// Use service role if available (bypasses RLS for upload), else fallback to anon
const API_KEY = SUPABASE_SERVICE_KEY || SUPABASE_ANON_KEY;
if (!SUPABASE_SERVICE_KEY) {
  console.warn('⚠️  SUPABASE_SERVICE_ROLE_KEY not found, using anon key.');
  console.warn('   Storage INSERT requires authenticated user OR service role.');
  console.warn('   Set SUPABASE_SERVICE_ROLE_KEY in .env.local for bulk upload to work.');
  console.warn('   Get it from: Supabase Dashboard → Settings → API → service_role key\n');
}

const supabase = createSupabaseClient(SUPABASE_URL, API_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

type FileMap = {
  slug: string;
  main: string; // path
  gallery: string[]; // paths
};

async function getImageFiles(folder: string): Promise<string[]> {
  try {
    const files = await readdir(folder);
    return files.filter((f) => /\.(webp|jpg|jpeg|png)$/i.test(f));
  } catch (e) {
    console.warn(`⚠️  Folder not found: ${folder}`);
    return [];
  }
}

function groupFiles(files: string[]): FileMap[] {
  const map = new Map<string, FileMap>();
  for (const f of files) {
    // f: "toyota-calya.webp" or "toyota-calya-2.webp"
    const ext = extname(f);
    const stem = f.replace(ext, '');
    const match = stem.match(/^(.+?)-(\d+)$/);
    const isSecondary = !!match;
    const slug = isSecondary ? match![1] : stem;
    if (!map.has(slug)) map.set(slug, { slug, main: '', gallery: [] });
    const entry = map.get(slug)!;
    if (isSecondary) {
      entry.gallery.push(f);
    } else {
      entry.main = f;
    }
  }
  // Sort gallery numerically
  for (const entry of map.values()) {
    entry.gallery.sort((a, b) => {
      const aNum = parseInt(a.match(/-(\d+)\./)?.[1] || "0");
      const bNum = parseInt(b.match(/-(\d+)\./)?.[1] || "0");
      return aNum - bNum;
    });
  }
  return Array.from(map.values());
}

async function uploadToStorage(
  bucket: string,
  filePath: string,
  storagePath: string
): Promise<string> {
  const fileBuffer = await readFile(filePath);
  const contentType = filePath.endsWith('.webp') ? 'image/webp' : 'image/jpeg';

  const { error } = await supabase.storage
    .from(bucket)
    .upload(storagePath, fileBuffer, {
      contentType,
      upsert: true, // overwrite if exists
      cacheControl: '3600',
    });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(storagePath);

  return publicUrl;
}

async function processVehicles() {
  console.log('\n📦 Processing vehicles...');
  const folder = join(process.cwd(), 'public', 'images', 'vehicles');
  const files = await getImageFiles(folder);
  if (files.length === 0) return;

  const fileMaps = groupFiles(files);
  console.log(`  Found ${fileMaps.length} vehicles`);

  let uploaded = 0;
  let updated = 0;

  for (const entry of fileMaps) {
    try {
      // Upload main
      const mainPath = join(folder, entry.main);
      const mainStoragePath = `${entry.slug}/${entry.main}`;
      const mainUrl = await uploadToStorage('vehicles', mainPath, mainStoragePath);
      uploaded++;

      // Upload gallery
      const galleryUrls: string[] = [mainUrl];
      for (const g of entry.gallery) {
        const gPath = join(folder, g);
        const gStoragePath = `${entry.slug}/${g}`;
        const gUrl = await uploadToStorage('vehicles', gPath, gStoragePath);
        galleryUrls.push(gUrl);
        uploaded++;
      }

      // Update database
      const { error: dbError } = await supabase
        .from('vehicles')
        .update({
          image_url: mainUrl,
          gallery: galleryUrls,
        })
        .eq('slug', entry.slug);

      if (dbError) {
        console.error(`  ❌ ${entry.slug}: DB update failed - ${dbError.message}`);
        continue;
      }

      updated++;
      console.log(`  ✅ ${entry.slug}: ${galleryUrls.length} image(s)`);
    } catch (e) {
      console.error(`  ❌ ${entry.slug}: ${(e as Error).message}`);
    }
  }

  console.log(`\n📊 Vehicles: ${uploaded} uploaded, ${updated} rows updated`);
}

async function processPackages() {
  console.log('\n📦 Processing packages...');
  const folder = join(process.cwd(), 'public', 'images', 'packages');
  const files = await getImageFiles(folder);
  if (files.length === 0) return;

  // For packages, file name pattern: hiace-bandung.webp
  const fileMaps = files.map((f) => {
    const ext = extname(f);
    return { slug: f.replace(ext, ''), main: f };
  });

  console.log(`  Found ${fileMaps.length} packages`);

  let uploaded = 0;
  let updated = 0;

  for (const entry of fileMaps) {
    try {
      const mainPath = join(folder, entry.main);
      const mainStoragePath = `${entry.slug}/${entry.main}`;
      const mainUrl = await uploadToStorage('packages', mainPath, mainStoragePath);
      uploaded++;

      const { error: dbError } = await supabase
        .from('packages')
        .update({ cover_image_url: mainUrl })
        .eq('slug', entry.slug);

      if (dbError) {
        console.error(`  ❌ ${entry.slug}: DB update failed - ${dbError.message}`);
        continue;
      }

      updated++;
      console.log(`  ✅ ${entry.slug}`);
    } catch (e) {
      console.error(`  ❌ ${entry.slug}: ${(e as Error).message}`);
    }
  }

  console.log(`\n📊 Packages: ${uploaded} uploaded, ${updated} rows updated`);
}

async function processGallery() {
  console.log('\n📦 Processing gallery...');
  const folder = join(process.cwd(), 'public', 'images', 'gallery');
  const files = await getImageFiles(folder);
  if (files.length === 0) return;

  console.log(`  Found ${files.length} images`);

  const staticGallery = [
    { caption: 'Malaysia Tour', location: 'Malaysia', category: 'perjalanan', displayOrder: 1 },
    { caption: 'Malaysia Family Trip', location: 'Malaysia', category: 'perjalanan', displayOrder: 2 },
    { caption: 'Toli-Toli Trip', location: 'Toli-Toli', category: 'perjalanan', displayOrder: 3 },
    { caption: 'Toli-Toli Group Tour', location: 'Toli-Toli', category: 'perjalanan', displayOrder: 4 },
    { caption: 'Toli-Toli Business Trip', location: 'Toli-Toli', category: 'perjalanan', displayOrder: 5 },
    { caption: 'Manado Holiday', location: 'Manado', category: 'perjalanan', displayOrder: 6 },
    { caption: 'Manado Family Trip', location: 'Manado', category: 'pelanggan', displayOrder: 7 },
    { caption: 'Manado Marine Tour', location: 'Manado', category: 'pelanggan', displayOrder: 8 },
  ];

  let uploaded = 0;
  let inserted = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const meta = staticGallery[i] || {
      caption: `Galeri ${i + 1}`,
      location: 'Umum',
      category: 'general',
      displayOrder: i + 1,
    };

    try {
      const filePath = join(folder, file);
      const storagePath = file;
      const imageUrl = await uploadToStorage('gallery', filePath, storagePath);
      uploaded++;

      const { error: dbError } = await supabase.from('gallery_items').insert({
        caption: meta.caption,
        image_url: imageUrl,
        category: meta.category,
        location: meta.location,
        display_order: meta.displayOrder,
        is_active: true,
      });

      if (dbError) {
        console.error(`  ❌ ${file}: DB insert failed - ${dbError.message}`);
        continue;
      }

      inserted++;
      console.log(`  ✅ ${file} → ${meta.caption}`);
    } catch (e) {
      console.error(`  ❌ ${file}: ${(e as Error).message}`);
    }
  }

  console.log(`\n📊 Gallery: ${uploaded} uploaded, ${inserted} rows inserted`);
}

async function main() {
  console.log('🚀 Bulk upload images to Supabase Storage\n');
  console.log(`Supabase URL: ${SUPABASE_URL}`);

  await processVehicles();
  await processPackages();
  await processGallery();

  console.log('\n✅ Done!');
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
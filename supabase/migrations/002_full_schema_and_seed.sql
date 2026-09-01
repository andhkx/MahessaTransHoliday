-- 002_full_schema_and_seed.sql
-- Migration untuk Mahessa Trans Holiday admin dashboard
-- Tujuan: copy 1:1 data dari data/*.ts ke Supabase, biar admin & website bisa sinkron
-- Jalankan SETELAH 001_create_tables_and_seed.sql

-- ============================================
-- 1. ALTER vehicles — tambah kolom agar match dengan data/vehicles.ts
-- ============================================
ALTER TABLE vehicles
  ADD COLUMN IF NOT EXISTS description text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS image_url text,
  ADD COLUMN IF NOT EXISTS gallery text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS badge text,
  ADD COLUMN IF NOT EXISTS suitable_for text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS specs jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS service_areas text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS seo jsonb DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS fuel_type_extra text;

-- Normalisasi fuel_type lama agar tidak konflik jika berisi 'Bensin Hybrid'
UPDATE vehicles SET fuel_type_extra = fuel_type WHERE fuel_type IN ('Bensin Hybrid','Listrik');
UPDATE vehicles SET fuel_type = 'Bensin' WHERE fuel_type IN ('Bensin Hybrid','Listrik');

-- ============================================
-- 2. ALTER packages — tambah kolom agar match dengan data/packages.ts
-- ============================================
ALTER TABLE packages
  ADD COLUMN IF NOT EXISTS description text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS badge text,
  ADD COLUMN IF NOT EXISTS duration_text text,
  ADD COLUMN IF NOT EXISTS duration_hours integer,
  ADD COLUMN IF NOT EXISTS excluded text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS suitable_for text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS itinerary jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS service_areas text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS faq jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS seo jsonb DEFAULT '{}'::jsonb;

-- Backfill duration_text & duration_hours dari duration_days
UPDATE packages
SET duration_text = CASE
    WHEN duration_days = 1 THEN '1 Hari'
    WHEN duration_days = 2 THEN '2 Hari 1 Malam'
    WHEN duration_days = 3 THEN '3 Hari 2 Malam'
    WHEN duration_days = 4 THEN '4 Hari 3 Malam'
    ELSE duration_days::text || ' Hari'
  END
WHERE duration_text IS NULL;

-- ============================================
-- 3. ALTER testimonials — tambah service_type (sudah ada) + display_order
-- ============================================
ALTER TABLE testimonials
  ADD COLUMN IF NOT EXISTS display_order integer DEFAULT 0;

-- ============================================
-- 4. Tabel baru: faq_items (untuk data/faq.ts — 6 + 7 = 13 item)
-- ============================================
CREATE TABLE IF NOT EXISTS faq_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  group_name text NOT NULL DEFAULT 'main', -- 'main' atau 'extra'
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read faq_items" ON faq_items FOR SELECT USING (is_active = true);
CREATE POLICY "Authenticated full access faq_items" ON faq_items FOR ALL TO authenticated USING (true);
GRANT SELECT ON faq_items TO anon;

-- ============================================
-- 5. SEED: vehicles — copy 1:1 dari data/vehicles.ts (12 unit)
-- ============================================
INSERT INTO vehicles (
  slug, name, category, transmission, capacity, fuel_type,
  image_url, gallery, badge, description, suitable_for, features, specs,
  service_areas, seo, price_per_day, is_active
) VALUES
  (
    'toyota-calya', 'Toyota Calya G MT', 'entry', 'Manual', 7, 'Bensin',
    '/images/vehicles/toyota-calya.webp',
    ARRAY['/images/vehicles/toyota-calya.webp','/images/vehicles/toyota-calya-2.webp'],
    NULL,
    ARRAY[
      'Toyota Calya adalah MPV 7 penumpang paling ekonomis di kelasnya. Pilihan tepat untuk keluarga kecil yang butuh kapasitas lebih tanpa harus keluar budget besar.',
      'Konsumsi BBM irit untuk ukuran 7-seater, dan tetap mudah dikendarai di jalanan kota maupun perjalanan luar kota jarak dekat.'
    ],
    ARRAY['Perjalanan keluarga','Wisata kelompok kecil','Mudik dan homecoming','Perjalanan dinas rombongan kecil'],
    ARRAY['AC Dingin','Audio System','Power Steering','Kursi Nyaman','Bagasi Luas','Window/Kaca Tinted'],
    '[{"label":"Kapasitas Penumpang","value":"7 orang"},{"label":"Transmisi","value":"Manual"},{"label":"Bahan Bakar","value":"Bensin"},{"label":"AC","value":"Full AC"},{"label":"Bagasi","value":"Luas"}]'::jsonb,
    ARRAY['Cimahi','Bandung','Padalarang'],
    '{"title":"Rental Toyota Calya Cimahi & Bandung","description":"Sewa Toyota Calya 7 penumpang di Cimahi, Bandung dan Padalarang mulai Rp650.000/ 12 jam. Ekonomis untuk keluarga. Mahessa Trans Holiday.","keywords":["rental calya","sewa calya bandung","rental 7 penumpang murah"]}'::jsonb,
    650000, true
  ),
  (
    'daihatsu-terios', 'Daihatsu Terios X Deluxe AT', 'midrange', 'Automatic', 7, 'Bensin',
    '/images/vehicles/daihatsu-terios.webp',
    ARRAY['/images/vehicles/daihatsu-terios.webp','/images/vehicles/daihatsu-terios-2.webp'],
    NULL,
    ARRAY[
      'Daihatsu Terios adalah SUV ringkas yang nyaman untuk berbagai medan. Ground clearance tingginya membuat percaya diri melewati jalanan menuju wisata alam seperti Ciwidey atau Lembang.',
      'Kabin lega untuk 7 penumpang dengan posisi duduk yang nyaman untuk perjalanan menengah sampai jauh.'
    ],
    ARRAY['Wisata alam','Perjalanan keluarga','Perjalanan dinas','Perjalanan luar kota'],
    ARRAY['AC Dingin','Audio System','Power Steering','Bagasi Luas','Kursi Nyaman','Window/Kaca Tinted'],
    '[{"label":"Kapasitas Penumpang","value":"7 orang"},{"label":"Transmisi","value":"Automatic"},{"label":"Bahan Bakar","value":"Bensin"},{"label":"AC","value":"Full AC"},{"label":"Bagasi","value":"Luas"}]'::jsonb,
    ARRAY['Cimahi','Bandung','Padalarang'],
    '{"title":"Rental Daihatsu Terios Cimahi & Bandung","description":"Sewa Daihatsu Terios di Cimahi, Bandung dan Padalarang mulai Rp800.000/ 12 jam. SUV nyaman untuk wisata alam. Mahessa Trans Holiday.","keywords":["rental terios","sewa terios bandung","rental suv bandung"]}'::jsonb,
    800000, true
  ),
  (
    'toyota-avanza', 'Toyota Avanza New TSS G', 'midrange', 'Automatic', 7, 'Bensin',
    '/images/vehicles/toyota-avanza.webp',
    ARRAY['/images/vehicles/toyota-avanza.webp','/images/vehicles/toyota-avanza-2.webp'],
    'Populer',
    ARRAY[
      'Toyota Avanza adalah pilihan tepat untuk keluarga atau rombongan kecil. Dengan kapasitas 7 penumpang dan konsumsi bahan bakar yang irit, Avanza cocok untuk perjalanan dalam kota maupun luar kota.',
      'Mobil ini terawat, bersih, dan siap untuk petualangan Anda — dari city tour Bandung hingga perjalanan dinas antar kota.'
    ],
    ARRAY['Perjalanan keluarga','Wisata kelompok kecil','Perjalanan dinas','Airport transfer'],
    ARRAY['AC Dingin','Audio System','Power Steering','Bagasi Luas','Kursi Nyaman','Window/Kaca Tinted'],
    '[{"label":"Kapasitas Penumpang","value":"7 orang"},{"label":"Transmisi","value":"Automatic"},{"label":"Bahan Bakar","value":"Bensin"},{"label":"AC","value":"Full AC"},{"label":"Bagasi","value":"Luas"}]'::jsonb,
    ARRAY['Cimahi','Bandung','Padalarang'],
    '{"title":"Rental Toyota Avanza Cimahi & Bandung","description":"Rental Toyota Avanza di Cimahi, Bandung, dan Padalarang untuk kebutuhan keluarga, wisata, perjalanan dinas, maupun transfer. Mulai Rp750.000/ 12 jam.","keywords":["rental avanza","sewa avanza cimahi","avanza bandung"]}'::jsonb,
    750000, true
  ),
  (
    'toyota-rush', 'Toyota Rush GR Sport AT', 'midrange', 'Automatic', 7, 'Bensin',
    '/images/vehicles/toyota-rush.webp',
    ARRAY['/images/vehicles/toyota-rush.webp','/images/vehicles/toyota-rush-2.webp'],
    NULL,
    ARRAY[
      'Toyota Rush GR Sport menggabungkan tampilan SUV yang stylish dengan kenyamanan 7 penumpang. Cocok untuk kamu yang ingin tampil beda saat berkendara.',
      'Performanya stabil di jalan tol maupun jalanan menanjak menuju destinasi wisata highland Bandung.'
    ],
    ARRAY['Wisata keluarga','Perjalanan luar kota','Wisata alam dan highland','Perjalanan dinas'],
    ARRAY['AC Dingin','Audio System','Power Steering','Bagasi Luas','Kursi Nyaman','Window/Kaca Tinted'],
    '[{"label":"Kapasitas Penumpang","value":"7 orang"},{"label":"Transmisi","value":"Automatic"},{"label":"Bahan Bakar","value":"Bensin"},{"label":"AC","value":"Full AC"},{"label":"Bagasi","value":"Luas"}]'::jsonb,
    ARRAY['Cimahi','Bandung','Padalarang'],
    '{"title":"Rental Toyota Rush Cimahi & Bandung","description":"Sewa Toyota Rush GR Sport di Cimahi, Bandung dan Padalarang mulai Rp800.000/ 12 jam. SUV stylish untuk keluarga. Mahessa Trans Holiday.","keywords":["rental rush","sewa rush bandung","rush gr sport rental"]}'::jsonb,
    800000, true
  ),
  (
    'toyota-innova-reborn', 'Toyota Innova Reborn V Diesel', 'premium', 'Automatic', 7, 'Diesel',
    '/images/vehicles/toyota-innova-reborn.webp',
    ARRAY['/images/vehicles/toyota-innova-reborn.webp','/images/vehicles/toyota-innova-reborn-2.webp'],
    NULL,
    ARRAY[
      'Toyota Innova Reborn adalah standar kenyamanan kelas premium mid. Kabin senyap, kursi empuk, dan suspensi yang halus membuat perjalanan jauh terasa ringan.',
      'Pilihan favorit untuk perjalanan dinas eksekutif, wisata keluarga besar, serta antar-jemput tamu penting.'
    ],
    ARRAY['Perjalanan dinas eksekutif','Wisata keluarga','Antar-jemput tamu','Perjalanan luar kota'],
    ARRAY['AC Double Blower','Audio System','Power Steering','Bagasi Luas','Kursi Kulit Nyaman','Window/Kaca Tinted'],
    '[{"label":"Kapasitas Penumpang","value":"7 orang"},{"label":"Transmisi","value":"Automatic"},{"label":"Bahan Bakar","value":"Diesel"},{"label":"AC","value":"Double Blower"},{"label":"Bagasi","value":"Luas"}]'::jsonb,
    ARRAY['Cimahi','Bandung','Padalarang'],
    '{"title":"Rental Toyota Innova Reborn Bandung","description":"Sewa Toyota Innova Reborn diesel di Cimahi, Bandung dan Padalarang mulai Rp1.300.000/ 12 jam. Premium dan nyaman. Mahessa Trans Holiday.","keywords":["rental innova reborn","sewa innova bandung","innova diesel rental"]}'::jsonb,
    1300000, true
  ),
  (
    'toyota-innova-zenix', 'Toyota Innova Zenix Hybrid', 'premium', 'Automatic CVT', 7, 'Bensin',
    '/images/vehicles/toyota-innova-zenix.webp',
    ARRAY['/images/vehicles/toyota-innova-zenix.webp','/images/vehicles/toyota-innova-zenix-2.webp'],
    NULL,
    ARRAY[
      'Toyota Innova Zenix Hybrid adalah MPV generasi terbaru dengan teknologi hybrid yang halus dan efisien. Desain interior modern memberi kesan premium sejak duduk.',
      'Pilihan terbaik untuk perjalanan bisnis, acara pernikahan, atau wisata premium bersama keluarga.'
    ],
    ARRAY['Perjalanan bisnis','Acara pernikahan','Wisata premium','Antar-jemput tamu VIP'],
    ARRAY['AC Dual Zone','Audio System Premium','Power Steering','Bagasi Luas','Kursi Premium','Sunroof'],
    '[{"label":"Kapasitas Penumpang","value":"7 orang"},{"label":"Transmisi","value":"Automatic CVT"},{"label":"Bahan Bakar","value":"Bensin Hybrid"},{"label":"AC","value":"Dual Zone"},{"label":"Bagasi","value":"Luas"}]'::jsonb,
    ARRAY['Cimahi','Bandung','Padalarang'],
    '{"title":"Rental Toyota Innova Zenix Hybrid Bandung","description":"Sewa Toyota Innova Zenix Hybrid di Cimahi, Bandung dan Padalarang mulai Rp1.500.000/ 12 jam. MPV premium modern. Mahessa Trans Holiday.","keywords":["rental zenix","sewa innova zenix bandung","rental hybrid bandung"]}'::jsonb,
    1500000, true
  ),
  (
    'mitsubishi-pajero-sport', 'Mitsubishi Pajero Sport Dakar', 'premium', 'Automatic', 7, 'Diesel',
    '/images/vehicles/mitsubishi-pajero-sport.webp',
    ARRAY['/images/vehicles/mitsubishi-pajero-sport.webp','/images/vehicles/mitsubishi-pajero-sport-2.webp'],
    NULL,
    ARRAY[
      'Mitsubishi Pajero Sport Dakar adalah SUV tangguh untuk segala medan. Sangat cocok untuk perjalanan wisata ke destinasi dengan jalanan menantang seperti Bromo atau Kawah Ijen.',
      'Kabinnya luas dan bertenaga besar, membuat perjalanan jauh terasa aman dan mantap.'
    ],
    ARRAY['Wisata adventure','Perjalanan Bromo/Ijen','Perjalanan luar kota jauh','Perjalanan dinas lapangan'],
    ARRAY['AC Double Blower','Audio System','Power Steering','Bagasi Luas','Kursi Tinggi Nyaman','Ground Clearance Tinggi'],
    '[{"label":"Kapasitas Penumpang","value":"7 orang"},{"label":"Transmisi","value":"Automatic"},{"label":"Bahan Bakar","value":"Diesel"},{"label":"AC","value":"Double Blower"},{"label":"Bagasi","value":"Luas"}]'::jsonb,
    ARRAY['Cimahi','Bandung','Padalarang'],
    '{"title":"Rental Mitsubishi Pajero Sport Bandung","description":"Sewa Mitsubishi Pajero Sport Dakar di Cimahi, Bandung dan Padalarang mulai Rp2.200.000/ 12 jam. Tangguh untuk semua medan. Mahessa Trans Holiday.","keywords":["rental pajero","sewa pajero sport bandung","rental jeep bandung"]}'::jsonb,
    2200000, true
  ),
  (
    'toyota-fortuner', 'Toyota Fortuner VRZ', 'premium', 'Automatic', 7, 'Diesel',
    '/images/vehicles/toyota-fortuner.webp',
    ARRAY['/images/vehicles/toyota-fortuner.webp','/images/vehicles/toyota-fortuner-2.webp'],
    NULL,
    ARRAY[
      'Toyota Fortuner VRZ menghadirkan keseimbangan sempurna antara kemewahan dan ketangguhan. Interior premium dengan posisi duduk tinggi yang nyaman.',
      'Ideal untuk perjalanan dinas pejabat, wisata keluarga besar, maupun road trip jauh yang menuntut kenyamanan.'
    ],
    ARRAY['Perjalanan dinas pejabat','Road trip jauh','Wisata keluarga besar','Antar-jemput tamu'],
    ARRAY['AC Double Blower','Audio System','Power Steering','Bagasi Luas','Kursi Premium','Window/Kaca Tinted'],
    '[{"label":"Kapasitas Penumpang","value":"7 orang"},{"label":"Transmisi","value":"Automatic"},{"label":"Bahan Bakar","value":"Diesel"},{"label":"AC","value":"Double Blower"},{"label":"Bagasi","value":"Luas"}]'::jsonb,
    ARRAY['Cimahi','Bandung','Padalarang'],
    '{"title":"Rental Toyota Fortuner Bandung","description":"Sewa Toyota Fortuner VRZ di Cimahi, Bandung dan Padalarang mulai Rp2.200.000/ 12 jam. Mewah dan tangguh. Mahessa Trans Holiday.","keywords":["rental fortuner","sewa fortuner bandung"]}'::jsonb,
    2200000, true
  ),
  (
    'toyota-alphard', 'Toyota Alphard', 'luxury', 'Automatic', 7, 'Bensin',
    '/images/vehicles/toyota-alphard.webp',
    ARRAY['/images/vehicles/toyota-alphard.webp','/images/vehicles/toyota-alphard-2.webp'],
    'Luxury',
    ARRAY[
      'Toyota Alphard adalah ikon kemewahan MPV. Kursi captain seat yang melapangkan, kabin senyap, dan fitur hiburan lengkap menjadikan setiap perjalanan terasa istimewa.',
      'Pilihan utama untuk wedding car, antar-jemput tamu VIP, maupun perjalanan eksekutif yang mengutamakan prestise.'
    ],
    ARRAY['Wedding car','Antar-jemput tamu VIP','Perjalanan eksekutif','Wisata premium'],
    ARRAY['Captain Seat Premium','AC Dual Zone','Audio & Video System','Power Sliding Door','Kabin Senyap','Window/Kaca Tinted'],
    '[{"label":"Kapasitas Penumpang","value":"7 orang"},{"label":"Transmisi","value":"Automatic"},{"label":"Bahan Bakar","value":"Bensin"},{"label":"AC","value":"Dual Zone"},{"label":"Bagasi","value":"Luas"}]'::jsonb,
    ARRAY['Cimahi','Bandung','Padalarang'],
    '{"title":"Rental Toyota Alphard Bandung & Cimahi","description":"Sewa Toyota Alphard di Cimahi, Bandung dan Padalarang mulai Rp2.500.000/ 12 jam. Untuk wedding, VIP, dan perjalanan eksekutif. Mahessa Trans Holiday.","keywords":["rental alphard","sewa alphard bandung","rental mobil wedding bandung"]}'::jsonb,
    2500000, true
  ),
  (
    'toyota-hiace-premio', 'Toyota Hiace Premio', 'group', 'Manual', 15, 'Diesel',
    '/images/vehicles/toyota-hiace-premio.webp',
    ARRAY['/images/vehicles/toyota-hiace-premio.webp','/images/vehicles/toyota-hiace-premio-2.webp'],
    'Populer',
    ARRAY[
      'Toyota Hiace Premio adalah kendaraan andalan untuk rombongan. Kapasitas 14–15 penumpang dengan kabin tinggi yang memungkinkan gerakan bebas selama perjalanan.',
      'Hanya tersedia dengan driver berpengalaman, sehingga kamu cukup duduk dan nikmati perjalanan — dalam kota maupun antar kota.'
    ],
    ARRAY['Rombongan keluarga','Trip komunitas','Perjalanan dinas grup','Team outing'],
    ARRAY['AC Dingin Merata','Audio System','Reclining Seat','Bagasi Kapasitas Besar','Kabin Tinggi','Window/Kaca Tinted'],
    '[{"label":"Kapasitas Penumpang","value":"14-15 orang"},{"label":"Transmisi","value":"Manual"},{"label":"Bahan Bakar","value":"Diesel"},{"label":"AC","value":"Full AC"},{"label":"Bagasi","value":"Sangat luas"}]'::jsonb,
    ARRAY['Cimahi','Bandung','Padalarang'],
    '{"title":"Sewa Hiace Premio Bandung & Cimahi","description":"Charter Toyota Hiace Premio 15 penumpang dengan driver di Cimahi, Bandung dan Padalarang mulai Rp1.800.000. Mahessa Trans Holiday.","keywords":["sewa hiace premio","hiace bandung","rental hiace cimahi"]}'::jsonb,
    1800000, true
  ),
  (
    'toyota-hiace-commuter', 'Toyota Hiace Commuter', 'group', 'Manual', 16, 'Diesel',
    '/images/vehicles/toyota-hiace-commuter.webp',
    ARRAY['/images/vehicles/toyota-hiace-commuter.webp','/images/vehicles/toyota-hiace-commuter-2.webp'],
    NULL,
    ARRAY[
      'Toyota Hiace Commuter adalah pilihan ekonomis untuk angkutan rombongan besar. Kapasitas hingga 16 penumpang dengan konfigurasi kursi efisien.',
      'Cocok untuk shuttle event, ziarah, atau perjalanan wisata grup dengan budget terkendali — selalu dengan driver profesional Mahessa.'
    ],
    ARRAY['Shuttle event','Ziarah dan religi','Wisata grup besar','Angkutan karyawan'],
    ARRAY['AC Dingin Merata','Audio System','Kursi Jok Empuk','Bagasi Rak Bagasi','Kabin Tinggi','Window/Kaca Tinted'],
    '[{"label":"Kapasitas Penumpang","value":"16 orang"},{"label":"Transmisi","value":"Manual"},{"label":"Bahan Bakar","value":"Diesel"},{"label":"AC","value":"Full AC"},{"label":"Bagasi","value":"Sangat luas"}]'::jsonb,
    ARRAY['Cimahi','Bandung','Padalarang'],
    '{"title":"Sewa Hiace Commuter Bandung & Cimahi","description":"Charter Toyota Hiace Commuter 16 penumpang dengan driver di Cimahi, Bandung dan Padalarang mulai Rp1.500.000. Mahessa Trans Holiday.","keywords":["sewa hiace commuter","rental hiace bandung","bus kecil bandung"]}'::jsonb,
    1500000, true
  ),
  (
    'isuzu-elf', 'Isuzu Elf Long', 'group', 'Manual', 16, 'Diesel',
    '/images/vehicles/isuzu-elf.webp',
    ARRAY['/images/vehicles/isuzu-elf.webp','/images/vehicles/isuzu-elf-2.webp'],
    NULL,
    ARRAY[
      'Isuzu Elf Long adalah microbus tangguh untuk rombongan besar. Kapasitas hingga 16 penumpang dengan ruang bagasi luas untuk perlengkapan perjalanan.',
      'Hanya tersedia dengan driver berpengalaman. Pilihan ekonomis untuk trip grup, shuttle acara, dan perjalanan antar kota.'
    ],
    ARRAY['Rombongan keluarga','Shuttle event','Trip komunitas','Perjalanan dinas grup'],
    ARRAY['AC Dingin Merata','Audio System','Kursi Jok Empuk','Bagasi Kapasitas Besar','Kabin Tinggi','Window/Kaca Tinted'],
    '[{"label":"Kapasitas Penumpang","value":"16 orang"},{"label":"Transmisi","value":"Manual"},{"label":"Bahan Bakar","value":"Diesel"},{"label":"AC","value":"Full AC"},{"label":"Bagasi","value":"Sangat luas"}]'::jsonb,
    ARRAY['Cimahi','Bandung','Padalarang'],
    '{"title":"Sewa Elf Long Bandung & Cimahi","description":"Charter Isuzu Elf Long 16 penumpang dengan driver di Cimahi, Bandung dan Padalarang mulai Rp1.800.000. Mahessa Trans Holiday.","keywords":["sewa elf bandung","rental elf long cimahi","microbus bandung"]}'::jsonb,
    1800000, true
  )
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  transmission = EXCLUDED.transmission,
  capacity = EXCLUDED.capacity,
  fuel_type = EXCLUDED.fuel_type,
  image_url = EXCLUDED.image_url,
  gallery = EXCLUDED.gallery,
  badge = EXCLUDED.badge,
  description = EXCLUDED.description,
  suitable_for = EXCLUDED.suitable_for,
  features = EXCLUDED.features,
  specs = EXCLUDED.specs,
  service_areas = EXCLUDED.service_areas,
  seo = EXCLUDED.seo,
  price_per_day = EXCLUDED.price_per_day,
  is_active = EXCLUDED.is_active,
  updated_at = now();

-- ============================================
-- 6. SEED: packages — copy 1:1 dari data/packages.ts (10 paket)
-- ============================================
INSERT INTO packages (
  slug, name, destination, duration_text, duration_days, duration_hours,
  price, cover_image_url, badge, description, includes, excluded,
  suitable_for, itinerary, service_areas, faq, seo, is_active
) VALUES
  (
    'hiace-bandung', 'Hiace Bandung 1 Hari', 'Bandung', '1 Hari', 1, 9,
    1300000, '/images/packages/hiace-bandung.webp', 'Best Seller',
    ARRAY[
      'Paket ini dirancang untuk perjalanan city tour atau wisata dalam Kota Bandung. Dengan durasi 1 hari (8-10 jam), Anda dapat mengunjungi berbagai tempat menarik seperti Taman Hutan Raya Ir. Djuanda, kawasan Braga, atau pabrik-pabrik kerajinan.',
      'Termasuk pickup dari lokasi Anda, driver yang ramah dan tahu tempat-tempat menarik, serta perjalanan sesuai itinerary yang kamu inginkan.'
    ],
    ARRAY['Mobil Toyota Hiace','Driver berpengalaman','BBM'],
    ARRAY['Tol','Parkir','Retribusi Wisata / Tiket Masuk Atraksi','Makan driver','Overtime (per jam tambahan)'],
    ARRAY['Wisata keluarga','Rombongan / Group','Perjalanan dinas','Team outing','City tour'],
    '[]'::jsonb,
    ARRAY['Cimahi','Bandung','Padalarang'],
    '[{"q":"Apakah pickup dari lokasi saya?","a":"Ya, kami akan pickup Anda dari lokasi yang disepakati di area Cimahi, Bandung, atau Padalarang."},{"q":"Berapa jam perjalanannya?","a":"Durasi dihitung mulai dari waktu pickup. Jika membutuhkan waktu lebih, overtime dapat ditambahkan dengan tarif per jam."},{"q":"Boleh ganti rute/tempat tujuan?","a":"Bisa, selama masih dalam area coverage dan durasi paket. Diskusikan dengan driver kami."},{"q":"Apakah bisa ditambah jam?","a":"Bisa. Tambahan jam dihitung per jam dan dikonfirmasi sebelum perjalanan dimulai."}]'::jsonb,
    '{"title":"Sewa Hiace Bandung 1 Hari Mulai Rp1,3 Juta","description":"Paket Hiace Bandung 1 hari mulai Rp1.300.000. Sudah termasuk mobil, driver, BBM, tol, dan parkir. City tour Bandung tanpa ribet.","keywords":["hiace bandung","sewa hiace","city tour bandung"]}'::jsonb,
    true
  ),
  (
    'hiace-garut', 'Hiace Garut 1 Hari', 'Garut', '1 Hari', 1, 10,
    1500000, '/images/packages/hiace-garut.webp', NULL,
    ARRAY[
      'Garut menyimpan banyak destinasi favorit: Kawah Kamojang, Situ Bagendit, Pantai Santolo, hingga kuliner legendaris Burayang Dapanget. Paket 1 hari ini cukup untuk menjelajahi spot-spot terbaiknya.',
      'Berangkat pagi dari Bandung/Cimahi, pulang malam dengan perjalanan aman bersama driver berpengalaman rute Garut.'
    ],
    ARRAY['Mobil Toyota Hiace','Driver berpengalaman','BBM'],
    ARRAY['Tol','Parkir','Retribusi Wisata / Tiket Masuk Atraksi','Makan driver','Overtime (per jam tambahan)'],
    ARRAY['Wisata keluarga','Wisata alam','Rombongan / Group','Kulineran'],
    '[]'::jsonb,
    ARRAY['Cimahi','Bandung','Padalarang'],
    '[{"q":"Apakah pickup dari lokasi saya?","a":"Ya, kami akan pickup Anda dari lokasi yang disepakati di area Cimahi, Bandung, atau Padalarang."},{"q":"Berapa jam perjalanannya?","a":"Durasi dihitung mulai dari waktu pickup."},{"q":"Boleh ganti rute/tempat tujuan?","a":"Bisa, selama masih dalam area coverage dan durasi paket."},{"q":"Apakah bisa ditambah jam?","a":"Bisa. Tambahan jam dihitung per jam dan dikonfirmasi sebelum perjalanan dimulai."}]'::jsonb,
    '{"title":"Sewa Hiace Garut 1 Hari Mulai Rp1,5 Juta","description":"Paket Hiace Garut 1 hari mulai Rp1.500.000. All-in: mobil, driver, BBM, tol, parkir. Jelajahi Kawah Kamojang hingga pantai selatan Garut.","keywords":["hiace garut","paket wisata garut","sewa hiace garut"]}'::jsonb,
    true
  ),
  (
    'hiace-jakarta', 'Hiace Jakarta PP 1 Hari', 'Jakarta', '1 Hari', 1, 12,
    1850000, '/images/packages/hiace-jakarta.webp', NULL,
    ARRAY[
      'Perjalanan Bandung–Jakarta bolak-balik dalam sehari jadi mudah dengan paket ini. Cocok untuk keperluan dinas, acara keluarga, hingga city tour Jakarta seperti Kota Tua, Monas, atau Ancol.',
      'Durasi hingga 12 jam memberi waktu cukup untuk urusan di Jakarta tanpa harus menginap.'
    ],
    ARRAY['Mobil Toyota Hiace','Driver berpengalaman','BBM'],
    ARRAY['Tol','Parkir','Retribusi Wisata / Tiket Masuk Atraksi','Makan driver','Overtime (per jam tambahan)'],
    ARRAY['Perjalanan dinas','City tour Jakarta','Acara keluarga','Antar-jemput bandara'],
    '[]'::jsonb,
    ARRAY['Cimahi','Bandung','Padalarang'],
    '[{"q":"Apakah pickup dari lokasi saya?","a":"Ya, kami akan pickup Anda dari lokasi yang disepakati."},{"q":"Berapa jam perjalanannya?","a":"Durasi hingga 12 jam."},{"q":"Boleh ganti rute/tempat tujuan?","a":"Bisa, fleksibel."},{"q":"Apakah bisa ditambah jam?","a":"Bisa dengan biaya overtime."}]'::jsonb,
    '{"title":"Sewa Hiace Jakarta PP 1 Hari Mulai Rp1,85 Juta","description":"Paket Hiace Jakarta pulang-pergi mulai Rp1.850.000. Termasuk mobil, driver, BBM, tol, parkir.","keywords":["hiace jakarta","sewa hiace jakarta","bandung jakarta rental"]}'::jsonb,
    true
  ),
  (
    'hiace-ciwidey', 'Hiace Ciwidey 1 Hari', 'Ciwidey', '1 Hari', 1, 9,
    1350000, '/images/packages/hiace-ciwidey.webp', NULL,
    ARRAY[
      'Kawah Putih, Ranca Upas, Rancabali, dan kebun stroberi adalah ikon Ciwidey. Paket 1 hari ini membawa rombonganmu menyusuri jalur selatan Bandung yang sejuk.',
      'Cocok untuk keluarga besar atau komunitas yang ingin wisata alam tanpa perencanaan rumit.'
    ],
    ARRAY['Mobil Toyota Hiace','Driver berpengalaman','BBM'],
    ARRAY['Tol','Parkir','Retribusi Wisata / Tiket Masuk Atraksi','Makan driver','Overtime (per jam tambahan)'],
    ARRAY['Wisata alam','Wisata keluarga','Rombongan / Group','Team outing'],
    '[]'::jsonb,
    ARRAY['Cimahi','Bandung','Padalarang'],
    '[{"q":"Apakah pickup dari lokasi saya?","a":"Ya."},{"q":"Berapa jam perjalanannya?","a":"Durasi 8-10 jam."},{"q":"Boleh ganti rute/tempat tujuan?","a":"Bisa."},{"q":"Apakah bisa ditambah jam?","a":"Bisa."}]'::jsonb,
    '{"title":"Sewa Hiace Ciwidey 1 Hari Mulai Rp1,35 Juta","description":"Paket Hiace Ciwidey 1 hari mulai Rp1.350.000. Kawah Putih, Ranca Upas, Rancabali.","keywords":["hiace ciwidey","kawah putih trip","paket wisata ciwidey"]}'::jsonb,
    true
  ),
  (
    'hiace-pangalengan', 'Hiace Pangalengan 1 Hari', 'Pangalengan', '1 Hari', 1, 10,
    1450000, '/images/packages/hiace-pangalengan.webp', NULL,
    ARRAY[
      'Pangalengan menawarkan udara pegunungan, kebun teh lebar, dan danau yang tenang seperti Situ Cileunca. Rute ini juga populer untuk camping ground dan agrowisata.',
      'Paket 1 hari dengan Hiace membuat rombonganmu bisa fokus menikmati suasana tanpa mikir perjalanan.'
    ],
    ARRAY['Mobil Toyota Hiace','Driver berpengalaman','BBM'],
    ARRAY['Tol','Parkir','Retribusi Wisata / Tiket Masuk Atraksi','Makan driver','Overtime (per jam tambahan)'],
    ARRAY['Wisata alam','Team outing','Agrowisata','Rombongan / Group'],
    '[]'::jsonb,
    ARRAY['Cimahi','Bandung','Padalarang'],
    '[{"q":"Apakah pickup dari lokasi saya?","a":"Ya."},{"q":"Berapa jam perjalanannya?","a":"Durasi 8-10 jam."},{"q":"Boleh ganti rute/tempat tujuan?","a":"Bisa."},{"q":"Apakah bisa ditambah jam?","a":"Bisa."}]'::jsonb,
    '{"title":"Sewa Hiace Pangalengan 1 Hari Mulai Rp1,45 Juta","description":"Paket Hiace Pangalengan 1 hari mulai Rp1.450.000. Jelajahi kebun teh, Situ Cileunca.","keywords":["hiace pangalengan","paket wisata pangalengan"]}'::jsonb,
    true
  ),
  (
    'hiace-pangandaran', 'Hiace Pangandaran 2D1N', 'Pangandaran', '2 Hari 1 Malam', 2, 30,
    4250000, '/images/packages/hiace-pangandaran.webp', NULL,
    ARRAY[
      'Dua hari satu malam di Pangandaran: Pantai Pasir Putih dan Barat, Green Canyon (Cukang Taneuh), Batu Karas, hingga sunset di karang Naga. Pantai timur untuk sunrise, pantai barat untuk sunset.',
      'Paket sudah termasuk tiket penyeberangan untuk rute alternatif, sehingga perjalanan lebih efisien.'
    ],
    ARRAY['Mobil Toyota Hiace','Driver berpengalaman','BBM','Tiket Penyeberangan'],
    ARRAY['Tol','Parkir','Retribusi Wisata / Tiket Masuk Atraksi','Makan driver','Overtime (per jam tambahan)'],
    ARRAY['Wisata pantai','Wisata keluarga','Rombongan / Group','Team outing'],
    '[{"day":"Hari 1","activities":["Pickup pagi dari Cimahi/Bandung/Padalarang","Perjalanan menuju Pangandaran","Green Canyon & Batu Karas","Check-in hotel, istirahat"]},{"day":"Hari 2","activities":["Sunrise di Pantai Timur","Pantai Pasir Putih & konservasi penyu","Souvenir & kuliner lokal","Kembali ke Bandung/Cimahi"]}]'::jsonb,
    ARRAY['Cimahi','Bandung','Padalarang'],
    '[{"q":"Apakah pickup dari lokasi saya?","a":"Ya."},{"q":"Berapa jam perjalanannya?","a":"Paket 2 hari 1 malam."},{"q":"Boleh ganti rute/tempat tujuan?","a":"Bisa."},{"q":"Apakah bisa ditambah jam?","a":"Bisa."}]'::jsonb,
    '{"title":"Sewa Hiace Pangandaran 2D1N Mulai Rp4,25 Juta","description":"Paket Hiace Pangandaran 2 hari 1 malam mulai Rp4.250.000. Green Canyon, Batu Karas.","keywords":["hiace pangandaran","paket wisata pangandaran"]}'::jsonb,
    true
  ),
  (
    'hiace-bromo', 'Hiace Bromo 2D1N', 'Bromo', '2 Hari 1 Malam', 2, 48,
    10000000, '/images/packages/hiace-bromo.webp', NULL,
    ARRAY[
      'Sunrise di Penanjakan, lautan pasir, dan kawah Gunung Bromo adalah pengalaman wajib sekali seumur hidup. Perjalanan dari Bandung ditempuh nyaman dengan Hiace via tol trans-Jawa.',
      'Driver kami hafal timing terbaik agar rombonganmu tiba tepat sebelum matahari terbit.'
    ],
    ARRAY['Mobil Toyota Hiace','Driver berpengalaman','BBM'],
    ARRAY['Tol','Parkir','Retribusi Wisata / Tiket Masuk Atraksi','Makan driver','Overtime (per jam tambahan)'],
    ARRAY['Wisata adventure','Wisata keluarga','Rombongan / Group','Photography trip'],
    '[{"day":"Hari 1","activities":["Pickup malam/malam dini dari Cimahi/Bandung","Perjalanan malam menuju Probolinggo via tol","Tiba di area Bromo, istirahat singkat"]},{"day":"Hari 2","activities":["Jeep menuju Penanjakan untuk sunrise","Lautan pasir & kawah Bromo","Savana & Bukit Teletubbies (opsional)","Perjalanan kembali ke Bandung/Cimahi"]}]'::jsonb,
    ARRAY['Cimahi','Bandung','Padalarang'],
    '[{"q":"Apakah pickup dari lokasi saya?","a":"Ya."},{"q":"Berapa jam perjalanannya?","a":"Paket 2 hari 1 malam."},{"q":"Boleh ganti rute/tempat tujuan?","a":"Bisa."},{"q":"Apakah bisa ditambah jam?","a":"Bisa."}]'::jsonb,
    '{"title":"Sewa Hiace Bromo 2D1N Mulai Rp10 Juta","description":"Paket Hiace Bromo 2 hari 1 malam mulai Rp10.000.000. Sunrise Penanjakan, lautan pasir, kawah Bromo.","keywords":["hiace bromo","open trip bromo bandung","paket bromo"]}'::jsonb,
    true
  ),
  (
    'hiace-semarang', 'Hiace Semarang 2D1N', 'Semarang', '2 Hari 1 Malam', 2, 34,
    4500000, '/images/packages/hiace-semarang.webp', NULL,
    ARRAY[
      'Semarang punya Kota Lama yang instagramable, Sam Poo Kong, Lawang Sewu, hingga kuliner lumpia legendaris. Dua hari cukup untuk menjelajah santai.',
      'Ideal juga untuk perjalanan dinas rombongan ke kota ini.'
    ],
    ARRAY['Mobil Toyota Hiace','Driver berpengalaman','BBM'],
    ARRAY['Tol','Parkir','Retribusi Wisata / Tiket Masuk Atraksi','Makan driver','Overtime (per jam tambahan)'],
    ARRAY['Wisata keluarga','Perjalanan dinas','Kulineran','Rombongan / Group'],
    '[]'::jsonb,
    ARRAY['Cimahi','Bandung','Padalarang'],
    '[{"q":"Apakah pickup dari lokasi saya?","a":"Ya."},{"q":"Berapa jam perjalanannya?","a":"Paket 2 hari 1 malam."},{"q":"Boleh ganti rute/tempat tujuan?","a":"Bisa."},{"q":"Apakah bisa ditambah jam?","a":"Bisa."}]'::jsonb,
    '{"title":"Sewa Hiace Semarang 2D1N Mulai Rp4,5 Juta","description":"Paket Hiace Semarang 2 hari 1 malam mulai Rp4.500.000. Kota Lama, Sam Poo Kong, Lawang Sewu.","keywords":["hiace semarang","paket wisata semarang"]}'::jsonb,
    true
  ),
  (
    'hiace-yogyakarta', 'Hiace Yogyakarta 3D2N', 'Yogyakarta', '3 Hari 2 Malam', 3, 66,
    5500000, '/images/packages/hiace-yogyakarta.webp', NULL,
    ARRAY[
      'Tiga hari dua malam menjelajah Jogja: Candi Prambanan, Keraton, Malioboro, hingga Pantai Parangtritis dan kaki Gunung Merapi. Waktu cukup longgar untuk kulineran juga.',
      'Itinerary fleksibel sesuai request rombonganmu, dengan driver yang paham rute dan spot terbaik.'
    ],
    ARRAY['Mobil Toyota Hiace','Driver berpengalaman','BBM'],
    ARRAY['Tol','Parkir','Retribusi Wisata / Tiket Masuk Atraksi','Makan driver','Overtime (per jam tambahan)'],
    ARRAY['Wisata keluarga','School trip','Rombongan / Group','Kulineran'],
    '[{"day":"Hari 1","activities":["Pickup pagi dari Cimahi/Bandung/Padalarang","Perjalanan menuju Yogyakarta via tol","Malioboro sore & kuliner malam"]},{"day":"Hari 2","activities":["Candi Prambanan & Keraton Yogyakarta","Pantai Parangtritis","Bakmi Jogja untuk makan malam"]},{"day":"Hari 3","activities":["Kalder Merapi / Museum Ullen Sentalu (opsional)","Belanja oleh-oleh","Perjalanan kembali ke Bandung/Cimahi"]}]'::jsonb,
    ARRAY['Cimahi','Bandung','Padalarang'],
    '[{"q":"Apakah pickup dari lokasi saya?","a":"Ya."},{"q":"Berapa jam perjalanannya?","a":"Paket 3 hari 2 malam."},{"q":"Boleh ganti rute/tempat tujuan?","a":"Bisa."},{"q":"Apakah bisa ditambah jam?","a":"Bisa."}]'::jsonb,
    '{"title":"Sewa Hiace Yogyakarta 3D2N Mulai Rp5,5 Juta","description":"Paket Hiace Yogyakarta 3 hari 2 malam mulai Rp5.500.000. Prambanan, Malioboro, Parangtritis.","keywords":["hiace jogja","paket wisata jogja","sewa hiace yogyakarta"]}'::jsonb,
    true
  ),
  (
    'hiace-bali', 'Hiace Bali 4D3N', 'Bali', '4 Hari 3 Malam', 4, 90,
    18000000, '/images/packages/hiace-bali.webp', 'Premium',
    ARRAY[
      'Paket premium Bali 4 hari 3 malam: dari pantai Kuta, Uluwatu, Tanah Lot, hingga Ubud dan Bedugul. Tiket penyeberangan Ketapang–Gilimanuk sudah termasuk.',
      'Perjalanan darat dengan Hiace membuat rombonganmu tetap satu kendaraan dari Bandung sampai Bali — hemat biaya dan praktis.'
    ],
    ARRAY['Mobil Toyota Hiace','Driver berpengalaman','BBM','Tiket Penyeberangan'],
    ARRAY['Tol','Parkir','Retribusi Wisata / Tiket Masuk Atraksi','Makan driver','Overtime (per jam tambahan)'],
    ARRAY['Wisata premium','Rombongan / Group','Family gathering','Honeymoon group'],
    '[{"day":"Hari 1","activities":["Pickup dini hari dari Cimahi/Bandung","Perjalanan menuju Ketapang, seberang ke Gilimanuk","Check-in area Kuta/Seminyak, istirahat"]},{"day":"Hari 2","activities":["Uluwatu & pantai selatan","Kecak dance sunset (opsional)","Kuliner seafood Jimbaran"]},{"day":"Hari 3","activities":["Ubud: Monkey Forest, Tegallalang rice terrace","Bedugul & Beratan Lake","Tanah Lot sunset"]},{"day":"Hari 4","activities":["Belanja oleh-oleh","Penyeberangan kembali ke Jawa","Perjalanan kembali ke Bandung/Cimahi"]}]'::jsonb,
    ARRAY['Cimahi','Bandung','Padalarang'],
    '[{"q":"Apakah pickup dari lokasi saya?","a":"Ya."},{"q":"Berapa jam perjalanannya?","a":"Paket 4 hari 3 malam."},{"q":"Boleh ganti rute/tempat tujuan?","a":"Bisa."},{"q":"Apakah bisa ditambah jam?","a":"Bisa."}]'::jsonb,
    '{"title":"Sewa Hiace Bali 4D3N Mulai Rp18 Juta","description":"Paket Hiace Bali 4 hari 3 malam mulai Rp18.000.000. Kuta, Uluwatu, Ubud, Tanah Lot.","keywords":["hiace bali","paket wisata bali dari bandung","sewa hiace bali"]}'::jsonb,
    true
  )
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  destination = EXCLUDED.destination,
  duration_text = EXCLUDED.duration_text,
  duration_days = EXCLUDED.duration_days,
  duration_hours = EXCLUDED.duration_hours,
  price = EXCLUDED.price,
  cover_image_url = EXCLUDED.cover_image_url,
  badge = EXCLUDED.badge,
  description = EXCLUDED.description,
  includes = EXCLUDED.includes,
  excluded = EXCLUDED.excluded,
  suitable_for = EXCLUDED.suitable_for,
  itinerary = EXCLUDED.itinerary,
  service_areas = EXCLUDED.service_areas,
  faq = EXCLUDED.faq,
  seo = EXCLUDED.seo,
  is_active = EXCLUDED.is_active,
  updated_at = now();

-- ============================================
-- 7. SEED: testimonials — copy 1:1 dari data/testimonials.ts (8 testimoni)
-- ============================================
INSERT INTO testimonials (id, name, role, quote, rating, service_type, is_active, display_order) VALUES
  ('11111111-1111-1111-1111-000000000001', 'Hendri Wijaya', 'Project Manager, PT Teknologi Bandung',
   'Perjalanan dinas ke Jakarta jadi lebih santai. Mobil bersih, driver sabar, terus bisa chat admin kalau butuh sesuatu. Hemat waktu buat fokus kerja, bukan khawatir transport. Rekomendasi untuk team kami.',
   5, 'rental', true, 1),
  ('11111111-1111-1111-1111-000000000002', 'Ibu Siti Nurhaliza', 'Kepala Keluarga, Kota Bandung',
   'Family gathering kami (15 orang) jadi lebih fun. Hiace Mahessa spacious, AC dingin, driver friendly dan sabar. Perjalanan ke Garut jadi sesuatu yang memorable. Pasti pakai Mahessa lagi tahun depan!',
   5, 'package', true, 2),
  ('11111111-1111-1111-1111-000000000003', 'Yudi Hermawan', 'Event Manager, EO Bandung',
   'Untuk guest transfer di event sponsor, Mahessa selalu jadi pilihan. Response cepat, harga fair, unit reliable, sopir berseragam rapi. Sudah jadi vendor terpercaya setiap tahun. Tim profesional banget.',
   5, 'charter', true, 3),
  ('11111111-1111-1111-1111-000000000004', 'Pak Bambang Suryanto', 'Pemilik Agen Perjalanan, Cimahi',
   'Kerjasama dengan Mahessa untuk paket tour. Hiace mereka consistently dalam kondisi prima, komunikasi lancar, harga kompetitif untuk klien kami. Driver-nya tahu destinasi dengan baik. Partnership yang solid.',
   5, 'package', true, 4),
  ('11111111-1111-1111-1111-000000000005', 'Dewi Kusuma', 'Marketing Manager, Hotel Bandung',
   'Untuk shuttle tamu hotel, Mahessa adalah vendor andalan kami. Service 24/7, mobil selalu bersih, driver punctual. Problem solving cepat kalau ada issue. Komunikasi jelas dan profesional setiap saat.',
   5, 'charter', true, 5),
  ('11111111-1111-1111-1111-000000000006', 'Sigit Rahardjo', 'Ketua Komunitas Motor, Bandung',
   'Untuk gathering komunitas 50+ orang, Mahessa siapkan 3 unit Hiace tanpa stress. Sopir friendly, komunikasi lancar, harga grup yang masuk akal. Event jadi sukses karena transport aman & nyaman.',
   5, 'package', true, 6),
  ('11111111-1111-1111-1111-000000000007', 'Rini Handayani', 'Owner Salon & Spa, Bandung',
   'Sering pakai Mahessa untuk team outing karyawan. Mobil nyaman, sopir ramah, booking mudah lewat chat. Karyawan puas, harga reasonable. Setiap outing pasti pakai Mahessa lagi. Recommended!',
   5, 'package', true, 7),
  ('11111111-1111-1111-1111-000000000008', 'Ahmad Subagyo', 'Business Owner & Travel Enthusiast',
   'Rental Alphard untuk liburan keluarga ke Yogya. Mobil premium, interior bersih, AC dingin, sopir berpengalaman dan tahu rute. 8 jam berkendara jadi sangat comfortable. Worth it untuk liburan keluarga!',
   5, 'rental', true, 8)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  quote = EXCLUDED.quote,
  rating = EXCLUDED.rating,
  service_type = EXCLUDED.service_type,
  is_active = EXCLUDED.is_active,
  display_order = EXCLUDED.display_order,
  updated_at = now();

-- ============================================
-- 8. SEED: faq_items — copy dari data/faq.ts (6 main + 7 extra = 13)
-- ============================================
INSERT INTO faq_items (id, group_name, display_order, question, answer, is_active) VALUES
  ('22222222-2222-2222-2222-000000000001', 'main', 1,
   'Apakah semua mobil bisa dengan driver?',
   'Ya, semua unit di armada kami dapat disewa dengan driver profesional.',
   true),
  ('22222222-2222-2222-2222-000000000002', 'main', 2,
   'Apakah bisa antar-jemput dari Stasiun KCIC Padalarang?',
   'Ya, kami melayani charter dan transfer dari berbagai lokasi termasuk Stasiun KCIC Padalarang.',
   true),
  ('22222222-2222-2222-2222-000000000003', 'main', 3,
   'Apakah harga paket sudah termasuk BBM?',
   'Ya, paket All In Hiace sudah termasuk mobil, driver, BBM, tol, parkir, dan tiket penyeberangan.',
   true),
  ('22222222-2222-2222-2222-000000000004', 'main', 4,
   'Apakah melayani perjalanan luar kota?',
   'Ya, kami melayani perjalanan luar kota dalam maupun multi-hari. Lihat paket wisata untuk rute dan harga.',
   true),
  ('22222222-2222-2222-2222-000000000005', 'main', 5,
   'Bagaimana cara reservasi?',
   'Hubungi kami via WhatsApp dengan detail kebutuhan perjalananmu (tanggal, lokasi, jenis kendaraan). Tim kami akan membantu.',
   true),
  ('22222222-2222-2222-2222-000000000006', 'main', 6,
   'Apakah ada biaya tambahan selain harga yang tertera?',
   'Harga sudah fixed seperti tertera. Biaya tambahan (overtime, tujuan di luar coverage) akan dikonfirmasi sebelumnya.',
   true),
  ('22222222-2222-2222-2222-000000000007', 'extra', 1,
   'Bagaimana sistem pembayarannya?',
   'Pembayaran bisa melalui transfer bank atau tunai. Untuk sewa dengan driver dan paket wisata, biasanya ada DP untuk mengunci jadwal dan pelunasan menjelang keberangkatan.',
   true),
  ('22222222-2222-2222-2222-000000000008', 'extra', 2,
   'Bagaimana kalau perlu membatalkan reservasi?',
   'Segera hubungi kami via WhatsApp. Pembatalan jauh sebelum tanggal keberangkatan tidak dikenakan biaya. Ketentuan DP akan dijelaskan tim kami saat konfirmasi.',
   true),
  ('22222222-2222-2222-2222-000000000009', 'extra', 3,
   'Di area mana saja Mahessa melayani?',
   'Kami berbasis di Cimahi, Bandung, dan Padalarang. Untuk tujuan luar kota seperti Jakarta, Yogyakarta, Bromo, hingga Bali, silakan lihat halaman paket perjalanan.',
   true),
  ('22222222-2222-2222-2222-000000000010', 'extra', 4,
   'Bagaimana akomodasi driver untuk perjalanan multi-hari?',
   'Untuk perjalanan multi-hari, akomodasi driver (penginapan dan makan) berada di luar harga paket dan menjadi tanggung jawab penyewa, atau bisa ditambahkan ke paket.',
   true),
  ('22222222-2222-2222-2222-000000000011', 'extra', 5,
   'Bagaimana ketentuan overtime (kelebihan jam)?',
   'Kelebihan durasi dihitung per jam dengan tarif yang telah disepakati sebelumnya. Kami sarankan konfirmasi rencana perjalanan agar durasi cukup.',
   true),
  ('22222222-2222-2222-2222-000000000012', 'extra', 6,
   'Hiace muat berapa orang?',
   'Toyota Hiace Premio kami nyaman untuk 14–16 penumpang termasuk bagasi. Cocok untuk rombongan keluarga, komunitas, hingga perjalanan dinas.',
   true),
  ('22222222-2222-2222-2222-000000000013', 'extra', 7,
   'Bisa antar-jemput dari bandara atau stasiun?',
   'Bisa. Kami rutin melayani transfer dari Stasiun KCIC Padalarang, Stasiun Bandung, serta Bandara Husein Sastranegara dan Kertajati. Cukup informasikan jadwal kedatanganmu.',
   true)
ON CONFLICT (id) DO UPDATE SET
  group_name = EXCLUDED.group_name,
  display_order = EXCLUDED.display_order,
  question = EXCLUDED.question,
  answer = EXCLUDED.answer,
  is_active = EXCLUDED.is_active,
  updated_at = now();

-- ============================================
-- 9. Pastikan index untuk performa
-- ============================================
CREATE INDEX IF NOT EXISTS idx_vehicles_category ON vehicles(category);
CREATE INDEX IF NOT EXISTS idx_vehicles_active ON vehicles(is_active);
CREATE INDEX IF NOT EXISTS idx_packages_destination ON packages(destination);
CREATE INDEX IF NOT EXISTS idx_packages_active ON packages(is_active);
CREATE INDEX IF NOT EXISTS idx_faq_group ON faq_items(group_name, display_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_order ON testimonials(display_order);

-- ============================================
-- 10. Selesai
-- ============================================
-- Total data setelah migration ini:
-- vehicles  : 12 unit (Toyota Calya, Terios, Avanza, Rush, Innova Reborn, Innova Zenix, Pajero Sport, Fortuner, Alphard, Hiace Premio, Hiace Commuter, Isuzu Elf)
-- packages  : 10 paket (Bandung, Garut, Jakarta, Ciwidey, Pangalengan, Pangandaran, Bromo, Semarang, Yogyakarta, Bali)
-- testimoni : 8 testimoni
-- faq_items : 13 item (6 main + 7 extra)
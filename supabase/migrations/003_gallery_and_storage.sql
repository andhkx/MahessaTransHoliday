-- 003_gallery_and_storage.sql
-- Tambah tabel gallery_items + storage buckets setup notes
-- Jalankan SETELAH 001 & 002

-- ============================================
-- 1. Tabel gallery_items
-- ============================================
CREATE TABLE IF NOT EXISTS gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  caption text NOT NULL,
  image_url text NOT NULL,
  category text NOT NULL DEFAULT 'general', -- 'perjalanan', 'kendaraan', 'pelanggan', 'general'
  location text, -- opsional: 'Cimahi', 'Garut', 'Bromo', dll
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read gallery_items" ON gallery_items FOR SELECT USING (is_active = true);
CREATE POLICY "Authenticated full access gallery_items" ON gallery_items FOR ALL TO authenticated USING (true);
GRANT SELECT ON gallery_items TO anon;

CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_items(category, display_order);
CREATE INDEX IF NOT EXISTS idx_gallery_active ON gallery_items(is_active);

-- ============================================
-- 2. Seed gallery_items (placeholder, 6 item awal)
-- Jalankan setelah upload images via admin untuk populate yang asli
-- ============================================
-- INSERT INTO gallery_items (caption, image_url, category, location, display_order) VALUES
--   ('Perjalanan keluarga ke Ciwidey', 'https://rxhibmwhkjpfwirzvojt.supabase.co/storage/v1/object/public/gallery/ciwidey-1.jpg', 'perjalanan', 'Ciwidey', 1),
--   ('...', '...', '...', '...', 2);

-- ============================================
-- 3. STORAGE BUCKETS
-- Buat via dashboard: Storage -> New bucket
-- ============================================
-- vehicles (Public, file size 50MB, MIME any)
-- packages (Public, file size 50MB, MIME any)
-- articles (Public, file size 50MB, MIME any)
-- gallery (Public, file size 50MB, MIME any)  <- TAMBAH INI

-- ============================================
-- 4. STORAGE RLS POLICIES (recommended)
-- Setup via dashboard: Storage -> [bucket] -> Policies -> New policy
-- ============================================
-- Policy template: "Allow public read" untuk semua bucket
--   Operation: SELECT
--   Target roles: anon, authenticated
--   USING expression: bucket_id = '<bucket_name>'

-- Policy template: "Allow authenticated upload" untuk semua bucket
--   Operation: INSERT
--   Target roles: authenticated
--   WITH CHECK expression: bucket_id = '<bucket_name>'

-- Policy template: "Allow authenticated update" untuk semua bucket
--   Operation: UPDATE
--   Target roles: authenticated
--   USING expression: bucket_id = '<bucket_name>'

-- Policy template: "Allow authenticated delete" untuk semua bucket
--   Operation: DELETE
--   Target roles: authenticated
--   USING expression: bucket_id = '<bucket_name>'

-- ============================================
-- Selesai
-- ============================================
-- Setelah migration ini:
-- 1. Buka Supabase dashboard -> Storage -> buat bucket 'gallery' (Public, 50MB, MIME any)
-- 2. Set RLS policies untuk bucket 'gallery' (4 policies: SELECT anon, INSERT/UPDATE/DELETE authenticated)
-- 3. Buka admin /admin/dashboard/gallery -> upload images
-- 4. Update public page /galeri untuk fetch dari gallery_items table
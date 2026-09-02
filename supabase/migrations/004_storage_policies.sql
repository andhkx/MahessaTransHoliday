-- 004_storage_policies.sql
-- Auto-create RLS policies untuk Supabase Storage buckets
-- Jalankan di Supabase SQL Editor

-- ============================================
-- Storage: Allow public read untuk semua bucket
-- ============================================
CREATE POLICY "Public read vehicles"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'vehicles');

CREATE POLICY "Public read packages"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'packages');

CREATE POLICY "Public read articles"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'articles');

CREATE POLICY "Public read gallery"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'gallery');

-- ============================================
-- Storage: Allow authenticated (admin) full access
-- ============================================
CREATE POLICY "Auth upload vehicles"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'vehicles');

CREATE POLICY "Auth upload packages"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'packages');

CREATE POLICY "Auth upload articles"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'articles');

CREATE POLICY "Auth upload gallery"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'gallery');

CREATE POLICY "Auth update vehicles"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'vehicles');

CREATE POLICY "Auth update packages"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'packages');

CREATE POLICY "Auth update articles"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'articles');

CREATE POLICY "Auth update gallery"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'gallery');

CREATE POLICY "Auth delete vehicles"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'vehicles');

CREATE POLICY "Auth delete packages"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'packages');

CREATE POLICY "Auth delete articles"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'articles');

CREATE POLICY "Auth delete gallery"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'gallery');
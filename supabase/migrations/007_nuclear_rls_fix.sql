-- 007_nuclear_rls_fix.sql
-- Nuclear option: hapus SEMUA policy lama, recreate simple
-- Run this in Supabase SQL Editor

-- ============================================
-- VEHICLES
-- ============================================
DROP POLICY IF EXISTS "Public read vehicles" ON vehicles;
DROP POLICY IF EXISTS "Public read" ON vehicles;
DROP POLICY IF EXISTS "Allow public read vehicles" ON vehicles;
DROP POLICY IF EXISTS "Allow admin full access vehicles" ON vehicles;
DROP POLICY IF EXISTS "Allow admin full" ON vehicles;
DROP POLICY IF EXISTS "Authenticated full access vehicles" ON vehicles;
DROP POLICY IF EXISTS "Admin full access" ON vehicles;

CREATE POLICY "vehicles_select" ON vehicles
FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "vehicles_modify" ON vehicles
FOR ALL TO authenticated
USING (true)
WITH CHECK (true);

-- ============================================
-- PACKAGES
-- ============================================
DROP POLICY IF EXISTS "Public read packages" ON packages;
DROP POLICY IF EXISTS "Public read" ON packages;
DROP POLICY IF EXISTS "Allow public read packages" ON packages;
DROP POLICY IF EXISTS "Allow admin full access packages" ON packages;
DROP POLICY IF EXISTS "Allow admin full" ON packages;
DROP POLICY IF EXISTS "Authenticated full access packages" ON packages;
DROP POLICY IF EXISTS "Admin full access" ON packages;

CREATE POLICY "packages_select" ON packages
FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "packages_modify" ON packages
FOR ALL TO authenticated
USING (true)
WITH CHECK (true);

-- ============================================
-- ARTICLES
-- ============================================
DROP POLICY IF EXISTS "Public read articles" ON articles;
DROP POLICY IF EXISTS "Public read" ON articles;
DROP POLICY IF EXISTS "Allow public read articles" ON articles;
DROP POLICY IF EXISTS "Allow admin full access articles" ON articles;
DROP POLICY IF EXISTS "Allow admin full" ON articles;
DROP POLICY IF EXISTS "Authenticated full access articles" ON articles;
DROP POLICY IF EXISTS "Admin full access" ON articles;

CREATE POLICY "articles_select" ON articles
FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "articles_modify" ON articles
FOR ALL TO authenticated
USING (true)
WITH CHECK (true);

-- ============================================
-- TESTIMONIALS
-- ============================================
DROP POLICY IF EXISTS "Public read testimonials" ON testimonials;
DROP POLICY IF EXISTS "Public read" ON testimonials;
DROP POLICY IF EXISTS "Allow public read testimonials" ON testimonials;
DROP POLICY IF EXISTS "Allow admin full access testimonials" ON testimonials;
DROP POLICY IF EXISTS "Allow admin full" ON testimonials;
DROP POLICY IF EXISTS "Authenticated full access testimonials" ON testimonials;
DROP POLICY IF EXISTS "Admin full access" ON testimonials;

CREATE POLICY "testimonials_select" ON testimonials
FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "testimonials_modify" ON testimonials
FOR ALL TO authenticated
USING (true)
WITH CHECK (true);

-- ============================================
-- FAQ_ITEMS
-- ============================================
DROP POLICY IF EXISTS "Public read faq_items" ON faq_items;
DROP POLICY IF EXISTS "Public read" ON faq_items;
DROP POLICY IF EXISTS "Allow public read faq_items" ON faq_items;
DROP POLICY IF EXISTS "Allow admin full access faq_items" ON faq_items;
DROP POLICY IF EXISTS "Allow admin full" ON faq_items;
DROP POLICY IF EXISTS "Authenticated full access faq_items" ON faq_items;
DROP POLICY IF EXISTS "Admin full access" ON faq_items;

CREATE POLICY "faqs_select" ON faq_items
FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "faqs_modify" ON faq_items
FOR ALL TO authenticated
USING (true)
WITH CHECK (true);

-- ============================================
-- GALLERY_ITEMS
-- ============================================
DROP POLICY IF EXISTS "Public read gallery_items" ON gallery_items;
DROP POLICY IF EXISTS "Public read" ON gallery_items;
DROP POLICY IF EXISTS "Allow public read gallery_items" ON gallery_items;
DROP POLICY IF EXISTS "Allow admin full access gallery_items" ON gallery_items;
DROP POLICY IF EXISTS "Allow admin full" ON gallery_items;
DROP POLICY IF EXISTS "Authenticated full access gallery_items" ON gallery_items;
DROP POLICY IF EXISTS "Admin full access" ON gallery_items;

CREATE POLICY "gallery_select" ON gallery_items
FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "gallery_modify" ON gallery_items
FOR ALL TO authenticated
USING (true)
WITH CHECK (true);

-- ============================================
-- Tambah kolom is_featured untuk featured selection
-- ============================================
ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS is_featured boolean NOT NULL DEFAULT false;
ALTER TABLE packages ADD COLUMN IF NOT EXISTS is_featured boolean NOT NULL DEFAULT false;

-- Mark popular vehicles as featured
UPDATE vehicles SET is_featured = true WHERE badge = 'Populer' OR badge = 'Luxury';

-- Mark popular packages as featured
UPDATE packages SET is_featured = true WHERE badge IS NOT NULL;

-- Pastikan grants
GRANT SELECT ON vehicles, packages, articles, testimonials, faq_items, gallery_items TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON vehicles, packages, articles, testimonials, faq_items, gallery_items TO authenticated;
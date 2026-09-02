-- 005_ensure_rls_policies.sql
-- Ensure all RLS policies allow anon (public) read for public tables
-- Run if RLS policies from migration 002 didn't take effect

-- ============================================
-- Drop and recreate all public read policies
-- ============================================

-- Vehicles
DROP POLICY IF EXISTS "Public read vehicles" ON vehicles;
CREATE POLICY "Public read vehicles" ON vehicles
FOR SELECT
TO anon, authenticated
USING (is_active = true);

-- Packages
DROP POLICY IF EXISTS "Public read packages" ON packages;
CREATE POLICY "Public read packages" ON packages
FOR SELECT
TO anon, authenticated
USING (is_active = true);

-- Articles (only published)
DROP POLICY IF EXISTS "Public read articles" ON articles;
CREATE POLICY "Public read articles" ON articles
FOR SELECT
TO anon, authenticated
USING (status = 'published');

-- Testimonials
DROP POLICY IF EXISTS "Public read testimonials" ON testimonials;
CREATE POLICY "Public read testimonials" ON testimonials
FOR SELECT
TO anon, authenticated
USING (is_active = true);

-- FAQs
DROP POLICY IF EXISTS "Public read faq_items" ON faq_items;
CREATE POLICY "Public read faq_items" ON faq_items
FOR SELECT
TO anon, authenticated
USING (is_active = true);

-- Gallery
DROP POLICY IF EXISTS "Public read gallery_items" ON gallery_items;
CREATE POLICY "Public read gallery_items" ON gallery_items
FOR SELECT
TO anon, authenticated
USING (is_active = true);

-- ============================================
-- Ensure grant
-- ============================================
GRANT SELECT ON vehicles TO anon, authenticated;
GRANT SELECT ON packages TO anon, authenticated;
GRANT SELECT ON articles TO anon, authenticated;
GRANT SELECT ON testimonials TO anon, authenticated;
GRANT SELECT ON faq_items TO anon, authenticated;
GRANT SELECT ON gallery_items TO anon, authenticated;
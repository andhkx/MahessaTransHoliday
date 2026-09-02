-- 006_fix_rls_policies.sql
-- Fix 42501 permission denied on auth.users for anonymous role
-- Run in Supabase SQL Editor

-- Drop the bad policy that queries auth.users
DROP POLICY IF EXISTS "Allow admin full access vehicles" ON vehicles;
DROP POLICY IF EXISTS "Allow admin full access packages" ON packages;
DROP POLICY IF EXISTS "Allow admin full access testimonials" ON testimonials;

-- Replace with simple policy: authenticated users can do everything
-- Admin dashboard uses authenticated user with anon client (RLS still applies)
CREATE POLICY "Allow admin full access vehicles" ON vehicles
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow admin full access packages" ON packages
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow admin full access testimonials" ON testimonials
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Also articles, faq, gallery
DROP POLICY IF EXISTS "Authenticated full access vehicles" ON vehicles;
CREATE POLICY "Authenticated full access vehicles" ON vehicles
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated full access packages" ON packages;
CREATE POLICY "Authenticated full access packages" ON packages
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated full access testimonials" ON testimonials;
CREATE POLICY "Authenticated full access testimonials" ON testimonials
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated full access faq_items" ON faq_items;
CREATE POLICY "Authenticated full access faq_items" ON faq_items
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated full access gallery_items" ON gallery_items;
CREATE POLICY "Authenticated full access gallery_items" ON gallery_items
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated full access articles" ON articles;
CREATE POLICY "Authenticated full access articles" ON articles
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
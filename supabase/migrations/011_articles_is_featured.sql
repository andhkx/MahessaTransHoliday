-- 011_articles_is_featured.sql
-- Add "show on homepage" toggle + bilingual fields (EN) to articles table
-- Run in Supabase SQL Editor

ALTER TABLE articles
  ADD COLUMN IF NOT EXISTS is_featured boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS title_en text,
  ADD COLUMN IF NOT EXISTS excerpt_en text;

CREATE INDEX IF NOT EXISTS idx_articles_is_featured ON articles (is_featured) WHERE is_featured = true;

-- Set 4 most recent published as featured (for homepage)
UPDATE articles
SET is_featured = true
WHERE id IN (
  SELECT id FROM articles
  WHERE status = 'published'
  ORDER BY published_at DESC NULLS LAST
  LIMIT 4
);

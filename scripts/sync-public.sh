#!/usr/bin/env bash
# sync-public.sh
# Transform a checkout of `main` into a Cloudflare-Pages-ready branch.
# Run from the root of the repo with the public branch checked out.
#
# What it does:
#   1. Renames  app/admin              → app/_admin_disabled
#      (Next.js ignores folders prefixed with `_`, so they are not routed)
#   2. Removes  middleware.ts          (static export cannot run middleware)
#   3. Cleans   .next/ and out/        (stale build artefacts)
#
# Designed to be run by .github/workflows/sync-public.yml AFTER it has
# already force-synced public with main. Do NOT run this on `main`.

set -euo pipefail

echo "→ [sync-public] Starting transformation..."

# 1. Rename admin folder (if present)
if [ -d "app/admin" ]; then
  echo "→ Renaming app/admin → app/_admin_disabled"
  git mv app/admin app/_admin_disabled
elif [ -d "app/_admin_disabled" ]; then
  echo "→ app/_admin_disabled already exists, skipping rename"
else
  echo "→ app/admin not found, skipping rename"
fi

# 2. Remove middleware.ts (if present)
if [ -f "middleware.ts" ]; then
  echo "→ Removing middleware.ts"
  git rm middleware.ts
fi

# 3. Clean stale build artefacts (these are .gitignored but safe to clear)
echo "→ Cleaning .next/ and out/"
rm -rf .next out

echo "✓ [sync-public] Transformation complete"
echo "  Next: git commit -m 'chore(sync): transform main → public for Cloudflare Pages'"

# Breath of Life PDC - Project Memory

## Project Constraints
- **Only work within**: `F:\Mike d drive\Mike Webs\Client Projects\Breath of Life - Michele Avila Mendoza\BOLoct26-github\playa-impact-cms-main`
- **No new repos** without approval
- **No browser automation** (no antigravity)
- **No files outside project folder**
- **GitHub/Vercel**: dynamicmike@gmail.com

## Live URLs
- GitHub: https://github.com/dynamicmike-dashboard/playa-impact-cms
- Vercel: https://playa-impact-cms.vercel.app/
- Custom: https://BreathofLifePDC.org

## Environment Variables (Vercel)
- `VITE_ADMIN_PASSWORD=boladmin2026` (required for /admin login)

## Tech Stack
- Vite + TanStack Start (React Router) + Tailwind CSS
- Local JSON data store (`src/data/*.json`) - no Supabase
- Static SPA deployment on Vercel

## Key Files
- `src/routes/auth.tsx` - Admin login (password-only, uses sessionStorage)
- `src/data/donation_methods.json` - Donation page content
- `src/data/dropoffs.json` - Drop-off locations
- `src/data/content_blocks.json` - All translatable copy
- `vercel.json` - SPA routing + static assets
- `vite.config.ts` - Custom index.html generation for static SPA
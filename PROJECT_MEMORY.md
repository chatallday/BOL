# Breath of Life PDC - Project Memory

## Project Constraints
- **Only work within**: `F:\Mike d drive\Mike Webs\Client Projects\Breath of Life - Michele Avila Mendoza\BOLoct26-github\playa-impact-cms-main`
- **No new repos** without approval
- **No browser automation** (no antigravity)
- **No files outside project folder**
- **GitHub/Vercel**: dynamicmike@gmail.com

## Live URLs
- GitHub (original): https://github.com/dynamicmike-dashboard/playa-impact-cms
- GitHub (new, 17nov26): https://github.com/chatallday/BOL.git (account: chatalldaybot@gmail.com)
- Vercel: https://playa-impact-cms.vercel.app/
- Vercel (alt): https://bol-smoky.vercel.app/
- Custom: https://BreathofLifePDC.org

## Recent Changes
- Footer sponsor changed from PlayaExpats.com to PlayaVida.org (https://PlayaVida.org).
- Added "Christmas 2026" nav dropdown with links: Volunteer, Donate, Drop-off, Advent calendar tickets.
- Volunteer page opportunities updated (Pack Monthly Despensas, Weekly Bazaar Sales Support, Special Event Helpers, Social Media & Photos); subtitle updated.
- Drop-off page reduced to Buzos Restaurant and Breath of Life only.
- How-to-help page: cards renamed/updated; removed toy-drive promo section.
- Donate page: OXXO card number updated to 4027 6661 2293 8227; added Wise method with QR (QR Wise for BOL crop.jpeg).
- Header Christmas 2026 dropdown: "Drop-off" renamed to "Toy Drive Drop Off" linking to advent-dropoff; dropdown opens on click.
- Homepage Community Programs updated (Monthly food packages, Weekly Bazaar Sales); removed "weekly" from Volunteer section.

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
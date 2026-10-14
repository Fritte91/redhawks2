# RedHawks Burger & Kebab

Website for RedHawks, a burger and kebab kiosk in Hua Hin, Thailand.
Live: https://redhawks.bkkboost.com/ (Cloudflare)

A single page built with React 18 and Vite. It is prerendered to static HTML
at build time and hydrated in the browser, so the menu, prices and location
are readable before (and without) JavaScript.

## Commands

```bash
npm ci                  # install
npm run dev             # dev server
npm run build           # production build → dist/ (prerendered)
npm run preview         # serve dist/ locally
npm run deploy          # build and deploy to Cloudflare (wrangler)
npm run images          # regenerate public/images/street from assets/originals
npm run brand-assets    # regenerate favicon, apple-touch icon and OG image
```

Deployment, routing (404/410) and headers: [docs/HOSTING.md](docs/HOSTING.md).

## Structure

```
src/
  main.jsx            hydrates the prerendered page
  entry-server.jsx    build-time renderer used by scripts/prerender.mjs
  site/               the page (StreetHome), SEO, fonts, 404/410 pages
  shared/             menu helpers, business facts, images, hooks, BkkBoost badge
  data/menuItems.js   the menu: products, categories, prices (THB)
scripts/              prerender, image and brand-asset generation
assets/               originals kept out of the build (photos, font source)
public/               served as-is: optimised images, fonts, icons
worker/index.js       Cloudflare Worker: 410 Gone for retired /article/* URLs
wrangler.jsonc        Cloudflare config (static assets, 404 page, custom domain)
public/_headers       security and cache headers on Cloudflare
middleware.js         Vercel fallback copy: the same 410 handling
vercel.json           Vercel fallback copy: build, headers, noindex
```

## Editing the menu

Edit `src/data/menuItems.js`. Prices are numbers in baht, keyed by protein
(`beef`, `pork`, `chicken`) or `single`. The page, the price columns and the
menu structured data all derive from this file. For a new dish, add its image
to `assets/originals/` and run `npm run images`.

## Business details

`src/shared/restaurant.js` holds the location and map links. The phone number
and opening hours are `null` until the owner confirms them; the page shows the
phone row, call buttons and hours automatically once they are filled in. The
file documents what was checked against the public Google Maps listing.

## Fonts

Big Shoulders Display and Archivo, self-hosted from `public/fonts/` under the
SIL Open Font License (licence files alongside).

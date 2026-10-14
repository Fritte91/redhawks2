# RedHawks Burger & Kebab

Website for RedHawks, a burger and kebab kiosk in Hua Hin, Thailand.

Built with React 18 and Vite. The homepage is prerendered to static HTML at
build time and hydrated in the browser, so the menu, prices and location are
readable before (and without) JavaScript.

## Commands

```bash
npm ci                    # install
npm run dev               # dev server (client-rendered)
SITE_URL=https://<domain> npm run build   # production build → dist/
npm run preview           # serve dist/ locally
npm run images            # regenerate public/images/street from the originals
npm run brand-assets      # regenerate favicon, apple-touch icon and OG image
```

`SITE_URL` is the production origin. The domain is not decided yet; without it
the build omits canonical/OG URLs and the sitemap. See
[docs/HOSTING.md](docs/HOSTING.md) for the routing rules the host must apply.

## Structure

```
src/
  main.jsx            hydrates the prerendered "/" or renders other routes
  entry-server.jsx    build-time renderer used by scripts/prerender.mjs
  App.jsx             routes
  site/               production homepage (Street), SEO, fonts, status pages
  shared/             menu helpers, business facts, images, hooks, BkkBoost credit
  data/menuItems.js   the menu: products, categories, prices (THB)
  previews/editorial/ unlinked design concept (noindex)
  components/         legacy homepage, not used — see docs/LEGACY.md
scripts/              prerender, image and brand-asset generation
assets/               originals kept out of the build (photos, font source)
public/               served as-is: optimised images, fonts, icons
```

## Editing the menu

Edit `src/data/menuItems.js`. Prices are numbers in baht, keyed by protein
(`beef`, `pork`, `chicken`) or `single`. The page, the menu structured data and
the price columns all derive from this file. If you add a dish, add its image
to `public/` and run `npm run images`.

## Business details

`src/shared/restaurant.js` holds the address, phone and map links. Only
owner-confirmed facts are published as structured data; opening hours are
unknown and shown as "to be confirmed".

## Fonts

Big Shoulders Display and Archivo, self-hosted from `public/fonts/` under the
SIL Open Font License (licence files alongside).

# Hosting

The site is deployed on Vercel from the `main` branch of
`github.com/Fritte91/redhawks2` (production: https://redhawks2.vercel.app/).
It is a static build plus one tiny Routing Middleware for retired URLs.

## Build

`vercel.json` pins the build so dashboard settings cannot drift from it:

| Setting | Value |
| --- | --- |
| Install | `npm ci` |
| Build | `npm run build` (client build → SSR build → `scripts/prerender.mjs`) |
| Output | `dist/` |

The production origin used for canonical/Open Graph URLs and the sitemap is
taken from, in order:

1. `SITE_URL` (set it in the Vercel project if you want to force a domain),
2. `VERCEL_PROJECT_PRODUCTION_URL`, Vercel's system variable for the project's
   production domain — so adding a custom domain later updates the canonical
   URL on the next deploy automatically.

With neither, the build still succeeds and simply omits those tags.

## Output

| File | Purpose |
| --- | --- |
| `index.html` | `/`, fully prerendered (menu, prices, location) with SEO head and JSON-LD. Hydrates. |
| `404.html` | Static "not found" page, no JavaScript. Vercel serves it with **404** for any missing path. |
| `410.html` | Static "removed" page, no JavaScript. Served with **410** by `middleware.js`. |
| `robots.txt`, `sitemap.xml` | Homepage only. |

## Routing

| Request | Response | How |
| --- | --- | --- |
| `/` | `index.html`, 200 | static file |
| `/article/*` | `410.html`, **410 Gone** + `X-Robots-Tag: noindex` | `middleware.js` (matcher `/article/:path*`) |
| existing file | the file | static |
| anything else | `404.html`, **404** | Vercel's default for static output |

There is deliberately **no catch-all rewrite**: unknown URLs must return a real
404, not the homepage with a 200.

`/article/*` were the old journal articles. They described things that are not
true of the business and have no replacement, so 410 (gone on purpose) is used
instead of a redirect to the homepage, which search engines treat as a soft 404.

## Headers (`vercel.json`)

- Security on every response: `Content-Security-Policy` (self-hosted scripts,
  styles, fonts and images; the Google Maps embed as the only frame),
  `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`.
  Vercel adds HSTS itself.
- Caching: `/assets/*` (content-hashed) and `/fonts/*` for a year, immutable;
  `/images/*` for 30 days with stale-while-revalidate. HTML is revalidated on
  every request (Vercel default). If you change an image or font without
  renaming it, rename it.

Preview deployments get `X-Robots-Tag: noindex` from Vercel automatically.

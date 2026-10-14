# Hosting

Production is **https://redhawks.bkkboost.com/**, served by Cloudflare
(Workers Static Assets, Worker `redhawks` in the BkkBoost Cloudflare account).
The site is a static, prerendered build plus a few lines of Worker code for the
retired `/article/*` URLs.

https://redhawks2.vercel.app/ (Vercel, deployed from `main` by the Vercel Git
integration) is kept for now as a **fallback copy**. It is marked `noindex` and
canonicalises to the production domain, so search engines index only one copy.

## Build

`npm run build` = client build → SSR build → `scripts/prerender.mjs`, into
`dist/`. Every canonical URL, `og:url`, absolute image URL, the JSON-LD `url`
and the sitemap use `https://redhawks.bkkboost.com` (`PRODUCTION_ORIGIN` in
`scripts/prerender.mjs`), whichever host serves the build. Set `SITE_URL` to
override it, e.g. for a local preview.

## Deploy (Cloudflare)

```bash
npm ci
npx wrangler login      # once, with the BkkBoost Cloudflare account
npm run deploy          # npm run build && wrangler deploy
```

Deploys are run from the command line. Pushing to GitHub does **not** deploy to
Cloudflare (it still updates the Vercel fallback). To deploy on push, connect
the repository to the `redhawks` Worker in the Cloudflare dashboard (Workers
Builds: build command `npm run build`, deploy command `npx wrangler deploy`).

`wrangler.jsonc`:

| Setting | Value | Why |
| --- | --- | --- |
| `assets.directory` | `./dist` | the prerendered build |
| `assets.not_found_handling` | `404-page` | unknown paths get `dist/404.html` with a real **404** (no catch-all to the homepage) |
| `assets.html_handling` | `auto-trailing-slash` | `/index.html` redirects to `/` |
| `assets.run_worker_first` | `/article`, `/article/*`, `/404(.html)`, `/410(.html)` | only these reach `worker/index.js`; everything else is served straight from the asset store |
| `routes` | `redhawks.bkkboost.com`, `custom_domain: true` | Cloudflare manages the DNS record and certificate |
| `workers_dev`, `preview_urls` | `false` | no second public copy on `*.workers.dev` |

## Routing

| Request | Response |
| --- | --- |
| `/` | `index.html`, 200 (fully prerendered; hydrates) |
| existing file | the file, 200 |
| `/article`, `/article/*` | `410.html`, **410 Gone** + `X-Robots-Tag: noindex` (Worker) |
| `/404`, `/410` (and `.html`) | the page with its own status, not 200 (Worker) |
| anything else | `404.html`, **404** |

`/article/*` were the old journal articles. They described things that are not
true of the business and have no replacement, so 410 is used instead of a
redirect to the homepage, which search engines treat as a soft 404.

## Headers

`public/_headers` (copied into `dist/`, not served as a file):

- Security on every response: `Content-Security-Policy` (self-hosted scripts,
  styles, fonts and images; the Google Maps embed as the only frame),
  `Strict-Transport-Security`, `X-Frame-Options: DENY`,
  `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`.
  `worker/index.js` sets the same security headers on the 404/410 responses it
  builds; keep the two lists in sync.
- Caching: `/assets/*` (content-hashed) and `/fonts/*` for a year, immutable;
  `/images/*` for 30 days with stale-while-revalidate. HTML is revalidated on
  every request (Cloudflare's default). If you change an image or font without
  renaming it, rename it.

## Vercel fallback

`vercel.json` and `middleware.js` keep the Vercel copy working the same way
(404 page, 410 for `/article/*`, the same security and cache headers), plus
`X-Robots-Tag: noindex` on every response. The Vercel build deletes
`dist/_headers`, which only Cloudflare uses.

To retire it: remove the project in Vercel (or point it at a redirect), then
delete `vercel.json` and `middleware.js`.

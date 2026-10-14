# Hosting

The site is a static build. `npm run build` writes everything to `dist/`; no
server-side code is needed. The host only has to serve files and apply the
routing rules below.

## Build

```bash
npm ci
SITE_URL=https://<production-domain> npm run build
```

`SITE_URL` is the production origin. **It has not been decided yet.** Without
it the build still succeeds but leaves out everything that needs an absolute
URL — `<link rel="canonical">`, `og:url`, `og:image`, `twitter:image`, the
Restaurant `url`/`image` and `sitemap.xml` — rather than guessing a domain.
Set it in the host's build settings once the domain is chosen.

## Output

| File | Purpose |
| --- | --- |
| `index.html` | `/`, fully prerendered (menu, prices, location) with SEO head and JSON-LD. Hydrates. |
| `spa.html` | Empty `noindex` shell for client-rendered routes (`/preview/*`). |
| `404.html` | Static "not found" page, no JavaScript. |
| `410.html` | Static "removed" page for the retired journal (`/article/*`), no JavaScript. |
| `robots.txt`, `sitemap.xml` | `sitemap.xml` only when `SITE_URL` is set. |

## Routing rules

| Request | Response |
| --- | --- |
| `/` | `index.html`, 200 |
| `/preview/*` | `spa.html`, 200 (rewrite, not redirect) |
| `/article/*` | `410.html`, **410 Gone** |
| an existing file | that file |
| anything else | `404.html`, **404** |

Unknown URLs must return a real 404 — do **not** configure a catch-all rewrite
of every path to `index.html`. (If one is configured anyway, the app still
behaves: the browser sees the `/` markup does not match the URL and renders the
correct route client-side, but crawlers would get a 200 for missing pages.)

### Why 410 for `/article/*`

The old journal articles (`/article/1`–`/article/6`) described things that are
not true of the business. There is no equivalent content to redirect to, so a
301 to the homepage would be a soft 404. 410 tells search engines the pages are
gone on purpose and removes them from the index fastest.

### Host examples

**Netlify** — `public/_redirects` (copied into `dist/`):

```
/preview/*   /spa.html   200
/article/*   /410.html   410
```

Netlify serves `404.html` automatically for missing files.

**Cloudflare Pages** — `_redirects` supports the `200` rewrite but not custom
status codes, so `/article/*` needs a small Pages Function (or a Worker) that
returns `410.html` with status 410. `404.html` is served automatically.

**Vercel** — `vercel.json` rewrites handle `/preview/*` → `/spa.html`; Vercel
serves `404.html` automatically. A 410 status for `/article/*` requires
Routing Middleware.

These files are deliberately **not** committed yet because the host has not
been chosen.

## Caching

- `assets/*` filenames are content-hashed: cache for a year, immutable.
- `fonts/*` and `images/street/*` are versioned by filename: long cache is safe;
  rename the file if its content changes.
- HTML, `robots.txt`, `sitemap.xml`: no cache / revalidate.

## Previews

`/preview/editorial` is an unlinked design concept. It is served from
`spa.html` (static `noindex`) and also sets `noindex` at runtime.
`/preview/street` redirects to `/` client-side now that Street is the homepage.

// Static prerendering, run by `npm run build` after the client and SSR builds.
//
//   dist/index.html  "/" fully rendered (menu, prices, location) + SEO head; hydrates.
//   dist/404.html    static "not found" page (no JavaScript).
//   dist/410.html    static "removed" page for retired /article/* URLs.
//   dist/robots.txt, dist/sitemap.xml
//
// The production origin comes from SITE_URL, or on Vercel from the project's
// production domain (VERCEL_PROJECT_PRODUCTION_URL, a system environment
// variable), so a custom domain added later is picked up automatically.
// Without either the build still works but omits canonical, og:url, absolute
// image URLs and the sitemap instead of guessing a domain.

import { readFile, writeFile, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

function siteOrigin(value) {
  if (!value) return ''
  const url = new URL(value)
  if (!/^https?:$/.test(url.protocol)) throw new Error(`SITE_URL must be http(s): ${value}`)
  return url.origin
}

const vercelDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL
const siteUrl = siteOrigin(process.env.SITE_URL || (vercelDomain && `https://${vercelDomain}`))
if (siteUrl) console.log(`[prerender] site URL: ${siteUrl}`)
else console.warn('[prerender] No SITE_URL: canonical, og:url, og:image and sitemap.xml are omitted.')

const server = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)
const template = await readFile(path.join(dist, 'index.html'), 'utf8')

for (const marker of ['<!--app-head-->', '<div id="root"><!--app-html--></div>']) {
  if (!template.includes(marker)) throw new Error(`index.html is missing ${marker}`)
}

function page({ head, html, scripts = true }) {
  let out = template
    .replace(/<!--.*?app-head \(scripts\/prerender\.mjs\)\. -->\s*/s, '')
    .replace(/<title>.*?<\/title>\s*/s, '')
    .replace('<!--app-head-->', head)
    .replace('<div id="root"><!--app-html--></div>', `<div id="root">${html}</div>`)
  if (!scripts) {
    out = out.replace(/\s*<script type="module"[^>]*><\/script>/g, '').replace(/\s*<link rel="modulepreload"[^>]*>/g, '')
  }
  return out
}

const files = {
  'index.html': page({ head: server.homeHead(siteUrl), html: server.renderHome() }),
  '404.html': page({ head: server.statusHead(server.STATUS_COPY[404].title), html: server.renderStatus(404), scripts: false }),
  '410.html': page({ head: server.statusHead(server.STATUS_COPY[410].title), html: server.renderStatus(410), scripts: false }),
  'robots.txt': server.robotsTxt(siteUrl),
}
if (siteUrl) files['sitemap.xml'] = server.sitemapXml(siteUrl)
else await rm(path.join(dist, 'sitemap.xml'), { force: true })

for (const [name, content] of Object.entries(files)) {
  await writeFile(path.join(dist, name), content)
  console.log(`[prerender] dist/${name} (${(Buffer.byteLength(content) / 1024).toFixed(1)} KB)`)
}

await rm(ssrDir, { recursive: true, force: true })

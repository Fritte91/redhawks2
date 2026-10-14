// Static prerendering, run by `npm run build` after the client and SSR builds.
//
//   dist/index.html  "/" fully rendered (menu, prices, location) + SEO head; hydrates.
//   dist/spa.html    empty noindex shell for client-rendered routes (/preview/*).
//   dist/404.html    static "not found" page (no JavaScript).
//   dist/410.html    static "removed" page for retired /article/* URLs.
//   dist/robots.txt, dist/sitemap.xml
//
// SITE_URL is the production origin, e.g. SITE_URL=https://example.com npm run build.
// It is not decided yet. Without it the build still works but omits canonical,
// og:url, absolute image URLs and the sitemap instead of guessing a domain.

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

const siteUrl = siteOrigin(process.env.SITE_URL)
if (!siteUrl) {
  console.warn('[prerender] SITE_URL is not set: canonical, og:url, og:image and sitemap.xml are omitted.')
}

const server = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)
const template = await readFile(path.join(dist, 'index.html'), 'utf8')

for (const marker of ['<!--app-head-->', '<div id="root"><!--app-html--></div>']) {
  if (!template.includes(marker)) throw new Error(`index.html is missing ${marker}`)
}

function page({ head, html = '', prerendered = '', scripts = true }) {
  let out = template
    .replace(/<!--.*?app-head \(scripts\/prerender\.mjs\)\. -->\s*/s, '')
    .replace(/<title>.*?<\/title>\s*/s, '')
    .replace('<!--app-head-->', head)
    .replace(
      '<div id="root"><!--app-html--></div>',
      `<div id="root"${prerendered ? ` data-prerendered="${prerendered}"` : ''}>${html}</div>`
    )
  if (!scripts) {
    out = out.replace(/\s*<script type="module"[^>]*><\/script>/g, '').replace(/\s*<link rel="modulepreload"[^>]*>/g, '')
  }
  return out
}

const files = {
  'index.html': page({ head: server.homeHead(siteUrl), html: server.render('/'), prerendered: '/' }),
  'spa.html': page({ head: server.noindexHead('RedHawks Burger & Kebab') }),
  '404.html': page({ head: server.noindexHead(server.STATUS_COPY[404].title), html: server.render('/404'), scripts: false }),
  '410.html': page({ head: server.noindexHead(server.STATUS_COPY[410].title), html: server.render('/article/retired'), scripts: false }),
  'robots.txt': server.robotsTxt(siteUrl),
}
if (siteUrl) files['sitemap.xml'] = server.sitemapXml(siteUrl)
else await rm(path.join(dist, 'sitemap.xml'), { force: true })

for (const [name, content] of Object.entries(files)) {
  await writeFile(path.join(dist, name), content)
  console.log(`[prerender] dist/${name} (${(Buffer.byteLength(content) / 1024).toFixed(1)} KB)`)
}

await rm(ssrDir, { recursive: true, force: true })

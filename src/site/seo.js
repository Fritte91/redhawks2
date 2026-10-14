// Head tags and structured data for the prerendered pages.
// `siteUrl` is the production origin (SITE_URL at build time). It is not known
// yet, so everything that needs an absolute URL — canonical, og:url, og:image,
// twitter:image, sitemap — is omitted when it is empty rather than guessed.

import { restaurant } from '../shared/restaurant'
import { menuByCategory, priceOptions, menuStats, lowestPrice } from '../shared/menu'
import { HERO, srcSet } from '../shared/images'

export const TITLE = `${restaurant.name} · ${restaurant.city}`
export const DESCRIPTION =
  `Burgers, kebabs and Swedish plates from a kiosk in ${restaurant.city}, Thailand. ` +
  'See the full menu with prices in Thai baht and find the kiosk.'

const OG_IMAGE = { path: '/images/og/redhawks-og.jpg', width: 1200, height: 630 }
const OG_ALT = 'The RedHawks wordmark beside a close-up of stacked burgers'

export const FONT_FILES = [
  '/fonts/big-shoulders-display-latin-700-900.woff2',
  '/fonts/archivo-latin-400-600.woff2',
]

const escapeAttr = value => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const meta = (key, name, content) => `<meta ${key}="${name}" content="${escapeAttr(content)}">`
const absolute = (siteUrl, path) => (siteUrl ? new URL(path, siteUrl).href : null)

// Only owner-confirmed facts. No telephone (unconfirmed), no opening hours
// (unknown), no geo coordinates, ratings or reviews.
export function restaurantJsonLd(siteUrl) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: restaurant.name,
    servesCuisine: ['Burgers', 'Kebab'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: restaurant.city,
      addressRegion: restaurant.province,
      addressCountry: restaurant.country,
    },
    priceRange: `THB ${lowestPrice(menuStats.cheapest)}–${lowestPrice(menuStats.priciest)}`,
    hasMenu: {
      '@type': 'Menu',
      name: 'Menu',
      inLanguage: 'en',
      hasMenuSection: menuByCategory.map(category => ({
        '@type': 'MenuSection',
        name: category.label,
        hasMenuItem: category.items.map(item => ({
          '@type': 'MenuItem',
          name: item.name,
          ...(item.description && { description: item.description }),
          offers: priceOptions(item.prices).map(({ label, price }) => ({
            '@type': 'Offer',
            ...(label && { name: label }),
            price: String(price),
            priceCurrency: 'THB',
          })),
        })),
      })),
    },
  }
  if (siteUrl) {
    data.url = absolute(siteUrl, '/')
    data.image = absolute(siteUrl, OG_IMAGE.path)
  }
  // Escape "<" so menu text can never close the script element.
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

const iconTags = [
  '<link rel="icon" href="/favicon.ico" sizes="any">',
  '<link rel="apple-touch-icon" href="/apple-touch-icon.png">',
  '<meta name="theme-color" content="#0e0c0b">',
]

export function homeHead(siteUrl) {
  const url = absolute(siteUrl, '/')
  const image = absolute(siteUrl, OG_IMAGE.path)
  return [
    `<title>${escapeAttr(TITLE)}</title>`,
    meta('name', 'description', DESCRIPTION),
    url && `<link rel="canonical" href="${url}">`,
    ...iconTags,
    // Discoverable before any JavaScript: hero image and the two typefaces.
    `<link rel="preload" as="image" type="image/avif" fetchpriority="high" imagesrcset="${srcSet(HERO.name, HERO.widths, 'avif')}" imagesizes="${HERO.sizes}">`,
    ...FONT_FILES.map(href => `<link rel="preload" as="font" type="font/woff2" href="${href}" crossorigin>`),
    meta('property', 'og:type', 'website'),
    meta('property', 'og:site_name', restaurant.name),
    meta('property', 'og:title', TITLE),
    meta('property', 'og:description', DESCRIPTION),
    meta('property', 'og:locale', 'en_US'),
    url && meta('property', 'og:url', url),
    image && meta('property', 'og:image', image),
    image && meta('property', 'og:image:width', OG_IMAGE.width),
    image && meta('property', 'og:image:height', OG_IMAGE.height),
    image && meta('property', 'og:image:alt', OG_ALT),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', TITLE),
    meta('name', 'twitter:description', DESCRIPTION),
    image && meta('name', 'twitter:image', image),
    image && meta('name', 'twitter:image:alt', OG_ALT),
    `<script type="application/ld+json">${restaurantJsonLd(siteUrl)}</script>`,
  ]
    .filter(Boolean)
    .join('\n    ')
}

// Shell for client-rendered routes (previews) and static status pages: never indexed.
export function noindexHead(title) {
  return [`<title>${escapeAttr(title)}</title>`, '<meta name="robots" content="noindex, nofollow">', ...iconTags].join('\n    ')
}

export function robotsTxt(siteUrl) {
  return ['User-agent: *', 'Allow: /', ...(siteUrl ? ['', `Sitemap: ${absolute(siteUrl, '/sitemap.xml')}`] : []), ''].join('\n')
}

export function sitemapXml(siteUrl) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${absolute(siteUrl, '/')}</loc></url>
</urlset>
`
}

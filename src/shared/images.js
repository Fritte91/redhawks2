// Responsive image manifest for the Street preview. The widths listed here are
// exactly what scripts/optimize-street-images.mjs generates.

const DIR = 'images/street'

// Street's featured dishes: one burger, one kebab, one plate — chosen for range, not ranked.
export const FEATURED_IDS = [3, 12, 16]

// Hero photo (/3.jpg, 3063×4594). Covers the full mobile viewport, so it can
// render wider than 100vw on tall phones.
export const HERO = {
  source: '3.jpg',
  dir: DIR,
  name: 'hero',
  widths: [640, 960, 1280, 1600],
  // Covers the viewport: on tall phones it renders at ~67vh × 2/3 wide, not 100vw.
  sizes: '(min-width: 1024px) 42vw, (max-aspect-ratio: 2/3) 67vh, 100vw',
  width: 3063,
  height: 4594,
}

// Featured dishes: full-bleed squares on mobile, up to ~600px wide on desktop.
export const FEATURE = { widths: [480, 768, 1024] }

// Menu-board thumbnails: 64px (mobile), 80px (tablet), 88px (desktop) at up to 3x.
export const THUMB = { widths: [128, 192, 288] }

// BkkBoost logo (/112.png, 489×511, transparent) for the 34px footer badge.
export const LOGO = { source: '112.png', name: 'bkkboost', widths: [64, 128] }

// '/cheese.png' → 'dish-cheese'
export const dishName = imagePath => `dish-${imagePath.replace(/^\//, '').replace(/\.\w+$/, '')}`

export const srcSet = (name, widths, ext) => widths.map(w => `/${DIR}/${name}-${w}.${ext} ${w}w`).join(', ')

export const src = (name, width, ext = 'webp') => `/${DIR}/${name}-${width}.${ext}`

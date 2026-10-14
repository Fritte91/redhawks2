// Generates the responsive AVIF/WebP images served by the site.
// Originals are never modified; output goes to public/images/street.
//
//   npm run images
//
// Sources are the untouched originals in assets/originals (kept out of the build).

import { existsSync } from 'node:fs'
import { mkdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { menuItems } from '../src/data/menuItems.js'
import { HERO, FEATURE, THUMB, LOGO, FEATURED_IDS, dishName } from '../src/shared/images.js'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const publicDir = path.join(root, 'public')
const sourceDirs = [path.join(root, 'assets/originals')]
const outDir = path.join(publicDir, HERO.dir)

// Tuned by eye against the originals: no visible banding in the dark studio
// backdrops of the dish renders, no smearing in the hero photo's textures.
const QUALITY = {
  hero: { avif: { quality: 52, effort: 6 }, webp: { quality: 76, effort: 6 } },
  dish: { avif: { quality: 58, effort: 6 }, webp: { quality: 80, effort: 6 } },
  thumb: { avif: { quality: 56, effort: 6 }, webp: { quality: 78, effort: 6 } },
}

const findSource = file => {
  const name = file.replace(/^\//, '')
  const dir = sourceDirs.find(d => existsSync(path.join(d, name)))
  if (!dir) throw new Error(`Source image not found: ${name}`)
  return path.join(dir, name)
}

const results = []

async function write(source, name, width, settings, formats = ['avif', 'webp']) {
  for (const format of formats) {
    const file = path.join(outDir, `${name}-${width}.${format}`)
    await sharp(findSource(source))
      .resize({ width, withoutEnlargement: true })
      [format](settings[format])
      .toFile(file)
    results.push({ file: path.relative(publicDir, file), bytes: (await stat(file)).size })
  }
}

await mkdir(outDir, { recursive: true })

for (const width of HERO.widths) await write(HERO.source, HERO.name, width, QUALITY.hero)

for (const item of menuItems) {
  const name = dishName(item.image)
  for (const width of THUMB.widths) await write(item.image, name, width, QUALITY.thumb)
  if (FEATURED_IDS.includes(item.id)) {
    for (const width of FEATURE.widths) await write(item.image, name, width, QUALITY.dish)
  }
}

// Agency logo keeps its transparency.
for (const width of LOGO.widths) {
  await write(LOGO.source, LOGO.name, width, { webp: { quality: 90, alphaQuality: 100, effort: 6 } }, ['webp'])
}

const total = results.reduce((sum, r) => sum + r.bytes, 0)
console.log(results.map(r => `${String(Math.round(r.bytes / 1024)).padStart(5)} KB  ${r.file}`).join('\n'))
console.log(`\n${results.length} files, ${(total / 1024 / 1024).toFixed(2)} MB total`)

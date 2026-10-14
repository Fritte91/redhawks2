// Generates the favicon set and the social preview image from the temporary
// typographic REDHAWKS wordmark (Big Shoulders Display Black) and the existing
// hero photo. No new imagery is created.
//
//   npm run brand-assets
//
// Output: public/favicon.ico, public/apple-touch-icon.png, public/images/og/redhawks-og.jpg

import { mkdir, writeFile, mkdtemp } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const fontDir = path.join(root, 'assets/fonts-src')
const publicDir = path.join(root, 'public')

// Point librsvg (inside sharp) at the bundled font before sharp loads.
const fcDir = await mkdtemp(path.join(os.tmpdir(), 'redhawks-fc-'))
const fcFile = path.join(fcDir, 'fonts.conf')
await writeFile(
  fcFile,
  `<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM "fonts.dtd"><fontconfig><dir>${fontDir}</dir><cachedir>${fcDir}</cachedir></fontconfig>`
)
process.env.FONTCONFIG_FILE = fcFile
const { default: sharp } = await import('sharp')

const INK = '#0e0c0b'
const RED = '#e3241b'
const CREAM = '#f3e9d6'
const FONT = `font-family="Big Shoulders Display" font-weight="900"`

// "RH" monogram: RED in red, HAWKS in cream, as in the wordmark.
const monogram = size => `
  <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
    <rect width="512" height="512" fill="${INK}"/>
    <text x="256" y="430" text-anchor="middle" ${FONT} font-size="440" letter-spacing="-6">
      <tspan fill="${RED}">R</tspan><tspan fill="${CREAM}">H</tspan>
    </text>
  </svg>`

const png = size => sharp(Buffer.from(monogram(512))).resize(size, size).png().toBuffer()

// ICO container holding PNG images (supported by every current browser).
function ico(images) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(images.length, 4)
  let offset = 6 + images.length * 16
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(size % 256, 0)
    entry.writeUInt8(size % 256, 1)
    entry.writeUInt16LE(1, 4)
    entry.writeUInt16LE(32, 6)
    entry.writeUInt32LE(data.length, 8)
    entry.writeUInt32LE(offset, 12)
    offset += data.length
    return entry
  })
  return Buffer.concat([header, ...entries, ...images.map(i => i.data)])
}

const icoImages = await Promise.all([16, 32, 48].map(async size => ({ size, data: await png(size) })))
await writeFile(path.join(publicDir, 'favicon.ico'), ico(icoImages))
await writeFile(path.join(publicDir, 'apple-touch-icon.png'), await png(180))

// Social preview (1200×630): the desktop hero composition in miniature.
const W = 1200
const H = 630
const PHOTO_W = 520
const photo = await sharp(path.join(root, 'assets/originals', '3.jpg'))
  .resize(PHOTO_W, H, { fit: 'cover', position: 'centre' })
  .toBuffer()

const type = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <rect x="64" y="96" width="406" height="48" fill="${CREAM}"/>
    <text x="78" y="133" ${FONT} font-size="34" letter-spacing="2" fill="${INK}">BURGER &amp; KEBAB · HUA HIN</text>
    <text x="56" y="372" ${FONT} font-size="240" fill="${RED}">RED</text>
    <text x="56" y="566" ${FONT} font-size="240" fill="${CREAM}">HAWKS</text>
  </svg>`

await mkdir(path.join(publicDir, 'images/og'), { recursive: true })
await sharp({ create: { width: W, height: H, channels: 3, background: INK } })
  .composite([
    { input: photo, left: W - PHOTO_W, top: 0 },
    { input: Buffer.from(type), left: 0, top: 0 },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(publicDir, 'images/og/redhawks-og.jpg'))

console.log('favicon.ico, apple-touch-icon.png, images/og/redhawks-og.jpg written')

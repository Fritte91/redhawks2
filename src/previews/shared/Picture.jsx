import React from 'react'
import { srcSet, src } from './images'

const CONTENTS = { display: 'contents' }
const HIDDEN = { display: 'none' }

// <picture> with AVIF first and WebP as the fallback (every current browser
// supports one of the two). The wrapper uses display: contents so layout CSS
// written against the <img> keeps applying unchanged. <source> is not hidden
// by default, so without display: none it would become a grid/flex item once
// the wrapper is display: contents. Source selection does not depend on layout.
const Picture = ({ name, widths, sizes, fallbackWidth = widths[widths.length - 1], ...img }) => (
  <picture style={CONTENTS}>
    <source style={HIDDEN} type="image/avif" srcSet={srcSet(name, widths, 'avif')} sizes={sizes} />
    <source style={HIDDEN} type="image/webp" srcSet={srcSet(name, widths, 'webp')} sizes={sizes} />
    <img src={src(name, fallbackWidth)} decoding="async" {...img} />
  </picture>
)

export default Picture

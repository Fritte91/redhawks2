import React from 'react'
import './bkkboost-credit.css'

const HREF = 'https://bkkboost.com/'
const LABEL = 'Powered by BkkBoost (opens bkkboost.com in a new tab)'

const Arrow = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
  </svg>
)

// Agency credit in BkkBoost's own navy / orange / cream palette, kept visually
// separate from the restaurant brand. The bands use the existing logo /112.png;
// the badge uses its optimised derivatives (scripts/optimize-street-images.mjs).
// Variants: 'cream' and 'navy' are full-width bands; 'badge' is a compact
// signature that sits inside a footer.
const BkkBoostCredit = ({ variant = 'cream' }) => {
  if (variant === 'badge') {
    return (
      <a className="bkb-badge" href={HREF} target="_blank" rel="noopener noreferrer" aria-label={LABEL}>
        <img
          className="bkb-badge__logo"
          src="/images/street/bkkboost-128.webp"
          srcSet="/images/street/bkkboost-64.webp 64w, /images/street/bkkboost-128.webp 128w"
          sizes="34px"
          alt=""
          width="34"
          height="34"
          loading="lazy"
          decoding="async"
        />
        <span className="bkb-badge__text">
          <span className="bkb-badge__label">Powered by</span>
          <span className="bkb-badge__brand">BkkBoost</span>
        </span>
        <Arrow className="bkb-badge__arrow" />
      </a>
    )
  }

  return (
    <div className={`bkb-credit bkb-credit--${variant}`}>
      <a className="bkb-credit__link" href={HREF} target="_blank" rel="noopener noreferrer" aria-label={LABEL}>
        <img className="bkb-credit__logo" src="/112.png" alt="" width="32" height="32" loading="lazy" />
        <span className="bkb-credit__text">
          Powered by <span className="bkb-credit__brand">BkkBoost</span>
        </span>
        <Arrow className="bkb-credit__arrow" />
      </a>
    </div>
  )
}

export default BkkBoostCredit

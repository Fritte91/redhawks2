import React from 'react'
import './bkkboost-credit.css'

// "Powered by BkkBoost" footer signature in the agency's own navy / orange /
// cream palette, kept visually separate from the restaurant brand. The logo is
// generated from assets/originals/112.png by `npm run images`.
const BkkBoostCredit = () => (
  <a
    className="bkb-badge"
    href="https://bkkboost.com/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Powered by BkkBoost (opens bkkboost.com in a new tab)"
  >
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
    <svg className="bkb-badge__arrow" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  </a>
)

export default BkkBoostCredit

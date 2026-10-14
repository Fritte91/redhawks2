import React from 'react'
import { useNoIndex } from '../shared/hooks'
import { restaurant } from '../shared/restaurant'
import './fonts.css'
import './status.css'

// 404 for unknown URLs; 410 for the retired journal articles (/article/:id).
// Also prerendered to static 404.html / 410.html for the host to serve with
// the matching HTTP status (see docs/HOSTING.md).
export const STATUS_COPY = {
  404: {
    title: `Page not found · ${restaurant.name}`,
    heading: 'Not on the menu',
    text: 'We couldn’t find that page.',
  },
  410: {
    title: `Page removed · ${restaurant.name}`,
    heading: 'Off the menu',
    text: 'This page has been removed from the RedHawks website.',
  },
}

const StatusPage = ({ status }) => {
  const copy = STATUS_COPY[status]
  useNoIndex(copy.title)

  return (
    <main className="rh-status">
      <p className="rh-status__mark">
        <span className="rh-status__red">Red</span>hawks
      </p>
      <p className="rh-status__code">{status}</p>
      <h1 className="rh-status__heading">{copy.heading}</h1>
      <p className="rh-status__text">{copy.text}</p>
      {/* Full page load, so the prerendered homepage is served. */}
      <a className="rh-status__link" href="/">See the menu</a>
    </main>
  )
}

export default StatusPage

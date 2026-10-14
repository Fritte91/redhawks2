import React from 'react'
import { restaurant } from '../shared/restaurant'
import './fonts.css'
import './status.css'

// Prerendered to static 404.html (unknown URLs) and 410.html (the retired
// journal at /article/*). The host serves them with the matching HTTP status;
// see vercel.json, middleware.js and docs/HOSTING.md.
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
  return (
    <main className="rh-status">
      <p className="rh-status__mark">
        <span className="rh-status__red">Red</span>hawks
      </p>
      <p className="rh-status__code">{status}</p>
      <h1 className="rh-status__heading">{copy.heading}</h1>
      <p className="rh-status__text">{copy.text}</p>
      <a className="rh-status__link" href="/">See the menu</a>
    </main>
  )
}

export default StatusPage

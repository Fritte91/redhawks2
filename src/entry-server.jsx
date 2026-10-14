// Build-time entry for scripts/prerender.mjs (built with `vite build --ssr`).
import React from 'react'
import { renderToString } from 'react-dom/server'
import StreetHome from './site/StreetHome'
import StatusPage from './site/StatusPage'

export { homeHead, statusHead, robotsTxt, sitemapXml } from './site/seo'
export { STATUS_COPY } from './site/StatusPage'

// Same tree as main.jsx, so hydration matches.
export const renderHome = () =>
  renderToString(
    <React.StrictMode>
      <StreetHome />
    </React.StrictMode>
  )

// Static 404 / 410 pages; they ship without JavaScript.
export const renderStatus = status => renderToString(<StatusPage status={status} />)

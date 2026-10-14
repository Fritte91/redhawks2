// Build-time entry for scripts/prerender.mjs (built with `vite build --ssr`).
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { AppRoutes } from './App'

export { homeHead, noindexHead, robotsTxt, sitemapXml } from './site/seo'
export { STATUS_COPY } from './site/StatusPage'

// Same tree as main.jsx, with StaticRouter in place of BrowserRouter.
export function render(url) {
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </React.StrictMode>
  )
}

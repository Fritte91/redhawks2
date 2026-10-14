import React from 'react'
import ReactDOM from 'react-dom/client'
import StreetHome from './site/StreetHome'
import './site/global.css'

const container = document.getElementById('root')
const app = (
  <React.StrictMode>
    <StreetHome />
  </React.StrictMode>
)

// The production build prerenders the page into index.html
// (scripts/prerender.mjs), so hydrate it. The dev server serves the bare
// template, so render from scratch there.
if (container.firstElementChild) {
  ReactDOM.hydrateRoot(container, app)
} else {
  ReactDOM.createRoot(container).render(app)
}

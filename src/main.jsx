import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './site/global.css'

const container = document.getElementById('root')
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// The build prerenders "/" into index.html (scripts/prerender.mjs) and marks
// the root with the route it rendered. Hydrate when that matches the current
// URL; otherwise (previews, or any route served through an SPA fallback)
// render from scratch.
if (container.dataset.prerendered === window.location.pathname) {
  ReactDOM.hydrateRoot(container, app)
} else {
  container.replaceChildren()
  ReactDOM.createRoot(container).render(app)
}

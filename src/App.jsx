import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import StreetHome from './site/StreetHome'
import StatusPage from './site/StatusPage'

// Design concept kept for reference: client-rendered, noindex, not linked.
const EditorialHome = lazy(() => import('./previews/editorial/EditorialHome'))

// Shared by the browser (BrowserRouter) and the prerenderer (StaticRouter).
// The legacy homepage and journal in src/components are no longer routed.
export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<StreetHome />} />
    <Route path="/preview/editorial" element={<Suspense fallback={null}><EditorialHome /></Suspense>} />
    {/* Street was approved and is now the homepage. */}
    <Route path="/preview/street" element={<Navigate to="/" replace />} />
    {/* Retired journal articles: 410 Gone (served as a real status by the host, see docs/HOSTING.md). */}
    <Route path="/article/:id" element={<StatusPage status={410} />} />
    <Route path="*" element={<StatusPage status={404} />} />
  </Routes>
)

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App

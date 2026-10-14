import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import ArticleReader from './components/ArticleReader'

// Design concept previews, loaded on demand so the live homepage bundle is unchanged.
const StreetHome = lazy(() => import('./previews/street/StreetHome'))
const EditorialHome = lazy(() => import('./previews/editorial/EditorialHome'))

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<ArticleReader />} />
        <Route path="/preview/street" element={<Suspense fallback={null}><StreetHome /></Suspense>} />
        <Route path="/preview/editorial" element={<Suspense fallback={null}><EditorialHome /></Suspense>} />
      </Routes>
    </Router>
  )
}

export default App

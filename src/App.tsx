import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Background from './components/Background'
import CommandPalette from './components/CommandPalette'
import Home from './pages/Home'
import Work from './pages/Work'
import Research from './pages/Research'
import NotFound from './pages/NotFound'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export default function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0 })
    window.gtag?.('event', 'page_view', { page_path: location.pathname, page_title: document.title })
  }, [location.pathname])

  return (
    <>
      <Background />
      <Nav />
      <CommandPalette />
      <main className="container">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/research" element={<Research />} />
            {/* legacy URLs from the old static site */}
            <Route path="/index.html" element={<Home />} />
            <Route path="/my-work.html" element={<Work />} />
            <Route path="/research.html" element={<Research />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}

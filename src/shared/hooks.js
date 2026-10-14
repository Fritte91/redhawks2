import { useEffect, useState } from 'react'

// Per-preview document setup: title, fonts, page background and noindex.
// Everything is restored on unmount so the original site is unaffected.
export function usePreviewDocument({ title, fontsHref, background }) {
  useEffect(() => {
    const previousTitle = document.title
    const previousBackground = document.body.style.backgroundColor

    const fonts = document.createElement('link')
    fonts.rel = 'stylesheet'
    fonts.href = fontsHref
    const robots = document.createElement('meta')
    robots.name = 'robots'
    robots.content = 'noindex, nofollow'
    document.head.append(fonts, robots)

    document.title = title
    document.body.style.backgroundColor = background

    return () => {
      fonts.remove()
      robots.remove()
      document.title = previousTitle
      document.body.style.backgroundColor = previousBackground
    }
  }, [title, fontsHref, background])
}

// Full-screen mobile navigation: locks page scroll and closes on Escape.
export function useOverlay() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    const onKeyDown = e => e.key === 'Escape' && setOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return [open, setOpen]
}

// Id of the section currently crossing the middle band of the viewport.
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  const key = ids.join('|')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-35% 0px -60% 0px' }
    )
    key.split('|').forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [key])

  return active
}

// Keeps the active link visible in a horizontally scrolling category bar.
export function useActiveLinkInView(ref, active) {
  useEffect(() => {
    const nav = ref.current
    const link = nav?.querySelector('[aria-current="true"]')
    if (!nav || !link || nav.scrollWidth <= nav.clientWidth) return
    nav.scrollTo({ left: link.offsetLeft - 16, behavior: 'smooth' })
  }, [ref, active])
}

// True while the referenced element is on screen.
export function useInView(ref) {
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting))
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])

  return inView
}

// Title + noindex for pages rendered in the browser (status routes reached via
// the SPA fallback). Static/prerendered versions carry the same tags in HTML.
export function useNoIndex(title) {
  useEffect(() => {
    const previousTitle = document.title
    const robots = document.createElement('meta')
    robots.name = 'robots'
    robots.content = 'noindex, nofollow'
    document.head.append(robots)
    document.title = title
    return () => {
      robots.remove()
      document.title = previousTitle
    }
  }, [title])
}

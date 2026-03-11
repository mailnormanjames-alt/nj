'use client'
import { useEffect, useRef } from 'react'

export default function Sidebar() {
  const ref = useRef(null)

  useEffect(() => {
    let last = 0
    const onScroll = () => {
      const cur = window.scrollY
      if (ref.current) ref.current.style.opacity = cur > 80 && cur > last ? '0.4' : '1'
      last = cur
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <aside ref={ref} className="sidebar">
      <span className="sb-logo">Norman James</span>
      <nav className="sb-nav">
        <a className="sb-link" href="#works">Work</a>
        <a className="sb-link" href="#explore">Explore</a>
        <a className="sb-link" href="#about">About</a>
        <a className="sb-link" href="#contact">Contact</a>
      </nav>
      <span className="sb-bottom">&copy; 2025</span>
    </aside>
  )
}

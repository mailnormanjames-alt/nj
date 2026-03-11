'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot = useRef(null)
  const v   = useRef(null)
  const h   = useRef(null)

  useEffect(() => {
    const move = (e) => {
      const x = e.clientX + 'px'
      const y = e.clientY + 'px'
      if (dot.current) { dot.current.style.left = x; dot.current.style.top = y }
      if (v.current)   { v.current.style.left   = x; v.current.style.top  = y }
      if (h.current)   { h.current.style.left   = x; h.current.style.top  = y }
    }
    document.addEventListener('mousemove', move)
    return () => document.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={v}   className="cursor-v"   />
      <div ref={h}   className="cursor-h"   />
    </>
  )
}

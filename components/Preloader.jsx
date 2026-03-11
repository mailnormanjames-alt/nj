'use client'
import { useEffect, useRef, useState } from 'react'

export default function Preloader({ onDone }) {
  const fillRef = useRef(null)
  const numRef  = useRef(null)
  const plRef   = useRef(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    // trigger line animation
    setTimeout(() => setShow(true), 80)

    let n = 0
    const iv = setInterval(() => {
      n += Math.floor(Math.random() * 9) + 3
      if (n >= 100) {
        n = 100
        clearInterval(iv)
        setTimeout(() => {
          if (plRef.current) plRef.current.classList.add('out')
          setTimeout(onDone, 860)
        }, 350)
      }
      if (numRef.current)  numRef.current.textContent  = String(n).padStart(3, '0')
      if (fillRef.current) fillRef.current.style.width = n + '%'
    }, 55)

    return () => clearInterval(iv)
  }, [onDone])

  return (
    <div ref={plRef} className="preloader">
      <div className="pl-lines">
        <div className={`pl-line${show ? ' show' : ''}`}>NORMAN</div>
        <div className={`pl-line${show ? ' show' : ''}`} style={{ transitionDelay: '.1s' }}>
          <span>James</span>
        </div>
      </div>
      <div className="pl-bar">
        <div ref={fillRef} className="pl-fill" />
      </div>
      <div ref={numRef} className="pl-num">000</div>
    </div>
  )
}

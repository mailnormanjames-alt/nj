'use client'
import { useEffect, useState } from 'react'

export default function TopBar() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      const n = new Date()
      const h = String(n.getHours()).padStart(2,'0')
      const m = String(n.getMinutes()).padStart(2,'0')
      const s = String(n.getSeconds()).padStart(2,'0')
      setTime(`${h}:${m}:${s}`)
    }
    tick()
    const iv = setInterval(tick, 1000)
    return () => clearInterval(iv)
  }, [])

  return (
    <div className="topbar">
      <span className="tb-tag">Portrait &amp; Editorial</span>
      <div className="tb-dot" />
      <span className="tb-tag">Available Worldwide</span>
      <span className="tb-clock">{time}</span>
    </div>
  )
}

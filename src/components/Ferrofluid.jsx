import { useEffect, useRef } from 'react'
import './Ferrofluid.css'

export default function Ferrofluid({ className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let frame = 0
    let pointer = { x: -999, y: -999 }
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.max(1, Math.round(rect.width * dpr)); canvas.height = Math.max(1, Math.round(rect.height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const draw = (time) => {
      const { width, height } = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#151518'; ctx.fillRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'screen'
      for (let index = 0; index < 9; index += 1) {
        const x = width * (.08 + ((index * .131 + Math.sin(time * .00016 + index) * .09) % .88)) + (pointer.x - width / 2) * .035
        const y = height * (.12 + ((index * .209 + Math.cos(time * .00013 + index * 2) * .11) % .76)) + (pointer.y - height / 2) * .035
        const radius = Math.min(width, height) * (.16 + (index % 3) * .035 + Math.sin(time * .00032 + index) * .028)
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, 'rgba(248,250,255,.34)'); gradient.addColorStop(.42, 'rgba(188,194,208,.15)'); gradient.addColorStop(.69, 'rgba(132,123,153,.1)'); gradient.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = gradient; ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fill()
      }
      ctx.globalCompositeOperation = 'source-over'
      ctx.strokeStyle = 'rgba(245,246,250,.2)'; ctx.lineWidth = 1
      for (let line = 0; line < 13; line += 1) {
        ctx.beginPath(); const offset = line * (height / 12)
        for (let x = -20; x <= width + 20; x += 20) {
          const y = offset + Math.sin(x * .018 + time * .00055 + line) * 17 + Math.cos(x * .007 - time * .0004) * 9
          x === -20 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
      frame = requestAnimationFrame(draw)
    }
    const move = event => { const rect = canvas.getBoundingClientRect(); pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top } }
    const observer = new ResizeObserver(resize); observer.observe(canvas); resize()
    canvas.addEventListener('pointermove', move); frame = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(frame); observer.disconnect(); canvas.removeEventListener('pointermove', move) }
  }, [])
  return <canvas ref={ref} className={`ferrofluid-container ${className}`} aria-hidden="true" />
}

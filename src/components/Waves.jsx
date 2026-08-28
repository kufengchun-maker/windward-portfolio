import { useEffect, useRef } from 'react'
import './Waves.css'

export default function Waves({ lineColor = '#c8ff3f', backgroundColor = 'transparent', waveSpeedX = .1, waveSpeedY = .065, waveAmpX = 100, waveAmpY = 90, friction = .63, tension = .025, maxCursorMove = 210, xGap = 18, yGap = 42, className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    if (!canvas || !host) return undefined
    const context = canvas.getContext('2d', { alpha: true })
    let frame = 0
    let width = 0
    let height = 0
    let dpr = 1
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 }
    const resize = () => {
      const rect = host.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const move = event => {
      const rect = host.getBoundingClientRect()
      pointer.tx = event.clientX - rect.left
      pointer.ty = event.clientY - rect.top
    }
    const leave = () => { pointer.tx = -9999; pointer.ty = -9999 }
    const draw = time => {
      pointer.x += (pointer.tx - pointer.x) * Math.max(.04, tension * 3)
      pointer.y += (pointer.ty - pointer.y) * Math.max(.04, tension * 3)
      context.clearRect(0, 0, width, height)
      if (backgroundColor !== 'transparent') { context.fillStyle = backgroundColor; context.fillRect(0, 0, width, height) }
      context.strokeStyle = lineColor
      context.globalAlpha = .22
      context.lineWidth = 1
      const t = time * .001
      const rows = Math.ceil(height / yGap) + 2
      for (let row = 0; row < rows; row += 1) {
        const baseY = row * yGap
        context.beginPath()
        for (let x = -xGap; x <= width + xGap; x += xGap) {
          const dx = x - pointer.x
          const dy = baseY - pointer.y
          const distance = Math.hypot(dx, dy)
          const force = Math.max(0, 1 - distance / maxCursorMove)
          const ripple = force * Math.cos(distance * .075 - t * 5) * maxCursorMove * .18
          const y = baseY + Math.sin(x * .012 + t * waveSpeedX * 12 + row * .44) * waveAmpY * .12 + Math.cos(row * .42 + t * waveSpeedY * 12) * waveAmpX * .08 + ripple
          if (x <= 0) context.moveTo(x, y); else context.lineTo(x, y)
        }
        context.stroke()
      }
      context.globalAlpha = 1
      frame = requestAnimationFrame(draw)
    }
    const observer = new ResizeObserver(resize)
    observer.observe(host)
    host.addEventListener('pointermove', move, { passive: true })
    host.addEventListener('pointerleave', leave, { passive: true })
    resize()
    frame = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(frame); observer.disconnect(); host.removeEventListener('pointermove', move); host.removeEventListener('pointerleave', leave) }
  }, [lineColor, backgroundColor, waveSpeedX, waveSpeedY, waveAmpX, waveAmpY, friction, tension, maxCursorMove, xGap, yGap])

  return <canvas ref={canvasRef} className={`waves-canvas ${className}`} aria-hidden="true" />
}

import { useEffect, useRef } from 'react'
import './Waves.css'

export default function Waves({ lineColor = '#c8ff3f', backgroundColor = 'transparent', waveSpeedX = .1, waveSpeedY = .065, waveAmpX = 100, waveAmpY = 90, friction = .63, tension = .025, maxCursorMove = 210, xGap = 18, yGap = 42, className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    if (!canvas || !host) return undefined
    const context = canvas.getContext('2d', { alpha: true })
    const fixed = className.includes('waves-canvas--fixed')
    let frame = 0
    let width = 0
    let height = 0
    let dpr = 1
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 }
    const resize = () => {
      const rect = host.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = Math.max(1, fixed ? window.innerWidth : rect.width)
      height = Math.max(1, fixed ? window.innerHeight : rect.height)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const move = event => {
      const rect = host.getBoundingClientRect()
      pointer.tx = fixed ? event.clientX : event.clientX - rect.left
      pointer.ty = fixed ? event.clientY : event.clientY - rect.top
    }
    const leave = () => { pointer.tx = -9999; pointer.ty = -9999 }
    const draw = time => {
      pointer.x += (pointer.tx - pointer.x) * Math.max(.04, tension * 3)
      pointer.y += (pointer.ty - pointer.y) * Math.max(.04, tension * 3)
      context.clearRect(0, 0, width, height)
      if (backgroundColor !== 'transparent') { context.fillStyle = backgroundColor; context.fillRect(0, 0, width, height) }
      context.strokeStyle = lineColor
      context.globalAlpha = .58
      context.lineWidth = 1
      const t = time * .001
      const rows = Math.ceil(height / yGap) + 2
      const columns = Math.ceil(width / xGap) + 2
      const distort = (x, y) => {
        const dx = x - pointer.x
        const dy = y - pointer.y
        const distance = Math.hypot(dx, dy)
        const force = Math.max(0, 1 - distance / maxCursorMove)
        if (!force) return { x: 0, y: 0 }
        const angle = Math.atan2(dy, dx)
        const curl = Math.sin(distance * .06 - t * 5.4) * maxCursorMove * .32 * force * force
        return { x: Math.cos(angle + Math.PI / 2) * curl, y: Math.sin(angle + Math.PI / 2) * curl }
      }
      for (let row = 0; row < rows; row += 1) {
        const baseY = row * yGap
        context.beginPath()
        for (let x = -xGap; x <= width + xGap; x += xGap) {
          const wave = distort(x, baseY)
          const y = baseY + Math.sin(x * .012 + t * waveSpeedX * 12 + row * .44) * waveAmpY * .12 + Math.cos(row * .42 + t * waveSpeedY * 12) * waveAmpX * .08 + wave.y
          const px = x + wave.x
          if (x <= 0) context.moveTo(px, y); else context.lineTo(px, y)
        }
        context.stroke()
      }
      for (let column = 0; column < columns; column += 1) {
        const baseX = column * xGap
        context.beginPath()
        for (let y = -yGap; y <= height + yGap; y += yGap * .42) {
          const wave = distort(baseX, y)
          const x = baseX + Math.cos(y * .011 + t * waveSpeedY * 12 + column * .4) * waveAmpX * .12 + Math.sin(column * .36 + t * waveSpeedX * 12) * waveAmpY * .07 + wave.x
          const py = y + wave.y
          if (y <= 0) context.moveTo(x, py); else context.lineTo(x, py)
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

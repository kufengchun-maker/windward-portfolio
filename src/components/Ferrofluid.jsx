import { useEffect, useRef } from 'react'
import './Ferrofluid.css'

export default function Ferrofluid({
  colors = ['#ffffff', '#ffffff', '#ffffff'],
  speed = 0.4,
  scale = 1.9,
  turbulence = 0.8,
  fluidity = 0.09,
  rimWidth = 0.4,
  sharpness = 1,
  shimmer = 2,
  glow = 1.8,
  flowDirection = 'down',
  opacity = 1,
  mouseInteraction = true,
  mouseStrength = 1,
  mouseRadius = 0.3,
  className = ''
}) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let frame = 0
    let lastPaint = 0
    let pointer = { x: -9999, y: -9999 }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25)
      canvas.width = Math.max(1, Math.round(rect.width * dpr))
      canvas.height = Math.max(1, Math.round(rect.height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = time => {
      // The image ripple layer also animates, so keep this ambient background at 30 fps.
      if (time - lastPaint < 33) { frame = requestAnimationFrame(draw); return }
      lastPaint = time
      const { width, height } = canvas.getBoundingClientRect()
      const size = Math.min(width, height)
      const flow = time * speed * .00012
      const direction = flowDirection === 'down' ? 1 : -1
      ctx.clearRect(0, 0, width, height)
      ctx.globalAlpha = opacity
      ctx.fillStyle = '#151518'
      ctx.fillRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'screen'

      for (let index = 0; index < 6; index += 1) {
        const seed = index * 1.71
        const xDrift = Math.sin(flow * (1.7 + fluidity * 5) + seed) * size * .11 * turbulence
        const yDrift = Math.cos(flow * (1.15 + fluidity * 4) + seed) * size * .065 * turbulence + direction * ((flow * size * 1.55 + index * height / 5) % (height * 1.35)) - height * .16
        const pull = .012 + mouseRadius * .043
        const x = width * (.13 + (index % 3) * .33) + xDrift + (mouseInteraction ? (pointer.x - width / 2) * pull * mouseStrength : 0)
        const y = yDrift + (mouseInteraction ? (pointer.y - height / 2) * pull * mouseStrength : 0)
        const radius = size * (.18 + (index % 2) * .07) * scale * .5
        const color = colors[index % colors.length]
        const gradient = ctx.createRadialGradient(x, y, radius * Math.max(.08, rimWidth * .18), x, y, radius)
        gradient.addColorStop(0, `${color}00`)
        gradient.addColorStop(Math.max(.12, .54 - sharpness * .14), `${color}${Math.round(16 * glow).toString(16).padStart(2, '0')}`)
        gradient.addColorStop(.74, `${color}${Math.round(28 * glow).toString(16).padStart(2, '0')}`)
        gradient.addColorStop(1, `${color}00`)
        ctx.fillStyle = gradient
        ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fill()
      }

      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = Math.min(.5, .055 * shimmer)
      ctx.strokeStyle = colors[0]
      ctx.lineWidth = Math.max(1, sharpness)
      for (let line = 0; line < 8; line += 1) {
        ctx.beginPath()
        const offset = line * (height / 7) + direction * flow * size * .16
        for (let x = -20; x <= width + 20; x += 32) {
          const y = (offset + Math.sin(x * .016 + flow * 8 + line) * (9 + turbulence * 14) + height * 2) % (height * 1.15) - height * .06
          x === -20 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
      ctx.globalAlpha = 1
      frame = requestAnimationFrame(draw)
    }

    const move = event => {
      if (!mouseInteraction) return
      const rect = canvas.getBoundingClientRect()
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top }
    }
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    resize()
    canvas.addEventListener('pointermove', move)
    frame = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(frame); observer.disconnect(); canvas.removeEventListener('pointermove', move) }
  }, [colors, speed, scale, turbulence, fluidity, rimWidth, sharpness, shimmer, glow, flowDirection, opacity, mouseInteraction, mouseStrength, mouseRadius])

  return <canvas ref={ref} className={`ferrofluid-container ${className}`} aria-hidden="true" />
}

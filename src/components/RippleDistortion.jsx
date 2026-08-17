import { useEffect, useRef } from 'react'
import './RippleDistortion.css'

// Deliberately lightweight canvas version for the exhibition image layer.
export default function RippleDistortion({ src, brushSize = 150, strength = .2, swirl = 1, rings = 4, grayscale = false, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current; const ctx = canvas.getContext('2d')
    const source = document.createElement('canvas'); const sourceCtx = source.getContext('2d')
    const image = new Image(); const waves = []
    let frame = 0; let width = 1; let height = 1; let last = { x: -9999, y: -9999 }
    const cover = () => { if (!image.naturalWidth) return; const s = Math.max(width / image.naturalWidth, height / image.naturalHeight); const w = image.naturalWidth * s; const h = image.naturalHeight * s; sourceCtx.clearRect(0, 0, width, height); sourceCtx.drawImage(image, (width - w) / 2, (height - h) / 2, w, h) }
    const resize = () => { const rect = canvas.getBoundingClientRect(); width = Math.max(1, Math.round(rect.width)); height = Math.max(1, Math.round(rect.height)); canvas.width = width; canvas.height = height; source.width = width; source.height = height; cover() }
    const draw = time => {
      if (!image.naturalWidth) { frame = requestAnimationFrame(draw); return }
      while (waves.length && time - waves[0].time > 1450) waves.shift()
      ctx.clearRect(0, 0, width, height); ctx.filter = grayscale ? 'grayscale(1)' : 'none'
      if (!waves.length) ctx.drawImage(source, 0, 0)
      else {
        const tile = Math.max(18, Math.round(width / 32))
        for (let y = 0; y < height; y += tile) for (let x = 0; x < width; x += tile) {
          let dx = 0; let dy = 0
          waves.forEach(wave => { const age = (time - wave.time) / 1000; const px = x - wave.x; const py = y - wave.y; const distance = Math.hypot(px, py) || 1; const radius = brushSize + age * 210; if (distance > radius || age > 1.45) return; const fade = (1 - distance / radius) * (1 - age / 1.45); const force = Math.sin((1 - distance / radius) * Math.PI * rings - age * 7) * fade * brushSize * strength * .42; dx += (px / distance) * force - (py / distance) * force * swirl * .2; dy += (py / distance) * force + (px / distance) * force * swirl * .2 })
          ctx.drawImage(source, x, y, tile + 1, tile + 1, x + dx, y + dy, tile + 1, tile + 1)
        }
      }
      ctx.filter = 'none'; frame = requestAnimationFrame(draw)
    }
    const move = event => { const rect = canvas.getBoundingClientRect(); const x = event.clientX - rect.left; const y = event.clientY - rect.top; if (Math.hypot(x - last.x, y - last.y) > 30) { waves.push({ x, y, time: performance.now() }); last = { x, y } } }
    image.onload = () => { resize(); frame = requestAnimationFrame(draw) }; image.src = src
    const observer = new ResizeObserver(resize); observer.observe(canvas); canvas.addEventListener('pointermove', move); resize()
    return () => { cancelAnimationFrame(frame); observer.disconnect(); canvas.removeEventListener('pointermove', move) }
  }, [src, brushSize, strength, swirl, rings, grayscale])
  return <canvas ref={ref} className={`ripple-distortion ${className}`} aria-label="Move the cursor to create image ripples" />
}

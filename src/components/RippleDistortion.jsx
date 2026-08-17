import { useEffect, useRef } from 'react'
import './RippleDistortion.css'

export default function RippleDistortion({ src, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const buffer = document.createElement('canvas'); const bufferCtx = buffer.getContext('2d')
    const image = new Image()
    const waves = []; let frame = 0; let last = { x: -999, y: -999 }
    let width = 1; let height = 1
    const cover = () => {
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight)
      const drawWidth = image.naturalWidth * scale; const drawHeight = image.naturalHeight * scale
      bufferCtx.clearRect(0, 0, width, height); bufferCtx.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight)
    }
    const resize = () => { const rect = canvas.getBoundingClientRect(); width = Math.max(1, Math.round(rect.width)); height = Math.max(1, Math.round(rect.height)); canvas.width = width; canvas.height = height; buffer.width = width; buffer.height = height; if (image.complete) cover() }
    const render = time => {
      if (!image.complete || !image.naturalWidth) { frame = requestAnimationFrame(render); return }
      const step = Math.max(18, Math.round(width / 32)); const ageNow = time
      ctx.clearRect(0, 0, width, height)
      for (let y = 0; y < height; y += step) for (let x = 0; x < width; x += step) {
        let dx = 0; let dy = 0
        waves.forEach(wave => { const age = (ageNow - wave.time) / 1000; const radius = wave.radius + age * wave.speed; const distance = Math.hypot(x - wave.x, y - wave.y); if (distance < radius && age < 2.8) { const power = Math.sin((1 - distance / radius) * Math.PI * 5 - age * 8) * (1 - distance / radius) * 13 * (1 - age / 2.8); dx += ((x - wave.x) / (distance || 1)) * power; dy += ((y - wave.y) / (distance || 1)) * power } })
        ctx.drawImage(buffer, x, y, step + 1, step + 1, x + dx, y + dy, step + 1, step + 1)
      }
      while (waves.length && ageNow - waves[0].time > 2850) waves.shift()
      frame = requestAnimationFrame(render)
    }
    const move = event => { const rect = canvas.getBoundingClientRect(); const x = event.clientX - rect.left; const y = event.clientY - rect.top; if (Math.hypot(x - last.x, y - last.y) > 24) { waves.push({ x, y, time: performance.now(), radius: 34, speed: 150 }); last = { x, y } } }
    image.onload = () => { resize(); frame = requestAnimationFrame(render) }
    image.src = src
    const observer = new ResizeObserver(resize); observer.observe(canvas); resize(); canvas.addEventListener('pointermove', move)
    return () => { cancelAnimationFrame(frame); observer.disconnect(); canvas.removeEventListener('pointermove', move) }
  }, [src])
  return <canvas ref={ref} className={`ripple-distortion ${className}`} aria-label="鼠标移动可触发作品水波展出效果" />
}

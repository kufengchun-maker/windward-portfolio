import { useEffect, useRef } from 'react'
import './RippleDistortion.css'

// JS + CSS implementation following the React Bits public API.
export default function RippleDistortion({
  src,
  brushSize = 150,
  strength = 0.2,
  swirl = 1,
  rings = 4,
  grayscale = false,
  className = ''
}) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const buffer = document.createElement('canvas')
    const bufferCtx = buffer.getContext('2d')
    const image = new Image()
    const ripples = []
    let frame = 0
    let width = 1
    let height = 1
    let last = { x: -9999, y: -9999 }
    let lastPaint = 0

    const cover = () => {
      if (!image.naturalWidth) return
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight)
      const drawWidth = image.naturalWidth * scale
      const drawHeight = image.naturalHeight * scale
      bufferCtx.clearRect(0, 0, width, height)
      bufferCtx.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight)
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = Math.max(1, Math.round(rect.width))
      height = Math.max(1, Math.round(rect.height))
      canvas.width = width
      canvas.height = height
      buffer.width = width
      buffer.height = height
      cover()
    }

    const draw = time => {
      if (!image.naturalWidth) {
        frame = requestAnimationFrame(draw)
        return
      }
      // Limit distortion to 30fps; when no ripple is active, the image is one GPU-friendly draw.
      if (time - lastPaint < 33) { frame = requestAnimationFrame(draw); return }
      lastPaint = time
      ctx.clearRect(0, 0, width, height)
      ctx.filter = grayscale ? 'grayscale(1)' : 'none'
      while (ripples.length && time - ripples[0].time > 2150) ripples.shift()
      if (!ripples.length) {
        ctx.drawImage(buffer, 0, 0)
        ctx.filter = 'none'
        frame = requestAnimationFrame(draw)
        return
      }
      const tile = Math.max(7, Math.round(Math.min(width, height) / 72))

      for (let y = 0; y < height; y += tile) {
        for (let x = 0; x < width; x += tile) {
          let shiftX = 0
          let shiftY = 0
          ripples.forEach(ripple => {
            const age = (time - ripple.time) / 1000
            if (age > 2.15) return
            const dx = x - ripple.x
            const dy = y - ripple.y
            const distance = Math.hypot(dx, dy) || 1
            const travel = brushSize * (0.34 + age * 1.18)
            const envelope = Math.max(0, 1 - distance / (travel + brushSize * .72))
            if (!envelope) return
            const wave = Math.sin((distance / brushSize) * Math.PI * rings - age * 8.4)
            const decay = Math.pow(envelope, 2) * Math.max(0, 1 - age / 2.15)
            const force = wave * decay * brushSize * strength * .22
            shiftX += (dx / distance) * force - (dy / distance) * force * swirl * .34
            shiftY += (dy / distance) * force + (dx / distance) * force * swirl * .34
          })
          ctx.drawImage(buffer, x, y, tile + 1, tile + 1, x + shiftX, y + shiftY, tile + 1, tile + 1)
        }
      }
      ctx.filter = 'none'
      frame = requestAnimationFrame(draw)
    }

    const pointerMove = event => {
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      if (Math.hypot(x - last.x, y - last.y) > brushSize * .2) {
        ripples.push({ x, y, time: performance.now() })
        last = { x, y }
      }
    }

    image.onload = () => { resize(); frame = requestAnimationFrame(draw) }
    image.src = src
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    canvas.addEventListener('pointermove', pointerMove)
    resize()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      canvas.removeEventListener('pointermove', pointerMove)
    }
  }, [src, brushSize, strength, swirl, rings, grayscale])

  return <canvas ref={ref} className={`ripple-distortion ${className}`} aria-label="Move the cursor to create image ripples" />
}

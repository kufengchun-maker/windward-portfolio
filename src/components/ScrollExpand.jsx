import { useCallback, useEffect, useRef } from 'react'
import './ScrollExpand.css'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)
const smoothstep = (a, b, value) => {
  const t = clamp((value - a) / (b - a || 0.000001), 0, 1)
  return t * t * (3 - 2 * t)
}

export default function ScrollExpand({
  src, alt = '', title = '', scrollHint = '', startWidth = 42, startHeight = 58,
  startRadius = 24, endRadius = 0, mediaZoom = 1.35, scrollDistance = 1.1,
  holdDistance = .28, smoothing = .1, overlayScrim = .45, children, className = ''
}) {
  const rootRef = useRef(null)
  const trackRef = useRef(null)
  const stageRef = useRef(null)
  const frameRef = useRef(null)
  const mediaRef = useRef(null)
  const titleRef = useRef(null)
  const overlayRef = useRef(null)
  const scrimRef = useRef(null)
  const hintRef = useRef(null)
  const values = useRef({ startWidth, startHeight, startRadius, endRadius, mediaZoom, scrollDistance, holdDistance, smoothing, overlayScrim })
  values.current = { startWidth, startHeight, startRadius, endRadius, mediaZoom, scrollDistance, holdDistance, smoothing, overlayScrim }

  const applyProgress = useCallback((progress) => {
    const frame = frameRef.current
    const media = mediaRef.current
    if (!frame || !media) return
    const value = values.current
    const eased = smoothstep(0, 1, progress)
    const width = value.startWidth + (100 - value.startWidth) * eased
    const height = value.startHeight + (100 - value.startHeight) * eased
    const insetX = (100 - width) / 2
    const insetY = (100 - height) / 2
    const radius = value.startRadius + (value.endRadius - value.startRadius) * eased
    frame.style.clipPath = `inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${radius}px)`
    media.style.transform = `scale(${value.mediaZoom + (1 - value.mediaZoom) * eased})`
    if (scrimRef.current) scrimRef.current.style.opacity = `${value.overlayScrim * eased}`
    if (titleRef.current) {
      const out = smoothstep(.4, .88, progress)
      titleRef.current.style.opacity = `${1 - out}`
      titleRef.current.style.transform = `translate3d(0, ${-28 * out}px, 0) scale(${1 + .06 * out})`
    }
    if (hintRef.current) {
      const gone = smoothstep(0, .12, progress)
      hintRef.current.style.opacity = `${1 - gone}`
      hintRef.current.style.transform = `translate3d(0, ${8 * gone}px, 0)`
    }
    if (overlayRef.current) {
      const entrance = smoothstep(.68, 1, progress)
      overlayRef.current.style.opacity = `${entrance}`
      overlayRef.current.style.transform = `translate3d(0, ${18 * (1 - entrance)}px, 0)`
    }
  }, [])

  useEffect(() => {
    const root = rootRef.current
    const track = trackRef.current
    const stage = stageRef.current
    if (!root || !track || !stage) return undefined
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let current = 0
    let target = 0
    let stageHeight = 0
    let running = false
    const measure = () => {
      const value = values.current
      stageHeight = window.innerHeight
      stage.style.height = `${stageHeight}px`
      track.style.height = `${stageHeight * (1 + value.scrollDistance + value.holdDistance)}px`
      stage.style.setProperty('--se-title-size', `${clamp(root.clientWidth * .092, 44, 150)}px`)
    }
    const read = () => clamp(-track.getBoundingClientRect().top / (stageHeight * values.current.scrollDistance), 0, 1)
    const tick = () => {
      const factor = values.current.smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * values.current.smoothing))
      current += (target - current) * factor
      applyProgress(current)
      if (Math.abs(target - current) > .0004) frame = requestAnimationFrame(tick)
      else { current = target; running = false; frame = 0 }
    }
    const onScroll = () => {
      target = read()
      if (reduceMotion || values.current.smoothing <= 0) { current = target; applyProgress(current); return }
      if (!running) { running = true; frame = requestAnimationFrame(tick) }
    }
    const onResize = () => { measure(); target = read(); current = target; applyProgress(current) }
    measure(); onResize()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    const observer = new ResizeObserver(onResize)
    observer.observe(root)
    return () => { if (frame) cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); observer.disconnect() }
  }, [applyProgress])

  return <section ref={rootRef} className={`scroll-expand ${className}`}>
    <div ref={trackRef} className="scroll-expand__track">
      <div ref={stageRef} className="scroll-expand__stage">
        <div ref={frameRef} className="scroll-expand__frame">
          <img ref={mediaRef} className="scroll-expand__media" src={src} alt={alt} draggable="false" />
          <div ref={scrimRef} className="scroll-expand__scrim" />
          {children ? <div ref={overlayRef} className="scroll-expand__overlay">{children}</div> : null}
        </div>
        {title ? <h1 ref={titleRef} className="scroll-expand__title">{title}</h1> : null}
        {scrollHint ? <p ref={hintRef} className="scroll-expand__hint">{scrollHint}</p> : null}
      </div>
    </div>
  </section>
}

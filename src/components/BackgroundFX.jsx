import React, { useEffect, useRef } from 'react'

// Animated, blurred floating orbs background using canvas.
// Lightweight and respects prefers-reduced-motion.
export default function BackgroundFX() {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return // skip animations

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const DPR = Math.min(window.devicePixelRatio || 1, 2)
    let w = (canvas.width = Math.floor(window.innerWidth * DPR))
    let h = (canvas.height = Math.floor(window.innerHeight * DPR))
    canvas.style.width = '100%'
    canvas.style.height = '100%'

    const colors = [
      'rgba(34, 211, 238, 0.14)', // cyan-400 @ ~14%
      'rgba(168, 85, 247, 0.10)', // purple-500
      'rgba(20, 184, 166, 0.12)', // teal-500
    ]

    const ORBS = 12
    const orbs = Array.from({ length: ORBS }).map((_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: (Math.random() * 120 + 80) * DPR,
      vx: (Math.random() * 0.4 - 0.2) * DPR,
      vy: (Math.random() * 0.4 - 0.2) * DPR,
      c: colors[i % colors.length],
    }))

    function draw() {
      ctx.clearRect(0, 0, w, h)
      // subtle vignette background
      const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) / 1.2)
      grad.addColorStop(0, 'rgba(8,8,12,0.0)')
      grad.addColorStop(1, 'rgba(0,0,0,0.35)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      ctx.globalCompositeOperation = 'lighter'
      for (const o of orbs) {
        ctx.beginPath()
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r)
        g.addColorStop(0, o.c)
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2)
        ctx.fill()

        o.x += o.vx
        o.y += o.vy
        if (o.x < -o.r) o.x = w + o.r
        if (o.x > w + o.r) o.x = -o.r
        if (o.y < -o.r) o.y = h + o.r
        if (o.y > h + o.r) o.y = -o.r
      }
      ctx.globalCompositeOperation = 'source-over'
      rafRef.current = requestAnimationFrame(draw)
    }

    function onResize() {
      w = canvas.width = Math.floor(window.innerWidth * DPR)
      h = canvas.height = Math.floor(window.innerHeight * DPR)
      canvas.style.width = '100%'
      canvas.style.height = '100%'
    }

    rafRef.current = requestAnimationFrame(draw)
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <canvas ref={canvasRef} className="w-full h-full" />
      {/* grid overlay for subtle structure */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:24px_24px]" />
    </div>
  )
}

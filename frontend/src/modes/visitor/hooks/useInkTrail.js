import { useEffect } from 'react'

export function useInkTrail(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let points = []
    let lastX = 0
    let lastY = 0
    let lastTime = Date.now()
    let isLooping = false
    const maxAge = 800 // trail duration in ms

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const draw = () => {
      const now = Date.now()
      
      // Filter out points older than maxAge
      points = points.filter(p => now - p.time < maxAge)

      // Clear the canvas
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      if (points.length < 2) {
        isLooping = false
        return
      }

      // Determine ink color from CSS variable
      let inkColor = '15, 14, 13'
      try {
        const inkRgb = getComputedStyle(document.documentElement).getPropertyValue('--ink-rgb').trim()
        if (inkRgb) inkColor = inkRgb
      } catch(e) {}

      // Draw the trail
      for (let i = 1; i < points.length; i++) {
        const p1 = points[i - 1]
        const p2 = points[i]
        const age = now - p2.time
        const ratio = 1 - age / maxAge // fades from 1 (new) to 0 (old)
        const opacity = ratio * 0.12

        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.strokeStyle = `rgba(${inkColor}, ${opacity})`
        ctx.lineWidth = p2.width * ratio
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.stroke()
      }

      requestAnimationFrame(draw)
    }

    const handleMouseMove = (e) => {
      const x = e.clientX
      const y = e.clientY
      const now = Date.now()
      const dt = now - lastTime
      lastTime = now

      if (points.length === 0) {
        lastX = x
        lastY = y
      }

      const dist = Math.hypot(x - lastX, y - lastY)
      const speed = dt > 0 ? dist / dt : 0
      const width = Math.max(1, Math.min(speed * 0.4, 12))

      points.push({ x, y, time: now, width })

      lastX = x
      lastY = y

      if (!isLooping) {
        isLooping = true
        requestAnimationFrame(draw)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [canvasRef])
}

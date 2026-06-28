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
    let isMoving = false
    let lastTime = Date.now()

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

    const handleMouseMove = (e) => {
      const x = e.clientX
      const y = e.clientY
      const now = Date.now()
      const dt = now - lastTime
      lastTime = now

      if (!isMoving) {
        lastX = x
        lastY = y
        isMoving = true
        return
      }

      const dist = Math.hypot(x - lastX, y - lastY)
      const speed = dt > 0 ? dist / dt : 0
      const width = Math.max(1, Math.min(speed * 0.4, 12))

      // Determine ink color from CSS variable
      let inkColor = '15, 14, 13'
      try {
        const inkRgb = getComputedStyle(document.documentElement).getPropertyValue('--ink-rgb').trim()
        if (inkRgb) inkColor = inkRgb
      } catch(e) {}

      ctx.beginPath()
      ctx.moveTo(lastX, lastY)
      ctx.lineTo(x, y)
      ctx.strokeStyle = `rgba(${inkColor}, 0.12)`
      ctx.lineWidth = width
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.stroke()

      lastX = x
      lastY = y
    }

    window.addEventListener('mousemove', handleMouseMove)

    let animationId
    const fade = () => {
      // Dynamic fade color based on currently computed document background color
      let r = 242, g = 239, b = 232
      try {
        const bgStyle = getComputedStyle(document.body).backgroundColor || getComputedStyle(document.documentElement).backgroundColor
        const rgb = bgStyle.match(/\d+/g)
        if (rgb && rgb.length >= 3) {
          r = parseInt(rgb[0], 10)
          g = parseInt(rgb[1], 10)
          b = parseInt(rgb[2], 10)
        }
      } catch (err) {
        // Fallback to default paper color
      }

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.05)`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationId = requestAnimationFrame(fade)
    }

    fade()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [canvasRef])
}

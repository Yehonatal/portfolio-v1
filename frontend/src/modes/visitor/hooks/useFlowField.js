import { useEffect, useRef, useCallback } from 'react'

// Simple 2D noise implementation (no dependencies)
function createNoise() {
  const perm = new Uint8Array(512)
  const grad = [
    [1,1],[-1,1],[1,-1],[-1,-1],
    [1,0],[-1,0],[0,1],[0,-1]
  ]
  
  // Seed permutation table
  const p = new Uint8Array(256)
  for (let i = 0; i < 256; i++) p[i] = i
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = p[i]; p[i] = p[j]; p[j] = tmp
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255]

  function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10) }
  function lerp(a, b, t) { return a + t * (b - a) }
  function dot(g, x, y) { return g[0] * x + g[1] * y }

  return function noise2D(x, y) {
    const X = Math.floor(x) & 255
    const Y = Math.floor(y) & 255
    const xf = x - Math.floor(x)
    const yf = y - Math.floor(y)
    const u = fade(xf)
    const v = fade(yf)
    const aa = perm[perm[X] + Y] & 7
    const ab = perm[perm[X] + Y + 1] & 7
    const ba = perm[perm[X + 1] + Y] & 7
    const bb = perm[perm[X + 1] + Y + 1] & 7
    return lerp(
      lerp(dot(grad[aa], xf, yf), dot(grad[ba], xf - 1, yf), u),
      lerp(dot(grad[ab], xf, yf - 1), dot(grad[bb], xf - 1, yf - 1), u),
      v
    )
  }
}

export function useFlowField(canvasRef, options = {}) {
  const mouseRef = useRef({ x: -9999, y: -9999, active: false })
  const animIdRef = useRef(null)
  const particlesRef = useRef(null)
  const noiseRef = useRef(null)

  const getThemeColors = useCallback(() => {
    try {
      const style = getComputedStyle(document.documentElement)
      const inkRgb = style.getPropertyValue('--ink-rgb').trim() || '15, 14, 13'
      const paper = style.getPropertyValue('--paper').trim() || '#F2EFE8'
      return { inkRgb, paper }
    } catch {
      return { inkRgb: '15, 14, 13', paper: '#F2EFE8' }
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    if (!noiseRef.current) noiseRef.current = createNoise()
    const noise = noiseRef.current

    // ─── Config ───
    const PARTICLE_COUNT = 2800
    const NOISE_SCALE = 0.0025
    const NOISE_SPEED = 0.0003
    const PARTICLE_SPEED = 1.6
    const PARTICLE_LIFE_MIN = 80
    const PARTICLE_LIFE_MAX = 280
    const CURSOR_RADIUS = 200
    const CURSOR_FORCE = 3.5

    let w, h, dpr
    let time = 0

    // ─── Resize ───
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    // ─── Create particles ───
    const createParticle = () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      prevX: 0, prevY: 0,
      vx: 0, vy: 0,
      life: 0,
      maxLife: PARTICLE_LIFE_MIN + Math.random() * (PARTICLE_LIFE_MAX - PARTICLE_LIFE_MIN),
      width: 0.3 + Math.random() * 1.2,
    })

    if (!particlesRef.current) {
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, createParticle)
    }
    const particles = particlesRef.current

    // ─── Mouse handlers ───
    const onMouseMove = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      mouseRef.current.active = true
    }
    const onMouseLeave = () => { mouseRef.current.active = false }
    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)

    // ─── Main loop ───
    const animate = () => {
      time += NOISE_SPEED
      const { inkRgb, paper } = getThemeColors()

      // Soft fade — creates the trailing effect
      ctx.fillStyle = paper
      ctx.globalAlpha = 0.035
      ctx.fillRect(0, 0, w, h)
      ctx.globalAlpha = 1

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const mActive = mouseRef.current.active

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.life++

        // Respawn dead particles
        if (p.life > p.maxLife || p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h + 20) {
          p.x = Math.random() * w
          p.y = Math.random() * h
          p.life = 0
          p.maxLife = PARTICLE_LIFE_MIN + Math.random() * (PARTICLE_LIFE_MAX - PARTICLE_LIFE_MIN)
          p.vx = 0
          p.vy = 0
          continue
        }

        p.prevX = p.x
        p.prevY = p.y

        // Noise-based flow angle
        const angle = noise(p.x * NOISE_SCALE, p.y * NOISE_SCALE + time) * Math.PI * 4

        // Base velocity from flow field
        p.vx += Math.cos(angle) * PARTICLE_SPEED * 0.3
        p.vy += Math.sin(angle) * PARTICLE_SPEED * 0.3

        // Cursor interaction — swirl attractor
        if (mActive) {
          const dx = mx - p.x
          const dy = my - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CURSOR_RADIUS && dist > 1) {
            const force = (1 - dist / CURSOR_RADIUS) * CURSOR_FORCE
            // Tangential + radial force for swirl effect
            const nx = dx / dist
            const ny = dy / dist
            p.vx += (nx * force * 0.4 + -ny * force * 0.8)
            p.vy += (ny * force * 0.4 + nx * force * 0.8)
          }
        }

        // Damping
        p.vx *= 0.88
        p.vy *= 0.88

        p.x += p.vx
        p.y += p.vy

        // Fade in/out over lifetime
        const lifeFrac = p.life / p.maxLife
        const alpha = lifeFrac < 0.1 ? lifeFrac / 0.1
                    : lifeFrac > 0.8 ? (1 - lifeFrac) / 0.2
                    : 1
        const finalAlpha = alpha * 0.35

        // Draw — thin flowing lines
        ctx.beginPath()
        ctx.moveTo(p.prevX, p.prevY)
        ctx.lineTo(p.x, p.y)
        ctx.strokeStyle = `rgba(${inkRgb}, ${finalAlpha})`
        ctx.lineWidth = p.width
        ctx.lineCap = 'round'
        ctx.stroke()
      }

      animIdRef.current = requestAnimationFrame(animate)
    }

    // Initial clear
    const { paper } = getThemeColors()
    ctx.fillStyle = paper
    ctx.globalAlpha = 1
    ctx.fillRect(0, 0, w, h)

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current)
    }
  }, [canvasRef, getThemeColors])
}

import { useEffect, useRef } from 'react'

type InteractiveStageProps = {
  section: string
}

export default function InteractiveStage({ section }: InteractiveStageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // Track active section in a ref
  const sectionRef = useRef(section)
  useEffect(() => {
    sectionRef.current = section
  }, [section])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const isDarkTheme = () => document.documentElement.classList.contains('dark')

    // Wave grid variables
    const cols = 36
    const rows = 26
    const numPoints = cols * rows
    
    // Wave buffer arrays for ripple physics
    let buffer1 = new Float32Array(numPoints)
    let buffer2 = new Float32Array(numPoints)
    
    // Grid vertices coordinates (x, y, z)
    const vertices = new Float32Array(numPoints * 3)

    const setupGrid = () => {
      const spacingX = (width * 1.25) / (cols - 1)
      const spacingY = (height * 1.25) / (rows - 1)
      const startX = -width * 0.125
      const startY = -height * 0.125

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c
          vertices[idx * 3] = startX + c * spacingX      // X
          vertices[idx * 3 + 1] = startY + r * spacingY  // Y
          vertices[idx * 3 + 2] = 0                      // Z (height)
        }
      }
    }
    setupGrid()

    const mouse = {
      x: 0,
      y: 0,
      active: false,
      prevX: 0,
      prevY: 0
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.prevX = mouse.x
      mouse.prevY = mouse.y
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true

      const dx = mouse.x - mouse.prevX
      const dy = mouse.y - mouse.prevY
      const speed = Math.sqrt(dx * dx + dy * dy)
      
      if (speed > 1) {
        let minDist = 99999
        let closestIdx = -1
        
        for (let i = 0; i < numPoints; i++) {
          const vx = vertices[i * 3]
          const vy = vertices[i * 3 + 1]
          const curDist = Math.hypot(mouse.x - vx, mouse.y - vy)
          if (curDist < minDist) {
            minDist = curDist
            closestIdx = i
          }
        }

        if (closestIdx !== -1 && minDist < 200) {
          buffer1[closestIdx] += Math.min(speed * 3.5, 50)
          
          const r = Math.floor(closestIdx / cols)
          const c = closestIdx % cols
          const neighbors = [
            [r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]
          ]
          neighbors.forEach(([nr, nc]) => {
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
              buffer1[nr * cols + nc] += Math.min(speed * 1.5, 22)
            }
          })
        }
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      let minDist = 99999
      let closestIdx = -1
      
      for (let i = 0; i < numPoints; i++) {
        const vx = vertices[i * 3]
        const vy = vertices[i * 3 + 1]
        const curDist = Math.hypot(e.clientX - vx, e.clientY - vy)
        if (curDist < minDist) {
          minDist = curDist
          closestIdx = i
        }
      }

      if (closestIdx !== -1) {
        buffer1[closestIdx] = 180
        const r = Math.floor(closestIdx / cols)
        const c = closestIdx % cols
        for (let nr = -2; nr <= 2; nr++) {
          for (let nc = -2; nc <= 2; nc++) {
            const tr = r + nr
            const tc = c + nc
            if (tr >= 0 && tr < rows && tc >= 0 && tc < cols) {
              const dist = Math.hypot(nr, nc)
              if (dist > 0) {
                buffer1[tr * cols + tc] = 140 / dist
              }
            }
          }
        }
      }
    }

    const handleMouseLeave = () => {
      mouse.active = false
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseleave', handleMouseLeave)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      setupGrid()
    }
    window.addEventListener('resize', handleResize)

    const updateRipples = () => {
      const damping = 0.965
      
      for (let r = 1; r < rows - 1; r++) {
        for (let c = 1; c < cols - 1; c++) {
          const idx = r * cols + c
          const val = (
            buffer1[idx - 1] +
            buffer1[idx + 1] +
            buffer1[idx - cols] +
            buffer1[idx + cols]
          ) * 0.5 - buffer2[idx]
          buffer2[idx] = val * damping
        }
      }
      
      const temp = buffer1
      buffer1 = buffer2
      buffer2 = temp
    }

    let angleX = -0.15
    let angleY = 0.05
    const focalLength = 800

    const tick = () => {
      updateRipples()

      // Read current color palette variables from the document element
      const rootStyle = getComputedStyle(document.documentElement)
      const bgColor = rootStyle.getPropertyValue('--color-background').trim() || (isDarkTheme() ? '#080809' : '#fafafa')
      const primaryColor = rootStyle.getPropertyValue('--color-primary').trim() || (isDarkTheme() ? '#a78bfa' : '#4f46e5')
      const fgColor = rootStyle.getPropertyValue('--color-foreground').trim() || (isDarkTheme() ? '#ffffff' : '#18181b')

      // Clear with active palette background
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, width, height)

      let targetAngleX = -0.12 + (mouse.active ? (mouse.y - height / 2) * 0.00015 : 0)
      let targetAngleY = 0.04 + (mouse.active ? (mouse.x - width / 2) * 0.00015 : 0)
      
      angleX += (targetAngleX - angleX) * 0.05
      angleY += (targetAngleY - angleY) * 0.05

      const cosX = Math.cos(angleX)
      const sinX = Math.sin(angleX)
      const cosY = Math.cos(angleY)
      const sinY = Math.sin(angleY)

      const centerX = width / 2
      const centerY = height / 2

      const projected = new Float32Array(numPoints * 2)
      const depths = new Float32Array(numPoints)

      const currentSection = sectionRef.current
      const heightMultiplier = currentSection === 'projects' ? 1.5 : (currentSection === 'skills' ? 0.8 : 1.2)

      for (let i = 0; i < numPoints; i++) {
        const bx = vertices[i * 3] - centerX
        const by = vertices[i * 3 + 1] - centerY
        const bz = buffer1[i] * heightMultiplier

        const x1 = bx * cosY - bz * sinY
        const z1 = bx * sinY + bz * cosY

        const y2 = by * cosX - z1 * sinX
        const z2 = by * sinX + z1 * cosX

        const depth = z2 + 600
        depths[i] = depth

        const scale = focalLength / Math.max(depth, 100)
        projected[i * 2] = centerX + x1 * scale
        projected[i * 2 + 1] = centerY + y2 * scale
      }

      ctx.strokeStyle = primaryColor

      // Draw horizontal grid lines with theme-aware opacity
      for (let r = 0; r < rows; r++) {
        ctx.beginPath()
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c
          const px = projected[idx * 2]
          const py = projected[idx * 2 + 1]
          
          if (c === 0) {
            ctx.moveTo(px, py)
          } else {
            ctx.lineTo(px, py)
          }
        }
        const avgIdx = r * cols + Math.floor(cols / 2)
        const depthFactor = Math.max(0.1, Math.min(1.0, 600 / depths[avgIdx]))
        ctx.globalAlpha = 0.16 * depthFactor
        ctx.stroke()
      }

      // Draw vertical grid lines with theme-aware opacity
      for (let c = 0; c < cols; c++) {
        ctx.beginPath()
        for (let r = 0; r < rows; r++) {
          const idx = r * cols + c
          const px = projected[idx * 2]
          const py = projected[idx * 2 + 1]
          
          if (r === 0) {
            ctx.moveTo(px, py)
          } else {
            ctx.lineTo(px, py)
          }
        }
        const avgIdx = Math.floor(rows / 2) * cols + c
        const depthFactor = Math.max(0.1, Math.min(1.0, 600 / depths[avgIdx]))
        ctx.globalAlpha = 0.16 * depthFactor
        ctx.stroke()
      }

      // Restore alpha
      ctx.globalAlpha = 1.0

      // Render interactive mouse ripple cursor node
      if (mouse.active) {
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = fgColor
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(tick)
    }

    tick()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
      {/* 3D Spacetime Grid control hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[8px] tracking-[0.3em] font-mono text-[var(--color-primary)] opacity-40 uppercase select-none pointer-events-none hidden md:block text-center animate-pulse">
        Disturb the 3D spacetime canvas • Click to drop gravitational wave
      </div>
    </div>
  )
}

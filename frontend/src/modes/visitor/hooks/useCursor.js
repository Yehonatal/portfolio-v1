import { useState, useEffect, useRef } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

export function useCursor() {
  const [isHoveringText, setIsHoveringText] = useState(false)
  const [isHoveringClickable, setIsHoveringClickable] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Spring physics for outer ring lag
  const springConfig = { stiffness: 220, damping: 24 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  const drawTimeoutRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      setIsDrawing(true)

      if (drawTimeoutRef.current) clearTimeout(drawTimeoutRef.current)
      drawTimeoutRef.current = setTimeout(() => {
        setIsDrawing(false)
      }, 150)
    }

    const handleMouseOver = (e) => {
      const target = e.target
      if (!target) return

      const isText = target.closest('[data-cursor="text"]') || 
                     ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(target.tagName)
      const isLink = target.closest('[data-cursor="link"]') || 
                     target.closest('a') || 
                     target.closest('button')

      setIsHoveringText(!!isText)
      setIsHoveringClickable(!!isLink)
    }

    const handleMouseLeaveWindow = () => {
      setIsHidden(true)
    }

    const handleMouseEnterWindow = () => {
      setIsHidden(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseleave', handleMouseLeaveWindow)
    document.addEventListener('mouseenter', handleMouseEnterWindow)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeaveWindow)
      document.removeEventListener('mouseenter', handleMouseEnterWindow)
      if (drawTimeoutRef.current) clearTimeout(drawTimeoutRef.current)
    }
  }, [mouseX, mouseY])

  return {
    mouseX,
    mouseY,
    springX,
    springY,
    isHoveringText,
    isHoveringClickable,
    isDrawing,
    isHidden
  }
}

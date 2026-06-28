import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

export function useCountUp(target, duration = 3000) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const startTime = performance.now()
    const easeOutExpo = t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
    
    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.floor(easeOutExpo(progress) * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target, duration])

  return { count, ref }
}

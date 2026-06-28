import { useState, useEffect } from 'react'

type AnimatedNumberProps = {
  value: number
  duration?: number
  decimals?: number
}

export default function AnimatedNumber({ value, duration = 1200, decimals = 0 }: AnimatedNumberProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    let startTimestamp: number | null = null
    const startValue = 0

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      // Easing function: easeOutExpo
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      
      setCurrent(startValue + easedProgress * (value - startValue))
      
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }

    window.requestAnimationFrame(step)
  }, [value, duration])

  return <span>{current.toFixed(decimals)}</span>
}

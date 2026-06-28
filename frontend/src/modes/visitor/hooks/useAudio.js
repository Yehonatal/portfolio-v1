import { useRef, useCallback } from 'react'

let globalAudioCtx = null

export function useAudio() {
  const getCtx = () => {
    if (!globalAudioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      if (AudioContextClass) {
        globalAudioCtx = new AudioContextClass()
      }
    }
    return globalAudioCtx
  }

  // Short 20ms burst of band-passed white noise with high-end exponential ramp down
  const playClick = useCallback(() => {
    try {
      const ctx = getCtx()
      if (!ctx) return

      if (ctx.state === 'suspended') {
        ctx.resume()
      }
      
      const duration = 0.025 // 25ms
      const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * duration), ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() * 2 - 1
      }

      const source = ctx.createBufferSource()
      source.buffer = buffer

      const filter = ctx.createBiquadFilter()
      filter.type = "bandpass"
      filter.frequency.value = 900
      filter.Q.value = 1.5

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.03, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)

      source.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      source.start()
      source.stop(ctx.currentTime + duration + 0.01)

      // Clean up connections after playback finishes
      setTimeout(() => {
        try {
          source.disconnect()
          filter.disconnect()
          gain.disconnect()
        } catch (e) {}
      }, (duration + 0.1) * 1000)

    } catch (err) {
      // Silently catch audio policy/device lock warnings
    }
  }, [])

  return { playClick }
}

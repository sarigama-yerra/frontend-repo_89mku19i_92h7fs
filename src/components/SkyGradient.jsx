import { useEffect, useRef } from 'react'

// Animated sunrise->sunset gradient that very slowly drifts
export default function SkyGradient() {
  const ref = useRef(null)

  useEffect(() => {
    let raf
    let t = 0
    const el = ref.current

    const loop = () => {
      t += 0.0008 // very slow
      const p1x = 50 + Math.sin(t) * 10
      const p1y = 50 + Math.cos(t * 0.8) * 10
      const hue1 = (340 + Math.sin(t * 0.6) * 10 + 360) % 360 // blush
      const hue2 = (260 + Math.cos(t * 0.5) * 8 + 360) % 360 // lavender mist
      const hue3 = (210 + Math.sin(t * 0.4) * 6 + 360) % 360 // charcoal pearl tilt

      if (el) {
        el.style.background = `radial-gradient(120% 120% at ${p1x}% ${p1y}%, hsl(${hue1} 70% 85%) 0%, hsl(${hue2} 70% 82%) 40%, hsl(${hue3} 22% 16%) 100%)`
      }
      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      ref={ref}
      className="absolute inset-0 -z-20 transition-colors duration-1000"
      aria-hidden
    />
  )
}

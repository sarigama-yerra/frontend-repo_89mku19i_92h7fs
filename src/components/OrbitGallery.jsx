import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useMemo } from 'react'

// A set of garments orbiting around the center with soft parallax and shimmer
export default function OrbitGallery({ items = [] }) {
  const controls = useAnimation()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  useEffect(() => {
    const handle = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      mx.set(x)
      my.set(y)
    }
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [mx, my])

  useEffect(() => {
    controls.start({ rotate: 360 }, { duration: 120, ease: 'linear', repeat: Infinity })
  }, [controls])

  const circles = useMemo(() => {
    const count = Math.max(items.length, 6)
    const base = new Array(count).fill(0)
    return base.map((_, i) => ({
      angle: (i / count) * Math.PI * 2,
      r: 140 + (i % 3) * 40,
      scale: 0.9 + ((i % 5) * 0.05),
      blur: i % 2 === 0 ? 0 : 2,
    }))
  }, [items.length])

  return (
    <div className="relative w-full h-[70vh] sm:h-[80vh]">
      {/* Invisible marble floor shimmer following cursor */}
      <CursorFloor mx={mx} my={my} />

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={controls}
        style={{ originX: 0.5, originY: 0.5 }}
      >
        {circles.map((c, idx) => (
          <OrbitedCard key={idx} cfg={c} idx={idx} mx={mx} my={my} item={items[idx % items.length]} />
        ))}
      </motion.div>
    </div>
  )
}

function OrbitedCard({ cfg, idx, mx, my, item }) {
  const x = useTransform(mx, [ -1, 1 ], [ -12, 12 ])
  const y = useTransform(my, [ -1, 1 ], [  12, -12 ])

  const angle = cfg.angle
  const radius = cfg.r
  const tx = Math.cos(angle) * radius
  const ty = Math.sin(angle) * radius

  return (
    <motion.div
      className="absolute will-change-transform"
      style={{ x, y, translateX: tx, translateY: ty }}
    >
      <motion.div
        className="relative w-40 h-56 sm:w-48 sm:h-72 rounded-xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_40px_rgba(255,182,193,0.25)]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: cfg.scale }}
        transition={{ duration: 1.6, delay: idx * 0.05, ease: 'easeOut' }}
        whileHover={{ scale: 1.02 }}
      >
        <GarmentContent item={item} />
      </motion.div>
    </motion.div>
  )
}

function GarmentContent({ item }) {
  return (
    <div className="relative w-full h-full">
      {/* Fabric texture bloom */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,192,203,0.5),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(216,191,216,0.4),transparent_45%)]" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-rose-100/20 to-fuchsia-100/10 mix-blend-soft-light" />
      {/* Rim light */}
      <div className="absolute -inset-[1px] rounded-xl pointer-events-none" style={{ boxShadow: 'inset 0 0 60px rgba(255,182,193,0.25), 0 0 80px rgba(255,182,193,0.25)' }} />

      {/* Placeholder garment silhouette */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-24 h-36 sm:w-28 sm:h-44 bg-gradient-to-b from-rose-200 via-lavender-200 to-slate-300 rounded-b-[40%] rounded-t-xl opacity-80" />
      </div>

      {/* Caption */}
      <div className="absolute bottom-2 left-2 right-2 text-xs text-white/90 tracking-wide drop-shadow">
        {item?.title || 'Silk Dress'}
      </div>
    </div>
  )
}

function CursorFloor({ mx, my }) {
  const glowX = useTransform(mx, [-1, 1], ['30%', '70%'])
  const glowY = useTransform(my, [-1, 1], ['65%', '75%'])
  return (
    <motion.div
      className="absolute inset-0 -z-10"
      style={{
        background: 'radial-gradient(40% 20% at var(--gx) var(--gy), rgba(255,192,203,0.25), transparent 60%)',
        '--gx': glowX,
        '--gy': glowY,
      }}
    />
  )
}

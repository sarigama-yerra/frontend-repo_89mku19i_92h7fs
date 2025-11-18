import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SkyGradient from './components/SkyGradient'
import OrbitGallery from './components/OrbitGallery'
import PearlNav from './components/PearlNav'

function App() {
  const garments = useMemo(() => (
    [
      { title: 'Blush Silk Gown' },
      { title: 'Lavender Mist Blazer' },
      { title: 'Charcoal Pearl Trench' },
      { title: 'Rose Tulle Skirt' },
      { title: 'Satin Ripple Camisole' },
      { title: 'Cashmere Breeze Cardigan' },
    ]
  ), [])

  const [index, setIndex] = useState(0)

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Sky gradient backdrop */}
      <SkyGradient />

      {/* Floating silk curtain entering */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          className="absolute inset-0 -z-10"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_0%,rgba(255,228,225,0.35),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.06),rgba(255,192,203,0.08),rgba(230,230,250,0.06))] mix-blend-soft-light" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-between min-h-screen py-10">
        <header className="px-6 pt-6">
          <motion.h1
            className="text-3xl sm:text-5xl font-semibold tracking-tight text-white/95 drop-shadow"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            Atelier Aether
          </motion.h1>
          <p className="text-white/70 mt-3 text-sm sm:text-base">Weightless couture in an endless dawn.</p>
        </header>

        <main className="w-full px-4">
          <OrbitGallery items={garments} />
        </main>

        <footer className="w-full flex flex-col items-center gap-6 pb-8">
          <PearlNav items={garments.map(g => ({ label: g.title }))} onSelect={setIndex} />
          <motion.div
            key={index}
            className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16 }}
          >
            {garments[index].title}
          </motion.div>
          <a href="/test" className="text-xs text-white/60 hover:text-white/80 underline">System test</a>
        </footer>
      </div>

      {/* Subtle grain + bokeh haze */}
      <div className="pointer-events-none absolute inset-0 -z-10 mix-blend-plus-lighter opacity-70" style={{ background: 'radial-gradient(120px 80px at 20% 30%, rgba(255,255,255,0.08), transparent 60%), radial-gradient(100px 120px at 80% 60%, rgba(255,182,193,0.08), transparent 60%), radial-gradient(180px 140px at 60% 20%, rgba(230,230,250,0.06), transparent 60%)' }} />
    </div>
  )
}

export default App

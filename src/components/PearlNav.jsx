import { motion } from 'framer-motion'

export default function PearlNav({ items = [], onSelect }) {
  return (
    <div className="pointer-events-auto flex gap-3 sm:gap-4 items-center justify-center">
      {items.map((it, i) => (
        <motion.button
          key={i}
          onClick={() => onSelect?.(i)}
          className="relative w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/70 shadow-[0_6px_18px_rgba(255,182,193,0.35)] border border-white/60"
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 1.2 }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, type: 'spring', stiffness: 200, damping: 18 }}
        >
          <span className="sr-only">{it.label || 'Item'}</span>
          <span className="absolute -inset-1 rounded-full" style={{ boxShadow: 'inset 0 0 18px rgba(255,255,255,0.85)' }} />
        </motion.button>
      ))}
    </div>
  )
}

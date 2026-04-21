import { motion } from 'framer-motion'
import { categories } from './TechStack'

const AdRibbon = () => {
  const ads = categories.flatMap((cat) => cat.tech)
  const ribbonItems = [...ads, ...ads, ...ads]

  return (
    <div className="w-full bg-[var(--color-foreground)] text-[var(--color-background)] border-b border-[var(--color-border)] overflow-hidden">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 65, ease: 'linear', repeat: Infinity }}
        className="flex items-center gap-10 whitespace-nowrap px-6 py-2"
      >
        {ribbonItems.map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center gap-6">
            <span className="text-xs font-medium uppercase tracking-[0.1em]">
              {item}
            </span>
            <span className="text-[10px] font-serif italic text-[var(--color-background)]/50">
              —
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default AdRibbon

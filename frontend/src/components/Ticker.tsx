import { motion } from 'framer-motion'
import { categories } from './TechStack'

const Ticker = () => {
  const allTech = categories.flatMap((cat) => cat.tech)
  const duplicatedTech = [...allTech, ...allTech, ...allTech, ...allTech]

  return (
    <div className="w-full bg-[var(--color-secondary)] py-3 overflow-hidden flex whitespace-nowrap select-none border-y border-[var(--color-border)]">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 45,
          ease: 'linear',
          repeat: Infinity,
        }}
        className="flex gap-10 items-center px-4"
      >
        {duplicatedTech.map((tech, i) => (
          <div key={i} className="flex items-center gap-10">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-foreground)]">
              {tech}
            </span>
            <span className="text-[10px] font-serif italic text-[var(--color-muted-foreground)]">
              Ad: Open to Work
            </span>
            <span className="text-sm font-light text-[var(--color-border)]">
              |
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default Ticker

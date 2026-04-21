import { motion } from 'framer-motion'

const Education = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="w-full border-b border-[var(--color-border)] bg-[var(--color-background)] py-6 space-y-5"
  >
    <div className="border-b border-[var(--color-border)] pb-2 mb-4">
      <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]">
        Academic Record
      </span>
    </div>

    <div>
      <h4 className="text-xl font-serif tracking-tight text-[var(--color-foreground)]">
        Haramaya University
      </h4>
      <p className="text-xs font-light uppercase tracking-widest mt-1 text-[var(--color-muted-foreground)]">
        B.Sc. in Software Engineering
      </p>
    </div>

    <div className="grid grid-cols-2 gap-6 border-y border-[var(--color-border)] py-4 text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--color-foreground)]">
      <div>
        <div className="text-[var(--color-muted-foreground)] mb-1">Graduation</div>
        <div className="text-sm font-serif">Jan 2026</div>
      </div>
      <div>
        <div className="text-[var(--color-muted-foreground)] mb-1">CGPA</div>
        <div className="text-sm font-serif">3.93</div>
      </div>
    </div>

    <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-foreground)] pt-2">
      Dean’s List
    </div>
  </motion.div>
)

export default Education

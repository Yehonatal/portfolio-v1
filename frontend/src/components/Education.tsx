import { motion } from 'framer-motion'

const Education = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="w-full max-w-[480px] space-y-4"
  >
    <div>
      <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--color-primary)]">
        Education
      </span>
      <div>
        <h4 className="text-2xl  font-black text-[var(--color-foreground)] tracking-tighter leading-tight">
          Haramaya University
        </h4>
        <p className="text-[13px] font-medium italic text-[var(--color-muted-foreground)]">
          B.Sc. in Software Engineering
        </p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-2">
      <div>
        <span className="text-[9px] font-black uppercase tracking-widest text-[var(--color-muted-foreground)]">
          Graduation
        </span>
        <p className="text-sm font-black text-[var(--color-foreground)]">
          JAN 2026
        </p>
      </div>
      <div>
        <span className="text-[9px] font-black uppercase tracking-widest text-[var(--color-muted-foreground)]">
          CGPA
        </span>
        <p className="text-md font-black text-[var(--color-primary)]">3.93</p>
      </div>
    </div>

    <div>
      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-primary)]">
        Dean’s List
      </span>
    </div>
  </motion.div>
)

export default Education

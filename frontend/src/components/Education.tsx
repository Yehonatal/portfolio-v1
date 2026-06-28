import { motion } from 'framer-motion'
import { Award, Calendar, GraduationCap } from 'lucide-react'

const Education = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="w-full bg-[var(--color-secondary)]/30 rounded-2xl p-6 space-y-5"
  >
    <div className="flex items-center gap-3 border-b border-[var(--color-border)]/15 pb-3">
      <GraduationCap className="w-5 h-5 text-[var(--color-muted-foreground)]" />
      <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)]">
        Academic Record
      </span>
    </div>

    <div>
      <h4 className="text-lg font-bold font-display tracking-tight text-[var(--color-foreground)]">
        Haramaya University
      </h4>
      <p className="text-xs font-medium uppercase tracking-[0.1em] mt-1.5 text-[var(--color-muted-foreground)] flex items-center gap-1.5">
        <Award className="w-3.5 h-3.5" />
        B.Sc. in Software Engineering
      </p>
    </div>

    <div className="grid grid-cols-2 gap-4 border-t border-[var(--color-border)]/15 pt-4 text-[10px] font-semibold uppercase tracking-widest text-[var(--color-foreground)]">
      <div className="space-y-1">
        <div className="text-[var(--color-muted-foreground)] text-[9px] flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          Graduation
        </div>
        <div className="text-sm font-display font-bold">Jan 2026</div>
      </div>
      <div className="space-y-1">
        <div className="text-[var(--color-muted-foreground)] text-[9px] flex items-center gap-1">
          <Award className="w-3 h-3" />
          CGPA
        </div>
        <div className="text-sm font-display font-bold">3.93</div>
      </div>
    </div>

    <div className="text-[9px] font-bold uppercase tracking-widest text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-0.5 rounded-md inline-block">
      Dean’s List
    </div>
  </motion.div>
)

export default Education

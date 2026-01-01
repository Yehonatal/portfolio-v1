import TechStack from './TechStack'
import EducationSection from './Education'
import { motion } from 'framer-motion'

type HeroProp = {
  name?: string
  title?: string
  contact?: string
  description?: string
}

const Hero = ({
  name = 'Yonatan Afewerk',
  title = 'Open to Remote | Part-Time | Full-Time',
  description = 'Building is my passion, and programming is how I turn ideas into reality. From crafting sleek interfaces to tackling tricky problems, I love seeing projects come to life one line of code at a time.',
}: HeroProp) => {
  return (
    <>
      <section className="pt-32 pb-2 md:pt-64 md:pb-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 md:gap-24 items-center mb-20 md:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="space-y-10">
              <div className="space-y-6">
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[var(--color-primary)] block">
                  {name}
                </span>
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] text-[var(--color-foreground)]">
                  Crafting <br />
                  <span className="font-serif italic font-light">
                    Digital
                  </span>{' '}
                  Soul
                </h1>
              </div>

              <p className="max-w-xl text-sm md:text-lg text-[var(--color-muted-foreground)] leading-relaxed font-medium tracking-tight">
                {description}
              </p>

              <div className="flex flex-wrap items-center gap-10 pt-6">
                <motion.a
                  href="https://drive.google.com/file/d/1XikLskYXweus7u48pK1IhFYRJ7vpTV4R/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-[var(--color-foreground)] text-[var(--color-background)] rounded-full text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl hover:shadow-[var(--color-primary)]/20 transition-all"
                >
                  Download Resume
                </motion.a>

                <div className="flex items-center gap-4 text-[var(--color-muted-foreground)]">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                    {title}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col items-center lg:items-end gap-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-64 h-64 md:w-72 md:h-72 group"
            >
              <div className="absolute inset-0 bg-[var(--color-primary)] rounded-[2rem] rotate-6 opacity-20 blur-2xl group-hover:blur-3xl transition-all duration-500" />
              <div className="absolute inset-0 bg-[var(--color-secondary)] rounded-[2rem] -rotate-3 border border-[var(--color-border)]" />
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden border-2 border-[var(--color-background)] shadow-2xl rotate-3 group-hover:rotate-0 transition-all duration-500">
                <img
                  src="/me.jpg"
                  alt="Yonatan Afewerk"
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>

            <EducationSection />
          </div>
        </div>

        <div className="pt-20 ">
          <TechStack />
        </div>
      </section>
    </>
  )
}

export default Hero

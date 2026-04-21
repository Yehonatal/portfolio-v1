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
    <section className="relative pb-16 md:pb-24 max-w-6xl mx-auto px-6 bg-[var(--color-background)]">
      <div className="grid lg:grid-cols-[2.5fr_1fr] gap-12 lg:gap-16 pt-8">
        {/* Main Article Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-4">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]">
                Exclusive Feature
              </span>
              <span className="text-sm font-serif italic text-[var(--color-muted-foreground)]">
                By Our Technology Correspondent
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-serif tracking-tight leading-[1.05] text-[var(--color-foreground)]">
              Software Engineer Breaks New Grounds in Web Development
            </h2>

            <div className="grid md:grid-cols-2 gap-10 pt-6">
              <div className="space-y-6">
                <p className="text-xl leading-relaxed font-serif italic border-l px-6 border-[var(--color-border)] text-[var(--color-muted-foreground)]">
                  "It's not just about making things work, but how eloquently they work together," he states.
                </p>
                <div className="text-sm leading-loose text-[var(--color-foreground)] text-justify font-light">
                  <span className="drop-cap">I</span>n a world rapidly shifting towards modular and performant web spaces, the focus has shifted entirely onto crafting scalable applications. Yonatan, an ambitious software engineer, is currently redefining what modern web applications look like and how they perform. With a keen eye for aesthetics and a rigorous engineering process, he merges the gap between design and robust functionality.
                </div>
              </div>
              <div className="space-y-8">
                <div className="text-sm leading-loose text-[var(--color-foreground)] text-justify font-light">
                  {description}
                  <div className="mt-8 border-t border-[var(--color-border)] pt-4 flex justify-between items-center">
                     <span className="text-xs uppercase tracking-widest text-[var(--color-muted-foreground)] font-medium">Special Report</span>
                     <span className="text-xs uppercase tracking-widest text-[var(--color-foreground)] font-medium">{name}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 pt-2">
                  <motion.a
                    href="https://drive.google.com/file/d/1lFQogpWl42L-UE5DvY_40laKmA_0sXlf/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ opacity: 0.8 }}
                    className="px-6 py-3 border border-[var(--color-foreground)] text-xs font-medium uppercase tracking-[0.2em] bg-[var(--color-foreground)] text-[var(--color-background)] transition-colors"
                  >
                    Read Resume
                  </motion.a>
                  <a
                    href="mailto:yonatanafewerk@gmail.com"
                    className="px-6 py-3 border border-[var(--color-border)] text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-foreground)] hover:border-[var(--color-foreground)] transition-colors"
                  >
                    Contact Editor
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sidebar Section */}
        <aside className="space-y-10 border-t lg:border-t-0 lg:border-l border-[var(--color-border)] pt-10 lg:pt-0 lg:pl-10">
          <div className="space-y-3">
             <div className="border border-[var(--color-border)] p-1">
                <img
                  src="/me.jpg"
                  alt="Yonatan Afewerk"
                  className="w-full h-auto object-cover grayscale opacity-90 hover:opacity-100 transition-opacity"
                />
             </div>
             <p className="text-[10px] text-center uppercase tracking-widest text-[var(--color-muted-foreground)]">
                Fig 1.0 — The Engineer at Work (Circa 2024)
             </p>
          </div>

          <div className="pt-8 border-t border-[var(--color-border)]">
            <h3 className="text-xs font-serif italic text-center mb-6 text-[var(--color-muted-foreground)]">
              Curriculum Vitae
            </h3>
            <EducationSection />
          </div>

          <div className="pt-8 border-t border-[var(--color-border)]">
            <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-center mb-4 text-[var(--color-muted-foreground)]">
              Classifieds
            </h3>
            <div className="border border-[var(--color-border)] p-6 text-center space-y-4 bg-[var(--color-secondary)]">
              <p className="text-xs uppercase tracking-widest text-[var(--color-foreground)] leading-relaxed">
                Seeking Elegant & <br/> Robust Solutions?
              </p>
              <p className="text-2xl font-serif italic text-[var(--color-foreground)]">
                Available for Hire
              </p>
              <p className="text-[9px] uppercase tracking-widest text-[var(--color-muted-foreground)] pt-2">
                Inquire Within
              </p>
            </div>
          </div>
        </aside>
      </div>

      <div className="pt-20">
        <TechStack />
      </div>
    </section>
  )
}

export default Hero

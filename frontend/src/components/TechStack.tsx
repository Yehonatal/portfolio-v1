import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Code, Server, Database, GitBranch, Box, Sparkles } from 'lucide-react'

export const categories = [
  {
    name: 'Frontend',
    icon: <Code className="w-5 h-5" />,
    tech: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'HTML',
      'CSS',
      'TailwindCSS',
      'Redux',
      'Redux Toolkit',
      'Redux-Saga',
      'shadcn/ui',
      'Recharts',
      'Webpack',
    ],
    description:
      'Crafting immersive, responsive, and high-performance user interfaces.',
  },
  {
    name: 'Backend & APIs',
    icon: <Server className="w-5 h-5" />,
    tech: [
      'Node.js',
      'Express',
      'Python',
      'GraphQL',
      'REST APIs',
      'Gemini API',
      'Haystack',
      'Qdrant',
      'WebSockets',
      'JWT',
      'PHP',
      'Java',
    ],
    description:
      'Architecting scalable server-side logic and robust API ecosystems.',
  },
  {
    name: 'Databases & Hosting',
    icon: <Database className="w-5 h-5" />,
    tech: [
      'MongoDB',
      'Supabase',
      'Neon',
      'Turso',
      'PostgreSQL',
      'MySQL',
      'Drizzle ORM',
    ],
    description:
      'Managing data integrity and deploying to high-availability environments.',
  },
  {
    name: 'Dev Tools & Practices',
    icon: <GitBranch className="w-5 h-5" />,
    tech: ['Version Control', 'Docker', 'Postman', 'Testing', 'Axios', 'Git'],
    description:
      'Streamlining development workflows and ensuring code quality.',
  },
  {
    name: 'Other',
    icon: <Box className="w-5 h-5" />,
    tech: [
      'Vite',
      'Strapi',
      'Cloudinary',
      'Framer Motion',
      'AOS',
      'Sonner',
      'JavaFX',
    ],
    description: 'Leveraging specialized tools for animation, CMS, and media.',
  },
]

const TechCard = ({ cat, i }: { cat: (typeof categories)[0]; i: number }) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: i * 0.1,
        ease: 'easeOut',
      }}
      onMouseMove={onMouseMove}
      className="group relative p-6 rounded-2xl bg-[var(--color-secondary)]/5 border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 transition-colors duration-500 overflow-hidden flex flex-col gap-6"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) =>
              `radial-gradient(400px circle at ${x}px ${y}px, var(--color-primary), transparent 40%)`,
          ),
          opacity: 0.1,
        }}
      />

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative z-10 flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-primary)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm shrink-0">
          {cat.icon}
        </div>
        <h4 className="text-lg font-bold tracking-tight text-[var(--color-foreground)]">
          {cat.name}
        </h4>
      </div>

      <div className="relative z-10">
        <div className="flex flex-wrap gap-2">
          {cat.tech.map((tech, techIdx) => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-md bg-[var(--color-background)]/50 border border-[var(--color-border)] text-[13px] font-medium text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors duration-300 cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const TechStack = () => {
  return (
    <section className="py-24">
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-[var(--color-primary)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-primary)]">
                Expertise
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
              Technical{' '}
              <span className="font-serif italic font-light text-[var(--color-muted-foreground)]">
                Arsenal
              </span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm md:text-base font-medium text-[var(--color-muted-foreground)] leading-relaxed">
              A comprehensive suite of tools and technologies I use to build
              scalable, high-performance applications.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <TechCard key={cat.name} cat={cat} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStack

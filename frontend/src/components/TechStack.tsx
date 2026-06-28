import { Code, Server, Database, GitBranch, Box } from 'lucide-react'

export const categories = [
  {
    name: 'Frontend',
    icon: <Code className="w-5 h-5" strokeWidth={1.5} />,
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
    icon: <Server className="w-5 h-5" strokeWidth={1.5} />,
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
    name: 'Databases',
    icon: <Database className="w-5 h-5" strokeWidth={1.5} />,
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
    name: 'Dev Tools',
    icon: <GitBranch className="w-5 h-5" strokeWidth={1.5} />,
    tech: ['Version Control', 'Docker', 'Postman', 'Testing', 'Axios', 'Git'],
    description:
      'Streamlining development workflows and ensuring code quality.',
  },
  {
    name: 'Other',
    icon: <Box className="w-5 h-5" strokeWidth={1.5} />,
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

const TechRow = ({ cat }: { cat: (typeof categories)[0] }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-12 py-8 border-b border-[var(--color-border)]/15 group">
      {/* Category Identity */}
      <div className="md:w-1/4 flex items-center md:items-start gap-3 shrink-0">
        <div className="p-2 rounded-xl bg-[var(--color-secondary)]/50 text-[var(--color-muted-foreground)] group-hover:text-[var(--color-primary)] transition-colors">
          {cat.icon}
        </div>
        <div className="space-y-0.5">
          <h4 className="text-sm font-bold uppercase tracking-widest text-[var(--color-foreground)] font-display">
            {cat.name}
          </h4>
          <span className="block text-[8px] font-mono font-bold uppercase tracking-wider text-[var(--color-muted-foreground)]">
            Capability Directory
          </span>
        </div>
      </div>

      {/* Description & Skill Tags */}
      <div className="flex-1 space-y-4">
        <p className="text-sm text-[var(--color-muted-foreground)] font-light leading-relaxed">
          {cat.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {cat.tech.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono font-semibold uppercase tracking-[0.05em] text-[var(--color-foreground)] bg-[var(--color-secondary)] px-2.5 py-1 rounded hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-foreground)] transition-colors duration-250 cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

const TechStack = () => {
  return (
    <section id="skills" className="py-20 max-w-4xl mx-auto px-6 border-b border-[var(--color-border)]/15">
      <div className="space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--color-border)]/15 pb-6">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]">
              Technical Index
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-[var(--color-foreground)]">
              Skills & Tools
            </h2>
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted-foreground)] bg-[var(--color-secondary)]/50 px-3 py-1 rounded-full">
            Full Stack Profile
          </div>
        </div>

        {/* Structured Listing */}
        <div className="flex flex-col">
          {categories.map((cat) => (
            <TechRow key={cat.name} cat={cat} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStack

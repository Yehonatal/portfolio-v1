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

const TechCard = ({ cat }: { cat: (typeof categories)[0] }) => {
  return (
    <div className="flex flex-col h-full border border-[var(--color-border)] bg-[var(--color-background)] pb-6 hover:bg-[var(--color-secondary)] transition-colors duration-500">
      <div className="border-b border-[var(--color-border)] p-4 flex items-center justify-between text-[var(--color-muted-foreground)]">
        <h4 className="text-xs font-medium uppercase tracking-[0.2em] shrink-0">
          {cat.name}
        </h4>
        <div className="shrink-0">{cat.icon}</div>
      </div>
      <div className="p-5 flex-grow flex flex-col gap-5">
        <p className="text-sm font-light leading-relaxed text-[var(--color-muted-foreground)]">
          {cat.description}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {cat.tech.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--color-foreground)] border border-[var(--color-border)] px-2 py-1 hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)] transition-colors duration-300 cursor-default"
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
    <section className="py-16 border-t border-[var(--color-border)]">
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--color-border)] pb-6">
          <div className="space-y-4">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]">
              Technical Index
            </span>
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-[var(--color-foreground)]">
              Skills & Tools
            </h2>
          </div>
          <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]">
            Full Stack Profile
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <TechCard key={cat.name} cat={cat} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStack

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cpu, Server, Database, Settings, Sparkles } from 'lucide-react'

export const categories = [
  {
    id: 'frontend',
    name: 'Frontend Engineering',
    icon: <Cpu className="w-5 h-5 text-indigo-400" />,
    tech: [
      { name: 'React.js', desc: 'Component rendering architectures' },
      { name: 'Next.js', desc: 'Server-side rendering & static generation' },
      { name: 'TypeScript', desc: 'Type-safe scalable programming' },
      { name: 'TailwindCSS', desc: 'Responsive design & utility layouts' },
      { name: 'Redux Toolkit', desc: 'Global flow & middleware management' },
      { name: 'shadcn/ui', desc: 'Accessible component libraries' },
    ],
    description: 'Designing highly-responsive, clean interfaces with focus on interaction design, modular structure, and frame-perfect animations.',
  },
  {
    id: 'backend',
    name: 'Backend & APIs',
    icon: <Server className="w-5 h-5 text-purple-400" />,
    tech: [
      { name: 'Node.js / Express', desc: 'Event-driven server runtimes' },
      { name: 'Python / FastAPI', desc: 'Asynchronous APIs & data processes' },
      { name: 'GraphQL', desc: 'Flexible client query structures' },
      { name: 'RESTful Routing', desc: 'Standardized resource distribution' },
      { name: 'WebSockets', desc: 'Real-time bidirectional pathways' },
      { name: 'Gemini NLP API', desc: 'Generative AI content pipelines' },
    ],
    description: 'Architecting secure, asynchronous, and robust backend systems with optimized API throughput and seamless third-party services.',
  },
  {
    id: 'database',
    name: 'Database Schemas',
    icon: <Database className="w-5 h-5 text-pink-400" />,
    tech: [
      { name: 'PostgreSQL', desc: 'Relational storage & transactional queries' },
      { name: 'MongoDB', desc: 'Document model & horizontal databases' },
      { name: 'Supabase / Drizzle', desc: 'Relational abstraction & serverless data' },
      { name: 'Qdrant Vector DB', desc: 'High-dimensional embeddings index' },
    ],
    description: 'Designing query-optimized data structures, vector indexes for search applications, and ensuring strict access protocols.',
  },
  {
    id: 'devops',
    name: 'DevOps & Pipeline',
    icon: <Settings className="w-5 h-5 text-blue-400" />,
    tech: [
      { name: 'Docker Containers', desc: 'Isolated system instances packaging' },
      { name: 'Git & CI/CD Actions', desc: 'Automated code integration flows' },
      { name: 'Vite / Webpack', desc: 'Module bundle compilation processes' },
      { name: 'Postman / Testing', desc: 'Quality validation & endpoint inspection' },
    ],
    description: 'Streamlining builds, containerizing local environments, and deploying highly automated integration pipelines.',
  },
]

const TechStack = () => {
  const [activeTab, setActiveTab] = useState('frontend')

  const activeCategory = categories.find(c => c.id === activeTab) || categories[0]

  return (
    <section id="skills" className="w-full text-[var(--color-foreground)] select-none text-left space-y-10">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--color-border)]/30 pb-6">
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[var(--color-primary)] flex items-center gap-1.5">
            <Sparkles size={11} className="animate-pulse" />
            Curated Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl font-black font-display tracking-tight text-[var(--color-foreground)] leading-none">
            Ecosystem &amp; Expertise.
          </h2>
        </div>
        <p className="text-xs text-[var(--color-muted-foreground)] font-light max-w-xs leading-relaxed">
          A targeted outline of technology frameworks, API paradigms, and data systems configured for scalable deployment.
        </p>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Category Tabs (Spans 4) */}
        <div className="md:col-span-4 flex flex-col gap-3">
          {categories.map((cat) => {
            const isActive = activeTab === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`w-full p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 flex items-center gap-4 relative overflow-hidden group ${
                  isActive
                    ? 'bg-[var(--color-secondary)]/50 border-[var(--color-primary)] shadow-sm'
                    : 'bg-transparent border-[var(--color-border)]/50 hover:border-[var(--color-border)] hover:bg-[var(--color-secondary)]/10'
                }`}
              >
                {/* Visual marker inside active tab */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabMarker"
                    className="absolute left-0 top-0 bottom-0 w-1.5 bg-[var(--color-primary)]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                
                <div className={`p-2.5 rounded-lg transition-colors ${
                  isActive ? 'bg-[var(--color-primary)]/10' : 'bg-[var(--color-secondary)]/20 group-hover:bg-[var(--color-secondary)]/40'
                }`}>
                  {cat.icon}
                </div>
                
                <div className="space-y-0.5">
                  <span className={`block text-xs font-bold font-display uppercase tracking-wider ${
                    isActive ? 'text-[var(--color-foreground)] font-black' : 'text-[var(--color-muted-foreground)] group-hover:text-[var(--color-foreground)]'
                  }`}>
                    {cat.name}
                  </span>
                  <span className="block text-[8px] font-mono tracking-widest text-[var(--color-muted-foreground)]/70 uppercase">
                    {cat.tech.length} modules configured
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Selected Category Details & Tech List (Spans 8) */}
        <div className="md:col-span-8 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              {/* Category description banner */}
              <div className="bg-[radial-gradient(circle_at_10%_10%,rgba(99,102,241,0.015),transparent_70%)] border border-[var(--color-border)]/30 p-6 rounded-2xl">
                <span className="text-[8px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]/50 block mb-1">
                  Scope Abstract
                </span>
                <p className="text-sm font-light leading-relaxed text-[var(--color-muted-foreground)]">
                  {activeCategory.description}
                </p>
              </div>

              {/* Sub-Header */}
              <div className="border-b border-[var(--color-border)]/15 pb-2">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[var(--color-muted-foreground)]/60">
                  // Core Modules Directory
                </span>
              </div>

              {/* Skills grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeCategory.tech.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ y: -3, borderColor: 'var(--color-primary)' }}
                    className="p-4 rounded-xl border border-[var(--color-border)]/50 bg-[var(--color-card)]/20 hover:bg-[var(--color-secondary)]/15 transition-all duration-250 flex flex-col justify-between gap-1 select-none relative group overflow-hidden"
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-[var(--color-foreground)] font-display tracking-tight flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        {skill.name}
                      </span>
                      <p className="text-[10px] text-[var(--color-muted-foreground)] leading-relaxed font-light">
                        {skill.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default TechStack

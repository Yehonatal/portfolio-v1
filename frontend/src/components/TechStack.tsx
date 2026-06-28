import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cpu, Server, Database, Settings, Sparkles } from 'lucide-react'

export const categories = [
  {
    id: 'languages',
    name: 'Programming Languages',
    icon: <Cpu className="w-5 h-5 text-indigo-400" />,
    tech: [
      { name: 'Python', desc: 'Asynchronous scripts, AI endpoints, & ERP business logic' },
      { name: 'JavaScript', desc: 'Dynamic frontend client execution & ES6+ standards' },
      { name: 'TypeScript', desc: 'Type-safe scalable programming & strict compiler guards' },
      { name: 'SQL', desc: 'Relational data structures, custom schemas & ACID queries' },
    ],
    description: 'Core languages utilized to develop backend systems, custom integrations, and high-fidelity user-facing applications.',
  },
  {
    id: 'frontend',
    name: 'Frontend & Web',
    icon: <Sparkles className="w-5 h-5 text-yellow-400" />,
    tech: [
      { name: 'React', desc: 'State-driven UI composition & interactive decks' },
      { name: 'Next.js', desc: 'Server-side rendering, static site generation, & API routes' },
      { name: 'HTML & CSS', desc: 'Semantic layout architecture & core browser styling styles' },
      { name: 'Tailwind CSS', desc: 'Utility-first rapid prototyping & responsive designs' },
      { name: 'Redux & Redux Toolkit', desc: 'Global application state management & flow' },
      { name: 'Redux-Saga', desc: 'Side-effect orchestration & complex async control chains' },
    ],
    description: 'Building performance-first interfaces with visual precision, modular layouts, and frame-perfect interactive states.',
  },
  {
    id: 'backend',
    name: 'Back-End Systems',
    icon: <Server className="w-5 h-5 text-purple-400" />,
    tech: [
      { name: 'Node.js', desc: 'Event-driven, asynchronous server-side Javascript runtime' },
      { name: 'Express.js', desc: 'Minimalist web application framework for routing & middleware' },
      { name: 'RESTful APIs', desc: 'Standardized resource distribution & clean JSON payloads' },
      { name: 'WebSockets', desc: 'Bidirectional channels for live updates & real-time streams' },
      { name: 'JWT Authentication', desc: 'Stateless session security & encrypted user token flows' },
    ],
    description: 'Designing secure, performant, and scalable API gateways, service handlers, and microservice connections.',
  },
  {
    id: 'database',
    name: 'Database & Storage',
    icon: <Database className="w-5 h-5 text-pink-400" />,
    tech: [
      { name: 'MongoDB', desc: 'Document model schema structure for flexible data scaling' },
      { name: 'PostgreSQL', desc: 'Robust relational database management system' },
      { name: 'MySQL', desc: 'Standardized transactional query-based storage' },
      { name: 'Supabase', desc: 'Backend-as-a-service database hooks & authentication layers' },
      { name: 'Drizzle ORM', desc: 'Type-safe SQL query generation & database migrations' },
    ],
    description: 'Modeling query-optimized relations, index schemes, and secure storage solutions for production work.',
  },
  {
    id: 'tools',
    name: 'Tools & Pipelines',
    icon: <Settings className="w-5 h-5 text-blue-400" />,
    tech: [
      { name: 'Git & GitHub', desc: 'Distributed version control & collaborative pull request reviews' },
      { name: 'Docker', desc: 'Containerized microservices packaging & local environment setups' },
      { name: 'Postman', desc: 'Comprehensive API testing & automated endpoint validation' },
      { name: 'CI/CD (GitHub Actions)', desc: 'Automated test suite verification & live deployment pipelines' },
    ],
    description: 'Streamlining code integration processes, automating delivery pipelines, and maintaining container isolation.',
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

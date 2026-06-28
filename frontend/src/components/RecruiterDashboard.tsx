import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Download, MapPin, BookOpen, Briefcase, ArrowUpRight, 
  CheckCircle2, HelpCircle, ChevronRight, Building, Check,
  Sun, Moon, ShieldAlert, Cpu, Award
} from 'lucide-react'
import AnimatedNumber from './AnimatedNumber'

type RecruiterDashboardProps = {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  onBackToPersona: () => void
}

type OnboardingStep = 'match' | 'timeline' | 'qa' | 'traits' | 'contract'

export default function RecruiterDashboard({ theme, toggleTheme, onBackToPersona }: RecruiterDashboardProps) {
  const [activeStep, setActiveStep] = useState<OnboardingStep>('match')
  const [selectedRole, setSelectedRole] = useState<'fullstack' | 'backend' | 'odoo' | 'creative'>('fullstack')
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [activeQA, setActiveQA] = useState<number>(1)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('yonatanafewerk@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const roleMatching = {
    fullstack: {
      score: '98%',
      summary: 'Architecting end-to-end web products with tight UX alignment, performance-first React/Next.js layers, and robust Node.js/PostgreSQL backends. Proven ability to own features from database design to micro-animations.',
      focusSkills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redux Toolkit'],
      whyFit: [
        'Built full-stack MERN & Postgres features at Swenetix Tech PLC.',
        'Experienced in designing clean state management architecture and responsive UI decks.',
        'Maintains strong design-engineering bridge for high-fidelity interactive elements.'
      ]
    },
    backend: {
      score: '96%',
      summary: 'Specialized in building high-throughput APIs, optimized database schemas, and structured microservices. Passionate about query optimization, cache layers, and clean enterprise patterns.',
      focusSkills: ['Node.js', 'Express.js', 'RESTful APIs', 'WebSockets', 'JWT Authentication', 'PostgreSQL', 'Drizzle ORM'],
      whyFit: [
        'Optimized system load & performance bottlenecks using Redux-Saga & DB indexes.',
        'Integrated RAG chat architecture using vector databases and third-party LLMs.',
        'Apprenticed at A2SV focusing heavily on algorithms, concurrency, and clean server patterns.'
      ]
    },
    odoo: {
      score: '95%',
      summary: 'Experienced Odoo developer building modular backend business logic and custom frontend themes. Focused on ERP scalability, CRM extensions, and clean integrations.',
      focusSkills: ['Python', 'PostgreSQL', 'Docker', 'Git', 'GitHub'],
      whyFit: [
        'Built production-ready enterprise Odoo modules at Swenetix Tech PLC.',
        'Created custom theme styles and dark-mode overrides for discuss/chat layouts.',
        'Skilled in migrating data modules, designing custom models, and optimizing database requests.'
      ]
    },
    creative: {
      score: '99%',
      summary: 'Blending engineering precision with motion design. Creating custom particle setups, canvas animations, and advanced scroll-linked typography reveals that captivate users without sacrificing speed.',
      focusSkills: ['React', 'Next.js', 'HTML', 'CSS', 'Tailwind CSS', 'Redux', 'Redux Toolkit', 'Redux-Saga'],
      whyFit: [
        'Built the current interactive 3-mode hybrid portfolio and showcase layouts using custom canvas engines and Framer Motion.',
        'Designed advanced modular UI elements, visual showcase projects, and user-centric design simulations.',
        'Deep expert in Framer Motion layout orchestration, timeline sequencing, and performance-first responsive systems.'
      ]
    }
  }

  const workExperience = [
    {
      role: 'Full Stack Software Engineer',
      company: 'Swenetix Tech PLC (formerly Addis Software)',
      period: 'Mar 2026 - Present',
      impacts: [
        'Developed modular backend integrations and responsive frontend views for large-scale enterprise Odoo systems.',
        'Built custom RAG AI chatbot engines using vector database search algorithms and multi-provider LLM pipelines.',
        'Redesigned core UI layouts using Tailwind CSS and React hooks, boosting user interaction metrics by 25%.'
      ]
    },
    {
      role: 'Software Engineering Apprentice',
      company: 'A2SV (Africa to Silicon Valley)',
      period: '2-Year Apprenticeship',
      impacts: [
        'Mastered advanced data structures, systems algorithms, and performance complexity optimization.',
        'Collaborated on agile feature sprints, practicing clean design patterns, unit testing, and continuous deployment.',
        'Ranked in top percentiles on competitive programming evaluations.'
      ]
    },
    {
      role: 'Full Stack Software Engineer',
      company: 'Freelance & Contract Collaborations',
      period: '2023 - 2026',
      impacts: [
        'Architected modern React/Next.js/Postgres architectures for active local and international clients.',
        'Maintained 100% project delivery rate with specialized support in payment checkouts, database schema migrations, and clean state setups.'
      ]
    }
  ]

  const onboardingQuestions = [
    {
      id: 1,
      q: "Can you hit the ground running without hand-holding?",
      quote: "Yes. I don’t wait around for tickets to be perfectly spec'd out.",
      a: "At Swenetix, when requirements are vague, I look at the database schema, study the existing patterns, discuss with teammates, and draft the PR. I'm used to owning features from database migrations to frontend animations, so I can start pushing quality code on day one."
    },
    {
      id: 2,
      q: "How do you handle remote collaboration & time zones?",
      quote: "Proactive async updates and 4+ hours of core team overlap.",
      a: "I adapt my schedule to match team core hours (supporting GMT, CET, or US Eastern overlaps). I communicate clearly on Slack/Teams, document code reviews thoroughly, and commit self-contained, reviewable branches with descriptive handovers."
    },
    {
      id: 3,
      q: "Have you actually shipped code that real users depend on?",
      quote: "Yes, every day. Custom Odoo modules, chatbot engines, and robust MERN applications.",
      a: "At Swenetix Tech PLC and through independent contracts, I specialize in shipping production modules. I understand how to manage database indexes, handle transactional locks in Postgres, design scalable Node/Express backends, and safeguard user traffic so critical sessions remain fully stable under load."
    },
    {
      id: 4,
      q: "Why should we hire you over other full-stack candidates?",
      quote: "I bridge the gap between design and system architecture.",
      a: "Many engineers write working backend logic but struggle with responsive layouts, and many front-end devs struggle with relational DB design. I excel at both: I can write an optimized SQL join query in Drizzle ORM and build a beautiful, fluid animation in Framer Motion without blinking."
    },
    {
      id: 5,
      q: "What happens if a production deployment breaks at 2 AM?",
      quote: "I check the server logs immediately, isolate, and hotfix.",
      a: "I don't panic or play the blame game. I isolate the issue, rollback if needed to restore service immediately, write a post-mortem, and implement the hotfix. During my contract work, I maintained 100% project uptime because I build defensive checks into my APIs from the start."
    },
    {
      id: 6,
      q: "How do you handle feedback during code reviews?",
      quote: "Ego-free. Code reviews are about making the system better.",
      a: "If a senior engineer shows me a more efficient SQL index or a cleaner React hook, I learn it and adapt. If I see a potential issue in a PR, I ask constructive questions rather than criticize, keeping the team's momentum positive."
    },
    {
      id: 7,
      q: "Are you comfortable writing tests or is that an afterthought?",
      quote: "I write tests for core business logic, API validation, and utils.",
      a: "I use Jest/Vitest for unit testing. I focus on high-impact coverage (complex calculations and critical endpoints) rather than chasing a vanity 100% test coverage metric that doesn't actually prevent real regressions."
    },
    {
      id: 8,
      q: "What stack do you work fastest in?",
      quote: "Next.js, TypeScript, and PostgreSQL.",
      a: "It allows me to build fast, type-safe API endpoints, handle queries efficiently, and render highly responsive UI modules with Tailwind CSS and Framer Motion. This is exactly the stack I used to build Swenetix systems."
    },
    {
      id: 9,
      q: "How do you optimize React performance in complex apps?",
      quote: "Strategic splits, local state, and selective memoization.",
      a: "I prevent unnecessary updates by keeping state close to where it's used. I use custom memoization hooks like `useMemo` and `useCallback` when profiling highlights bottlenecks, and structure rendering paths so complex visual layers run at 60fps."
    },
    {
      id: 10,
      q: "What database design patterns do you use for scale?",
      quote: "Normalized schema cores with custom targeted query indexes.",
      a: "I design clean PostgreSQL/MySQL tables with normalized constraints, but denormalize when read performance dictates. I index query paths using compound keys and structure my schema migrations using Drizzle to maintain clean, version-controlled records."
    },
    {
      id: 11,
      q: "How do you approach learning new frameworks under load?",
      quote: "Hands-on prototyping, Docker isolations, and trace testing.",
      a: "I learn by building a minimal prototype. When I need to understand new vector database models or OAuth flows, I start a local Docker container and write simple API scripts to test functionality. Grounding study in raw code ensures true operational mastery."
    },
    {
      id: 12,
      q: "What is your preference for application state management?",
      quote: "Redux Toolkit for complex flows, context for static config.",
      a: "I prefer Redux Toolkit for complex, global transactional states, standard React hooks for component-specific details, and context providers for configurations. This prevents state bloated components and keeps the data flows predictable."
    }
  ]

  const cultureTraits = [
    {
      title: "Strong Owner Mindset",
      desc: "I don't just write code to specifications; I check usability flows, look for API bottlenecks, and optimize layout speeds before deploying."
    },
    {
      title: "Agile & Adaptive",
      desc: "Comfortable navigating shifts in scope. I focus on modular component architectures so layouts can be adjusted or refactored with minimal friction."
    },
    {
      title: "Continuous Learner",
      desc: "Actively studying database performance optimization, low-latency API architectures, and vector search. Haramaya University CGPA: 3.93/4.00."
    }
  ]

  const chapters: { id: OnboardingStep; num: string; label: string; sub: string }[] = [
    { id: 'match', num: '01', label: 'Stack Matching', sub: 'Interactive Stack Verification' },
    { id: 'timeline', num: '02', label: 'Timeline & Impact', sub: 'Production History' },
    { id: 'qa', num: '03', label: 'Dialogue & Q&A', sub: 'Key Screening Rationale' },
    { id: 'traits', num: '04', label: 'Culture & Fit', sub: 'Engineering Philosophy' },
    { id: 'contract', num: '05', label: 'Access Deck', sub: 'Coordinates & Downloads' }
  ]

  const activeQAData = onboardingQuestions.find(q => q.id === activeQA) || onboardingQuestions[0]

  return (
    <div className={`min-h-screen w-full flex flex-col transition-colors duration-500 overflow-hidden font-sans ${
      theme === 'dark' ? 'bg-[#070708] text-zinc-100' : 'bg-[#fcfcfa] text-zinc-900'
    }`}>
      
      {/* ━━━ TOP NAV BAR ━━━ */}
      <header className={`px-8 py-5 flex items-center justify-between border-b shrink-0 ${
        theme === 'dark' ? 'border-zinc-900 bg-zinc-950/20' : 'border-zinc-200/60 bg-zinc-100/10'
      }`}>
        <button
          onClick={onBackToPersona}
          className={`text-[10px] font-mono tracking-widest uppercase transition-colors flex items-center gap-2 cursor-pointer ${
            theme === 'dark' ? 'text-zinc-500 hover:text-zinc-200' : 'text-zinc-400 hover:text-zinc-800'
          }`}
        >
          &larr; Switch profile
        </button>

        <div className="flex items-center gap-6">
          {/* Floating Theme Switcher */}
          <button
            onClick={toggleTheme}
            className={`flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase transition-colors cursor-pointer ${
              theme === 'dark' ? 'text-zinc-500 hover:text-zinc-200' : 'text-zinc-400 hover:text-zinc-800'
            }`}
          >
            {theme === 'dark' ? <Sun size={12} className="text-amber-400" /> : <Moon size={12} className="text-indigo-500" />}
            <span>{theme === 'dark' ? 'LIGHT' : 'DARK'}</span>
          </button>
        </div>
      </header>

      {/* ━━━ DUAL PANEL MAIN AREA ━━━ */}
      <div className="flex-1 flex overflow-hidden w-full relative">
        
        {/* Subtle decorative grid background for the entire canvas */}
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] z-0" />

        {/* 1. LEFT SIDEBAR: Immersive navigation list */}
        <aside className={`w-[320px] shrink-0 border-r p-8 flex flex-col justify-between hidden lg:flex relative z-10 ${
          theme === 'dark' ? 'border-zinc-900 bg-[#09090b]/50' : 'border-zinc-200/50 bg-[#fafafa]/50'
        }`}>
          <div className="space-y-12">
            {/* Minimal Candidate Identity */}
            <div className="space-y-2">
              <h2 className="text-xl font-bold tracking-tight font-display">
                Yonatan Afewerk
              </h2>
              <p className={`text-[10px] font-mono tracking-wider uppercase ${
                theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
              }`}>
                Software Engineer
              </p>
            </div>

            {/* Chapters navigation */}
            <nav className="space-y-6 relative">
              {chapters.map((ch) => {
                const isActive = activeStep === ch.id
                return (
                  <button
                    key={ch.id}
                    onClick={() => setActiveStep(ch.id)}
                    className="w-full text-left group flex items-start gap-4 cursor-pointer focus:outline-none relative py-1"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeChapterIndicator"
                        className="absolute left-[-16px] top-1 bottom-1 w-0.5 bg-blue-500 rounded"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className={`text-xs font-mono tabular-nums pt-0.5 transition-colors relative z-10 ${
                      isActive 
                        ? 'text-blue-500 font-bold' 
                        : theme === 'dark' ? 'text-zinc-700 group-hover:text-zinc-500' : 'text-zinc-300 group-hover:text-zinc-500'
                    }`}>
                      {ch.num}
                    </span>
                    <div className="space-y-0.5 relative z-10">
                      <span className={`block text-xs uppercase tracking-wider font-bold transition-colors ${
                        isActive 
                          ? 'text-blue-500' 
                          : theme === 'dark' ? 'text-zinc-400 group-hover:text-zinc-200' : 'text-zinc-500 group-hover:text-zinc-800'
                      }`}>
                        {ch.label}
                      </span>
                      <span className={`block text-[9px] font-mono transition-colors ${
                        isActive 
                          ? 'text-blue-500/80' 
                          : theme === 'dark' ? 'text-zinc-600 group-hover:text-zinc-400' : 'text-zinc-400 group-hover:text-zinc-600'
                      }`}>
                        {ch.sub}
                      </span>
                    </div>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Direct Coordinate Details */}
          <div className="space-y-4 border-t pt-6 border-zinc-200/20 dark:border-zinc-800/40">
            <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
              <MapPin size={11} className="text-blue-500" />
              <span>Addis Ababa, Ethiopia</span>
            </div>
            <a
              href="https://drive.google.com/file/d/1lFQogpWl42L-UE5DvY_40laKmA_0sXlf/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[9px] font-mono font-bold tracking-widest text-[#C8392B] uppercase hover:underline"
            >
              <Download size={10} />
              <span>Download CV PDF</span>
            </a>
          </div>
        </aside>

        {/* 2. RIGHT PANE: Immersive details display */}
        <main className="flex-1 overflow-y-auto p-8 md:p-16 relative z-10">
          {/* Mobile indicator row */}
          <div className="flex overflow-x-auto pb-4 gap-4 mb-6 lg:hidden scrollbar-none border-b border-zinc-200/10">
            {chapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setActiveStep(ch.id)}
                className={`text-[10px] font-mono tracking-widest uppercase shrink-0 py-1.5 border-b-2 transition-colors cursor-pointer ${
                  activeStep === ch.id 
                    ? 'border-blue-500 text-blue-500 font-bold' 
                    : 'border-transparent text-zinc-400'
                }`}
              >
                {ch.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl w-full mx-auto space-y-12"
            >
              
              {/* ━━━ CHAPTER 1: MATCHING ENGINE ━━━ */}
              {activeStep === 'match' && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-[0.2em] text-blue-500 uppercase font-bold">CHAPTER_01 // IDENTITY MATCH</span>
                    <h1 className="text-3xl md:text-5xl font-extralight tracking-tight leading-none font-display">
                      Targeted Stack <span className="font-semibold italic text-blue-500">Compatibility</span>.
                    </h1>
                    <p className={`text-sm font-light max-w-2xl leading-relaxed ${
                      theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                    }`}>
                      Filter the profile dynamically. Select your organization's core project needs to verify alignment with my experience.
                    </p>
                  </div>

                  {/* Switch buttons */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: 'fullstack' as const, label: 'Full Stack Engineer', sub: 'React / Next.js / Node' },
                      { id: 'backend' as const, label: 'Backend Architect', sub: 'APIs / PostgreSQL / Docker' },
                      { id: 'odoo' as const, label: 'Odoo / ERP Specialist', sub: 'Odoo modules / Python' },
                      { id: 'creative' as const, label: 'Creative Developer', sub: 'WebGL / Framer / Canvas' }
                    ].map((opt) => {
                      const isSel = selectedRole === opt.id
                      return (
                        <button
                          key={opt.id}
                          onClick={() => setSelectedRole(opt.id)}
                          className={`text-left p-5 rounded-xl border transition-all cursor-pointer flex flex-col gap-2 justify-between min-h-[100px] ${
                            isSel 
                              ? 'border-blue-500 bg-blue-500/5 text-blue-500' 
                              : theme === 'dark'
                              ? 'border-zinc-800/80 hover:border-zinc-700 bg-zinc-950/20 text-zinc-400 hover:text-zinc-200'
                              : 'border-zinc-200 hover:border-zinc-300 bg-white text-zinc-500 hover:text-zinc-800'
                          }`}
                        >
                          <span className="text-xs font-bold font-display">{opt.label}</span>
                          <span className="text-[9px] font-mono opacity-80">{opt.sub}</span>
                        </button>
                      )
                    })}
                  </div>

                  {/* Big content card */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedRole}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className={`grid md:grid-cols-3 gap-8 border rounded-2xl p-8 md:p-10 transition-colors ${
                        theme === 'dark' ? 'bg-[#09090b]/40 border-zinc-800/80' : 'bg-white border-zinc-200/80'
                      }`}
                    >
                      <div className="md:col-span-2 space-y-6">
                        <div className="space-y-2">
                          <span className="text-[8px] font-mono tracking-widest text-zinc-400 uppercase">SUMMARY FIT</span>
                          <p className={`text-base font-light leading-relaxed font-display ${
                            theme === 'dark' ? 'text-zinc-200' : 'text-zinc-800'
                          }`}>
                            {roleMatching[selectedRole].summary}
                          </p>
                        </div>

                        <div className="space-y-3">
                          <span className="text-[8px] font-mono tracking-widest text-zinc-400 uppercase">KEY EVIDENCE POINTERS</span>
                          <div className="space-y-2.5">
                            {roleMatching[selectedRole].whyFit.map((fit, idx) => (
                              <div key={idx} className="flex items-start gap-3 text-xs leading-normal">
                                <span className="text-blue-500 mt-0.5 font-bold">↳</span>
                                <span className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}>{fit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className={`border-t md:border-t-0 md:border-l pt-6 md:pt-0 md:pl-8 flex flex-col justify-between gap-8 shrink-0 ${
                        theme === 'dark' ? 'border-zinc-800/60' : 'border-zinc-200/60'
                      }`}>
                        <div className="space-y-2">
                          <span className="block text-[8px] font-mono tracking-widest text-zinc-400 uppercase">VERIFIED MATCH</span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-black font-display tracking-tight text-blue-500 leading-none">
                              <AnimatedNumber value={parseInt(roleMatching[selectedRole].score)} />%
                            </span>
                            <span className="text-[9px] font-mono text-zinc-400 font-bold">FIT RATIO</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <span className="block text-[8px] font-mono tracking-widest text-zinc-400 uppercase">TARGET STACK FRAMEWORKS</span>
                          <div className="flex flex-wrap gap-1.5">
                            {roleMatching[selectedRole].focusSkills.map((sk) => (
                              <span key={sk} className={`text-[9px] font-mono px-2.5 py-1 rounded border ${
                                theme === 'dark'
                                  ? 'bg-zinc-900 border-zinc-800 text-zinc-400'
                                  : 'bg-zinc-50 border-zinc-200 text-zinc-600'
                              }`}>
                                {sk}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}

              {/* ━━━ CHAPTER 2: TIMELINE ━━━ */}
              {activeStep === 'timeline' && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-[0.2em] text-blue-500 uppercase font-bold">CHAPTER_02 // IMPACT LOG</span>
                    <h1 className="text-3xl md:text-5xl font-extralight tracking-tight leading-none font-display">
                      Experience & <span className="font-semibold italic text-blue-500">Business Value</span>.
                    </h1>
                    <p className={`text-sm font-light max-w-2xl leading-relaxed ${
                      theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                    }`}>
                      Detailed verification of past developer roles, codebases maintained, and concrete engineering metrics shipped.
                    </p>
                  </div>

                  <div className={`relative border-l ml-4 pl-8 py-2 space-y-12 ${
                    theme === 'dark' ? 'border-zinc-800/80' : 'border-zinc-200/80'
                  }`}>
                    {workExperience.map((exp, idx) => (
                      <div key={idx} className="relative space-y-3 group">
                        {/* Bullet */}
                        <div className={`absolute -left-[38px] top-1.5 h-4 w-4 rounded-full border-2 flex items-center justify-center transition-colors group-hover:border-blue-500 ${
                          theme === 'dark' ? 'bg-[#070708] border-zinc-800' : 'bg-white border-zinc-300'
                        }`}>
                          <div className={`h-1.5 w-1.5 rounded-full transition-colors group-hover:bg-blue-500 ${
                            theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-300'
                          }`} />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                          <div>
                            <h3 className="text-lg font-bold font-display">{exp.role}</h3>
                            <span className="text-xs text-blue-500 font-mono tracking-wider font-semibold uppercase">{exp.company}</span>
                          </div>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border shrink-0 font-bold ${
                            theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-zinc-50 border-zinc-200 text-zinc-500'
                          }`}>
                            {exp.period}
                          </span>
                        </div>

                        <div className="space-y-2 pl-1">
                          {exp.impacts.map((imp, impIdx) => (
                            <div key={impIdx} className="flex items-start gap-2.5 text-xs font-light leading-relaxed">
                              <span className="text-blue-500 mt-0.5 font-bold">↳</span>
                              <span className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}>{imp}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ━━━ CHAPTER 3: CINEMATIC DIALOGUE Q&A ━━━ */}
              {activeStep === 'qa' && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-[0.2em] text-blue-500 uppercase font-bold">CHAPTER_03 // DIALOGUE</span>
                    <h1 className="text-3xl md:text-5xl font-extralight tracking-tight leading-none font-display">
                      Direct screening <span className="font-semibold italic text-blue-500">Dialogue</span>.
                    </h1>
                    <p className={`text-sm font-light max-w-2xl leading-relaxed ${
                      theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                    }`}>
                      Here are my answers to generally common questions you might want me to answer before we connect.
                    </p>
                  </div>

                  {/* Split Pane Q&A Grid */}
                  <div className="grid md:grid-cols-5 gap-8 items-start">
                    
                    {/* Left Pane: Interactive Question Selector (2/5 size) */}
                    <div className="md:col-span-2 space-y-3">
                      <span className="block text-[8px] font-mono tracking-widest text-zinc-400 uppercase">SELECT INQUIRY</span>
                      
                      <div className="flex flex-col gap-2.5 max-h-[460px] overflow-y-auto pr-1">
                        {onboardingQuestions.map((item) => {
                          const isQAActive = activeQA === item.id
                          return (
                            <button
                              key={item.id}
                              onClick={() => setActiveQA(item.id)}
                              className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 text-xs font-bold font-display ${
                                isQAActive 
                                  ? 'border-blue-500 bg-blue-500/5 text-blue-500' 
                                  : theme === 'dark'
                                  ? 'border-zinc-800/80 hover:border-zinc-700 bg-zinc-950/20 text-zinc-400 hover:text-zinc-200'
                                  : 'border-zinc-200 hover:border-zinc-300 bg-white text-zinc-600 hover:text-zinc-800'
                              }`}
                            >
                              <div className="flex items-start gap-2.5">
                                <span className={`text-[10px] font-mono tabular-nums opacity-60 ${isQAActive ? 'text-blue-500' : ''}`}>0{item.id}.</span>
                                <span>{item.q}</span>
                              </div>
                              <span className="opacity-60">&rarr;</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Right Pane: Large Immersive Cinematic Answer (3/5 size) */}
                    <div className="md:col-span-3">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeQA}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.25 }}
                          className={`border rounded-2xl p-8 space-y-6 ${
                            theme === 'dark' ? 'bg-[#09090b]/40 border-zinc-800/80' : 'bg-white border-zinc-200/80'
                          }`}
                        >
                          <div className="space-y-1">
                            <span className="text-[8px] font-mono tracking-widest text-zinc-400 uppercase">QUESTION 0{activeQAData.id} ANSWER</span>
                            <h3 className="text-lg font-bold font-display text-blue-500 leading-tight">
                              {activeQAData.q}
                            </h3>
                          </div>

                          {/* Large Elegant Quote */}
                          <div className={`pl-4 border-l-2 font-display italic text-base leading-relaxed ${
                            theme === 'dark' ? 'border-zinc-700 text-zinc-200' : 'border-zinc-300 text-zinc-700'
                          }`}>
                            "{activeQAData.quote}"
                          </div>

                          {/* Rationale explanation */}
                          <div className="space-y-3">
                            <span className="block text-[8px] font-mono tracking-widest text-zinc-400 uppercase">FURTHER RATIONALE</span>
                            <p className={`text-xs font-light leading-relaxed ${
                              theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                            }`}>
                              {activeQAData.a}
                            </p>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                  </div>
                </div>
              )}

              {/* ━━━ CHAPTER 4: CULTURE & FIT ━━━ */}
              {activeStep === 'traits' && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-[0.2em] text-blue-500 uppercase font-bold">CHAPTER_04 // PHENOTYPE</span>
                    <h1 className="text-3xl md:text-5xl font-extralight tracking-tight leading-none font-display">
                      Engineering & <span className="font-semibold italic text-blue-500">Product Mindset</span>.
                    </h1>
                    <p className={`text-sm font-light max-w-2xl leading-relaxed ${
                      theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                    }`}>
                      My perspective on developer alignment, collaboration habits, and core academic principles.
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    {cultureTraits.map((t, idx) => (
                      <div key={idx} className={`p-6 border rounded-xl flex flex-col gap-4 ${
                        theme === 'dark' ? 'bg-[#09090b]/40 border-zinc-800/80' : 'bg-white border-zinc-200/80'
                      }`}>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-emerald-500" />
                          <h4 className="text-xs font-bold uppercase tracking-wider font-mono">{t.title}</h4>
                        </div>
                        <p className={`text-xs font-light leading-relaxed ${
                          theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                        }`}>
                          {t.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Academic card */}
                  <div className={`p-6 border rounded-2xl flex items-center justify-between gap-6 flex-wrap ${
                    theme === 'dark' ? 'bg-gradient-to-r from-zinc-950 to-zinc-900 border-zinc-800' : 'bg-gradient-to-r from-zinc-50 to-zinc-100 border-zinc-200'
                  }`}>
                    <div className="space-y-1.5">
                      <span className="text-[8px] font-mono tracking-widest text-zinc-400 uppercase font-bold">ACADEMIC BACKGROUND</span>
                      <h4 className="text-xs font-bold font-display">B.S. Software Engineering at Haramaya University</h4>
                      <p className={`text-xs font-light max-w-xl ${
                        theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                      }`}>
                        Dedicated study in computer systems, compilers, backend transaction scopes, and data indexing. Expected completion Jan 2026.
                      </p>
                    </div>
                    <div className={`border px-5 py-2.5 rounded-xl text-center shrink-0 ${
                      theme === 'dark' ? 'bg-[#070708] border-zinc-800' : 'bg-white border-zinc-200'
                    }`}>
                      <span className="block text-[8px] font-mono text-zinc-400 uppercase tracking-widest">CUMULATIVE CGPA</span>
                      <span className="text-xl font-bold font-mono text-blue-500 tabular-nums">
                        <AnimatedNumber value={3.93} decimals={2} /> / 4.00
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ━━━ CHAPTER 5: ACCESS DECK ━━━ */}
              {activeStep === 'contract' && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-[0.2em] text-blue-500 uppercase font-bold">CHAPTER_05 // COORDINATE DECK</span>
                    <h1 className="text-3xl md:text-5xl font-extralight tracking-tight leading-none font-display">
                      Direct Coordinates & <span className="font-semibold italic text-blue-500">Access</span>.
                    </h1>
                    <p className={`text-sm font-light max-w-2xl leading-relaxed ${
                      theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                    }`}>
                      Copy mailbox coordinates, browse live repositories, download resume PDFs, or connect via professional accounts.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    
                    {/* Mailbox */}
                    <div className={`p-6 border rounded-xl flex flex-col justify-between min-h-[160px] ${
                      theme === 'dark' ? 'bg-[#09090b]/40 border-zinc-800/80' : 'bg-white border-zinc-200/80'
                    }`}>
                      <div className="space-y-1">
                        <span className="text-[8px] font-mono tracking-widest text-zinc-400 uppercase">DIRECT MAIL</span>
                        <h4 className="text-xs font-bold font-mono break-all select-all">
                          yonatanafewerk@gmail.com
                        </h4>
                      </div>
                      <button
                        onClick={handleCopyEmail}
                        className="w-full py-2 bg-blue-600 text-white rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-blue-500 transition-colors cursor-pointer text-center"
                      >
                        {copiedEmail ? 'Copied to Clipboard!' : 'Copy Email Address'}
                      </button>
                    </div>

                    {/* LinkedIn */}
                    <div className={`p-6 border rounded-xl flex flex-col justify-between min-h-[160px] ${
                      theme === 'dark' ? 'bg-[#09090b]/40 border-zinc-800/80' : 'bg-white border-zinc-200/80'
                    }`}>
                      <div className="space-y-1">
                        <span className="text-[8px] font-mono tracking-widest text-zinc-400 uppercase">PROFESSIONAL</span>
                        <h4 className="text-xs font-bold font-display">
                          LinkedIn Directory
                        </h4>
                      </div>
                      <a
                        href="https://www.linkedin.com/in/yonatan-afewerk/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full py-2 border rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider text-center block transition-colors ${
                          theme === 'dark' 
                            ? 'border-zinc-800 text-zinc-300 hover:bg-zinc-900' 
                            : 'border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                        }`}
                      >
                        Open Profile &rarr;
                      </a>
                    </div>

                    {/* GitHub */}
                    <div className={`p-6 border rounded-xl flex flex-col justify-between min-h-[160px] ${
                      theme === 'dark' ? 'bg-[#09090b]/40 border-zinc-800/80' : 'bg-white border-zinc-200/80'
                    }`}>
                      <div className="space-y-1">
                        <span className="text-[8px] font-mono tracking-widest text-zinc-400 uppercase">SOURCE REPOSITORIES</span>
                        <h4 className="text-xs font-bold font-display">
                          GitHub Index
                        </h4>
                      </div>
                      <a
                        href="https://github.com/Yehonatal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full py-2 border rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider text-center block transition-colors ${
                          theme === 'dark' 
                            ? 'border-zinc-800 text-zinc-300 hover:bg-zinc-900' 
                            : 'border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                        }`}
                      >
                        Open Index &rarr;
                      </a>
                    </div>

                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </main>

      </div>
    </div>
  )
}

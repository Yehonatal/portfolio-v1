import { useState } from 'react'
import { FileText, Download, Mail, Linkedin, Github, Phone, MapPin, Award, BookOpen, Calendar, Briefcase, ArrowUpRight, CheckCircle } from 'lucide-react'
import Education from './Education'

type RecruiterDashboardProps = {
  onBackToPersona: () => void
}

const RecruiterDashboard = ({ onBackToPersona }: RecruiterDashboardProps) => {
  const [copiedEmail, setCopiedEmail] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('yonatanafewerk@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const workExperience = [
    {
      role: 'Full Stack Software Engineer',
      company: 'Swenetix Tech PLC (formerly Addis Software PLC)',
      period: 'Mar 2026 - Present (Full-Time)',
      description: 'Contributed to a production MERN-stack platform, developed modular Odoo backend/frontend themes and modules, optimized performance using Redux-Saga, and integrated a RAG chatbot using vector search and multi-provider LLMs.'
    },
    {
      role: 'Software Engineering Apprentice',
      company: 'A2SV (Africa to Silicon Valley)',
      period: 'Apprenticeship',
      description: 'Completed an intensive software engineering apprenticeship focused on data structures, algorithms, and clean code practices.'
    },
    {
      role: 'Full Stack Software Engineer',
      company: 'Freelance & Contract Collaborations',
      period: '2023 - 2026',
      description: 'Architecting high-performance web products, scalable Node.js server architectures, and clean database integrations. Led development of multiple production client applications using React, Next.js, and PostgreSQL.'
    }
  ]

  const technicalStrengths = [
    { cat: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'SQL', 'HTML/CSS'] },
    { cat: 'Frameworks', items: ['React.js', 'Next.js', 'Express', 'TailwindCSS', 'shadcn/ui', 'Redux Toolkit'] },
    { cat: 'Databases & ORMs', items: ['PostgreSQL', 'MongoDB', 'Drizzle ORM', 'Turso', 'Supabase'] },
    { cat: 'Tools & DevOps', items: ['Git/GitHub Actions', 'Docker', 'Vite', 'Webpack', 'Postman'] }
  ]

  return (
    <div className="w-full max-w-5xl mx-auto bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl shadow-sm overflow-hidden text-[var(--color-foreground)] select-none">
      {/* Top Banner Action */}
      <div className="bg-[var(--color-secondary)]/50 border-b border-[var(--color-border)] px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={onBackToPersona}
          className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors cursor-pointer flex items-center gap-1.5"
        >
          &larr; Switch profile
        </button>
        <div className="flex items-center gap-3">
          <a
            href="https://drive.google.com/file/d/1lFQogpWl42L-UE5DvY_40laKmA_0sXlf/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            <Download size={13} />
            Download Resume
          </a>
        </div>
      </div>

      <div className="p-8 sm:p-12 space-y-12">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 pb-8 border-b border-[var(--color-border)]/50">
          <div className="space-y-3">
            <h1 className="text-4xl font-extrabold tracking-tight font-display text-[var(--color-foreground)]">
              Yonatan Afewerk
            </h1>
            <h2 className="text-lg font-medium text-[var(--color-primary)]">
              Software Engineer
            </h2>
            <div className="flex flex-wrap gap-4 text-xs text-[var(--color-muted-foreground)] pt-1">
              <span className="flex items-center gap-1">
                <MapPin size={13} /> Addis Ababa, Ethiopia
              </span>
              <span className="flex items-center gap-1">
                <Briefcase size={13} /> Available for contract & contracts
              </span>
            </div>
          </div>

          {/* Quick contact card */}
          <div className="w-full md:w-auto bg-[var(--color-secondary)]/30 border border-[var(--color-border)]/50 rounded-xl p-4 space-y-3 text-xs shrink-0">
            <span className="block text-[8px] font-mono font-bold uppercase tracking-widest text-[var(--color-muted-foreground)]">
              Direct Contact
            </span>
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-6">
                <span className="text-[var(--color-muted-foreground)]">Email:</span>
                <button
                  onClick={handleCopyEmail}
                  className="font-bold hover:text-[var(--color-primary)] transition-colors cursor-pointer"
                >
                  {copiedEmail ? 'Copied!' : 'yonatanafewerk@gmail.com'}
                </button>
              </div>
              <div className="flex items-center justify-between gap-6">
                <span className="text-[var(--color-muted-foreground)]">LinkedIn:</span>
                <a
                  href="https://www.linkedin.com/in/yonatan-afewerk/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold hover:text-[var(--color-primary)] transition-colors flex items-center gap-0.5"
                >
                  view_profile <ArrowUpRight size={10} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-muted-foreground)] font-mono">
            // Executive Summary
          </h3>
          <p className="text-base text-[var(--color-muted-foreground)] font-light leading-relaxed max-w-4xl">
            Passionate and detail-oriented Software Engineer specializing in scalable full-stack development. Experienced in building performant, low-latency APIs, database schemas, and modular client-side single-page applications. Committed to clean code design, automated pipelines, and fast delivery of product features.
          </p>
        </div>

        {/* Work Experience Timeline */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-muted-foreground)] font-mono">
            // Professional History
          </h3>
          <div className="space-y-8 pl-4 border-l border-[var(--color-border)]">
            {workExperience.map((exp, idx) => (
              <div key={idx} className="relative space-y-2">
                {/* Timeline bullet indicator */}
                <div className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--color-primary)] border-2 border-[var(--color-card)]" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="text-base font-bold text-[var(--color-foreground)]">
                    {exp.role} <span className="font-light text-[var(--color-muted-foreground)]">{exp.company.toLowerCase().includes('freelance') ? '—' : 'at'}</span> <span className="text-[var(--color-primary)]">{exp.company}</span>
                  </h4>
                  <span className="text-xs font-semibold text-[var(--color-muted-foreground)] whitespace-nowrap bg-[var(--color-secondary)] px-2.5 py-0.5 rounded-full">
                    {exp.period}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-muted-foreground)] font-light leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Competencies Grid */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-muted-foreground)] font-mono">
            // Key Skill Matrix
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {technicalStrengths.map((strength, idx) => (
              <div key={idx} className="space-y-2 bg-[var(--color-secondary)]/20 p-4 border border-[var(--color-border)]/50 rounded-lg">
                <span className="block text-xs font-bold text-[var(--color-foreground)] border-b border-[var(--color-border)]/50 pb-1.5">
                  {strength.cat}
                </span>
                <div className="flex flex-wrap gap-1 pt-1">
                  {strength.items.map((item) => (
                    <span key={item} className="text-[10px] bg-[var(--color-secondary)] text-[var(--color-muted-foreground)] px-2.5 py-1 rounded-md">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Credentials */}
        <div className="grid md:grid-cols-2 gap-8 border-t border-[var(--color-border)]/50 pt-8">
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-muted-foreground)] font-mono">
              // Education
            </h3>
            <div className="space-y-3 bg-[var(--color-secondary)]/10 p-5 border border-[var(--color-border)]/50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--color-foreground)]">B.S. in Software Engineering</span>
                <span className="text-[10px] text-[var(--color-muted-foreground)] font-bold uppercase">Expected Jan 2026</span>
              </div>
              <p className="text-xs text-[var(--color-muted-foreground)] leading-relaxed">
                Haramaya University &bull; Current CGPA: 3.93
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-muted-foreground)] font-mono">
              // Professional Traits
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Agile/Scrum mindset',
                'Fast learning curve',
                'Clear developer log details',
                'Clean MVC pattern architecture',
                'Excellent communicator',
                'Dedicated code delivery'
              ].map((trait, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-[var(--color-muted-foreground)]">
                  <CheckCircle size={12} className="text-[var(--color-primary)] shrink-0" />
                  <span>{trait}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecruiterDashboard

import type { Project } from '@/types/types'
import { motion } from 'framer-motion'
import { ArrowUpRight, Github, Globe } from 'lucide-react'

type ProjectCardProps = {
  project: Project
  onSelect: (id: string) => void
  index: number
}

const ProjectCard = ({ project, onSelect, index }: ProjectCardProps) => {
  if (!project) return null

  const {
    id,
    title,
    description,
    images,
    liveLink,
    repoLink,
    category,
    techUsed,
  } = project

  const isEven = index % 2 === 0
  const formattedIndex = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        type: 'spring',
        stiffness: 80,
        damping: 14,
        delay: index * 0.1 
      }}
      className={`flex flex-col ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      } gap-8 md:gap-12 items-center py-10 border-b border-dashed border-[var(--color-border)]/30 group`}
    >
      {/* Text Info Column */}
      <div className="flex-1 space-y-4 text-left w-full">
        <div className="space-y-1.5">
          {/* Index & Category tag */}
          <div className="flex items-center gap-3 text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--color-muted-foreground)]">
            <span className="text-[var(--color-primary)] font-bold">
              [{formattedIndex}]
            </span>
            <span>/</span>
            <span className="tracking-[0.2em]">{category}</span>
          </div>

          {/* Project Title */}
          <h3 
            onClick={() => onSelect(id)}
            className="text-2xl md:text-3xl font-black font-mono tracking-tight text-[var(--color-foreground)] cursor-pointer hover:text-[var(--color-primary)] transition-colors leading-none"
          >
            {title}
          </h3>
        </div>

        {/* Short Description */}
        <p className="text-xs md:text-sm text-[var(--color-muted-foreground)] font-mono leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {techUsed?.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="text-[9px] font-mono uppercase tracking-[0.05em] text-[var(--color-muted-foreground)] border border-[var(--color-border)]/50 px-2 py-0.5"
            >
              #{tech.toLowerCase().replace(/\s+/g, '-')}
            </span>
          ))}
        </div>

        {/* CTAs / External links */}
        <div className="flex items-center gap-6 pt-3 font-mono">
          <button
            onClick={() => onSelect(id)}
            className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition-colors cursor-pointer flex items-center gap-1.5 focus:outline-none"
          >
            inspect_details() <ArrowUpRight size={12} />
          </button>

          {repoLink && (
            <a
              href={repoLink}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"
            >
              <Github size={12} /> src_code
            </a>
          )}

          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"
            >
              <Globe size={12} /> live_deployment
            </a>
          )}
        </div>
      </div>

      {/* Optional image display in card */}
      {images && images.length > 0 && (
        <div className="w-full md:w-60 h-40 shrink-0 overflow-hidden relative border border-[var(--color-border)] group-hover:border-[var(--color-primary)] transition-colors">
          <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay pointer-events-none" />
          <img
            src={images[0]}
            alt={title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
          />
        </div>
      )}
    </motion.div>
  )
}

export default ProjectCard

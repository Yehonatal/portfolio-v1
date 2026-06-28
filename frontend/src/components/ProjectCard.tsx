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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      } gap-8 md:gap-12 items-center py-12 border-b border-[var(--color-border)]/15`}
    >
      {/* Text Info Column */}
      <div className="flex-1 space-y-5 text-left w-full">
        <div className="space-y-2">
          {/* Index & Category tag */}
          <div className="flex items-center gap-3 text-[10px] font-mono font-bold uppercase tracking-wider">
            <span className="text-[var(--color-primary)] font-black text-xs md:text-sm">
              {formattedIndex}.
            </span>
            <span className="text-[var(--color-muted-foreground)] tracking-[0.2em]">
              {category}
            </span>
          </div>

          {/* Project Title */}
          <h3 
            onClick={() => onSelect(id)}
            className="text-2xl md:text-3.5xl font-black tracking-tight text-[var(--color-foreground)] cursor-pointer hover:text-[var(--color-primary)] transition-colors leading-none font-display"
          >
            {title}
          </h3>
        </div>

        {/* Short Description */}
        <p className="text-sm md:text-base text-[var(--color-muted-foreground)] font-light leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {techUsed?.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="text-[9px] font-mono font-semibold uppercase tracking-[0.05em] text-[var(--color-muted-foreground)] bg-[var(--color-secondary)]/50 px-2.5 py-1 rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTAs / External links */}
        <div className="flex items-center gap-6 pt-3">
          <button
            onClick={() => onSelect(id)}
            className="text-xs font-bold uppercase tracking-widest text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition-colors cursor-pointer flex items-center gap-1.5 focus:outline-none"
          >
            Explore Project <ArrowUpRight size={14} />
          </button>

          {repoLink && (
            <a
              href={repoLink}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors text-xs font-bold uppercase tracking-widest flex items-center gap-1"
            >
              <Github size={13} /> Code
            </a>
          )}

          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors text-xs font-bold uppercase tracking-widest flex items-center gap-1"
            >
              <Globe size={13} /> Live
            </a>
          )}
        </div>
      </div>

      {/* Image Showcase Column */}
      <div 
        onClick={() => onSelect(id)}
        className="flex-1 w-full aspect-[16/10] bg-[var(--color-secondary)]/30 rounded-2xl overflow-hidden cursor-pointer group"
      >
        <img
          src={images[0]}
          alt={title}
          className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700 ease-out"
        />
      </div>
    </motion.div>
  )
}

export default ProjectCard

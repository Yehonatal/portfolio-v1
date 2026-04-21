import type { Project } from '@/types/types'
import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Github, Globe, ArrowUpRight } from 'lucide-react'

type ProjectCardProps = {
  project: Project
  setSelectedCategory: (category: string) => void
  setCurrentPage: (currentPage: number) => void
}

const ProjectCard = ({
  project,
}: ProjectCardProps) => {
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="group relative flex flex-col h-full bg-[var(--color-background)] border-b border-[var(--color-border)] pb-6 hover:bg-[var(--color-secondary)] transition-colors duration-500"
    >
      <div className="flex justify-between items-center mb-4 border-b border-[var(--color-border)] pb-3 px-4 pt-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]">
          {category}
        </span>
        <span className="text-[10px] font-serif italic text-[var(--color-muted-foreground)]">
          Ref: #{id.slice(0, 4)}
        </span>
      </div>

      <div className="px-4">
        <Link
          to="/projects/$projectsId"
          params={{ projectsId: id }}
          className="block relative aspect-[4/3] overflow-hidden border border-[var(--color-border)] mb-6 grayscale-[0.8] group-hover:grayscale-0 transition-all duration-700"
        >
          <img
            src={images[0]}
            alt={title}
            className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
          />
        </Link>

        <div className="flex flex-col flex-grow">
          <div className="flex justify-between items-start gap-4 mb-3">
            <Link
              to="/projects/$projectsId"
              params={{ projectsId: id }}
              className="group/title flex-1"
            >
              <h3 className="text-2xl font-serif tracking-tight leading-tight group-hover/title:text-[var(--color-muted-foreground)] transition-colors">
                {title}
              </h3>
            </Link>
            <div className="flex gap-2 pt-1">
              {repoLink && (
                <a
                  href={repoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors"
                >
                  <Github size={16} strokeWidth={1.5} />
                </a>
              )}
              {liveLink && (
                <a
                  href={liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors"
                >
                  <Globe size={16} strokeWidth={1.5} />
                </a>
              )}
            </div>
          </div>

          <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)] font-light line-clamp-3 mb-6">
            {description}
          </p>

          <div className="mt-auto pt-4 border-t border-[var(--color-border)] flex justify-between items-center">
            <div className="flex flex-wrap gap-2">
              {techUsed?.slice(0, 2).map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--color-foreground)]"
                >
                  {tech}
                </span>
              ))}
            </div>
            <Link
              to="/projects/$projectsId"
              params={{ projectsId: id }}
              className="text-[10px] font-medium uppercase tracking-[0.2em] flex items-center gap-1 text-[var(--color-muted-foreground)] group-hover:text-[var(--color-foreground)] transition-colors"
            >
              Read <ArrowUpRight size={14} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard

import type { Project } from '@/types/types'
import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Github, Globe } from 'lucide-react'

type ProjectCardProps = {
  project: Project
  setSelectedCategory: (category: string) => void
  setCurrentPage: (currentPage: number) => void
}

const ProjectCard = ({
  project,
  setCurrentPage,
  setSelectedCategory,
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
    date,
    techUsed,
  } = project

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="group relative flex flex-col h-full bg-transparent overflow-hidden"
    >
      <Link
        to="/projects/$projectsId"
        params={{ projectsId: id }}
        className="relative aspect-[16/11] overflow-hidden rounded-[2rem] bg-[var(--color-secondary)]/5 border border-[var(--color-border)]"
      >
        <img
          src={images[0]}
          alt={title}
          className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-105 group-hover:brightness-110"
        />

        <div className="absolute top-6 left-6">
          <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-md text-black dark:text-white text-[8px] font-black uppercase tracking-[0.2em] shadow-sm">
            {category}
          </span>
        </div>
      </Link>

      <div className="flex flex-col flex-1 pt-10 px-2">
        <div className="flex justify-between items-start mb-6">
          <Link
            to="/projects/$projectsId"
            params={{ projectsId: id }}
            className="flex-1 group/title"
          >
            <h3 className="text-2xl font-black text-[var(--color-foreground)] tracking-tighter leading-tight group-hover:text-[var(--color-primary)] transition-colors">
              {title}
            </h3>
          </Link>
          <div className="flex gap-5 ml-4">
            {repoLink && (
              <a
                href={repoLink}
                target="_blank"
                rel="noreferrer"
                className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-all duration-300 hover:scale-110"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noreferrer"
                className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-all duration-300 hover:scale-110"
              >
                <Globe className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <p className="text-[13px] text-[var(--color-muted-foreground)] leading-relaxed line-clamp-2 mb-8 font-medium">
          {description}
        </p>

        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {techUsed?.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard

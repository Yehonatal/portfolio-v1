import Badge from '@/ui/badge'
import type { Project } from '@/types/types'
import { Link } from '@tanstack/react-router'

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

  const { id, title, description, img, liveLink, category, date } = project

  return (
    <div
      className="bg-[var(--color-card)] border-2 border-b-4
        border-[var(--color-accent)]
     rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col"
    >
      <Link to="/projects/$projectsId" params={{ projectsId: id }}>
        <div className="w-full h-30 overflow-hidden">
          <img
            src={img}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-4">
        <div className="flex justify-between items-center mb-2">
          <button
            className="cursor-pointer"
            onClick={() => {
              setSelectedCategory(category)
              setCurrentPage(1)
            }}
          >
            <Badge className="text-xs uppercase tracking-wider">
              {category}
            </Badge>
          </button>
          <span className="text-xs text-gray-500">{date}</span>
        </div>

        <Link
          to="/projects/$projectsId"
          params={{ projectsId: id }}
          className="flex-1"
        >
          <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-1">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {description}
          </p>
        </Link>

        <a
          href={liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-block py-2 text-sm font-medium text-[var(--color-foreground)] border-t border-[var(--color-border)] hover:text-[var(--color-primary)] transition-colors"
        >
          Live Project →
        </a>
      </div>
    </div>
  )
}

export default ProjectCard

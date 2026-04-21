import ProjectCard from '@/components/ProjectCard'
import type { Project } from '@/types/types'
import { useState, useMemo } from 'react'
import RenderPagination from '@/ui/pagination'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'

const ProjectList = ({ projects }: { projects: Project[] }) => {
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 7

  const categories = useMemo(
    () => ['ALL', ...new Set(projects.map((p) => p.category))],
    [projects],
  )

  const filteredProjects = useMemo(
    () =>
      selectedCategory === 'ALL'
        ? projects
        : projects.filter((p) => p.category === selectedCategory),
    [projects, selectedCategory],
  )

  const featuredProject = useMemo(
    () => projects.find((p) => p.featured),
    [projects],
  )

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)
  const indexOfLast = currentPage * projectsPerPage
  const indexOfFirst = indexOfLast - projectsPerPage
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast)

  return (
    <section className="py-16 max-w-6xl mx-auto px-6">
      <header className="mb-16 border-b border-[var(--color-border)] pb-10 text-center">
        <div className="space-y-6 flex flex-col items-center">
          <span className="inline-block text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--color-muted-foreground)]">
            The Portfolio
          </span>
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight leading-none text-[var(--color-foreground)]">
            Selected Works
          </h1>
        </div>
        <p className="text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed text-[var(--color-muted-foreground)] mt-8">
          A curated collection of digital experiences, from AI systems to
          immersive web applications. Each project is a journey in
          problem-solving.
        </p>

        <div className="flex flex-col items-center gap-6 pt-12">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--color-muted-foreground)] border-b border-[var(--color-border)] pb-2">
            Section Index
          </span>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedCategory(category)
                  setCurrentPage(1)
                }}
                className={`text-[10px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 pb-1 border-b
                ${
                  selectedCategory === category
                    ? 'border-[var(--color-foreground)] text-[var(--color-foreground)]'
                    : 'border-transparent text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </header>

      {selectedCategory === 'ALL' && currentPage === 1 && featuredProject && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 group relative bg-[var(--color-background)] border-b border-[var(--color-border)] pb-10"
        >
          <Link
            to="/projects/$projectsId"
            params={{ projectsId: featuredProject.id }}
            className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          >
            <div className="relative aspect-[4/3] lg:aspect-[3/4] border border-[var(--color-border)] overflow-hidden bg-[var(--color-secondary)]">
              <img
                src={featuredProject.images[0]}
                alt={featuredProject.title}
                className="w-full h-full object-cover filter grayscale-[0.8] group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute top-0 left-0 bg-[var(--color-background)] px-4 py-2 border-r border-b border-[var(--color-border)]">
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-foreground)]">
                  Feature
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="space-y-6">
                <h3 className="text-4xl md:text-6xl font-serif tracking-tight leading-tight text-[var(--color-foreground)] group-hover:text-[var(--color-muted-foreground)] transition-colors">
                  {featuredProject.title}
                </h3>
                <p className="text-sm leading-relaxed font-light text-[var(--color-muted-foreground)]">
                  {featuredProject.description}
                </p>
                <div className="flex flex-wrap gap-3 pt-4">
                  {featuredProject.techUsed?.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--color-foreground)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          layout
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {currentProjects
            .filter(
              (p) =>
                !(
                  selectedCategory === 'ALL' &&
                  currentPage === 1 &&
                  p.id === featuredProject?.id
                ),
            )
            .map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5 }}
                className="h-full"
              >
                <ProjectCard
                  project={project}
                  setSelectedCategory={setSelectedCategory}
                  setCurrentPage={setCurrentPage}
                />
              </motion.div>
            ))}
        </motion.div>
      </AnimatePresence>

      {totalPages > 1 && (
        <div className="mt-24 flex justify-center pb-12">
          <RenderPagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </section>
  )
}

export default ProjectList

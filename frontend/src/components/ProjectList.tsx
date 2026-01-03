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
    <section className="py-20 md:py-40 max-w-6xl mx-auto px-6">
      <header className="mb-20 md:mb-40 space-y-10">
        <div className="space-y-6">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--color-primary)]">
            Portfolio
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-[var(--color-foreground)] leading-[0.85]">
            Selected <br />
            <span className="font-serif italic font-light">Works</span>
          </h1>
        </div>
        <p className="text-sm md:text-lg text-[var(--color-muted-foreground)] max-w-xl leading-relaxed font-medium">
          A curated collection of digital experiences, from AI systems to
          immersive web applications. Each project is a journey in
          problem-solving.
        </p>

        <div className="flex flex-wrap gap-4 pt-10">
          {categories.map((category, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedCategory(category)
                setCurrentPage(1)
              }}
              className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 border
                ${
                  selectedCategory === category
                    ? 'bg-[var(--color-foreground)] text-[var(--color-background)] border-[var(--color-foreground)]'
                    : 'bg-transparent text-[var(--color-muted-foreground)] border-[var(--color-border)] hover:border-[var(--color-foreground)] hover:text-[var(--color-foreground)]'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </header>

      {selectedCategory === 'ALL' && currentPage === 1 && featuredProject && (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          className="mb-20 md:mb-80 group"
        >
          <Link
            to="/projects/$projectsId"
            params={{ projectsId: featuredProject.id }}
            className="grid lg:grid-cols-[1.5fr_0.5fr] gap-10 lg:gap-40 items-center"
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-[var(--color-secondary)]/5 shadow-[0_40px_100px_rgba(0,0,0,0.08)] border border-[var(--color-border)]">
              <img
                src={featuredProject.images[0]}
                alt={featuredProject.title}
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 group-hover:brightness-110"
              />
            </div>
            <div className="space-y-8 md:space-y-12">
              <div className="space-y-6 md:space-y-8">
                <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[var(--color-primary)]">
                  Featured Project (My Favorite)
                </span>
                <h3 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.9]">
                  {featuredProject.title}
                </h3>
                <p className="text-[14px] text-gray-500 leading-relaxed font-medium">
                  {featuredProject.description}
                </p>
              </div>
              <div className="flex items-center gap-10 group/link">
                <span className="text-[11px] font-black uppercase tracking-[0.4em]">
                  Explore Project
                </span>
                <div className="h-[1px] w-20 bg-[var(--color-foreground)] group-hover/link:w-32 group-hover/link:bg-[var(--color-primary)] transition-all duration-700" />
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          layout
          className="grid gap-x-16 gap-y-32 sm:grid-cols-2 lg:grid-cols-3"
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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
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
        <div className="mt-24 flex justify-center">
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

import ProjectCard from '@/components/ProjectCard'
import type { Project } from '@/types/types'
import { useState } from 'react'
import RenderPagination from '@/ui/pagination'
import Badge from '@/ui/badge'
import { AnimatePresence, motion } from 'framer-motion'

const ProjectList = ({ projects }: { projects: Project[] }) => {
  const [selectedCategory, setSelectedCategory] = useState('ALL')

  const categories = ['ALL', ...new Set(projects.map((p) => p.category))]

  const filteredProjects =
    selectedCategory === 'ALL'
      ? projects
      : projects.filter((p) => p.category === selectedCategory)

  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 6
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)
  const indexOfLast = currentPage * projectsPerPage
  const indexOfFirst = indexOfLast - projectsPerPage
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast)

  return (
    <section className="py-4 max-w-6xl mx-auto my-2">
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((category, idx) => (
          <button
            key={idx}
            data-aos="fade-zoom-in"
            data-aos-delay={`${idx * 200}`}
            onClick={() => {
              setSelectedCategory(category)
              setCurrentPage(1)
            }}
            className="cursor-pointer"
          >
            <Badge>{category}</Badge>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:min-h-[700px]"
        >
          {currentProjects.map((project) => (
            <motion.div layout key={project.id}>
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
        <div className="mt-6">
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

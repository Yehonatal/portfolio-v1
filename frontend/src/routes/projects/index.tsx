import ProjectList from '@/components/ProjectList'
import type { Project } from '@/types/types'
import projectsData from '@/data/projects.json'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/')({
  component: RouteComponent,
})

export function meta() {
  return [{ title: 'Show Me | My Projects' }]
}

export function loader(): { projects: Project[] } {
  const projects: Project[] = projectsData.map((item) => ({
    id: item.id,
    img: item.img,
    title: item.title,
    description: item.description,
    techUsed: item.techUsed,
    liveLink: item.liveLink,
    repoLink: item.repoLink,
    category: item.category,
    featured: item.featured,
    date: item.date || '',
    url: item.liveLink,
  }))
  return { projects }
}

function RouteComponent() {
  const { projects } = loader()

  return (
    <section className="max-w-5xl mx-auto lg:px-0 px-6 md:px-4 bg-[var(--color-background)]">
      <div className="mt-6">
        <p className="text-gray-700 text-base leading-relaxed mb-2">
          These are some of the projects I have worked on.
        </p>
      </div>

      <ProjectList projects={projects} />
    </section>
  )
}

export default RouteComponent

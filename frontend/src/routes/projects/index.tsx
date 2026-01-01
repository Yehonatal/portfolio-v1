import ProjectList from '@/components/ProjectList'
import OtherProjects from '@/components/OtherProjects'
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
    images: item.images,
    title: item.title,
    description: item.description,
    techUsed: item.techUsed,
    liveLink: item.liveLink,
    repoLink: item.repoLink,
    category: item.category,
    featured: item.featured,
    date: item.date || '',
  }))
  return { projects }
}

function RouteComponent() {
  const { projects } = loader()

  return (
    <div className="bg-[var(--color-background)]">
      <ProjectList projects={projects} />

      <OtherProjects />
    </div>
  )
}

export default RouteComponent

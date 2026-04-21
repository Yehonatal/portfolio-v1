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
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] font-sans selection:bg-[var(--color-foreground)] selection:text-[var(--color-background)] pb-24 border-x border-[var(--color-border)] max-w-6xl mx-auto">
      
      <header className="pt-24 pb-16 px-6 lg:px-10 border-b border-[var(--color-border)]">
        <h1 className="text-5xl md:text-8xl font-serif tracking-tight leading-none mb-8 text-[var(--color-foreground)]">
          The Projects
        </h1>
        <p className="text-sm md:text-base font-light max-w-2xl border-l border-[var(--color-border)] pl-6 text-[var(--color-muted-foreground)]">
          A definitive collection of notable works, structural architectures,
          and digital experiments from the archives.
        </p>
      </header>

      <div className="px-6 lg:px-10 py-16 border-b border-[var(--color-border)]">
        <div className="flex justify-between items-end border-b border-[var(--color-border)] pb-4 mb-12">
          <h2 className="text-3xl font-serif tracking-tight text-[var(--color-foreground)]">
            Featured Stories
          </h2>
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-muted-foreground)] hidden md:inline-block">
            Vol. I
          </span>
        </div>

        <ProjectList projects={projects} />
      </div>

      <div className="px-6 lg:px-10 py-16">
        <div className="flex justify-between items-end border-b border-[var(--color-border)] pb-4 mb-12">
          <h2 className="text-3xl font-serif tracking-tight text-[var(--color-foreground)]">
            Other Endeavors
          </h2>
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-muted-foreground)] hidden md:inline-block">
            Appendix
          </span>
        </div>

        <OtherProjects />
      </div>
    </div>
  )
}

export default RouteComponent

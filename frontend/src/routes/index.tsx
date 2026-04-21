import Hero from '@/components/Hero'
import ProjectCard from '@/components/ProjectCard'
import projectsData from '@/data/projects.json'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const featuredProjects = projectsData.filter((p) => p.featured).slice(0, 3)

  return (
    <div className="bg-[var(--color-background)]">
      <Hero />

      <section className="py-20 max-w-6xl mx-auto px-6 border-t border-[var(--color-border)]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8 border-b border-[var(--color-border)] pb-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]">
                Selected Works
              </span>
              <div className="w-12 h-[1px] bg-[var(--color-border)]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-[var(--color-foreground)]">
              Featured Creations
            </h2>
          </div>

          <Link
            to="/projects"
            className="group flex items-center gap-4 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors"
          >
            Explore Portfolio
            <div className="w-12 h-[1px] bg-[var(--color-border)] group-hover:bg-[var(--color-foreground)] transition-colors" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project as any}
              setSelectedCategory={() => {}}
              setCurrentPage={() => {}}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

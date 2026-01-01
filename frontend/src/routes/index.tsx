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

      <section className="py-40 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-[var(--color-primary)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--color-primary)]">
                Selected Works
              </span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85]">
              Featured <br />
              <span className="font-serif italic font-light">Creations</span>
            </h2>
          </div>

          <Link
            to="/projects"
            className="group flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.3em] hover:text-[var(--color-primary)] transition-all"
          >
            Explore All
            <div className="w-12 h-[1px] bg-[var(--color-foreground)] group-hover:w-20 group-hover:bg-[var(--color-primary)] transition-all duration-500" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
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

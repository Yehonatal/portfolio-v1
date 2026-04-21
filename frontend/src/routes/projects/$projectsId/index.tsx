import { createFileRoute } from '@tanstack/react-router'
import { Link, useLoaderData } from '@tanstack/react-router'
import projectsData from '@/data/projects.json'
import { ArrowLeft, Github, Globe } from 'lucide-react'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/projects/$projectsId/')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const project = projectsData.find(
      (p) => p.id.toString() === params.projectsId,
    )
    if (!project) throw new Response('Project not found', { status: 404 })
    return project
  },
})

function RouteComponent() {
  const project = useLoaderData({ from: '/projects/$projectsId/' })

  if (!project) {
    return (
      <div className="py-20 text-center font-serif text-2xl uppercase border-y-2 border-[var(--color-foreground)]">
        Project not found
      </div>
    )
  }

  const {
    id,
    title,
    description,
    images = [],
    liveLink,
    repoLink,
    category,
    date,
    techUsed = [],
  } = project

  const nextProject =
    projectsData[
      (projectsData.findIndex((p) => p.id === id) + 1) % projectsData.length
    ]

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] font-sans selection:bg-[var(--color-foreground)] selection:text-[var(--color-background)] pb-24 border-x-4 border-[var(--color-foreground)] max-w-6xl mx-auto">
      
      <header className="pt-24 pb-10 px-6 lg:px-10 border-b-2 border-[var(--color-foreground)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-[0.3em] border-2 border-[var(--color-foreground)] px-2 py-1">
              {category}
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.3em] border-2 border-[var(--color-foreground)] px-2 py-1">
              {date.split('-')[0]}
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight leading-none">
            {title}
          </h1>

          <p className="max-w-3xl text-sm md:text-base font-serif leading-relaxed border-l-2 border-[var(--color-foreground)] pl-4 py-2 drop-cap">
            {description}
          </p>

          <div className="flex flex-wrap gap-4 pt-6">
            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-[var(--color-foreground)] px-4 py-2 font-bold uppercase tracking-[0.3em] text-[10px]"
              >
                Live Preview
                <Globe className="w-4 h-4" />
              </a>
            )}
            {repoLink && (
              <a
                href={repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-[var(--color-foreground)] px-4 py-2 font-bold uppercase tracking-[0.3em] text-[10px]"
              >
                Source Code
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </motion.div>
      </header>

      {images.length > 0 && (
        <section className="border-b-2 border-[var(--color-foreground)] p-6 lg:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="border-2 border-[var(--color-foreground)] p-2"
          >
            <div className="border-b-2 border-[var(--color-foreground)] text-center py-2 text-xs font-bold uppercase tracking-[0.3em] mb-2">
              Fig 1. Main Preview
            </div>
            <img
              src={images[0]}
              alt={title}
              className="w-full h-auto object-cover grayscale"
            />
          </motion.div>
        </section>
      )}

      <section className="px-6 lg:px-10 py-12 grid lg:grid-cols-[1fr_280px] gap-10 border-b-2 border-[var(--color-foreground)]">
        <div className="space-y-16">
          {images.length > 1 && (
            <div className="space-y-12">
              <h2 className="text-2xl font-black uppercase tracking-tight border-b-2 border-[var(--color-foreground)] pb-3">
                Gallery
              </h2>
              {images.slice(1).map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="border-2 border-[var(--color-foreground)] p-2"
                >
                  <div className="border-b-2 border-[var(--color-foreground)] pb-2 mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-right">
                    Fig {index + 2}.
                  </div>
                  <img
                    src={image}
                    alt={`${title} screenshot ${index + 2}`}
                    className="w-full h-auto grayscale"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <aside className="space-y-12">
          <div className="border-2 border-[var(--color-foreground)] p-4">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] border-b-2 border-[var(--color-foreground)] pb-2 mb-4">
              Tech Stack
            </h3>
            <div className="flex flex-col gap-3">
              {techUsed.map((tech) => (
                <div
                  key={tech}
                  className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-between border-b border-[var(--color-foreground)] pb-2"
                >
                  <span>{tech}</span>
                  <span className="w-2 h-2 bg-[var(--color-foreground)]"></span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-3 border-2 border-[var(--color-foreground)] px-4 py-3 font-black uppercase tracking-[0.3em] text-[10px] w-full justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </Link>
          </div>
        </aside>
      </section>

      <section className="p-10 lg:p-16 text-center border-t-2 border-[var(--color-foreground)]">
        <Link
          to="/projects/$projectsId"
          params={{ projectsId: nextProject.id }}
          className="group block"
        >
          <div className="space-y-6">
            <span className="inline-block border-2 border-[var(--color-foreground)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em]">
              Next Project
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
              {nextProject.title}
            </h2>
            <div className="flex items-center justify-center gap-4 group/btn inline-flex">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] underline decoration-2 underline-offset-8">
                Read Story
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </Link>
      </section>
    </div>
  )
}

function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

export default RouteComponent

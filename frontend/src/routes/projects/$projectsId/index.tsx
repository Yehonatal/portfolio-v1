import { createFileRoute } from '@tanstack/react-router'
import { Link, useLoaderData } from '@tanstack/react-router'
import Badge from '@/ui/badge'
import projectsData from '@/data/projects.json'
import {
  ArrowLeft,
  Github,
  Globe,
  Calendar,
  Tag,
  ChevronRight,
} from 'lucide-react'
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
      <div className="py-20 text-center text-gray-600">
        Project not found 😢
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
    <div className="min-h-screen bg-[var(--color-background)]">
      <header className="pt-52 pb-24 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="space-y-10"
        >
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--color-primary)]">
              {category}
            </span>
            <div className="w-8 h-[1px] bg-[var(--color-border)]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-muted-foreground)]">
              {date.split('-')[0]}
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-[var(--color-foreground)]">
            {title.split(' ').map((word, i) => (
              <span
                key={i}
                className={
                  i % 2 === 1
                    ? 'font-serif italic font-light text-[var(--color-muted-foreground)]'
                    : ''
                }
              >
                {word}{' '}
              </span>
            ))}
          </h1>

          <p className="max-w-2xl text-base md:text-lg text-[var(--color-muted-foreground)] leading-relaxed font-medium tracking-tight">
            {description}
          </p>

          <div className="flex flex-wrap gap-10 pt-4">
            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group/link"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                  Live Preview
                </span>
                <div className="h-[1px] w-8 bg-[var(--color-foreground)] group-hover/link:w-12 group-hover/link:bg-[var(--color-primary)] transition-all duration-500" />
              </a>
            )}
            {repoLink && (
              <a
                href={repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group/link"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                  Repository
                </span>
                <div className="h-[1px] w-8 bg-[var(--color-foreground)] group-hover/link:w-12 group-hover/link:bg-[var(--color-primary)] transition-all duration-500" />
              </a>
            )}
          </div>
        </motion.div>
      </header>

      <section className="max-w-6xl mx-auto px-6 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="relative aspect-video overflow-hidden rounded-[2rem] bg-[var(--color-secondary)]/5 shadow-2xl border border-[var(--color-border)]"
        >
          <img
            src={images[0]}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
          />
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-32">
        <div className="grid lg:grid-cols-[1fr_280px] gap-24">
          <div className="space-y-32">
            {images.length > 1 && (
              <div className="grid gap-20">
                {images.slice(1).map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-3xl overflow-hidden bg-[var(--color-secondary)]/5 border border-[var(--color-border)]"
                  >
                    <img
                      src={image}
                      alt={`${title} screenshot ${index + 2}`}
                      className="w-full h-auto"
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <aside className="space-y-16">
            <div className="space-y-6">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[var(--color-primary)]">
                Stack
              </span>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {techUsed.map((tech) => (
                  <span
                    key={tech}
                    className="text-[12px] font-bold text-[var(--color-muted-foreground)] uppercase tracking-widest"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-12">
              <Link
                to="/projects"
                className="flex items-center gap-4 group/back"
              >
                <div className="w-8 h-8 rounded-full border border-[var(--color-border)] flex items-center justify-center group-hover/back:border-[var(--color-primary)] group-hover/back:text-[var(--color-primary)] transition-all duration-500">
                  <ArrowLeft className="w-3 h-3" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--color-muted-foreground)] group-hover/back:text-[var(--color-foreground)] transition-colors">
                  Back
                </span>
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] bg-[var(--color-muted)]/30">
        <Link
          to="/projects/$projectsId"
          params={{ projectsId: nextProject.id }}
          className="group block py-40 px-6"
        >
          <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-8">
            <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[var(--color-primary)]">
              Next Project
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] group-hover:scale-105 transition-transform duration-1000">
              {nextProject.title.split(' ').map((word, i) => (
                <span
                  key={i}
                  className={
                    i % 2 === 1
                      ? 'font-serif italic font-light text-[var(--color-muted-foreground)]'
                      : ''
                  }
                >
                  {word}{' '}
                </span>
              ))}
            </h2>
            <div className="flex items-center gap-6 group/link">
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                View Case Study
              </span>
              <div className="h-[1px] w-12 bg-[var(--color-foreground)] group-hover/link:w-20 group-hover/link:bg-[var(--color-primary)] transition-all duration-700" />
            </div>
          </div>
        </Link>
      </section>
    </div>
  )
}

export default RouteComponent

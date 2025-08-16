import { createFileRoute } from '@tanstack/react-router'
import { Link, useLoaderData } from '@tanstack/react-router'
import Badge from '@/ui/badge'
import projectsData from '@/data/projects.json'
import { ArrowLeft } from 'lucide-react'

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
  const project = useLoaderData()

  if (!project) {
    return (
      <div className="py-20 text-center text-gray-600">
        Project not found 😢
      </div>
    )
  }

  const {
    title,
    description,
    img,
    liveLink,
    category,
    date,
    techUsed = [],
  } = project

  return (
    <div className="max-w-5xl mx-auto px-4">
      {img && (
        <div className="w-full h-[25vh] sm:h-[40vh] relative overflow-hidden rounded-2xl">
          <img
            src={img}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 rounded-2xl" />
        </div>
      )}

      <section className="py-16">
        <Link
          to="/projects"
          className="flex justify-start items-center gap-2 text-gray-700 hover:text-black mb-6"
        >
          <ArrowLeft /> Back to Projects
        </Link>

        <div data-aos="fade-up">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[var(--color-foreground)] mb-2">
              {title}
            </h1>
            <div className="text-sm text-gray-500 flex gap-4">
              <span>{category}</span>
              <span>{date}</span>
            </div>
          </div>

          <p className="text-gray-700 text-base leading-relaxed mb-6">
            {description}
          </p>

          {techUsed.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {techUsed.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          )}

          {liveLink && (
            <div className="mt-8">
              <Badge className="py-2 px-4 rounded-xl font-semibold hover:scale-[0.98] transition-all">
                <a href={liveLink} target="_blank" rel="noopener noreferrer">
                  🔗 Visit Project
                </a>
              </Badge>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default RouteComponent

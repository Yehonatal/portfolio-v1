import Badge from '../ui/badge'
import {
  Code,
  Server,
  Database,
  GitBranch,
  Box,
  Terminal,
  Cloud,
} from 'lucide-react'

export const categories = [
  {
    name: 'Frontend',
    icon: <Code className="w-4 h-4 mr-1 inline" />,
    tech: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'HTML',
      'CSS',
      'TailwindCSS',
    ],
  },
  {
    name: 'Backend & APIs',
    icon: <Server className="w-4 h-4 mr-1 inline" />,
    tech: ['Node.js', 'Express', 'Python', 'GraphQL', 'REST APIs'],
  },
  {
    name: 'Databases & Hosting',
    icon: <Database className="w-4 h-4 mr-1 inline" />,
    tech: ['MongoDB', 'Supabase', 'Neon', 'Turso' ],
  },
  {
    name: 'Dev Tools & Practices',
    icon: <GitBranch className="w-4 h-4 mr-1 inline" />,
    tech: ['Version Control', 'Docker', 'Postman', 'Testing', 'Axios'],
  },
  {
    name: 'Other',
    icon: <Box className="w-4 h-4 mr-1 inline" />,
    tech: ['Vite', 'Strapi', 'Cloudinary', 'Framer Motion', 'AOS', 'Sonner'],
  },
]

const TechStack = () => {
  return (
    <section className="max-w-5xl mx-auto my-4">
      <p
        className="mb-6 text-gray-700"
        data-aos="fade-zoom-in"
        data-aos-delay="150"
      >
        Tools and technologies I have experience with.
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <div
            key={cat.name}
            className=""
            data-aos="zoom-in-up"
            data-aos-delay={i * 150}
          >
            <h4 className="text-xl font-semibold mb-4 text-gray-800 ">
              {cat.icon} {cat.name}
            </h4>
            <div className="flex flex-wrap justify-left gap-3">
              {cat.tech.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TechStack

import { createFileRoute } from '@tanstack/react-router'
import blogsData from '@/data/blogs.json'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/blogs/')({
  component: BlogsPage,
})

function BlogsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] py-40 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-40 space-y-10">
          <div className="space-y-6">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--color-primary)]">
              Journal
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-[var(--color-foreground)] leading-[0.85]">
              Thoughts & <br />{' '}
              <span className="font-serif italic font-light">Reflections</span>
            </h1>
          </div>
          <p className="text-base md:text-lg text-[var(--color-muted-foreground)] max-w-xl leading-relaxed font-medium">
            Exploring the intersection of code, creativity, and the human
            experience. A collection of insights from my journey.
          </p>
        </header>

        <div className="grid gap-40">
          {blogsData.map((blog, index) => (
            <motion.a
              key={index}
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="group grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24 items-center"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] bg-[var(--color-secondary)]/5 border border-[var(--color-border)]">
                <img
                  src={blog.cover}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 group-hover:brightness-110"
                />
              </div>

              <div className="space-y-10">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-[0.9] group-hover:text-[var(--color-primary)] transition-colors duration-500">
                    {blog.title}
                  </h2>
                  <p className="text-[13px] md:text-[14px] text-[var(--color-muted-foreground)] leading-relaxed line-clamp-3 font-medium">
                    {blog.description}
                  </p>
                </div>

                <div className="flex items-center gap-8 group/link">
                  <span className="text-[11px] font-black uppercase tracking-[0.3em]">
                    Read on Medium
                  </span>
                  <div className="h-[1px] w-16 bg-[var(--color-foreground)] group-hover/link:w-24 group-hover/link:bg-[var(--color-primary)] transition-all duration-500" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  )
}

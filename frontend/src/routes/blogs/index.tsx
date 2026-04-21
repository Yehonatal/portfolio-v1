import { createFileRoute } from '@tanstack/react-router'
import blogsData from '@/data/blogs.json'
import { ArrowUpRight } from 'lucide-react'

export const Route = createFileRoute('/blogs/')({
  component: BlogsPage,
})

function BlogsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] py-16 px-6 border-x border-[var(--color-border)] max-w-6xl mx-auto">
      <div className="max-w-5xl mx-auto">
        <header className="mb-16 border-b border-[var(--color-border)] pb-12 text-center pt-10">
          <div className="inline-block border border-[var(--color-border)] px-4 py-1.5 mb-8">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]">
              Daily Chronicle
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight text-[var(--color-foreground)] leading-none">
            The Journal
          </h1>
          <p className="mt-8 text-sm md:text-base font-light max-w-2xl mx-auto border-t border-[var(--color-border)] pt-6 text-[var(--color-muted-foreground)]">
            Exclusive insights on code, creativity & the human experience.
          </p>
        </header>

        <div className="grid gap-12">
          {blogsData.map((blog, index) => (
            <a
              key={index}
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border-b border-[var(--color-border)] pb-12 last:border-0"
            >
              <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-12 items-center">
                <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full border border-[var(--color-border)] overflow-hidden bg-[var(--color-secondary)]">
                  <img
                    src={blog.cover}
                    alt={blog.title}
                    className="w-full h-full object-cover grayscale-[0.8] group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute top-0 left-0 bg-[var(--color-background)] text-[var(--color-foreground)] px-4 py-2 text-[10px] font-medium border-b border-r border-[var(--color-border)] uppercase tracking-[0.1em]">
                    No. {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                <div className="flex flex-col justify-center py-4">
                  <div className="space-y-6">
                    <h2 className="text-3xl md:text-5xl font-serif tracking-tight leading-tight group-hover:text-[var(--color-muted-foreground)] transition-colors">
                      {blog.title}
                    </h2>
                    <div className="h-[1px] w-20 bg-[var(--color-border)]" />
                    <p className="text-sm md:text-base font-light leading-relaxed text-[var(--color-muted-foreground)] drop-cap">
                      {blog.description}
                    </p>
                  </div>

                  <div className="mt-10 flex items-center justify-between border-t border-[var(--color-border)] pt-4">
                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-muted-foreground)] group-hover:text-[var(--color-foreground)] transition-colors">
                      Read Article
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-[var(--color-muted-foreground)] group-hover:text-[var(--color-foreground)] transition-colors" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
